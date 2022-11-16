import * as React from 'react';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Box, Button } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { addPersonalDetails } from '../../Firebase/FirebaseAddData';
import AuthContext from '../../store/AuthContext';

export default function PersonalDetails(props) {
  const [userDetails, setUserDetails] = useState({});
  const [enteredName, setEnteredName] = useState('');
  const authCtx = React.useContext(AuthContext);

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const [enteredLastName, setEnteredLastName] = useState('');

  const lastNameChangeHandler = (event) => {
    setEnteredLastName(event.target.value);
  };

  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState('');

  const phoneNumberChangeHandler = (event) => {
    setEnteredPhoneNumber(event.target.value);
  };

  const [enteredDOB, setEnteredDOB] = useState('');

  const DOBChangeHandler = (event) => {
    setEnteredDOB(event.target.value);
  };

  const [enteredAddress1, setEnteredAddress1] = useState('');

  const address1ChangeHandler = (event) => {
    setEnteredAddress1(event.target.value);
  };
  const [enteredAddress2, setEnteredAddress2] = useState('');

  const address2ChangeHandler = (event) => {
    setEnteredAddress2(event.target.value);
  };

  const [enteredCity, setEnteredCity] = useState('');

  const cityChangeHandler = (event) => {
    setEnteredCity(event.target.value);
  };

  const [enteredState, setEnteredState] = useState('');

  const stateChangeHandler = (event) => {
    setEnteredState(event.target.value);
  };

  const [enteredCountry, setEnteredCountry] = useState('');

  const countryChangeHandler = (event) => {
    setEnteredCountry(event.target.value);
  };

  const [enteredPincode, setEnteredPincode] = useState('');

  const pincodeChangeHandler = (event) => {
    setEnteredPincode(event.target.value);
  };

  const addPersonalDetailsObject = {
    name: enteredName,
    lastName: enteredLastName,
    phoneNumber1: enteredPhoneNumber,
    dob: enteredDOB,
    address1: enteredAddress1,
    address2: enteredAddress2,
    city: enteredCity,
    state: enteredState,
    country: enteredCountry,
    pincode: enteredPincode,
  };

  const Navigate = useNavigate();

  const handleNext = async (event) => {
    event.preventDefault();
    const user = await axios.patch(`http://localhost:5000/api/users/${authCtx.token}`, {
      personalDetails: addPersonalDetailsObject,
    });

    Navigate('/dashboard/medicalInfo');
  };

  useEffect(() => {
    const fetchUserDetailsHandler = async () => {
      const userData = await axios.get(`http://localhost:5000/api/users/${authCtx.token}`);
      setUserDetails(userData?.data?.user?.personalDetails);
      console.log(userData);
      setEnteredName(userDetails?.name);
      setEnteredLastName(userDetails?.lastName);
      setEnteredCity(userDetails?.city);
      setEnteredState(userDetails?.state);
      setEnteredCountry(userDetails?.country);
      setEnteredAddress1(userDetails?.address1);
      setEnteredAddress2(userDetails?.address2);
      setEnteredPhoneNumber(userDetails?.phoneNumber1);
      setEnteredDOB(userDetails?.dob);
      setEnteredPincode(userDetails?.pincode);
    };

    fetchUserDetailsHandler();
  }, [authCtx.token]);

  // const fetchedName = userDetails?.name;
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Personal Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            onChange={nameChangeHandler}
            value={enteredName}
            InputLabelProps={enteredName || userDetails?.name && { shrink: true }}
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
            onChange={lastNameChangeHandler}
            value={enteredLastName}
            InputLabelProps={enteredLastName || userDetails?.lastName && { shrink: true }}
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
            onChange={phoneNumberChangeHandler}
            value={enteredPhoneNumber}
            InputLabelProps={enteredPhoneNumber || userDetails?.phoneNumber1 && { shrink: true }}
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
            onChange={DOBChangeHandler}
            value={enteredDOB}
            InputLabelProps={enteredDOB || userDetails?.dob && { shrink: true }}
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
            onChange={address1ChangeHandler}
            value={enteredAddress1}
            InputLabelProps={enteredAddress1 || userDetails?.address1 && { shrink: true }}

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
            onChange={address2ChangeHandler}
            value={enteredAddress2}
            InputLabelProps={enteredAddress2 || userDetails?.address2 && { shrink: true }}

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
            onChange={cityChangeHandler}
            value={enteredCity}
            InputLabelProps={enteredCity || userDetails?.city && { shrink: true }}

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
            onChange={stateChangeHandler}
            value={enteredState}
            InputLabelProps={enteredState || userDetails?.state && { shrink: true }}

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
            onChange={pincodeChangeHandler}
            value={enteredPincode}
            InputLabelProps={enteredPincode || userDetails?.pincode && { shrink: true }}

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
            onChange={countryChangeHandler}
            defaultValue={enteredCountry}
            InputLabelProps={enteredCountry || userDetails?.country && { shrink: true }}

          />
        </Grid>
        {/* <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid> */}
        <br />
        <br />
        {/* <br/> */}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
          Save Personal Details
        </Button>
      </Box>
    </>
  );
}
