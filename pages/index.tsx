import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import fs from 'fs/promises';
import path from 'path';

const HomePage = ({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <ul>
      {products.map(({ id, title }) => (
        <li key={id}>{title}</li>
      ))}
    </ul>
  );
};

type PageParams = {
  id: string;
};

export const getStaticProps = async (
  context: GetStaticPropsContext<PageParams>
) => {
  console.log('(Re-)Generating...');

  const { params, preview, previewData, locale, locales, defaultLocale } =
    context;

  // get the file path for dummy-backend.json file
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');

  // get and parse our dummy data
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString());

  if (data) {
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
      products: data.products,
    },
    revalidate: 10,
  };
};

export default HomePage;
