import { Search } from 'Pages/Search'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'

import { HomeHeadline, HomeWrapper } from './styles'

export function Home(): JSX.Element {
  const [t, { language }] = useTranslation()

  return (
    <HomeWrapper>
      <HomeHeadline>{t('attributes.titles.headline')}</HomeHeadline>
      <Helmet>
        <title lang={language}>{`${t('attributes.titles.headline')} - ${t(
          'keywords.app_name',
        )}`}</title>
      </Helmet>
      <Search />
      {/* <Outlet /> */}
    </HomeWrapper>
  )
}
