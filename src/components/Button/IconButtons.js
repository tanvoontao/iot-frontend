/* eslint-disable import/no-extraneous-dependencies */
import Link from 'next/link';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';

function IconButtons(props) {
  const {
    className, facebook, linkedin, instagram, email,
  } = props;

  return (
    <div className={`flex justify-center md:justify-start space-x-3 ${className}`}>
      <Link href={facebook} target="_blank">
        <FacebookIcon className="text-blue4" />
      </Link>

      <Link href={linkedin} target="_blank">
        <LinkedInIcon className="text-blue4" />
      </Link>

      <Link href={instagram} target="_blank">
        <InstagramIcon className="text-blue4" />
      </Link>

      <Link href={`mailto:${email}`}>
        <EmailIcon className="text-blue4" />
      </Link>
    </div>
  );
}

export default IconButtons;
