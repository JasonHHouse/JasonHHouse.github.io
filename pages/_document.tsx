import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          defer
          data-domain="jasonhhouse.github.io"
          src="https://plausible.io/js/script.js"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.plausible = window.plausible || function () {
                (window.plausible.q = window.plausible.q || []).push(arguments);
              };
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}