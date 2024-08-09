import FormBootstrap from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import image from '../../images/person.png';
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
      <div className='signin-container flex row signin border-2 border-blue-200 rounded-lg mx-10'>
        <div className='card-body flex justify-center lg:justify-around p-4'>
          <div className='hidden lg:block pt-10'>
            <img src={image} alt={t('image.login')} />
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
                <h1 className='text-center mb-4'>{t('loginForm.enter')}</h1>
                <FormBootstrap.Group
                  className='username input mb-3'
                  controlId='username'
                >
                  <InputGroup hasValidation>
                    <FloatingLabel
                      controlId='username'
                      label={t('loginForm.nickname')}
                      className='mb-3 border-2 border-blue-100 rounded-lg'
                    >
                      <FormBootstrap.Control
                        name='username'
                        placeholder={t('loginForm.nickname')}
                        value={values.username}
                        isValid={touched.username && !errors.username}
                        isInvalid={!!errors.username}
                        onChange={handleChange}
                      />
                      <FormBootstrap.Control.Feedback type='invalid' tooltip>
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
                      className='mb-3 border-2 border-blue-100 rounded-lg'
                    >
                      <FormBootstrap.Control
                        name='password'
                        placeholder={t('loginForm.password')}
                        value={values.password}
                        isValid={touched.password && !errors.password}
                        isInvalid={!!errors.password}
                        onChange={handleChange}
                        type='password'
                      />
                      <FormBootstrap.Control.Feedback type='invalid' tooltip>
                        {errors.password}
                      </FormBootstrap.Control.Feedback>
                    </FloatingLabel>
                  </InputGroup>
                </FormBootstrap.Group>
                <button
                  className='buttonSign border-2 border-blue-200 rounded-lg w-100 py-2'
                  type='submit'
                >
                  {t('loginForm.enter')}
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <div className='card-footer flex justify-center mb-2'>
          <div className='registration text-slate-400'>
            <span>
              {t('footer.haveNotAccount')}
              <a
                className='text-blue-400 no-underline'
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
