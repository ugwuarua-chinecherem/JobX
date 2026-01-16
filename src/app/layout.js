import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import NavigationHandler from '../components/NavigationHandler';
import './globals.css';

export const metadata = {
  title: 'Pelado - Youth Jobs & Skills Platform',
  description: 'Find jobs, build skills, get hired',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavigationHandler />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}