import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../contexts/authContext';
import { Navbar } from '../components/Navbar';
import { LoginWindow } from '../components/LoginWindow';

const LoginPage = (): JSX.Element => {
  const authContext = useContext(AuthContext);

  if (authContext && authContext.isAuthenticated) {
    return <Navigate to='/' />;
  }
  return (
    <>
      <Navbar isLogin={false} />
      <LoginWindow />
    </>
  );
};

export default LoginPage;
