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

type ShopList = {
  _id: string
  name: string
  slug: string
  cuisines: string[]
  search_image: string
}

export function Listing(): JSX.Element {
  const [shopList, setShopList] = useState<ShopList[]>([
    {
      _id: '',
      name: '',
      slug: '',
      cuisines: [],
      search_image: '',
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
    <>
      {shopList.map((shop) => (
        <Link
          to={shop.slug}
          key={shop._id}
          style={{ display: 'block', marginBottom: '10px' }}
          state={shop.slug}
        >
          <div style={{ display: 'flex' }}>
            <div style={{ width: '200px', height: '120px' }}>
              <img
                src={shop.search_image}
                alt="thumbnail"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div>
              <h3> {shop.name}</h3>
              {shop.cuisines.map((cuisine) => (
                <span>{cuisine}, </span>
              ))}
            </div>
          </div>
        </Link>
      ))}
      <Outlet />
    </>
  )
}
