import { useState, useContext } from 'react';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
// @mui
import {
  Container,
  Typography,
  Divider,
  Button,
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
  styled,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components\
import axios from 'axios';

import Iconify from '../../../components/iconify';
import AuthContext from '../../../store/AuthContext';
// import LoginForm from './LoginForm';
// ----------------------------------------------------------------------

function SignUpForm() {
  const navigate = useNavigate();
  // const history = useHistory();

  const [isLogin, setIsLogin] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const [showPassword, setShowPassword] = useState(false);

  const [enteredEmail, setEnteredEmail] = useState('');

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const [enteredPassword, setEnteredPassword] = useState('');

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const authCtx = useContext(AuthContext);

  const handleClick = async () => {
    setIsLoading(true);
    Navigate('/dashboard/hospitalForm')
  };

  const Navigate = useNavigate();
  const goToFindHospitals = async () => {
    Navigate('/dashboard/findHospital');
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Verifying the User
      </Typography>

      <Typography variant="body1" sx={{ mb: 5 }}>
        Want to select a different Hospital?
        <NavLink variant="subtitle2" to="/dashboard/findHospitals">
          Find Hospitals
        </NavLink>
      </Typography>

      <Stack spacing={3}>
        <TextField
          required
          name="email"
          label="Email address"
          type="email"
          // ref={emailInputRef}
          onChange={emailChangeHandler}
        />

        <TextField
          required
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          // ref={passwordInputRef}
          onChange={passwordChangeHandler}
        />
      </Stack>

      <br />
      <br />
      {/* <br/> */}
      {!isLoading && (
        <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
          Verify
        </LoadingButton>
      )}
      {isLoading && (
        <LoadingButton fullWidth size="large" type="submit" variant="contained">
          Verifying...
        </LoadingButton>
      )}
    </>
  );
}

export default SignUpForm;
