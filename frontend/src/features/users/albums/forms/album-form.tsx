import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import { isRejected } from "@reduxjs/toolkit";
import { FormProvider, RHFTextField } from "components/hook-form";
import useForm from "hooks/useForm";
import useNotifications from "hooks/useNotifications";
import { forwardRef, useImperativeHandle } from "react";
import { useDispatch } from "store";
import { reduxGetUserAlbums, reduxPostUserAlbum } from "store/actions/albums";
import * as yup from "yup";

const AlbumForm = () => {
  return (
    <Stack spacing={2}>
      <RHFTextField
        name="title"
        label="Album title"
        variant="outlined"
        fullWidth
      />
    </Stack>
  );
};

const AlbumFormDialog = forwardRef<AlbumFormDialogRef, AlbumFormDialogProps>(
  function AlbumFormDialog({ user_id }, ref) {
    const methods = useForm({
      resolver: yupResolver(albumFormSchema),
      defaultValues: albumFormValues,
    });
    const { enqueueSnackbar } = useNotifications();

    const dispatch = useDispatch();

    const { reset, handleSubmit } = methods;

    const open = methods.watch("open");

    const onSubmit = handleSubmit((values) => {
      if (values.title) {
        dispatch(reduxPostUserAlbum({ title: values?.title })).then(
          (response) => {
            if (!isRejected(response)) {
              enqueueSnackbar("Album added succesfully", {
                variant: "success",
              });
              dispatch(reduxGetUserAlbums(user_id));
            }
          }
        );
      }
      reset({ ...values, open: false });
    });

    useImperativeHandle(ref, () => ({
      open: (values?: AlbumFormValues) => {
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
          <DialogTitle>Create an album</DialogTitle>
          <DialogContent>
            <AlbumForm />
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

const albumFormSchema = yup.object().shape({
  title: yup.string().required("This field is required"),
  open: yup.boolean().notRequired(),
});

const albumFormValues: AlbumFormValues = {
  open: false,
  title: "",
};

type AlbumFormValues = {
  id?: number;
  open: boolean;
  title: string;
};

type AlbumFormDialogRef = {
  open: () => void;
};

type AlbumFormDialogProps = {
  user_id: number;
};

export { AlbumFormDialog, albumFormSchema, albumFormValues };
export type { AlbumForm, AlbumFormDialogRef };
