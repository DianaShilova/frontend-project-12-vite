import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../contexts/authContext';
import { DarkModeToggle } from './DarkModeToggle';

interface Props {
  isLogin: boolean;
}
export const Navbar = (props: Props) => {
  const { isLogin } = props;
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);

  return (
    <header className='dark:border-[1px] dark:border-slate-700 dark:bg-slate-800 shadow-xl shadow-slate-500/20 m-[0px] sm:mx-[24px] mt-1'>
      <nav className='px-4 w-full'>
        <div className='flex justify-between items-center py-2 max-w-7xl mx-auto'>
          <a
            className='text-base sm:text-xl no-underline font-bold text-blue-800 dark:text-blue-200 hover:text-gray-600'
            href='/frontend-project-12-vite/login'
          >
            Hexlet Chat
          </a>
          <div className='flex items-center space-x-4'>
            <DarkModeToggle />
            {isLogin && (
              <button
                type='button'
                onClick={authContext.logout}
                className='px-4 py-2 bg-blue-500 dark:bg-blue-800 text-white rounded hover:bg-blue-600 transition-colors'
              >
                {t('nav.exit')}
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
