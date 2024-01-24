import { styled } from "@mui/material/styles";
import AuthGuard from "guards/AuthGuard";
import { FC } from "react";
import { APPBAR } from "utils/constants";
import { excludeProps } from "utils/functions";
import Appbar from "./Appbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  disablePadding?: boolean;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({
  children,
  disablePadding,
}) => {
  return (
    <AuthGuard>
      <Appbar />

      <Main sidebarWidth={0} disablePadding={!!disablePadding}>
        {children}
      </Main>
    </AuthGuard>
  );
};

const Main = styled("main", {
  shouldForwardProp: excludeProps(["sidebarWidth", "disablePadding"]),
})<{ sidebarWidth: number; disablePadding?: boolean }>(
  ({ sidebarWidth, theme: { transitions, breakpoints } }) => ({
    paddingTop: APPBAR.HEIGHT,
    transition: transitions.create("all", {
      duration: 180,
    }),

    [breakpoints.up("lg")]: {
      paddingLeft: sidebarWidth + APPBAR.HEIGHT / 2,
    },
  })
);

export default DashboardLayout;
