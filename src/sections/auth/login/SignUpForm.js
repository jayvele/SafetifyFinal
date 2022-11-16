import { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
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
    let url;

    if (isLogin) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBH4utT-V46VjcbX8TEruOrO1ABPvZjhBw';
      try {
        const res = await fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecrueToken: true,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setIsLoading(false);
        if (res.ok) {
          const data = await res.json();
          authCtx.login(data.idToken);
          console.log(data.idToken);
          const user = await axios.patch(`http://localhost:5000/api/users/login`, {email: enteredEmail, idToken: data.idToken});

          navigate('/dashboard/app');
          // ...
        }
      } catch (err) {
        console.log(err);
      }

      // alert(errorMessage);
    } else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBH4utT-V46VjcbX8TEruOrO1ABPvZjhBw';
      try {
        const res = await fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecrueToken: true,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setIsLoading(false);
        if (res.ok) {
          const data = await res.json();
          authCtx.login(data.idToken);
          console.log(data.idToken);
          const user = await axios.post(`http://localhost:5000/api/users/signup`, {email: enteredEmail, idToken: data.idToken});
          navigate('/dashboard/app');
          // ...
        }
      } catch (err) {
        console.log(err);
      }
      // console.log(enteredEmail + enteredPassword);
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        {!isLogin ? 'Sign Up on Safetify' : 'Login to Safetify'}
      </Typography>

      <Typography variant="body1" sx={{ mb: 5 }}>
        {!isLogin ? 'Have an account?  ' : "Don't have an account?  "}
        <NavLink variant="subtitle2" onClick={switchAuthModeHandler}>
          {!isLogin ? 'Login' : 'Sign Up'}
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

      {/* <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack> */}
      <br />
      <br />
      {/* <br/> */}
      {!isLoading && (
        <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
          {!isLogin ? 'Register' : 'Log In'}
        </LoadingButton>
      )}
      {isLoading && (
        <LoadingButton fullWidth size="large" type="submit" variant="contained">
          {!isLogin ? 'Signing Up...' : 'Logging In...'}
        </LoadingButton>
      )}
    </>
  );
}

export default SignUpForm;
