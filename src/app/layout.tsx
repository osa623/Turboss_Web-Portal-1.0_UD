import Footer from "./footer/page";
import "./globals.css"; // Import global styles


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
