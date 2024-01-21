import { CacheProvider, EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";

import { AppProps } from "next/app";
import Head from "next/head";

// import "styles/styles.css";
import { ThemeProvider } from "theme";
import GlobalStyles from "theme/GlobalStyles";
import createEmotionCache from "theme/createEmotionCache";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

type Props = MyAppProps & {
  Component: NextPageWithLayout;
};

function MyApp(props: Props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider>
        <CssBaseline />
        <GlobalStyles />
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
