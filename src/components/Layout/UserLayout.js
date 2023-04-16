import { Container } from '@mui/material';
import DarkModeBtn from '@/components/Button/DarkModeBtn';
import NavBar from '@/components/NavBar/NavBar';
import Footer from '@/components/Footer/Footer';

function UserLayout({ children }) {
  return (
    <>
      <NavBar />
      <DarkModeBtn />
      {children}
      <Footer />
    </>
  );
}

export default UserLayout;
