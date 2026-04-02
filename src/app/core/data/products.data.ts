import { Product } from '../models';

export const PRODUCTS: Product[] = [
  {
    id: 'pro-chicken-500',
    title: 'Cat Energy Pro 500 g',
    weight: '500 g',
    taste: 'Chicken',
    price: 7,
    size: 'small',
    image: {
      base: 'chicken-small',
      alt: 'Cat Energy Pro 500g with chicken',
    },
  },
  {
    id: 'pro-chicken-1000',
    title: 'Cat Energy Pro 1000 g',
    weight: '1000 g',
    taste: 'Chicken',
    size: 'big',
    price: 10,
    image: {
      base: 'chicken-big',
      alt: 'Cat Energy Pro 1000g with chicken',
    },
  },
  {
    id: 'pro-fish-500',
    title: 'Cat Energy Pro 500 g',
    weight: '500 g',
    taste: 'Fish',
    price: 7,
    size: 'small',
    image: {
      base: 'fish-small',
      alt: 'Cat Energy Pro 500g with fish',
    },
  },
  {
    id: 'pro-fish-1000',
    title: 'Cat Energy Pro 1000 g',
    weight: '1000 g',
    taste: 'Fish',
    price: 15,
    size: 'big',
    image: {
      base: 'fish-big',
      alt: 'Cat Energy Pro 1000g with fish',
    },
  },
  {
    id: 'slim-buckwheat-500',
    title: 'Cat Energy Slim 500 g',
    weight: '500 g',
    taste: 'Buckwheat',
    price: 4,
    size: 'small',
    image: {
      base: 'buckwheat-small',
      alt: 'Cat Energy Slim 500g with buckwheat',
    },
  },
  {
    id: 'slim-buckwheat-1000',
    title: 'Cat Energy Slim 1000 g',
    weight: '1000 g',
    taste: 'Buckwheat',
    price: 7,
    size: 'small',
    image: {
      base: 'buckwheat-big',
      alt: 'Cat Energy Slim 1000g with buckwheat',
    },
  },
  {
    id: 'slim-rice-500',
    title: 'Cat Energy Slim 500 g',
    weight: '500 g',
    taste: 'Rice',
    price: 5,
    size: 'small',
    image: {
      base: 'rice-small',
      alt: 'Cat Energy Slim 500g with rice',
    },
  },
];
