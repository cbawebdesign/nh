import Heading from '~/core/ui/Heading';
import If from '~/core/ui/If';
import classNames from 'clsx';

const SettingsTile: React.FCC<{
  heading?: string | React.ReactNode;
  subHeading?: string | React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}> = ({ children, heading, subHeading, actions, className }) => {
  return (
    <div className={classNames('flex flex-col space-y-4', className)}>
      <div className={'flex flex-col space-y-0.5'}>
        <div
          className={
            'flex flex-col space-y-4 lg:flex-row lg:space-y-0' +
            ' lg:items-center lg:justify-between'
          }
        >
          <If condition={heading}>
            <Heading type={4}>
              <span className={'font-medium'}>{heading}</span>
            </Heading>
          </If>

          <If condition={actions}>
            <div>{actions}</div>
          </If>
        </div>

        <If condition={subHeading}>
          <Heading type={6}>
            <span className={'text-gray-500 dark:text-gray-400 font-normal'}>
              {subHeading}
            </span>
          </Heading>
        </If>
      </div>

      <div
        className={
          'rounded-lg border border-gray-50 p-2.5 dark:border-dark-800 lg:p-6 shadow-sm'
        }
      >
        {children}
      </div>
    </div>
  );
};

export default SettingsTile;
