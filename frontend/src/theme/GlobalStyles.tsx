import MuiGlobalStyles from "@mui/material/GlobalStyles";
import { FunctionComponent } from "react";
import { poppins } from "./fonts";

const GlobalStyles: FunctionComponent<object> = () => (
  <MuiGlobalStyles
    styles={{
      html: {
        fontFamily: poppins.fontFamily,
        fontWeight: poppins.fontWeights[400],
      },
      body: {
        background: `radial-gradient(at 47% 33%, hsl(268.36, 100%, 89%) 0, transparent 59%), 
        radial-gradient(at 82% 65%, hsl(300.00, 100%, 96%) 0, transparent 55%)`,
        backgroundImage: `url(${url})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        // backdropFilter: "blur(10px)",
      },
    }}
  />
);

// const url = "/images/bg-light.jpg";
const url = "/images/bg-1.png";
export default GlobalStyles;
