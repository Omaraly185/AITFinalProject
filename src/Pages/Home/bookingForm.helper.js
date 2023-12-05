import { toast } from "react-toastify";

export const validateFields = (bookingForm) => {
  const requiredFields = ["name", "phoneNumber", "email"];

  for (let field of requiredFields) {
    if (!bookingForm[field]) {
      toast.error("Please fill out all the fields.");
      return false;
    }
  }

  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!emailPattern.test(bookingForm.email)) {
    toast.error("Please enter a valid email address.");
    return false;
  }

  const phonePattern = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
  if (!phonePattern.test(bookingForm.phoneNumber)) {
    toast.error("Please enter a valid phone number.");
    return false;
  }
  return true;
};
