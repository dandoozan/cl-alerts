import { object, string } from 'yup';

export default object({
  city: string().required(),
  searchTerm: string(),
  email: string()
    .email('Email must be a valid email')
    .required('Email is required'),
});
