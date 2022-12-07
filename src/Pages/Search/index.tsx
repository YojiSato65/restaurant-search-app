import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { Outlet, useNavigate, Link } from 'react-router-dom'
import { PageWrapper, PageContent, Headline, PageImage } from 'Layouts'
import { Button } from '@tablecheck/tablekit-button'
import { Input } from '@tablecheck/tablekit-input'

import { HomeHeadline, HomeWrapper } from './styles'
import { useState } from 'react'
import { Listing } from 'Pages/Listing'

export function Search(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState('')
  const [listing, setListing] = useState<{
    locations?: []
    cuisines?: []
    shops?: []
  }>({})
  // const [locations, setLocations] = useState<
  //   { text: number; type: string; payload: {} }[]
  // >([])

  const navigate = useNavigate()

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    setSearchQuery(e.target.value)

    try {
      const res = await fetch(
        `https://staging-snap.tablecheck.com/v2/autocomplete?locale=en&shop_universe_id=57e0b91744aea12988000001&text=${searchQuery}`,
      )
      const data = await res.json()
      console.log(data)
      setListing(data)
      // setLocations(data.locations)
      // setShops(data.shops)
      // navigate('shops')
    } catch (error) {
      console.error(error)
      alert('Error happened. Please try again later.')
    }
  }

  return (
    // <PageContent>
    <div>
      {/* <form onSubmit={(e) => handleChange(e)} action="/shops"> */}
      <Input
        type="search"
        placeholder="Area, cuisine or venue"
        value={searchQuery}
        // onChange={(e) => setSearchQuery(e.target.value)}
        onChange={handleChange}
      />
      {/* <Button type="submit">Search</Button> */}
      {/* </form> */}
      {/* <Listing locations={locations} /> */}
      {listing.locations?.map((location, idx) => (
        <Link to={'shops'} key={idx} style={{ display: 'block' }}>
          {location.text}
        </Link>
      ))}
    </div>
    // </PageContent>
  )
}
