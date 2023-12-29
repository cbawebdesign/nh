import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';

import { withAppProps } from '~/lib/props/with-app-props';
import RouteShell from '~/components/RouteShell';

const Daftwolfdash = dynamic(
  () => import('~/components/daftwolf/daftwolfdash'),
  {
    ssr: false,
  }
);

const Daftwolf = () => {
  return (
    <RouteShell title={'Daftwolf'}>
      <Daftwolfdash/>
    </RouteShell>
  );
};

export default Daftwolf;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAppProps(ctx);
}
