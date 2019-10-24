import { object, string, number } from 'yup';

export default object({
  city: string().required(),
  searchTerm: string(),
  email: string()
    .email('Email must be a valid email')
    .required('Email is required'),
  minPrice: number()
    .typeError('Price must be a number')
    .integer('Price must be an integer')
    .min(0, 'Price must be a positive integer'),
});
