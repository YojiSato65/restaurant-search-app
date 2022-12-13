import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

import { Search } from 'Pages/Search';

import {
  BackgroundImage,
  BackgroundImageDiv,
  HomeHeadline,
  HomeWrapper
} from './styles';

export function Home(): JSX.Element {
  const [t, { language }] = useTranslation();

  return (
    <HomeWrapper>
      <HomeHeadline>{t('attributes.titles.headline')}</HomeHeadline>
      <Helmet>
        <title lang={language}>{`${t('attributes.titles.headline')} - ${t(
          'keywords.app_name'
        )}`}</title>
      </Helmet>
      <Search />
      <BackgroundImageDiv>
        <BackgroundImage
          src={require('../../assets/bg.jpg')}
          alt="background"
        />
      </BackgroundImageDiv>
    </HomeWrapper>
  );
}
