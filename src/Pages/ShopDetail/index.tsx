import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'
import { PageWrapper, PageContent, Headline, PageImage } from 'Layouts'
import { Button } from '@tablecheck/tablekit-button'
import { Input } from '@tablecheck/tablekit-input'

import { HomeHeadline, HomeWrapper } from './styles'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

type ListingProps = {
  locations: []
  shops: []
}

export function ShopDetail({ shop }): JSX.Element {
  return (
    // <PageContent>
    <div>
      <h2>{shop.name}</h2>
      <img src={shop.search_image} alt="" />
    </div>
    // </PageContent>
  )
}
