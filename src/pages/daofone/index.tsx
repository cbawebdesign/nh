import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';

import { withAppProps } from '~/lib/props/with-app-props';
import RouteShell from '~/components/RouteShell';

const Daofonedash = dynamic(
  () => import('~/components/daofone/daofonedash'),
  {
    ssr: false,
  }
);

const Daofone = () => {
  return (
    <RouteShell title={'Daofone'}>
      <Daofonedash/>
    </RouteShell>
  );
};

export default Daofone;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAppProps(ctx);
}
