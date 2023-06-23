import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;800&display=swap"
          rel="stylesheet"
        ></link>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        <link rel="manifest" href="manifest.json" />
        <meta name="theme-color" content="#ffafcc" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
