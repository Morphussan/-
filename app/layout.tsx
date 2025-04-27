import './globals.css';
import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import Sidebar from './components/Sidebar';
import Script from 'next/script';

const nunitoSans = Nunito_Sans({ 
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Управляшка',
  description: '(〃＾▽＾〃)',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Script id="spa-routing">
          {`
            (function(){
              let redirect = sessionStorage.redirect;
              delete sessionStorage.redirect;
              if (redirect && redirect !== location.href) {
                history.replaceState(null, null, redirect);
              }
            })();
          `}
        </Script>
      </head>
      <body className={nunitoSans.className}>
        <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-auto">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
