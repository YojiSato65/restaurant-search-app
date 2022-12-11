import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { SpinnerSize } from '@tablecheck/tablekit-spinner'
import { ListingSpinner } from '../../styles/index'
import {
  Genre,
  LeftDiv,
  ListingWrapper,
  RightDiv,
  ShopContainer,
  ShopLink,
  Title,
  Image,
} from './styles'

type ShopList = {
  _id: string
  name: string
  slug: string
  cuisines: string[]
  content_title_translations: { translation: string }[]
  search_image: string
}

type Geo = {
  lat: string
  lon: string
}

export function Listing(): JSX.Element {
  const [shopList, setShopList] = useState<ShopList[]>([
    {
      _id: '',
      name: '',
      slug: '',
      cuisines: [],
      content_title_translations: [{ translation: '' }],
      search_image: '',
    },
  ])

  const [isLoading, setIsLoading] = useState(false)

  const location = useLocation()
  let geoCoordinates = location.state as Geo

  const queryParams = new URLSearchParams(window.location.search)
  const term = queryParams.get('term')

  const getListing = async () => {
    try {
      setIsLoading((prev) => !prev)
      const res = await fetch(
        `https://staging-snap.tablecheck.com/v2/shop_search?geo_latitude=${geoCoordinates.lat}&geo_longitude=${geoCoordinates.lon}&shop_universe_id=57e0b91744aea12988000001&locale=en&per_page=50`,
      )
      if (res.status !== 200) {
        alert('Error happened. Please try again later.')
        throw new Error('Error happened. Please try again later.')
      }
      const data = await res.json()

      setShopList(data.shops)
      setIsLoading((prev) => !prev)
    } catch (e) {
      console.error(e)
    }
  }

  const updateListing = async () => {
    try {
      setIsLoading((prev) => !prev)
      const res = await fetch(
        `https://staging-snap.tablecheck.com/v2/autocomplete?locale=en&shop_universe_id=57e0b91744aea12988000001&text=${term}`,
      )
      if (res.status !== 200) {
        alert('Error happened. Please try again later.')
        throw new Error('Error happened. Please try again later.')
      }
      const data = await res.json()
      geoCoordinates = data.locations[0].payload.geo
      getListing()
      setIsLoading((prev) => !prev)
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
      {isLoading ? (
        <ListingSpinner size={SpinnerSize.Large} />
      ) : (
        <ListingWrapper>
          {shopList.map((shop) => (
            <ShopLink to={shop.slug} key={shop._id} state={shop.slug}>
              <ShopContainer>
                <LeftDiv>
                  <Image src={shop.search_image} alt="thumbnail" />
                </LeftDiv>
                <RightDiv>
                  {shop.name.length === 1 ? (
                    <h3>{shop.name[0]}</h3>
                  ) : shop.name.length > 1 ? (
                    <h3>{shop.name[1]}</h3>
                  ) : (
                    <></>
                  )}
                  <Genre>
                    {shop.cuisines.map((cuisine, idx) => (
                      <span key={idx}>{cuisine} </span>
                    ))}
                  </Genre>
                  {shop.content_title_translations !== undefined &&
                  shop.content_title_translations.length === 1 ? (
                    <Title>
                      {shop.content_title_translations[0].translation}
                    </Title>
                  ) : shop.content_title_translations !== undefined &&
                    shop.content_title_translations.length > 1 ? (
                    <Title>
                      {shop.content_title_translations[1].translation}
                    </Title>
                  ) : (
                    <></>
                  )}
                </RightDiv>
              </ShopContainer>
            </ShopLink>
          ))}
        </ListingWrapper>
      )}
    </>
  )
}
