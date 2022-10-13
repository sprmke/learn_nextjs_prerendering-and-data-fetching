import fs from 'fs/promises';
import Link from 'next/link';
import path from 'path';
import { Product } from '../types';

const HomePage = ({ products }: { products: Product[] }) => {
  if (!products) {
    return <p>No Products Found</p>;
  }

  return (
    <ul>
      {products?.map(({ id, title }) => (
        <li key={id}>
          <Link href={id}>{title}</Link>
        </li>
      ))}
    </ul>
  );
};

export const getStaticProps = async () => {
  console.log('(Re-)Generating...');

  // get the file path for dummy-backend.json file
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');

  // get and parse our dummy data
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString());
  const { products = [] } = data;

  if (!data) {
    return {
      redirect: {
        destination: '/not-found',
      },
    };
  }

  if (data.products.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      products,
    },
    revalidate: 10,
  };
};

export default HomePage;
