import fs from 'fs/promises';
import path from 'path';
import { Product } from '../types';

export const getProducts = async () => {
  // get the file path for dummy-backend.json file
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');

  // get and parse our dummy data
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString());

  const { products = [] }: { products: Product[] } = data ?? {};

  return products;
};
