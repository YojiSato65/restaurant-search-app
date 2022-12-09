import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { PageWrapper, PageContent, Headline, PageImage } from 'Layouts'
import { Button } from '@tablecheck/tablekit-button'
import { Input } from '@tablecheck/tablekit-input'

import { HomeHeadline, HomeWrapper } from './styles'
import { useEffect, useState } from 'react'
import { Link, useLocation, Outlet } from 'react-router-dom'

// TODOs:
// - fix the geoCoordinates type
// - add loader
// - what is the red colon? name:, slug:

export function Listing(): JSX.Element {
  const [shopList, setShopList] = useState<
    [
      {
        _id: string
        name: string
        slug: string
      },
    ]
  >([
    {
      _id: '',
      name: '',
      slug: '',
    },
  ])

  const location = useLocation()
  let geoCoordinates: any = location.state

  const queryParams = new URLSearchParams(window.location.search)
  const term = queryParams.get('term')

  const getListing = async () => {
    try {
      const res = await fetch(
        `https://staging-snap.tablecheck.com/v2/shop_search?geo_latitude=${geoCoordinates.lat}&geo_longitude=${geoCoordinates.lon}&shop_universe_id=57e0b91744aea12988000001&locale=en&per_page=50`,
      )
      const data = await res.json()
      console.log(data)
      setShopList(data.shops)
    } catch (e) {
      console.error(e)
    }
  }

  const updateListing = async () => {
    try {
      const res = await fetch(
        `https://staging-snap.tablecheck.com/v2/autocomplete?locale=en&shop_universe_id=57e0b91744aea12988000001&text=${term}`,
      )
      const data = await res.json()
      geoCoordinates = data.locations[0].payload.geo
      getListing()
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    if (!term) {
      getListing()
    } else {
      updateListing() // make the url with query loadable
    }
  }, [term])

  return (
    // <PageContent>
    <>
      {shopList.map((shop) => (
        <Link
          to={shop.slug}
          key={shop._id}
          style={{ display: 'block' }}
          state={shop.slug}
        >
          {shop.name}
        </Link>
      ))}
      <Outlet />
    </>
    // </PageContent>
  )
}
