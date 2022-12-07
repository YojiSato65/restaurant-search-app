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
  locations?: []
  cuisines?: []
  shops?: []
}

export function Listing({ listing }: ListingProps): JSX.Element {
  const [shopList, setShopList] = useState([])
  const [geoQuery, setGeoQuery] = useState({ latitude: '', longitude: '' })

  const getListing = async (geoQuery) => {
    const res = await fetch(
      `https://staging-snap.tablecheck.com/v2/shop_search?geo_latitude=${geoQuery.latitude}&geo_longitude=${geoQuery.longitude}&shop_universe_id=57e0b91744aea12988000001&locale=en&per_page=50`,
    )
    const data = await res.json()
    console.log(data)
    setShopList(data.shops)
  }

  const handleClick = async (location) => {
    setGeoQuery({
      latitude: location.payload.geo.lat,
      longitude: location.payload.geo.lon,
    })

    getListing(geoQuery)
  }

  useEffect(() => {
    // getListing()
  }, [])

  return (
    // <PageContent>
    <>
      {listing.locations?.map((location, idx) => (
        // <Link to={'shops'} key={idx} style={{ display: 'block' }}>
        <p onClick={() => handleClick(location)} key={idx}>
          {location.text}
        </p>
        // </Link>
      ))}
      {shopList &&
        shopList.map((shop) => (
          <Link to={'shopdetail'} key={shop._id} style={{ display: 'block' }}>
            {shop.name}
          </Link>
        ))}
    </>
    // </PageContent>
  )
}
