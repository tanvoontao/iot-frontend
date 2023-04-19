import { Container } from '@mui/material';
import DarkModeBtn from '@/components/Button/DarkModeBtn';
import NavBar from '@/components/NavBar/NavBar';
import Footer from '@/components/Footer/Footer';

function UserLayout({ children }) {
  return (
    <>
      <NavBar />
      <Container maxWidth="lg">
        <DarkModeBtn />
        {children}
      </Container>
      <Footer />
    </>
  );
}

export default UserLayout;
