import { GetServerSideProps } from 'next';

type User = {
  username: string;
};

const UserProfilePage = ({ username }: User) => {
  return <h1>{username}</h1>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      username: 'Mike',
    },
  };
};

export default UserProfilePage;
