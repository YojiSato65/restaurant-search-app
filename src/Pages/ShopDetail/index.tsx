import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { PageWrapper, PageContent, Headline, PageImage } from 'Layouts'
import { HomeHeadline, HomeWrapper } from './styles'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

// TODOs:
// - better way of implementing conditional render(there are too many)
// - Price alignment when dinner has min(or max) end lunch has both min and max
// - add loader
// - for future improvement: implement booking form and map

type ShopDetail = {
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
}

export function ShopDetail(): JSX.Element {
  const [shopDetail, setShopDetail] = useState<ShopDetail>({
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
  console.log('shop', shop)

  const getShopDetails = async () => {
    try {
      const res = await fetch(
        `https://staging-snap.tablecheck.com/v2/shops/${shop}?sort=slug&sort_by=slug&sort_order=asc`,
      )
      const data = await res.json()
      console.log('data', data.shops[0])

      setShopDetail(data.shops[0])
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getShopDetails()
  }, [])

  if (shopDetail === undefined) {
    return <div>No detail found</div>
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
            {shopDetail.name.length === 1 ? (
              <h3>{shopDetail.name[0]}</h3>
            ) : shopDetail.name.length > 1 ? (
              <h3>{shopDetail.name[1]}</h3>
            ) : (
              <></>
            )}

            <p>
              <span>{shopDetail.alt_address?.street2}</span>
              <span>{shopDetail.alt_address.street}</span>, &nbsp;
              <span>{shopDetail.alt_address.city}</span>, &nbsp;
              <span>{shopDetail.alt_address.region}</span>
            </p>
            <p>
              <span>
                <a href={shopDetail.url} target="_blank">
                  Website
                </a>
              </span>
              <span>
                <a href="tel:{shopDetail.phone_natl}" target="_blank">
                  {shopDetail.phone_natl}
                </a>
              </span>
            </p>
          </div>
          <br />
          <div>
            {shopDetail.is_smartpay && <p>Accepts Contactless Pay</p>}
            {shopDetail.content_title_translations !== undefined &&
              shopDetail.content_body_translations !== undefined &&
              shopDetail.content_title_translations.length === 1 && (
                <>
                  <h3>
                    {shopDetail.content_title_translations[0].translation}
                  </h3>
                  <p>{shopDetail.content_body_translations[0].translation}</p>
                </>
              )}
            {shopDetail.content_title_translations !== undefined &&
              shopDetail.content_body_translations !== undefined &&
              shopDetail.content_title_translations.length > 1 && (
                <>
                  <h3>
                    {shopDetail.content_title_translations[1].translation}
                  </h3>
                  <p>{shopDetail.content_body_translations[1].translation}</p>
                </>
              )}
            <div style={{ display: 'flex' }}>
              <div style={{ width: '50%' }}>
                <h4>Cuisines</h4>
                {shopDetail.cuisines.map((cuisine, idx) => (
                  // use item group
                  <span key={idx}>{cuisine}, </span>
                ))}
              </div>
              <div style={{ width: '50%' }}>
                <h4>Price</h4>
                <div>
                  {shopDetail.budget_lunch_min &&
                  shopDetail.budget_lunch_max ? (
                    <span>
                      ¥
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
                      ¥
                      {shopDetail.budget_lunch_min
                        .slice(0, -2)
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                      -
                    </span>
                  ) : shopDetail.budget_lunch_max &&
                    !shopDetail.budget_lunch_min ? (
                    <span>
                      {' '}
                      - ¥
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
                      ¥
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
                      ¥
                      {shopDetail.budget_dinner_min
                        .slice(0, -2)
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                      -
                    </span>
                  ) : shopDetail.budget_dinner_max &&
                    !shopDetail.budget_dinner_min ? (
                    <span>
                      - ¥
                      {shopDetail.budget_dinner_max
                        .slice(0, -2)
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ width: '40%' }}>
          <img
            src={shopDetail.search_image}
            alt="restaurant"
            style={{ width: '100%', minWidth: '300px' }}
          />
        </div>
      </div>
    </>
  )
}
