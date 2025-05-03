import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'FitSphere',
  description: 'Your ultimate workout app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />

        <main >{children}</main>
        <Footer />
      </body>
    </html>
  );
}
