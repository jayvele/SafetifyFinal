import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import { Box, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/AuthContext';


export default function MedicalDetails() {
  const Navigate = useNavigate();
  
  const authCtx = React.useContext(AuthContext);
  const [userDetails, setUserDetails] = useState({});

  const [enteredBloodGroup, setEnteredBloodGroup] = useState('');

  const bloodGroupChangeHandler = (event) => {
    setEnteredBloodGroup(event.target.value);
  };
  const [enteredGender, setEnteredGender] = useState('');

  const genderChangeHandler = (event) => {
    setEnteredGender(event.target.value);
  };
  const [enteredMedication, setEnteredMedication] = useState('');

  const medicationChangeHandler = (event) => {
    setEnteredMedication(event.target.value);
  };
  const [enteredDisease, setEnteredDisease] = useState('');

  const diseaseChangeHandler = (event) => {
    setEnteredDisease(event.target.value);
  };

  const [enteredAllergy, setEnteredAllergy] = useState('');

  const allergyChangeHandler = (event) => {
    setEnteredAllergy(event.target.value);
  };

  const [enteredPregnancy, setEnteredPregnancy] = useState('');

  const pregnancyChangeHandler = (event) => {
    setEnteredPregnancy(event.target.value);
  };

  const [enteredSurgery, setEnteredSurgery] = useState('');

  const surgeryChangeHandler = (event) => {
    setEnteredSurgery(event.target.value);
  };

  const medicalDetailsObject = {
    bloodGroup: enteredBloodGroup,
    gender: enteredGender,
    medication: enteredMedication,
    disease: enteredDisease,
    allergy: enteredAllergy,
    surgery: enteredSurgery,
    pregnancy: enteredPregnancy,
  }

  const handleNext = async (event) => {
    event.preventDefault();
    const user = await axios.patch(`http://localhost:5000/api/users/${authCtx.token}`, {medicalDetails: medicalDetailsObject});

    Navigate('/dashboard/emergencyContacts');
  };

  useEffect(() => {
    const fetchUserDetailsHandler = async () => {
      const userData = await axios.get(`http://localhost:5000/api/users/${authCtx.token}`);
      setUserDetails(userData?.data?.user?.medicalDetails);
      console.log(userData);
    };

    fetchUserDetailsHandler();
  }, [authCtx.token]);

  const handleBack = () => {
    Navigate('/dashboard/personalInfo');
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Medical Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="bloodGroup"
            name="bloodGroup"
            label="Blood Group"
            fullWidth
            variant="standard"
            onChange={bloodGroupChangeHandler}
            value = {enteredBloodGroup}
            InputLabelProps={(enteredBloodGroup || userDetails?.bloodGroup) && { shrink: true }}

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="gender"
            name="gender"
            label="Gender"
            fullWidth
            variant="standard"
            onChange={genderChangeHandler}
            value = {enteredGender}
            InputLabelProps={(enteredGender || userDetails?.gender) && { shrink: true }}


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
            onChange={medicationChangeHandler}
            value = {enteredMedication}
            InputLabelProps={(enteredMedication || userDetails?.medication) && { shrink: true }}


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
            onChange={diseaseChangeHandler}
            value = {enteredDisease}
            InputLabelProps={(enteredDisease || userDetails?.disease) && { shrink: true }}


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
            onChange={allergyChangeHandler}
            value = {enteredAllergy}
            InputLabelProps={(enteredAllergy || userDetails?.allergy) && { shrink: true }}


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
            onChange={surgeryChangeHandler}
            value = {enteredSurgery}
            InputLabelProps={(enteredSurgery || userDetails?.surgery) && { shrink: true }}


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
            onChange={pregnancyChangeHandler}
            value = {enteredPregnancy}
            InputLabelProps={(enteredPregnancy || userDetails?.pregnancy) && { shrink: true }}


          />
        </Grid>

        {/* <Grid item xs={12} sm={6}>
          <TextField
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
          />
        </Grid> */}

        {/* <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid> */}
      </Grid>
      <br />
      <br />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
          Back
        </Button>

        <Button variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
          Save Medical Details
        </Button>
      </Box>
    </>
  );
}
