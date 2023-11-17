import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';

import { withAppProps } from '~/lib/props/with-app-props';
import RouteShell from '~/components/RouteShell';

const Daftwodash = dynamic(
  () => import('~/components/daftwo/daftwodash'),
  {
    ssr: false,
  }
);

const Daftwo = () => {
  return (
    <RouteShell title={'Daftwo'}>
      <Daftwodash/>
    </RouteShell>
  );
};

export default Daftwo;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAppProps(ctx);
}
