import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import AuthContext from '../store/AuthContext';

const theme = createTheme();

const HospitalForm = () => {
  const [userDetails, setUserDetails] = useState({});
  const [userDetails2, setUserDetails2] = useState({});

  const authCtx = React.useContext(AuthContext);
  const Navigate = useNavigate();

  const handleClick = () => {
    Navigate('/dashboard/app');

  }

  useEffect(() => {
    const fetchUserDetailsHandler = async () => {
      const userData = await axios.get(`http://localhost:5000/api/users/${authCtx.token}`);
      setUserDetails(userData?.data?.user?.personalDetails);
      setUserDetails2(userData?.data?.user?.medicalDetails);

      console.log(userData);
    };

    fetchUserDetailsHandler();
  }, [authCtx.token]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h4" color="inherit" noWrap>
            Safetify
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h5" align="center">
            Patient Admittance Form
          </Typography>

          <>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="firstName"
                  name="firstName"
                  label="First name"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  // onChange={nameChangeHandler}
                  value={userDetails?.name}
                  InputLabelProps={userDetails?.name || (userDetails?.name && { shrink: true })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="lastName"
                  name="lastName"
                  label="Last name"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                  // onChange={lastNameChangeHandler}
                  value={userDetails?.lastName}
                  InputLabelProps={userDetails?.lastName || (userDetails?.lastName && { shrink: true })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="phone"
                  name="phone"
                  label="Phone Number"
                  fullWidth
                  autoComplete="phone number"
                  variant="standard"
                  // onChange={phoneNumberChangeHandler}
                  value={userDetails?.phoneNumber}
                  InputLabelProps={userDetails?.phoneNumber1 && { shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="DOB"
                  name="DOB"
                  label="Date of Birth"
                  type="date"
                  fullWidth
                  autoComplete="DOB"
                  variant="standard"
                  // onChange={DOBChangeHandler}
                  value={userDetails?.dob}
                  InputLabelProps={userDetails?.dob && { shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="address1"
                  name="address1"
                  label="Address line 1"
                  fullWidth
                  autoComplete="shipping address-line1"
                  variant="standard"
                  // onChange={address1ChangeHandler}
                  value={userDetails?.address1}
                  InputLabelProps={userDetails?.address1 && { shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="address2"
                  name="address2"
                  label="Address line 2"
                  fullWidth
                  autoComplete="shipping address-line2"
                  variant="standard"
                  // onChange={address2ChangeHandler}
                  value={userDetails?.address2}
                  InputLabelProps={userDetails?.address2 && { shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="city"
                  name="city"
                  label="City"
                  fullWidth
                  autoComplete="shipping address-level2"
                  variant="standard"
                  // onChange={cityChangeHandler}
                  value={userDetails?.city}
                  InputLabelProps={userDetails?.city && { shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="state"
                  name="state"
                  label="State/Province/Region"
                  fullWidth
                  variant="standard"
                  // onChange={stateChangeHandler}
                  value={userDetails?.state}
                  InputLabelProps={userDetails?.state && { shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="zip"
                  name="zip"
                  label="Zip / Postal code"
                  fullWidth
                  autoComplete="shipping postal-code"
                  variant="standard"
                  // onChange={pincodeChangeHandler}
                  value={userDetails?.pincode}
                  InputLabelProps={userDetails?.pincode && { shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="country"
                  name="country"
                  label="Country"
                  fullWidth
                  autoComplete="country"
                  variant="standard"
                  // onChange={countryChangeHandler}
                  value={userDetails?.country}
                  InputLabelProps={userDetails?.country && { shrink: true }}
                />
              </Grid>

              <br />
              <br />
              <br />
              <Grid item xs={12} sm={6}>
                <TextField
                  id="bloodGroup"
                  name="bloodGroup"
                  label="Blood Group"
                  fullWidth
                  variant="standard"
                  // onChange={bloodGroupChangeHandler}
                  value={userDetails2?.bloodGroup}
                  InputLabelProps={userDetails2?.bloodGroup && { shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="gender"
                  name="gender"
                  label="Gender"
                  fullWidth
                  variant="standard"
                  // onChange={genderChangeHandler}
                  value={userDetails2?.gender}
                  InputLabelProps={userDetails2?.gender && { shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="Medication"
                  name="Medication"
                  label="Any Current Medication?"
                  fullWidth
                  autoComplete="medication"
                  variant="standard"
                  // onChange={medicationChangeHandler}
                  value={userDetails2?.medication}
                  InputLabelProps={userDetails2?.medication && { shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="Disease"
                  name="Disease"
                  label="Any Hereditary Disease?"
                  fullWidth
                  autoComplete="disease"
                  variant="standard"
                  // onChange={diseaseChangeHandler}
                  value={userDetails2?.disease}
                  InputLabelProps={userDetails2?.disease && { shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="Allergy"
                  name="Allergy"
                  label="Any Allergy?"
                  fullWidth
                  autoComplete="allergy"
                  variant="standard"
                  // onChange={allergyChangeHandler}
                  value={userDetails2?.allergy}
                  InputLabelProps={userDetails2?.allergy && { shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="Surgery"
                  name="Surgery"
                  label="Any Major Surgeries?"
                  fullWidth
                  autoComplete="surgery"
                  variant="standard"
                  // onChange={surgeryChangeHandler}
                  value={userDetails2?.surgery}
                  InputLabelProps={userDetails2?.surgery && { shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="preggo"
                  name="preggo"
                  label="If you are a female, are you pregnant?"
                  fullWidth
                  autoComplete="DOB"
                  variant="standard"
                  // onChange={pregnancyChangeHandler}
                  value={userDetails2?.pregnancy}
                  InputLabelProps={userDetails2?.pregnancy && { shrink: true }}
                />
              </Grid>
            </Grid>
          </>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button sx={{ mt: 3, ml: 1 }}>Back</Button>

            <Button variant="contained" sx={{ mt: 3, ml: 1 }} onClick={handleClick}>
              Home Page
            </Button>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default HospitalForm;
