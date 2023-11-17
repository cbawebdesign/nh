import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';

import { withAppProps } from '~/lib/props/with-app-props';
import RouteShell from '~/components/RouteShell';

const Daftwofldash = dynamic(
  () => import('~/components/daftwofl/daftwofldash'),
  {
    ssr: false,
  }
);

const Daftwofl = () => {
  return (
    <RouteShell title={'Daftwofl'}>
      <Daftwofldash/>
    </RouteShell>
  );
};

export default Daftwofl;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAppProps(ctx);
}
