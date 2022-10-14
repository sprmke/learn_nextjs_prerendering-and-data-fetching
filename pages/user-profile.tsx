import { GetServerSideProps, GetServerSidePropsContext } from 'next';

type User = {
  username: string;
};

const UserProfilePage = ({ username }: User) => {
  return <h1>{username}</h1>;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { params, req, res } = context;

  return {
    props: {
      username: 'Mike',
    },
  };
};

export default UserProfilePage;
