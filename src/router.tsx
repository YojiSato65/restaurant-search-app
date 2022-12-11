import { Navigate, Route, Routes } from 'react-router-dom'

import { About } from 'Pages/About'
import { Home } from 'Pages/Home'
import { Listing } from 'Pages/Listing'
import { ShopDetail } from 'Pages/ShopDetail'
import { ReportIssue } from 'Pages/ReportIssue'
import { AppRoute } from 'enums'

import { PageLayout } from './Layouts/Page'

export function Router(): JSX.Element {
  // react router v6 not accepting regex on path yet
  // https://github.com/remix-run/react-router/issues/8254
  // const localePath = `:locale(${SUPPORTED_LOCALES.join('|')})`;

  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route index element={<Home />} />
        <Route path={AppRoute.Shops}>
          <Route index element={<Listing />} />
          <Route path={AppRoute.ShopDetail} element={<ShopDetail />} />
        </Route>
        <Route path={AppRoute.ShopDetail} element={<ShopDetail />} />
        <Route path={AppRoute.About} element={<About />} />
        <Route path={AppRoute.ReportIssue} element={<ReportIssue />} />
      </Route>
      <Route path="*" element={<Navigate to={'/'} replace />} />
    </Routes>
  )
}
