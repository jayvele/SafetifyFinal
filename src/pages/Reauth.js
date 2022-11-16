import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
import { Navigate, NavLink } from 'react-router-dom';

// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';
// sections
import ReauthForm from '../sections/auth/login/ReauthForm';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 600,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 600,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Reauth() {
  const mdUp = useResponsive('up', 'md');

  const handleSignUp = () => {
    Navigate('/login', { replace: true });
  };

  return (
    <>
      <Helmet>
        <title> Reauth | Safetify </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {/* {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, py: 5, mt: 10, mb: 5 }}>
              Authentication before Hospital Form
            </Typography>
            <img src="/assets/illustrations/illustration_login_new.png" alt="login" />
          </StyledSection>
        )} */}

        <Container maxWidth="sm">
          <StyledContent>
            <ReauthForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
