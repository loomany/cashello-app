import { ScrollViewStyleReset } from 'expo-router/html';
import type { ReactNode } from 'react';

export default function Root({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
        />
        <title>Cashhello</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />
        <ScrollViewStyleReset />
        <style
          dangerouslySetInnerHTML={{
            __html: `html, body, #root { height: 100%; background-color: #1C1C1A; }`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
