import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'
import { PageWrapper, PageContent, Headline, PageImage } from 'Layouts'
import { Button } from '@tablecheck/tablekit-button'
import { Input } from '@tablecheck/tablekit-input'

import { HomeHeadline, HomeWrapper } from './styles'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export function ShopDetail(): JSX.Element {
  const location = useLocation()
  const shop = location.state
  console.log('shop', shop)

  return (
    // <PageContent>
    <div>
      <h2>{shop.name}</h2>
      <img src={shop.search_image} alt="shop" />
    </div>
    // </PageContent>
  )
}
