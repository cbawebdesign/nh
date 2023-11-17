import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';

import { withAppProps } from '~/lib/props/with-app-props';
import RouteShell from '~/components/RouteShell';

const Daoftwodash = dynamic(
  () => import('~/components/daoftwo/daoftwodash'),
  {
    ssr: false,
  }
);

const Daoftwo = () => {
  return (
    <RouteShell title={'Daoftwo'}>
      <Daoftwodash/>
    </RouteShell>
  );
};

export default Daoftwo;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAppProps(ctx);
}
