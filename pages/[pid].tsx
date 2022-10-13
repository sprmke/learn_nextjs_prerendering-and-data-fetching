import fs from 'fs/promises';
import path from 'path';

import {
  GetStaticPropsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { Product } from '../types';

type PageParams = {
  pid: string;
};

const ProductDetailPage = ({
  id,
  title,
  description,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <h1>{title}</h1>
      <p>{description}</p>
    </>
  );
};

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<PageParams>): Promise<
  GetStaticPropsResult<Product>
> => {
  // get dynamic page id
  const { pid } = params;

  // get the file path for dummy-backend.json file
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');

  // get and parse our dummy data
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString());
  const { products } = data;

  const product = products.find(({ id }) => id === pid);
  const { id, title, description } = product;

  return {
    props: {
      id,
      title,
      description,
    },
  };
};

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { pid: 'p1' } },
      { params: { pid: 'p2' } },
      { params: { pid: 'p3' } },
    ],
    fallback: false,
  };
};

export default ProductDetailPage;
