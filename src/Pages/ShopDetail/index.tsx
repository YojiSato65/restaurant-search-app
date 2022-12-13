import { Helmet } from 'react-helmet'
import {
  ShopDetailContainer,
  LeftDiv,
  RightDiv,
  NameDiv,
  DescriptionDiv,
  ShopDetailLink,
  CuisinePriceDiv,
  CuisinePriceContainer,
  CuisinePrice,
  ShopImage,
  NoResultDiv,
} from './styles'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import '@tablecheck/tablekit-free-icon-config'
import { Icon } from '@tablecheck/tablekit-icon'
import {
  faGlobe,
  faMoneyBill,
  faMoon,
  faPhone,
  faSun,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons'
import { SpinnerSize } from '@tablecheck/tablekit-spinner'
import { ListingSpinner } from '../../styles/index'

type ShopDetail = {
  name: string[]
  url: string
  phone_natl: string
  alt_address?: {
    city?: string
    street?: string
    street2?: string
    region?: string
  }
  content_title_translations?: { translation?: string }[]
  content_body_translations?: { translation?: string }[]
  cuisines: string[]
  budget_dinner_max?: string
  budget_dinner_min?: string
  budget_lunch_max?: string
  budget_lunch_min?: string
  search_image?: string
}

export function ShopDetail(): JSX.Element {
  const [shopDetail, setShopDetail] = useState<ShopDetail>({
    name: [],
    url: '',
    phone_natl: '',
    alt_address: { city: '', street: '', street2: '', region: '' },
    content_title_translations: [{ translation: '' }],
    content_body_translations: [{ translation: '' }],
    cuisines: [],
    budget_dinner_max: '',
    budget_dinner_min: '',
    budget_lunch_max: '',
    budget_lunch_min: '',
    search_image: '',
  })

  const [isLoading, setIsLoading] = useState(false)

  const location = useLocation()
  const shop = location.state
  console.log('shop', shop)

  const getShopDetails = async () => {
    try {
      setIsLoading((prev) => !prev)
      const res = await fetch(
        `https://staging-snap.tablecheck.com/v2/shops/${shop}?sort=slug&sort_by=slug&sort_order=asc`,
      )
      if (res.status !== 200) {
        alert('Error happened. Please try again later.')
        throw new Error('Error happened. Please try again later.')
      }
      const data = await res.json()
      console.log('data', data.shops[0])
      setShopDetail(data.shops[0])
      setIsLoading((prev) => !prev)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getShopDetails()
  }, [])

  if (shopDetail === undefined) {
    return <NoResultDiv>No detail found</NoResultDiv>
  }

  return (
    // Priority to display 1. English 2. Japanese 3. Not display
    <>
      {shopDetail.name.length === 1 ? (
        <Helmet>
          <title>{shopDetail.name[0]}</title>
        </Helmet>
      ) : shopDetail.name.length > 1 ? (
        <Helmet>
          <title>{shopDetail.name[1]}</title>
        </Helmet>
      ) : (
        <></>
      )}
      {isLoading ? (
        <ListingSpinner size={SpinnerSize.Large} />
      ) : (
        <ShopDetailContainer>
          <LeftDiv>
            <NameDiv>
              {shopDetail.name.length === 1 ? (
                <h3>{shopDetail.name[0]}</h3>
              ) : shopDetail.name.length > 1 ? (
                <h3>{shopDetail.name[1]}</h3>
              ) : (
                <></>
              )}

              <p>
                {shopDetail.alt_address !== undefined &&
                  Object.keys(shopDetail.alt_address).length > 0 && (
                    <>
                      <span>{shopDetail.alt_address?.street2}</span>
                      <span>{shopDetail.alt_address?.street}</span>, &nbsp;
                      <span>{shopDetail.alt_address?.city}</span>, &nbsp;
                      <span>{shopDetail.alt_address?.region}</span>
                    </>
                  )}
              </p>
              <p>
                <span>
                  <ShopDetailLink href={shopDetail.url} target="_blank">
                    <Icon icon={faGlobe} /> Website
                  </ShopDetailLink>
                </span>
                <span>
                  <ShopDetailLink
                    href="tel:{shopDetail.phone_natl}"
                    target="_blank"
                  >
                    <Icon icon={faPhone} /> {shopDetail.phone_natl}
                  </ShopDetailLink>
                </span>
              </p>
            </NameDiv>
            <DescriptionDiv>
              {shopDetail.content_title_translations !== undefined &&
              shopDetail.content_body_translations !== undefined &&
              shopDetail.content_title_translations.length === 1 &&
              shopDetail.content_body_translations.length === 1 ? (
                <>
                  <h3>
                    {shopDetail.content_title_translations[0].translation}
                  </h3>
                  <p>{shopDetail.content_body_translations[0].translation}</p>
                </>
              ) : (
                <></>
              )}
              {shopDetail.content_title_translations !== undefined &&
              shopDetail.content_body_translations !== undefined &&
              shopDetail.content_title_translations.length > 1 &&
              shopDetail.content_body_translations.length > 1 ? (
                <>
                  <h3>
                    {shopDetail.content_title_translations[1].translation}
                  </h3>
                  <p>{shopDetail.content_body_translations[1].translation}</p>
                </>
              ) : (
                <></>
              )}
              <CuisinePriceContainer>
                <CuisinePriceDiv>
                  {shopDetail.cuisines.length > 0 && (
                    <CuisinePrice>
                      {' '}
                      <Icon icon={faUtensils} />
                      &nbsp;Cuisines
                    </CuisinePrice>
                  )}
                  {shopDetail.cuisines.map((cuisine, idx) => (
                    <span key={idx}>{cuisine} </span>
                  ))}
                </CuisinePriceDiv>
                <CuisinePriceDiv>
                  {(shopDetail.budget_dinner_max ||
                    shopDetail.budget_dinner_min ||
                    shopDetail.budget_lunch_max ||
                    shopDetail.budget_lunch_min) && (
                    <CuisinePrice>
                      <Icon icon={faMoneyBill} />
                      &nbsp; Price
                    </CuisinePrice>
                  )}
                  <div>
                    {shopDetail.budget_lunch_min &&
                    shopDetail.budget_lunch_max ? (
                      <span>
                        <Icon icon={faSun} /> ¥
                        {shopDetail.budget_lunch_min
                          .slice(0, -2)
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                        - ¥
                        {shopDetail.budget_lunch_max
                          .slice(0, -2)
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      </span>
                    ) : shopDetail.budget_lunch_min &&
                      !shopDetail.budget_lunch_max ? (
                      <span>
                        <Icon icon={faSun} /> ¥
                        {shopDetail.budget_lunch_min
                          .slice(0, -2)
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                        -
                      </span>
                    ) : shopDetail.budget_lunch_max &&
                      !shopDetail.budget_lunch_min ? (
                      <span>
                        <Icon icon={faSun} /> - ¥
                        {shopDetail.budget_lunch_max
                          .slice(0, -2)
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      </span>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div>
                    {shopDetail.budget_dinner_min &&
                    shopDetail.budget_dinner_max ? (
                      <span>
                        <Icon icon={faMoon} /> ¥
                        {shopDetail.budget_dinner_min
                          .slice(0, -2)
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                        - ¥
                        {shopDetail.budget_dinner_max
                          .slice(0, -2)
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      </span>
                    ) : shopDetail.budget_dinner_min &&
                      !shopDetail.budget_dinner_max ? (
                      <span>
                        <Icon icon={faMoon} /> ¥
                        {shopDetail.budget_dinner_min
                          .slice(0, -2)
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                        -
                      </span>
                    ) : shopDetail.budget_dinner_max &&
                      !shopDetail.budget_dinner_min ? (
                      <span>
                        <Icon icon={faMoon} /> - ¥
                        {shopDetail.budget_dinner_max
                          .slice(0, -2)
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      </span>
                    ) : (
                      <></>
                    )}
                  </div>
                </CuisinePriceDiv>
              </CuisinePriceContainer>
            </DescriptionDiv>
          </LeftDiv>
          <RightDiv>
            <ShopImage src={shopDetail.search_image} alt="restaurant" />
          </RightDiv>
        </ShopDetailContainer>
      )}
    </>
  )
}
