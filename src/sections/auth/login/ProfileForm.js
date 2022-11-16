import { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import AuthContext from '../../../store/AuthContext';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [enteredPassword, setEnteredPassword] = useState('');

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };
  const [enteredConfirmPassword, setEntertedConfirmPassword] = useState('');

  const confirmPasswordChangeHandler = (event) => {
    setEntertedConfirmPassword(event.target.value);
  };

  const authCtx = useContext(AuthContext);

  const handleClick = (event) => {
    event.preventDefault();
    setIsLoading(true);

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBH4utT-V46VjcbX8TEruOrO1ABPvZjhBw', {
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enteredPassword,
        returnSecureToken: false,
      }),
      headers: {
        'Content-Type': 'application/JSON',
      },
    }).then(res => {
      // works
      setIsLoading(false);
      navigate("/dashboard/app");
    })
  };
  return (
    <>
      <Stack spacing={3}>
        {/* <TextField required name="email" label="Email address" type="email" /> */}

        <TextField
          required
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange= {passwordChangeHandler}
          InputProps={{
            
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* <TextField
          required
          name="confirm-password"
          label="Confirm Password"
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
        /> */}
      </Stack>

      <br />
      <br />
      {!isLoading && (
        <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
          Change Password
        </LoadingButton>
      )}
      {isLoading && (
        <LoadingButton fullWidth size="large" type="submit" variant="contained">
          Changing Password....
        </LoadingButton>
      )}
    </>
  );
}
