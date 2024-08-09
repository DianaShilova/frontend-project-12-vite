import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../contexts/authContext';

interface Props {
  isLogin: boolean;
}
export const Navbar = (props: Props) => {
  const { isLogin } = props;
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);

  return (
    <header className='bg-white shadow m-[0px] sm:mx-[24px] mt-1'>
      <nav className='px-4 w-full'>
        <div className='flex justify-between items-center py-2 max-w-7xl mx-auto'>
          <a
            className='text-xl no-underline font-bold text-blue-800 hover:text-gray-600'
            href='/login'
          >
            Hexlet Chat
          </a>
          {isLogin && (
            <button
              type='button'
              onClick={authContext.logout}
              className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
            >
              {t('nav.exit')}
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};
