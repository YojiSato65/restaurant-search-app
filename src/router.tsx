import { ordered as orderedLocales } from '@tablecheck/locales'
import { useTranslation } from 'react-i18next'
import { Navigate, Route, Routes } from 'react-router-dom'

import { About } from 'Pages/About'
import { Home } from 'Pages/Home'
import { Listing } from 'Pages/Listing'
import { ShopDetail } from 'Pages/ShopDetail'
import { ReportIssue } from 'Pages/ReportIssue'
import { AppRoute } from 'enums'

import { PageLayout } from './Layouts/Page'

export const SUPPORTED_LOCALES = orderedLocales.map(({ code }) => code)

export function Router({
  isDarkMode,
  setDarkMode,
}: {
  isDarkMode: boolean
  setDarkMode: (value: boolean) => void
}): JSX.Element {
  const [, { language }] = useTranslation()
  // react router v6 not accepting regex on path yet
  // https://github.com/remix-run/react-router/issues/8254
  // const localePath = `:locale(${SUPPORTED_LOCALES.join('|')})`;

  return (
    <Routes>
      <Route
        path="/:locale"
        element={
          <PageLayout isDarkMode={isDarkMode} setDarkMode={setDarkMode} />
        }
      >
        <Route index element={<Home />} />
        <Route path={AppRoute.Shops} element={<Listing />} />
        <Route path={AppRoute.ShopDetail} element={<ShopDetail />} />
        <Route path={AppRoute.About} element={<About />} />
        <Route path={AppRoute.ReportIssue} element={<ReportIssue />} />
      </Route>
      <Route path="*" element={<Navigate to={`/${language}`} replace />} />
    </Routes>
  )
}
