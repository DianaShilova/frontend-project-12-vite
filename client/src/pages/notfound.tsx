import { useTranslation } from 'react-i18next';

const NotFoundPage = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t('notFoundPage')}</h1>
    </div>
  );
};

export default NotFoundPage;
