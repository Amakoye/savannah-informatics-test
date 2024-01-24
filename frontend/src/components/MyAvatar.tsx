// hooks
// utils
// import useAuth from "hooks/useAuth";
import createAvatar from "utils/createAvatar";
//
import Avatar, { Props as AvatarProps } from "./Avatar";

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }: AvatarProps) {
  const user = {
    displayName: "John Doe",
  };
  const displayName = user.displayName;

  return (
    <Avatar
      src={""}
      alt=""
      color={!user?.displayName ? "default" : createAvatar(displayName).color}
      {...other}
    >
      {createAvatar(displayName).name}
    </Avatar>
  );
}
