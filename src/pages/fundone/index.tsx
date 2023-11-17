import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';

import { withAppProps } from '~/lib/props/with-app-props';
import RouteShell from '~/components/RouteShell';

const FundOneDash = dynamic(
  () => import('~/components/fundone/fundonedash'),
  {
    ssr: false,
  }
);

const FundOne = () => {
  return (
    <RouteShell title={'FundOne'}>
      <FundOneDash />
    </RouteShell>
  );
};

export default FundOne;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAppProps(ctx);
}
