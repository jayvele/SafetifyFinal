import { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import axios from 'axios';
import HospitalCard from '../sections/Map/HospitalCard';
import SimpleMap from '../sections/Map/Map';

const FindingHospital = (props) => {
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [hospital, setHospital] = useState([]);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLat(pos.coords.latitude);
      setLng(pos.coords.longitude);
    });
  }, []);

  const options = {
    method: 'GET',
    url: 'https://nearby-places.p.rapidapi.com/nearby',
    params: {
      lat: '19.136326',
      lng: '72.82766',
      // lat,
      // lng,
      type: 'hospital',
      radius: '1000',
    },
    headers: {
      'X-RapidAPI-Key': '75c5517222mshd7fc793b84f7b78p17cc55jsn29fe66ae53bb',
      'X-RapidAPI-Host': 'nearby-places.p.rapidapi.com',
    },
  };

  const fetchHospitals = () => {
    axios
      .request(options)
      .then((response) => {
        alert("Huacuiic")
        setHospital(response.data);
      })
      .catch((error) => {
        console.error(error);
        // alert(error);
      });
  };

  return (
    <>
      <div className=" bg-blue-200">
        <h1 className="text-5xl py-5 px-20 text-gray-500 ">Finding Hospital</h1>
      </div>
      <Box sx={{ display: 'flex', justifyContent: 'flex' }}>
        <Button variant="contained" onClick={fetchHospitals} sx={{ mt: 3, ml: 1 }}>
          See Hospital List
        </Button>
      </Box>
      <div className=" my-20 flex w-full  px-20 items-center ">
        <div className="flex w-full justify-between">
          <div className="flex flex-col">
            <h1 className="text-4xl text-black">Hospital Information</h1>
            {hospital && hospital.map((h) => <HospitalCard {...h} />)}
          </div>

          {hospital && lat && lng && <SimpleMap hospital={hospital} lat={lat} lng={lng} />}
        </div>
      </div>
    </>
  );
};
export default FindingHospital;
