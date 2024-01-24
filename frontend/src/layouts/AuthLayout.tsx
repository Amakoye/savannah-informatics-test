import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Image from "components/Image";
import NextLink from "components/NextLink";
import useResponsive from "hooks/useResponsive";
import { poppins } from "theme/fonts";
import cssStyles from "utils/cssStyles";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: {
    link?: string;
    linkText?: string;
    text: string;
  };
}

const AuthLayout: FunctionComponent<AuthLayoutProps> = ({
  title,
  subtitle,
  children,
}) => {
  const isLg = useResponsive("up", "lg");

  return (
    <RootStyles container>
      {!!isLg && (
        <LeftPanel item xs={0} lg={8}>
          <Image {...{ src }} />
        </LeftPanel>
      )}
      <RightPanel item xs={12} sm={12} md={12} lg={4}>
        <span className="inner">
          <Typography variant="h4" mb={1} fontFamily={poppins.fontFamily}>
            {title}
          </Typography>
          {!!subtitle && (
            <Typography variant="body2" component="div" mb={4}>
              {subtitle.text}{" "}
              {subtitle?.link && (
                <NextLink
                  href={subtitle.link}
                  color="primary.main"
                  fontFamily="publicSans"
                  fontWeight={500}
                >
                  {subtitle.linkText}
                </NextLink>
              )}
            </Typography>
          )}

          {children}
        </span>
      </RightPanel>
    </RootStyles>
  );
};

const RootStyles = styled(Grid)(() => ({
  height: "100vh",
}));

const RightPanel = styled(Grid)(({ theme: { spacing, breakpoints } }) => ({
  height: "100%",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  paddingLeft: spacing(4),
  paddingRight: spacing(4),
  backgroundColor: "transparent",

  [breakpoints.up("lg")]: {
    backgroundColor: "white",
    paddingLeft: spacing(7),
    paddingRight: spacing(7),
  },

  "& .inner": {
    maxWidth: 600,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
  },
}));

const LeftPanel = styled(Grid)(({ theme: { spacing, breakpoints } }) => ({
  height: "100%",
  padding: spacing(3),
  alignItems: "center",
  justifyContent: "center",
  display: "flex",

  // background: alpha(palette.grey[0], 0.4),
  ...cssStyles.glass({
    border: false,
    blur: 20,
    opacity: 0,
  }),

  [breakpoints.down("sm")]: {
    display: "none",
  },
}));

const src = `/images/illustrations/illustration_dashboard.png`;
export default AuthLayout;
