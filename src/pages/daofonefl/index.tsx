import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';

import { withAppProps } from '~/lib/props/with-app-props';
import RouteShell from '~/components/RouteShell';

const Daofonefldash = dynamic(
  () => import('~/components/daofonefl/daofonefldash'),
  {
    ssr: false,
  }
);

const Daofonefl = () => {
  return (
    <RouteShell title={'Daofonefl'}>
      <Daofonefldash/>
    </RouteShell>
  );
};

export default Daofonefl;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAppProps(ctx);
}
