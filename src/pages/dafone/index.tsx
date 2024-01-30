import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';

import { withAppProps } from '~/lib/props/with-app-props';
import RouteShell from '~/components/RouteShell';

const Dafonedash = dynamic(
  () => import('~/components/dafonefl/dafonefl'),
  {
    ssr: false,
  }
);

const Dafonefl = () => {
  return (
    <RouteShell title={'DAFONE'}>
      <Dafonedash/>
    </RouteShell>
  );
};

export default Dafonefl;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAppProps(ctx);
}
