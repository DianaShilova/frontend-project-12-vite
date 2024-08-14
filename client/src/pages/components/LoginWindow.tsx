import FormBootstrap from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import image from '../../images/black.png';
import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';

export const LoginWindow = () => {
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);

  const schema = yup.object().shape({
    username: yup.string().required(t('loginForm.validationLogin.empty')),
    password: yup.string().required(t('loginForm.validationLogin.empty')),
  });

  return (
    <div className='sign in flex justify-center mx-4 mt-20'>
      <div className='shadow-xl shadow-slate-500/40 signin-container dark:bg-slate-500 flex row signin border-2 border-blue-200 dark:border-blue-900 rounded-lg mx-10'>
        <div className=' card-body flex justify-center lg:justify-around p-4'>
          <div className='hidden lg:block pt-10'>
            <img
              src={image}
              alt={t('image.login')}
              className='w-[250px] h-[250px] object-cover'
            />
          </div>

          <Formik
            className='signin-form-container'
            initialValues={{
              username: '',
              password: '',
            }}
            validationSchema={schema}
            onSubmit={async (values, formikBag) => {
              try {
                await authContext.login(values);
              } catch (error: any) {
                formikBag.setFieldError('password', error?.message);
              }
            }}
          >
            {({ errors, touched, handleChange, values }) => (
              <Form className='w-full lg:w-[320px]'>
                <h1 className='dark:text-blue-200 text-center mb-4'>
                  {t('loginForm.enter')}
                </h1>
                <FormBootstrap.Group
                  className='username input mb-3'
                  controlId='username'
                >
                  <InputGroup hasValidation>
                    <FloatingLabel
                      controlId='username'
                      label={t('loginForm.nickname')}
                      className='mb-3 border-2 border-blue-100 dark:border-blue-500 rounded-lg dark:text-gray-200 '
                    >
                      <FormBootstrap.Control
                        name='username'
                        placeholder={t('loginForm.nickname')}
                        value={values.username}
                        isValid={touched.username && !errors.username}
                        isInvalid={!!errors.username}
                        onChange={handleChange}
                        className='dark:bg-slate-600 dark:hover:bg-slate-600 dark:focus:bg-slate-600 dark:text-white dark:active:text-white dark:focus:text-white'
                      />
                      <FormBootstrap.Control.Feedback
                        type='invalid'
                        tooltip
                        className='w-full text-red-500 dark:text-white text-sm mt-1'
                      >
                        {errors.username}
                      </FormBootstrap.Control.Feedback>
                    </FloatingLabel>
                  </InputGroup>
                </FormBootstrap.Group>
                <FormBootstrap.Group
                  className='password input mb-3'
                  controlId='password'
                >
                  <InputGroup hasValidation>
                    <FloatingLabel
                      controlId='password'
                      label={t('loginForm.password')}
                      className='mb-3 border-2 border-blue-100 dark:border-blue-500 rounded-lg dark:text-gray-200'
                    >
                      <FormBootstrap.Control
                        name='password'
                        placeholder={t('loginForm.password')}
                        value={values.password}
                        isValid={touched.password && !errors.password}
                        isInvalid={!!errors.password}
                        onChange={handleChange}
                        type='password'
                        className='dark:bg-slate-600 dark:hover:bg-slate-600 dark:autofill:bg-slate-600 dark:focus:bg-slate-600 dark:text-white dark:active:text-white dark:focus:text-white'
                      />
                      <FormBootstrap.Control.Feedback
                        type='invalid'
                        tooltip
                        className='w-full text-red-500 dark:text-white text-sm mt-1'
                      >
                        {errors.password}
                      </FormBootstrap.Control.Feedback>
                    </FloatingLabel>
                  </InputGroup>
                </FormBootstrap.Group>
                <button
                  className='w-full text-base bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition duration-300'
                  type='submit'
                >
                  {t('loginForm.enter')}
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <div className='card-footer flex justify-center mb-2'>
          <div className='registration text-slate-400 dark:text-slate-200'>
            <span>
              {t('footer.haveNotAccount')}
              <a
                className='text-blue-400 dark:text-blue-300 no-underline'
                href='/frontend-project-12-vite/signup'
              >
                {t('footer.registration')}
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
