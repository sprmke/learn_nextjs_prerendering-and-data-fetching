import {
  GetStaticPropsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { getProducts } from '../lib/products';
import { Product } from '../types';

type PageParams = {
  pid: string;
};

const ProductDetailPage = ({
  id,
  title,
  description,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!id) {
    return <p>Loading...</p>;
  }

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

  // get products
  const products = await getProducts();

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

export const getStaticPaths = async () => {
  const products = await getProducts();
  const productPaths = products.map((product: Product) => ({
    params: { pid: product.id },
  }));

  return {
    paths: productPaths,
    fallback: true,
  };
};

export default ProductDetailPage;
