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
    <header>
      <nav>
        <div className='navbarcontainer'>
          <a className='nav-login' href='/login'>
            Hexlet Chat
          </a>
          {isLogin && (
            <button type='button' onClick={authContext.logout}>
              {t('nav.exit')}
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};
