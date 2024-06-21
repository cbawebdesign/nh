import configuration from '~/configuration';

import {
  CreditCardIcon,
  Squares2X2Icon,
  UserGroupIcon,
  UserIcon,
  ArchiveBoxArrowDownIcon,
  ClipboardDocumentIcon,
  NewspaperIcon,
  ChevronRightIcon,
  ShieldCheckIcon,
  ChatBubbleBottomCenterIcon,
  MapIcon,
  ChartBarIcon,
  CogIcon
  

} from '@heroicons/react/24/outline';

type Divider = {
  divider: true;
};

type NavigationItemLink = {
  label: string;
  path: string;
  Icon: (props: { className: string }) => JSX.Element;
  end?: boolean;
};

type NavigationGroup = {
  label: string;
  collapsible?: boolean;
  collapsed?: boolean;
  children: NavigationItemLink[];
};

type NavigationItem = NavigationItemLink | NavigationGroup | Divider;

type NavigationConfig = {
  items: NavigationItem[];
};

const NAVIGATION_CONFIG: NavigationConfig = {
  items: [
    {
      label: 'common:dashboardTabLabel',
      path: '/dashboard',
      Icon: ({ className }: { className: string }) => {
        return <ChartBarIcon className={className} />;
      },
    },
    {
      label: 'common:CommunicationsLabel',
      path: '/communication',
      Icon: ({ className }: { className: string }) => {
        return <CogIcon className={className} />;
      },
    },
    {
      label: 'common:DistributionsLabel',
      path: '/distributions',
      Icon: ({ className }: { className: string }) => {
        return <ArchiveBoxArrowDownIcon className={className} />;
      },
    },

  
  
    {
      label: 'common:settingsTabLabel',
      collapsible: false,
      children: [
        {
          label: 'common:profileSettingsTabLabel',
          path: configuration.paths.settings.profile,
          Icon: ({ className }: { className: string }) => {
            return <UserIcon className={className} />;
          },
        },
     
        {
          label: 'common:AuthTabLabel',
          path: configuration.paths.settings.authentication,
          Icon: ({ className }: { className: string }) => {
            return <ShieldCheckIcon className={className} />;
          },
        },
      ],
    },
  ],
};

export default NAVIGATION_CONFIG;
