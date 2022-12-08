import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { Outlet, useNavigate, Link } from 'react-router-dom'
import { PageWrapper, PageContent, Headline, PageImage } from 'Layouts'
import { Button } from '@tablecheck/tablekit-button'
import { Input } from '@tablecheck/tablekit-input'

import { HomeHeadline, HomeWrapper } from './styles'
import { useState } from 'react'
import { useEffect } from 'react'

export function Search(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState('')
  const [listing, setListing] = useState<{
    locations?: [{ text: string; type: string; payload: { geo: {} } }]
    cuisines?: []
    shops?: []
  }>({})

  const handleChange = async () => {
    try {
      const res = await fetch(
        `https://staging-snap.tablecheck.com/v2/autocomplete?locale=en&shop_universe_id=57e0b91744aea12988000001&text=${searchQuery}`,
      )
      const data = await res.json()
      console.log(data)
      setListing(data)
    } catch (error) {
      console.error(error)
      alert('Error happened. Please try again later.')
    }
  }

  useEffect(() => {
    if (searchQuery) {
      handleChange()
    }
  }, [searchQuery])

  return (
    // <PageContent>
    <div>
      <Input
        type="search"
        placeholder="Area, cuisine or venue"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {listing.locations && <p>AREA</p>}
      {listing.locations?.map((location, idx) => (
        <Link
          // to={`shops?term=${location.text.toLowerCase()}`}
          to={'shops'}
          key={idx}
          style={{ display: 'block' }}
          state={location.payload.geo}
        >
          {location.text}
        </Link>
      ))}
      <br />
      {listing.locations && <p>VENUE</p>}
      {listing.shops?.map((shop, idx) => (
        <Link to={'shops'} key={idx} style={{ display: 'block' }}>
          {shop.text}
        </Link>
      ))}
    </div>
    // </PageContent>
  )
}
