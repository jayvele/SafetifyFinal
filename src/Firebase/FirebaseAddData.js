import { collection, addDoc } from "firebase/firestore";
import { db } from "./Firebase";

export async function addPersonalDetails(data) {
  console.log(data);
  addDoc(collection(db, "personalInfo"), {
    name: data.name,
    lastName: data.lastName,
    phoneNumber: data.phoneNumber,
    address1: data.address1,
    address2: data.address2,
    city: data.city,
    state: data.state,
    country: data.country,
    pincode: data.pincode,
  });
}
