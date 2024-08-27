import { Navbar } from '../components/Navbar';
import { SignupWindow } from '../components/SignupWindow';

const SignupPage = () => {
  return (
    <>
      <header>
        <Navbar isLogin={false} />
      </header>
      <SignupWindow />
    </>
  );
};

export default SignupPage;
