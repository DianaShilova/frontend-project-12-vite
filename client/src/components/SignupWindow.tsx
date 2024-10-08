import { Form, Formik } from 'formik';
import FormBootstrap from 'react-bootstrap/Form';
import axios from 'axios';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import image from '../images/black.png';
import { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

const API_URL = import.meta.env.VITE_API_URL || '';
export const SignupWindow = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const schema = yup.object().shape({
    username: yup
      .string()
      .min(3, t('signupForm.validation.username'))
      .required(t('signupForm.validation.missField'))
      .max(20, 'signupForm.validation.username'),
    password: yup
      .string()
      .required(t('signupForm.validation.missField'))
      .min(6, t('signupForm.validation.password')),
    confirmPassword: yup
      .string()
      .required(t('signupForm.validation.missField'))
      .test(
        'same-password',
        t('signupForm.validation.confirmPassword'),
        (value, context) => value === context.parent.password
      ),
  });

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-[0px] sm:p-[24px]'>
      <div className='w-full max-w-4xl bg-zinc-50 dark:bg-slate-500 border-2 border-blue-200 dark:border-blue-900 rounded-lg shadow-md overflow-hidden justify-around md:flex'>
        <div className='hidden lg:block flex self-center'>
          <img
            src={image}
            alt={t('image.login')}
            className='dark:opacity-80 dark:invert w-[250px] h-[250px] object-cover'
          />
        </div>
        <div className='md:w-1/2 p-8'>
          <Formik
            initialValues={{
              username: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={schema}
            onSubmit={async (values, formikBag) => {
              try {
                const { data } = await axios.post(
                  `${API_URL}/api/v1/signup`,
                  values
                );
                authContext.setToken(data);
                navigate('/');
              } catch (error: any) {
                if (error?.response?.status === 409) {
                  formikBag.setFieldError(
                    'username',
                    t('signupForm.validation.userAlreadyExists')
                  );
                }
              }
            }}
          >
            {({ errors, touched, values, handleChange }) => (
              <Form className='space-y-9'>
                <h1 className='dark:text-blue-200 text-center mb-4'>
                  {t('signupForm.registration')}
                </h1>
                <div className='text-base'>
                  <FloatingLabel
                    controlId='username'
                    label={t('signupForm.username')}
                    className='mb-3 border-2 border-blue-100 dark:border-blue-500 rounded-lg dark:text-gray-200 '
                  >
                    <FormBootstrap.Control
                      name='username'
                      placeholder={t('signupForm.username')}
                      value={values.username}
                      isValid={touched.username && !errors.username}
                      isInvalid={!!errors.username}
                      onChange={handleChange}
                      className='dark:bg-slate-600 dark:hover:bg-slate-600 dark:focus:bg-slate-600 form-control dark:text-white dark:active:text-white dark:focus:text-white'
                    />
                    <FormBootstrap.Control.Feedback
                      type='invalid'
                      tooltip
                      className='w-full text-red-500 dark:text-white text-sm mt-1'
                    >
                      {errors.username}
                    </FormBootstrap.Control.Feedback>
                  </FloatingLabel>
                </div>
                <div className='text-base'>
                  <FloatingLabel
                    controlId='password'
                    label={t('signupForm.password')}
                    className='mb-3 border-2 border-blue-100 dark:border-blue-500 rounded-lg dark:text-gray-200 '
                  >
                    <FormBootstrap.Control
                      name='password'
                      placeholder={t('signupForm.password')}
                      value={values.password}
                      isValid={touched.password && !errors.password}
                      isInvalid={!!errors.password}
                      onChange={handleChange}
                      type='password'
                      className='dark:bg-slate-600 dark:hover:bg-slate-600 dark:focus:bg-slate-600 form-control dark:text-white dark:active:text-white dark:focus:text-white'
                    />
                    <FormBootstrap.Control.Feedback
                      type='invalid'
                      tooltip
                      className='w-full text-red-500 dark:white text-sm mt-1'
                    >
                      {errors.password}
                    </FormBootstrap.Control.Feedback>
                  </FloatingLabel>
                </div>
                <div className='text-base'>
                  <FloatingLabel
                    controlId='confirmPassword'
                    label={t('signupForm.confirmPassword')}
                    className='mb-3 border-2 border-blue-100 dark:border-blue-500 rounded-lg dark:text-gray-200 '
                  >
                    <FormBootstrap.Control
                      name='confirmPassword'
                      placeholder={t('signupForm.confirmPassword')}
                      value={values.confirmPassword}
                      isValid={
                        touched.confirmPassword && !errors.confirmPassword
                      }
                      isInvalid={!!errors.confirmPassword}
                      onChange={handleChange}
                      type='password'
                      className='dark:bg-slate-600 dark:hover:bg-slate-600 dark:focus:bg-slate-600 form-control dark:text-white dark:active:text-white dark:focus:text-white'
                    />
                    <FormBootstrap.Control.Feedback
                      type='invalid'
                      tooltip
                      className='w-full text-red-500 dark:text-white text-sm mt-1'
                    >
                      {errors.confirmPassword}
                    </FormBootstrap.Control.Feedback>
                  </FloatingLabel>
                </div>
                <button
                  type='submit'
                  className='w-full text-base bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition duration-300'
                >
                  {t('signupForm.register')}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
