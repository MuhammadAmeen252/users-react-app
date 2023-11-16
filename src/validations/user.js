import * as Yup from "yup";

export const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
});

export const userValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    address1: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    country: Yup.string().required('Country is required'),
    role: Yup.string().required('Role is required'),
    phone: Yup.string().matches(
        /^(?:0|\+92)(\d{10})$/,
        'Invalid phone number. Please enter a valid Pakistan phone number.'
      ).required('Phone number is required'),
  });