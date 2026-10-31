import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

export default function Layout({ children }) {
  return (
    <>
      <Nav />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
