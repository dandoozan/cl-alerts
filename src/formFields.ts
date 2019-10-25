import { object, string, number, boolean } from 'yup';
import cities from './data/cities.json';

export const schema = object({
  city: string().required(),
  searchTerm: string(),
  titleOnly: boolean(),
  minPrice: number()
    .typeError('Price must be a number')
    .integer('Price must be an integer')
    .min(0, 'Price must be a positive integer'),
  email: string()
    .email('Email must be a valid email')
    .required('Email is required'),
});

//todo: figure out how to get default values from the yup schema (so that I only
//have to define the form fields in one place)
export const defaultValues = {
  city: cities[0],
  searchTerm: '',
  titleOnly: false,
  minPrice: '',
  email: '',
};
