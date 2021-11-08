import { useIntl as useIntlOrigin } from 'react-intl';

export const useIntl = <T extends string>() => {
  const { formatMessage } = useIntlOrigin();
  const getLang = (id: T, values?: any) => formatMessage({ id }, values);
  return { getLang };
};
