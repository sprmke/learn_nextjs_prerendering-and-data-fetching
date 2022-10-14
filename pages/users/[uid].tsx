import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

const UserIdPage = ({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <h1>{id}</h1>;
};

export default UserIdPage;

export const getServerSideProps = ({ params }: GetServerSidePropsContext) => {
  const { uid: userId } = params;

  console.log('Server-side code!');

  return {
    props: {
      id: `userid-${userId}`,
    },
  };
};
