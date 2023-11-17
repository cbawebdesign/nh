import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';

import { withAppProps } from '~/lib/props/with-app-props';
import RouteShell from '~/components/RouteShell';

const Daoftwofldash = dynamic(
  () => import('~/components/daoftwofl/daoftwofldash'),
  {
    ssr: false,
  }
);

const Daoftwofl = () => {
  return (
    <RouteShell title={'Daoftwofl'}>
      <Daoftwofldash/>
    </RouteShell>
  );
};

export default Daoftwofl;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAppProps(ctx);
}
