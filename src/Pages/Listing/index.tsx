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

export function Listing({ locations, shops }: ListingProps): JSX.Element {
  const [shopList, setShopList] = useState([])
  const [geoQuery, setGeoQuery] = useState({ latitude: '', longitude: '' })

  const getListing = async () => {
    const res = await fetch(
      `https://staging-snap.tablecheck.com/v2/shop_search?geo_latitude=${geoQuery.latitude}&geo_longitude=${geoQuery.longitude}&shop_universe_id=57e0b91744aea12988000001&locale=en&per_page=50`,
    )
    const data = await res.json()
    console.log(data)
    setShopList(data.shops)
  }

  useEffect(() => {
    getListing()
  }, [])

  return (
    // <PageContent>
    <>
      {shopList.map((shop, idx) => (
        <Link to={'/detail'} key={idx}>
          {shop.name}
        </Link>
      ))}
    </>
    // </PageContent>
  )
}
