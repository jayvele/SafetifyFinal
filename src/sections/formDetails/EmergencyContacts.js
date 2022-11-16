import * as React from 'react';
import { useState, useContext, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/AuthContext';

export default function EmergencyContacts() {
  const Navigate = useNavigate();
  
  const authCtx = React.useContext(AuthContext);
  const [userDetails, setUserDetails] = useState({});

  const [enteredPhoneNumber1, setEnteredPhoneNumber1] = useState('');

  const phoneNumber1ChangeHandler = (event) => {
    setEnteredPhoneNumber1(event.target.value);
  };

  const [enteredPhoneNumber2, setEnteredPhoneNumber2] = useState('');

  const phoneNumber2ChangeHandler = (event) => {
    setEnteredPhoneNumber2(event.target.value);
  };

  const [enteredEmergencyEmail1, setEnteredEmergencyEmail1] = useState('');

  const emergencyEmail1ChangeHandler = (event) => {
    setEnteredEmergencyEmail1(event.target.value);
  };
  const [enteredEmergencyEmail2, setEnteredEmergencyEmail2] = useState('');

  const emergencyEmail2ChangeHandler = (event) => {
    setEnteredEmergencyEmail2(event.target.value);
  };

  const emergencyContactsObject = {
    phone1: enteredPhoneNumber1,
    phone2: enteredPhoneNumber2,
    emergencyEmail1: enteredEmergencyEmail1,
    emergencyEmail2: enteredEmergencyEmail2,
  };

  const handleNext = async (event) => {
    event.preventDefault();
    const user = await axios.patch(`http://localhost:5000/api/users/${authCtx.token}`, {emergencyContacts: emergencyContactsObject});

    Navigate('/dashboard/app');
  };

  useEffect(() => {
    const fetchUserDetailsHandler = async () => {
      const userData = await axios.get(`http://localhost:5000/api/users/${authCtx.token}`);
      setUserDetails(userData?.data?.user?.emergencyContacts);
      console.log(userData);
    };

    fetchUserDetailsHandler();
  }, [authCtx.token]);

  const handleBack = () => {
    Navigate('/dashboard/medicalInfo');
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            id="EP1"
            label="Emergency Phone 1"
            fullWidth
            autoComplete="Phone 1"
            variant="standard"
            type="number"
            onChange={phoneNumber1ChangeHandler}
            value = {enteredPhoneNumber1}
            InputLabelProps={(enteredPhoneNumber1 || userDetails?.phone1) && { shrink: true }}

          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="EP2"
            label="Emergency Phone 2"
            fullWidth
            autoComplete="Phone 2"
            variant="standard"
            type="number"
            onChange={phoneNumber2ChangeHandler}
            value = {enteredPhoneNumber2}
            InputLabelProps={(enteredPhoneNumber2 || userDetails?.phone2) && { shrink: true }}


          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="EM1"
            label="Emergency Email 1"
            fullWidth
            autoComplete="Email 1"
            variant="standard"
            type="email"
            onChange={emergencyEmail1ChangeHandler}
            value = {enteredEmergencyEmail1}
            InputLabelProps={(enteredEmergencyEmail1 || userDetails?.emergencyEmail1) && { shrink: true }}

          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="EM2"
            label="Emergency Email 2"
            fullWidth
            autoComplete="Email 2"
            variant="standard"
            type="email"
            onChange={emergencyEmail2ChangeHandler}
            value = {enteredEmergencyEmail2}
            InputLabelProps={(enteredEmergencyEmail2 || userDetails?.emergencyEmail2) && { shrink: true }}

          />
        </Grid>
        {/* <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid> */}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
          Back
        </Button>

        <Button variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
          Save Emergency Contacts
        </Button>
      </Box>
    </>
  );
}
