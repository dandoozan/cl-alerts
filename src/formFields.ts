import { object, string, number, boolean } from 'yup';
import cities from './data/cities.json';
import categories from './data/categories.json';

export const schema = object({
  city: string().required(),
  category: string().required(),
  searchTerm: string(),
  titleOnly: boolean(),
  minPrice: number()
    .typeError('Price must be a number')
    .integer('Price must be an integer')
    .min(0, 'Price must be a positive integer'),
  maxPrice: number()
    .typeError('Price must be a number')
    .integer('Price must be an integer')
    .min(0, 'Price must be a positive integer'),
  picOnly: boolean(),
  email: string()
    .email('Email must be a valid email')
    .required('Email is required'),
});

//todo: figure out how to get default values from the yup schema (so that I only
//have to define the form fields in one place)
export const defaultValues = {
  city: cities[0],
  category: categories[0],
  searchTerm: '',
  titleOnly: false,
  minPrice: '',
  maxPrice: '',
  picOnly: false,
  days: [0, 1, 2, 3, 4, 5, 6], //todo: colocate this with "everyDay" radio button
  hours: [3, 7, 11, 15, 19, 23], //todo: colocate this with "everyFourHours" radio button
  email: '',
};
