import { GetServerSidePropsContext } from 'next';
import { withAppProps } from '~/lib/props/with-app-props';
import RouteShell from '~/components/RouteShell';
import TasksContainer from '~/components/tasks/TasksContainer';
import { useCurrentOrganization } from '~/lib/organizations/hooks/use-current-organization';

const Tasks = () => {
  const organization = useCurrentOrganization();

  if (!organization) {
    return null;
  }

  return (
    <RouteShell
      title={'Tasks'}
      description={`Manage your Tasks and never lose track of your work.`}
    >
      <TasksContainer organizationId={organization.id} />
    </RouteShell>
  );
};

export default Tasks;

export function getServerSideProps(ctx: GetServerSidePropsContext) {
  return withAppProps(ctx);
}
