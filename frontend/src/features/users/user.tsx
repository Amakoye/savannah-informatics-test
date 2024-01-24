import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { isRejected } from "@reduxjs/toolkit";
import Avatar from "components/Avatar";
import NextLink from "components/NextLink";
import { FC, useCallback, useEffect, useState } from "react";
import { useDispatch } from "store";
import { reduxGetUserAlbumsCount } from "store/actions/albums";
import createAvatar from "utils/createAvatar";
import cssStyles from "utils/cssStyles";

export const UserInfo: FC<{
  name: string;
  username: string;
  email: string;
}> = ({ name, username, email }) => {
  return (
    <>
      <Typography variant="subtitle2">Name: {name}</Typography>
      <Typography variant="subtitle2">Username: {username}</Typography>
      <Typography variant="subtitle2">Email: {email}</Typography>
    </>
  );
};

const UserCard: FC<UserCardProps> = ({ name, email, username, id }) => {
  const [albumCount, setAlbumCount] = useState<number>(0);
  const dispatch = useDispatch();
  const getUserAlbums = useCallback(() => {
    dispatch(reduxGetUserAlbumsCount(id)).then((response) => {
      if (!isRejected(response)) {
        setAlbumCount(response.payload.length);
      }
    });
  }, [dispatch, id]);

  useEffect(() => {
    getUserAlbums();
  }, []);

  return (
    <Grid item xs={12} sm={4}>
      <Card
        variant="outlined"
        sx={cssStyles.glass({
          opacity: 0.6,
          bg: "#ffffff",
          border: {
            opacity: 1,
          },
        })}
      >
        <CardContent>
          <Stack alignItems={"center"}>
            <Avatar
              sx={{ width: 60, height: 60 }}
              color={createAvatar(name).color}
            >
              {createAvatar(name).name}
            </Avatar>
          </Stack>
          <Stack my={2}>
            <UserInfo {...{ name, email, username }} />
          </Stack>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Chip
              variant="outlined"
              label={`${albumCount} Albums`}
              size="small"
              color={createAvatar(name).color}
            />
            <Button
              variant="outlined"
              size="small"
              color={createAvatar(name).color as any}
            >
              <NextLink href={`/users/${id}/user`}>View User</NextLink>
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
};

type UserCardProps = {
  name: string;
  username: string;
  email: string;
  id: number;
};

export default UserCard;
