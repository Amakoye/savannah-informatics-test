import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Iconify from "components/Iconify";
import useCollapseDrawer from "hooks/useCollapseDrawer";
import useResponsive from "hooks/useResponsive";
import { useDispatch } from "store";
import { reduxLogoutUser } from "store/actions/auth";
import { APPBAR } from "utils/constants";

import cssStyles from "utils/cssStyles";
import { excludeProps } from "utils/functions";

const height = 20;

const Appbar = () => {
  const { width, onToggleCollapse } = useCollapseDrawer();

  const isNotLg = useResponsive("down", "lg");

  const dispatch = useDispatch();

  const handleLogout = () => dispatch(reduxLogoutUser());

  return (
    <RootStyles sidebarWidth={width}>
      {isNotLg && (
        <IconButton onClick={() => onToggleCollapse()}>
          <Iconify icon="eva:menu-2-fill" {...{ height, width: height }} />
        </IconButton>
      )}
      <div style={{ flexGrow: 1 }} />
      <IconButton
        size="medium"
        sx={{ mr: 2 }}
        color="error"
        onClick={handleLogout}
      >
        <Iconify icon="ant-design:logout-outlined" />
      </IconButton>
    </RootStyles>
  );
};

const RootStyles = styled(AppBar, {
  shouldForwardProp: excludeProps(["sidebarWidth"]),
})<{
  sidebarWidth: number;
}>(({ theme: { spacing } }) => ({
  height: APPBAR.HEIGHT,
  right: 0,
  width: "auto",
  paddingLeft: spacing(2),
  paddingRight: spacing(2),
  boxShadow: "none",
  background: "none",
  left: 0,

  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  ...cssStyles.glass({
    saturate: 0,
    border: false,
  }),
}));

export default Appbar;
