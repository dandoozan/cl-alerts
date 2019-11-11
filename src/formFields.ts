import { object, string, number, boolean } from 'yup';
import cities from './data/cities.json';
import categories from './data/categories.json';

export const schema = object({
  city: string().required('Please select a city'),
  category: string().required('Please select a category'),
  searchTerm: string(),
  titleOnly: boolean(),
  minPrice: number()
    .typeError('Please enter an integer greater than or equal to 0')
    .integer('Please enter an integer greater than or equal to 0')
    .min(0, 'Please enter an integer greater than or equal to 0'),
  maxPrice: number()
    .typeError('Please enter an integer greater than 0')
    .integer('Please enter an integer greater than 0')
    .min(1, 'Please enter an integer greater than 0'),
  picOnly: boolean(),
  email: string()
    .email('Please enter a valid email')
    .required('Please enter a valid email'),
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
