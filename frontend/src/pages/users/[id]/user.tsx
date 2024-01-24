import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Page from "components/Page";
import AlbumCard from "features/users/albums/album";
import {
  AlbumFormDialog,
  AlbumFormDialogRef,
} from "features/users/albums/forms/album-form";
import { UserInfo } from "features/users/user";
import useAuth from "hooks/useAuth";
import DashboardLayout from "layouts/dashboard/DashboardLayout";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "store";
import { reduxGetUserAlbums } from "store/actions/albums";
import { reduxGetUsers } from "store/actions/auth";
import { selectUserAlbums } from "store/selectors/albums";
import { selectUsers } from "store/selectors/auth";

const UserPage: NextPageWithLayout = () => {
  const ref = useRef<AlbumFormDialogRef>(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const { user_id } = useAuth();
  const { loading, users } = useSelector(selectUsers);
  const { albums } = useSelector(selectUserAlbums);
  const { id } = router.query;

  const _user = users.find((user) => user.id === Number(id));

  const getUsers = useCallback(() => {
    if (!loading && !users.length) dispatch(reduxGetUsers());
  }, [dispatch, loading, users.length]);

  const getUserAlbums = useCallback(() => {
    if (_user && _user.id) dispatch(reduxGetUserAlbums(_user.id));
  }, [_user, dispatch]);

  useEffect(() => {
    getUsers();
    getUserAlbums();
  }, [getUserAlbums, getUsers]);

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
              <UserInfo
                {...{
                  name: _user?.name,
                  email: _user?.email,
                  username: _user?.username,
                }}
              />
            </Box>
            <Box>
              {Number(user_id) === _user?.id && (
                <Button
                  onClick={() => ref.current?.open()}
                  variant="outlined"
                  size="small"
                >
                  New Album
                </Button>
              )}
            </Box>
          </Stack>

          <Divider sx={{ marginY: 2 }} />
          <Stack>
            <Typography variant="subtitle2">Albums</Typography>
            {!albums?.length ? (
              <Typography
                textAlign={"center"}
                color={"error"}
                variant="subtitle2"
              >
                The user has no albums
              </Typography>
            ) : (
              <Grid container spacing={3}>
                {albums.map(({ title, id, user }, i) => (
                  <AlbumCard
                    key={id}
                    {...{ title, user_id: user, id, owner: _user.name }}
                  />
                ))}
              </Grid>
            )}
          </Stack>
        </Box>
      )}
      <AlbumFormDialog {...{ ref, user_id: _user?.id }} />
    </Stack>
  );
};

UserPage.getLayout = (page) => {
  return (
    <DashboardLayout>
      <Page title="User information">{page}</Page>
    </DashboardLayout>
  );
};

export default UserPage;
