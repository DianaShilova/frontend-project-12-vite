import { Form, Formik } from 'formik';
import FormBootstrap from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import image from '../../images/person.png';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';
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
    <div className='sign'>
      <div className='signup-container'>
        <div className='signup-image-container'>
          <img src={image} alt={t('image.registration')} />
        </div>
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
            <Form className='signup-form-container'>
              <h1>{t('signupForm.registration')}</h1>
              <FormBootstrap.Group
                className='username input mb-3'
                controlId='username'
              >
                <InputGroup hasValidation>
                  <FloatingLabel
                    controlId='username'
                    label={t('signupForm.username')}
                    className='mb-3'
                  >
                    <FormBootstrap.Control
                      name='username'
                      placeholder={t('signupForm.username')}
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
                    label={t('signupForm.password')}
                    className='mb-3'
                  >
                    <FormBootstrap.Control
                      name='password'
                      placeholder={t('signupForm.password')}
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
              <FormBootstrap.Group
                className='confirmPassword input mb-3'
                controlId='confirmPassword'
              >
                <InputGroup hasValidation>
                  <FloatingLabel
                    controlId='confirmPassword'
                    label={t('signupForm.confirmPassword')}
                    className='mb-3'
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
                    />
                    <FormBootstrap.Control.Feedback type='invalid' tooltip>
                      {errors.confirmPassword}
                    </FormBootstrap.Control.Feedback>
                  </FloatingLabel>
                </InputGroup>
              </FormBootstrap.Group>
              <button className='buttonSign' type='submit'>
                {t('signupForm.register')}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
