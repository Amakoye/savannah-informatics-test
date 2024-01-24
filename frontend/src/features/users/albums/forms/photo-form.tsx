import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import { isRejected } from "@reduxjs/toolkit";
import {
  FormProvider,
  RHFTextField,
  RHFUploadSingleFile,
} from "components/hook-form";
import useForm from "hooks/useForm";
import useNotifications from "hooks/useNotifications";
import { forwardRef, useImperativeHandle } from "react";
import { useDispatch } from "store";
import {
  reduxGetUserAlbumsPhotos,
  reduxPostUserAlbumPhoto,
} from "store/actions/albums";
import * as yup from "yup";

const PhotoForm = () => {
  return (
    <Stack spacing={2}>
      <RHFTextField
        name="title"
        label="Photo title"
        variant="outlined"
        fullWidth
      />
      <RHFUploadSingleFile
        name="image"
        //accept={{ "image/*": ["jpg", "png", "gif"] }}
      />
    </Stack>
  );
};

const PhotoFormDialog = forwardRef<PhotoFormDialogRef, PhotoFormDialogProps>(
  function PhotoFormDialog({ user_id, album_id }, ref) {
    const methods = useForm({
      resolver: yupResolver(photoFormSchema),
      defaultValues: photoFormValues,
    });
    const { enqueueSnackbar } = useNotifications();

    const dispatch = useDispatch();

    const { reset, handleSubmit } = methods;

    const open = methods.watch("open");

    const onSubmit = handleSubmit(
      (values) => {
        if (values.title) {
          dispatch(
            reduxPostUserAlbumPhoto({
              title: values?.title,
              image: values?.image,
              album: album_id,
            })
          ).then((response) => {
            if (!isRejected(response)) {
              enqueueSnackbar("Photo added succesfully", {
                variant: "success",
              });
              dispatch(reduxGetUserAlbumsPhotos(album_id));
              reset({ ...values, open: false });
            } else {
              enqueueSnackbar("Something went wrong", {
                variant: "error",
              });
            }
          });
        }
      },
      (e) => console.error(e)
    );

    useImperativeHandle(ref, () => ({
      open: (values?: PhotoFormValues) => {
        reset({
          ...values,
          open: true,
        });
      },
    }));

    return (
      <FormProvider {...{ methods, onSubmit }}>
        <Dialog
          open={open}
          onClose={() =>
            methods.reset({
              open: false,
            })
          }
          fullWidth
        >
          <DialogTitle>Add photo</DialogTitle>
          <DialogContent>
            <PhotoForm />
          </DialogContent>
          <DialogActions>
            <LoadingButton
              type="submit"
              onClick={onSubmit}
              loading={methods?.formState.isSubmitting}
              variant="contained"
              fullWidth
            >
              Submit
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </FormProvider>
    );
  }
);

const photoFormSchema = yup.object().shape({
  title: yup.string().required("This field is required"),
  image: yup.mixed(),
  open: yup.boolean().notRequired(),
});

const photoFormValues: PhotoFormValues = {
  open: false,
  title: "",
  image: {},
};

type PhotoFormValues = {
  id?: number;
  open: boolean;
  title: string;
  image: {};
};

type PhotoFormDialogRef = {
  open: () => void;
};

type PhotoFormDialogProps = {
  user_id: number;
  album_id: number;
};

export { PhotoFormDialog, photoFormSchema, photoFormValues };
export type { PhotoForm, PhotoFormDialogRef };
