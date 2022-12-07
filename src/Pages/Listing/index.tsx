import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { PageWrapper, PageContent, Headline, PageImage } from 'Layouts'
import { Button } from '@tablecheck/tablekit-button'
import { Input } from '@tablecheck/tablekit-input'

import { HomeHeadline, HomeWrapper } from './styles'
import { useEffect, useState } from 'react'
import { Link, useLocation, Outlet } from 'react-router-dom'

type ListingProps = {
  locations?: []
  cuisines?: []
  shops?: []
}

<<<<<<< HEAD
export function Listing(): JSX.Element {
=======
export function Listing({ listing }: ListingProps): JSX.Element {
>>>>>>> 8ad71e6c9d2c0452acba7e7d6aedc50919b4016c
  const [shopList, setShopList] = useState([])

  const location = useLocation()
  const geoCoordinates = location.state

  const getListing = async (geoQuery) => {
    const res = await fetch(
      `https://staging-snap.tablecheck.com/v2/shop_search?geo_latitude=${geoCoordinates.lat}&geo_longitude=${geoCoordinates.lon}&shop_universe_id=57e0b91744aea12988000001&locale=en&per_page=50`,
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
      {shopList.map((shop) => (
        <Link
          to={'/shopdetail'}
          key={shop._id}
          style={{ display: 'block' }}
          state={shop}
        >
          {shop.name}
        </Link>
      ))}
      <Outlet />
    </>
    // </PageContent>
  )
}
