import { Outlet } from 'react-router-dom'

import { Footer } from '../Footer'
import { TopNav } from '../TopNav'

export function PageLayout(): JSX.Element {
  return (
    <>
      <TopNav />
      <Outlet />
      <Footer />
    </>
  )
}
