import { ConfigProvider } from 'antd';
import antdEn from 'antd/es/locale/en_US';
import antdZh from 'antd/es/locale/zh_CN';
import React, { useContext } from 'react';
import { IntlProvider as IntlOriginProvider } from 'react-intl';

import { LocaleContext } from './locale';

interface PropsType {
  locales: Record<string, Record<string, string>>;
}
export const IntlProvider: React.FC<PropsType> = (props) => {
  const { locales, children } = props;

  const {
    state: { locale },
  } = useContext(LocaleContext);

  return (
    <ConfigProvider locale={locale === 'zh' ? antdZh : antdEn}>
      <IntlOriginProvider locale={locale} messages={locales[locale]}>
        {children}
      </IntlOriginProvider>
    </ConfigProvider>
  );
};
