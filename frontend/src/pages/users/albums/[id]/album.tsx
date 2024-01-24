import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Page from "components/Page";
import {
  PhotoFormDialog,
  PhotoFormDialogRef,
} from "features/users/albums/forms/photo-form";
import PhotoCard from "features/users/albums/photo";
import useAuth from "hooks/useAuth";
import DashboardLayout from "layouts/dashboard/DashboardLayout";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "store";
import { reduxGetUserAlbumsPhotos } from "store/actions/albums";
import {
  selectUserAlbumPhotos,
  selectUserAlbums,
} from "store/selectors/albums";

const AlbumPage: NextPageWithLayout = () => {
  const ref = useRef<PhotoFormDialogRef>(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const { user_id } = useAuth();
  const { albums, loading } = useSelector(selectUserAlbums);
  const _photos = useSelector(selectUserAlbumPhotos);
  const _loading = _photos.loading;
  const photos = _photos?.photos;
  const { id } = router.query;

  const _album = albums.find((album) => album.id === Number(id));

  const getAlbumPhotos = useCallback(() => {
    dispatch(reduxGetUserAlbumsPhotos(Number(id)));
  }, [dispatch, id]);

  useEffect(() => {
    getAlbumPhotos();
  }, [getAlbumPhotos]);

  return (
    <Stack alignItems={"center"}>
      {loading ? (
        <CircularProgress />
      ) : loading === "error" ? (
        <Typography>Error occured while fetching Data</Typography>
      ) : (
        <Box width={"100%"}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Box>
              <Typography variant="subtitle2">{_album?.title}</Typography>
            </Box>
            <Box>
              {Number(user_id) === _album?.user && (
                <Button
                  onClick={() => ref.current?.open()}
                  variant="outlined"
                  size="small"
                >
                  Add Image
                </Button>
              )}
            </Box>
          </Stack>

          <Divider sx={{ marginY: 2 }} />
          <Stack>
            <Typography variant="subtitle2">Album Images</Typography>
            {!photos?.length ? (
              <Typography
                textAlign={"center"}
                color={"error"}
                variant="subtitle2"
              >
                The album has no images
              </Typography>
            ) : (
              <Grid container spacing={3}>
                {photos?.map(({ title, image_url, id }, i) => (
                  <PhotoCard key={id} {...{ title, image_url, id }} />
                ))}
              </Grid>
            )}
          </Stack>
        </Box>
      )}
      <PhotoFormDialog
        {...{ ref, user_id: _album?.user, album_id: _album?.id }}
      />
    </Stack>
  );
};

AlbumPage.getLayout = (page) => {
  return (
    <DashboardLayout>
      <Page title="Album information">{page}</Page>
    </DashboardLayout>
  );
};

export default AlbumPage;
