import React, { useRef, useEffect, useCallback } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';
import { selectChannel, selectChannels } from '../slices/selectors';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: { channelName: string }) => void;
  id: string | null;
}
const ChannelModal = (props: IProps) => {
  const { isOpen, onClose, onSubmit, id } = props;
  const channels = useSelector(selectChannels);
  const inputEl = useRef<HTMLInputElement | null>(null);
  const selectChannelById = useSelector(selectChannel);
  const channel = selectChannelById(id);
  const { t } = useTranslation();

  useEffect(() => {
    if (isOpen) {
      if (inputEl.current) {
        inputEl.current.focus();
      }
    }
  }, [isOpen]);

  const validate = useCallback(
    (values: { channelName: string }) => {
      const errors: { channelName?: string } = {};

      const channelsArr = Object.values(channels);
      const existingChannel = channelsArr.find(
        (ch) => ch.name === values.channelName
      );
      if (!channel && existingChannel) {
        errors.channelName = t('addModal.validationModal.alreadyExists');
      }
      if (!values.channelName) {
        errors.channelName = t('addModal.validationModal.required');
      }
      if (values.channelName.length < 3 || values.channelName.length > 20) {
        errors.channelName = t('addModal.validationModal.minMax');
      }
      return errors;
    },
    [channels, channel]
  );

  const handleSubmit = useCallback(
    (values: { channelName: string }) => (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(values);
    },
    [onSubmit]
  );

  return (
    <div className='modal show dark:bg-slate-900'>
      <Modal show={isOpen} onHide={onClose}>
        <Formik
          initialValues={{
            channelName: channel ? channel.name : '',
          }}
          validate={validate}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values);
            setSubmitting(false);
          }}
        >
          {({ handleChange, handleBlur, values, errors }) => (
            <Form
              onSubmit={handleSubmit(values)}
              className='dark:bg-slate-700 dark:border-[1px] dark:border-blue-300 rounded-lg'
            >
              <Modal.Header
                closeButton
                className='dark:border-[1px] dark:border-blue-300'
              >
                <Modal.Title className='dark:text-blue-300 '>
                  {id ? t('editModal.editChannel') : t('addModal.addChannel')}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className='dark:border-[1px] dark:border-blue-300'>
                <Form.Group>
                  <Form.Label className='visually-hidden' htmlFor='channelName'>
                    {t('addModal.channelName')}
                  </Form.Label>
                  <Form.Control
                    className='dark:border-[1px] dark:border-blue-300 modal-input dark:bg-slate-700 dark:text-blue-100 dark:active:bg-slate-600 dark:focus:text-white dark:focus:bg-slate-600 dark:after:bg-slate-600'
                    ref={inputEl}
                    onChange={handleChange}
                    value={values.channelName}
                    onBlur={handleBlur}
                    name='channelName'
                    id='channelName'
                    required
                  />
                  {errors.channelName && (
                    <div className='error-modal dark:text-red-500'>
                      {errors.channelName}
                    </div>
                  )}
                </Form.Group>
              </Modal.Body>

              <Modal.Footer className='dark:border-[1px] dark:border-blue-300'>
                <Button variant='secondary' onClick={onClose}>
                  {t('addModal.cancel')}
                </Button>
                <Button
                  type='submit'
                  disabled={!!errors.channelName}
                  variant='primary'
                  className='dark:bg-blue-800 dark:text-white'
                >
                  {t('addModal.send')}
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default ChannelModal;
