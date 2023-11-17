import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';

import { withAppProps } from '~/lib/props/with-app-props';
import RouteShell from '~/components/RouteShell';

const FundOneOverDash = dynamic(
  () => import('~/components/fundoneover/fundoneoverdash'),
  {
    ssr: false,
  }
);

const FundOneOver = () => {
  return (
    <RouteShell title={'FundOneOver'}>
      <FundOneOverDash />
    </RouteShell>
  );
};

export default FundOneOver;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAppProps(ctx);
}
