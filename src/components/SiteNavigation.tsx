import Link from 'next/link';
import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon';

import NavigationMenuItem from '~/core/ui/Navigation/NavigationItem';
import NavigationMenu from '~/core/ui/Navigation/NavigationMenu';

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuTrigger,
} from '~/core/ui/Dropdown';

const links = {
  SignIn: {
    label: 'Sign In',
    path: '/auth/sign-in',
  }

};

const SiteNavigation = () => {
  return (
    <>
      <div className={'hidden items-center lg:flex'}>
        <NavigationMenu>
          <NavigationMenuItem
            className={'flex lg:hidden'}
            link={links.SignIn}
          />

        </NavigationMenu>
      </div>

      <div className={'ml-4 flex items-center lg:hidden'}>
        <MobileDropdown />
      </div>
    </>
  );
};

function MobileDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger aria-label={'Open Menu'}>
        <Bars3Icon className={'h-9'} />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {Object.values(links).map((item) => {
          const className = 'flex w-full h-full items-center';

          return (
            <DropdownMenuItem key={item.path}>
              <Link className={className} href={item.path}>
                {item.label}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SiteNavigation;
