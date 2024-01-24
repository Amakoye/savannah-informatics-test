import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Page from "components/Page";
import UserCard from "features/users/user";
import DashboardLayout from "layouts/dashboard/DashboardLayout";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "store";
import { reduxGetUsers } from "store/actions/auth";
import { selectUsers } from "store/selectors/auth";

const UsersPage: NextPageWithLayout = () => {
  const dispatch = useDispatch();
  const { loading, users } = useSelector(selectUsers);

  const getUsers = useCallback(() => {
    dispatch(reduxGetUsers());
  }, [dispatch]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <Stack alignItems={"center"}>
      {loading ? (
        <CircularProgress />
      ) : loading === "error" ? (
        <Typography>Error occured while fetching Data</Typography>
      ) : (
        <Grid container spacing={3}>
          {users.map(({ name, email, username, id }, i) => (
            <UserCard key={id} {...{ name, email, username, id }} />
          ))}
        </Grid>
      )}
    </Stack>
  );
};

UsersPage.getLayout = (page) => {
  return (
    <DashboardLayout>
      <Page title="Users">{page}</Page>
    </DashboardLayout>
  );
};

export default UsersPage;
