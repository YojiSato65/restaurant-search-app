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
  const [shopDetails, setShopDetails] = useState<{
    name: string[]
    url: string
    phone_natl: string
    alt_address: {
      city: string
      street: string
      street2?: string
      region: string
    }
    is_smartpay: boolean
    content_title_translations?: { translation?: string }[]
    content_body_translations?: { translation?: string }[]
    cuisines: string[]
    budget_dinner_max?: string
    budget_dinner_min?: string
    budget_lunch_max?: string
    budget_lunch_min?: string
    search_image: string
  }>({
    name: [],
    url: '',
    phone_natl: '',
    alt_address: { city: '', street: '', street2: '', region: '' },
    is_smartpay: false,
    content_title_translations: [{ translation: '' }],
    content_body_translations: [{ translation: '' }],
    cuisines: [],
    budget_dinner_max: '',
    budget_dinner_min: '',
    budget_lunch_max: '',
    budget_lunch_min: '',
    search_image: '',
  })

  const location = useLocation()
  const shop: any = location.state

  const getShopDetails = async () => {
    try {
      const res = await fetch(
        `https://staging-snap.tablecheck.com/v2/shops/${shop}?sort=slug&sort_by=slug&sort_order=asc`,
      )
      const data = await res.json()
      setShopDetails(data.shops[0])
      console.log('data1', shopDetails)
      console.log('data2', data)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getShopDetails()
  }, [])

  return (
    // Priority 1. English 2. Japanese 3. Not display

    // TODOs:
    // - if the shopDetail is empty, display alert message(e.g itigo - restaurant)
    // - better way of implementing conditional render(too many repeating code)
    // - add loader
    // - implement booking and map

    // <PageContent>
    <>
      {shopDetails.name.length === 1 ? (
        <Helmet>
          <title>{shopDetails.name[0]}</title>
        </Helmet>
      ) : shopDetails.name.length > 1 ? (
        <Helmet>
          <title>{shopDetails.name[1]}</title>
        </Helmet>
      ) : (
        <></>
      )}
      <div
        style={{
          display: 'flex',
          width: 'min(80vw, 1400px)',
          margin: 'auto',
          gap: '5%',
        }}
      >
        <div style={{ width: '60%' }}>
          <div>
            <h3>
              {shopDetails.name.length === 1 ? (
                <h3>{shopDetails.name[0]}</h3>
              ) : shopDetails.name.length > 1 ? (
                <h3>{shopDetails.name[1]}</h3>
              ) : (
                <></>
              )}
            </h3>
            <p>
              <span>{shopDetails.alt_address?.street2}</span>
              <span>{shopDetails.alt_address.street}</span>, &nbsp;
              <span>{shopDetails.alt_address.city}</span>, &nbsp;
              <span>{shopDetails.alt_address.region}</span>
            </p>
            <p>
              <span>
                <a href={shopDetails.url} target="_blank">
                  Website
                </a>
              </span>
              <span>
                <a href="tel:{shopDetails.phone_natl}" target="_blank">
                  {shopDetails.phone_natl}
                </a>
              </span>
            </p>
          </div>
          <br />
          <div>
            {shopDetails.is_smartpay && <p>Accepts Contactless Pay</p>}
            {shopDetails.content_title_translations !== undefined &&
              shopDetails.content_body_translations !== undefined &&
              shopDetails.content_title_translations.length === 1 && (
                <>
                  <h3>
                    {shopDetails.content_title_translations[0].translation}
                  </h3>
                  <p>{shopDetails.content_body_translations[0].translation}</p>
                </>
              )}
            {shopDetails.content_title_translations !== undefined &&
              shopDetails.content_body_translations !== undefined &&
              shopDetails.content_title_translations.length > 1 && (
                <>
                  <h3>
                    {shopDetails.content_title_translations[1].translation}
                  </h3>
                  <p>{shopDetails.content_body_translations[1].translation}</p>
                </>
              )}
            <div style={{ display: 'flex' }}>
              <div style={{ width: '50%' }}>
                <h4>Cuisines</h4>
                {shopDetails.cuisines.map((cuisine, idx) => (
                  <p key={idx}>{cuisine}</p>
                ))}
              </div>
              <div style={{ width: '50%' }}>
                <h4>Price</h4>
                {/* <div>
                  {shopDetails.budget_lunch_min &&
                  shopDetails.budget_lunch_min === '' ? (
                    <span>¥ -</span>
                  ) : (
                    <span>
                      ¥{shopDetails.budget_lunch_min.slice(0, -2)} ~ ¥
                      {shopDetails.budget_lunch_max.slice(0, -2)}
                    </span>
                  )}
                </div>
                <div>
                  {shopDetails.budget_dinner_min &&
                    shopDetails.budget_dinner_min !== '' && (
                      <span>
                        ¥{shopDetails.budget_dinner_min.slice(0, -2)} ~ ¥
                        {shopDetails.budget_dinner_max.slice(0, -2)}
                      </span>
                    )}
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div style={{ width: '40%' }}>
          <img
            src={shopDetails.search_image}
            alt="shop"
            style={{ width: '100%', minWidth: '300px' }}
          />
        </div>
      </div>
    </>
    // </PageContent>
  )
}
