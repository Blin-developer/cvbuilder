import './globals.css';

export const metadata = {
  title: 'CVBuilder — Ndërto CV-në tënde Europass',
  description: 'Aplikacion profesional për krijimin e CV-ve në stilin Europass',
};

export default function RootLayout({ children }) {
  return (
    <html lang="sq">
      <body>{children}</body>
    </html>
  );
}