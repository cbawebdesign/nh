import configuration from '~/configuration';
import { Cog8ToothIcon, MagnifyingGlassPlusIcon, Squares2X2Icon } from '@heroicons/react/24/outline';

const NAVIGATION_CONFIG = {
  items: [


    {
      label: 'common:daofonefllabel',
      path: '/daofonefl',
      Icon: ({ className }: { className: string }) => {
        return <MagnifyingGlassPlusIcon className={className} />;
      },
    },
    {
      label: 'common:daofonelabel',
      path: '/daofone',
      Icon: ({ className }: { className: string }) => {
        return <MagnifyingGlassPlusIcon className={className} />;
      },
    },
    {
      label: 'common:daoftwofllabel',
      path: '/daoftwofl',
      Icon: ({ className }: { className: string }) => {
        return <MagnifyingGlassPlusIcon className={className} />;
      },
    },
    {
      label: 'common:daoftwolabel',
      path: '/daoftwo',
      Icon: ({ className }: { className: string }) => {
        return <MagnifyingGlassPlusIcon className={className} />;
      },
    },
    {
      label: 'common:daftwofllabel',
      path: '/fundone',
      Icon: ({ className }: { className: string }) => {
        return <MagnifyingGlassPlusIcon className={className} />;
      },
    },
    {
      label: 'common:daftwolabel',
      path: '/daftwo',
      Icon: ({ className }: { className: string }) => {
        return <MagnifyingGlassPlusIcon className={className} />;
      },
    },

    {
      label: 'common:settingsTabLabel',
      path: '/settings',
      Icon: ({ className }: { className: string }) => {
        return <Cog8ToothIcon className={className} />;
      },
    },
 
  ],
};

export default NAVIGATION_CONFIG;
