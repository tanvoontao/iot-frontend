/* eslint-disable import/no-extraneous-dependencies */
import { Container } from '@mui/material';

function Footer() {
  const company = 'Tan Voon Tao 101234693';
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-t from-blue4 to-blue3 py-10 text-white">
      <Container maxWidth="lg">
        <hr className="my-5" />
        <p className="text-center">
          Copyrights &copy;
          {' '}
          {currentYear}
          {' '}
          <code>
            {company}
          </code>
          .
          {' '}
          All Rights Reserved.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
