import { GetStaticProps, InferGetStaticPropsType } from 'next';

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

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      products: [{ id: 'p1', title: 'Product 1' }],
    },
  };
};

export default HomePage;
