import { Link } from 'react-router-dom'
import { PageWrapper, PageContent, Headline, PageImage } from 'Layouts'
import { Input } from '@tablecheck/tablekit-input'
import { SearchInput, SearchPageContent } from './styles'
import { useState } from 'react'
import { useEffect } from 'react'
import { auto } from '@popperjs/core'

// TODOs
// fire handleChange when clearing search input
// loader

export function Search(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState('')
  const [listing, setListing] = useState<{
    locations?: [{ text: string; type: string; payload: { geo: {} } }]
    cuisines?: []
    shops?: [{ text: string; payload: { shop_slug: string } }]
  }>({})

  const handleChange = async () => {
    try {
      const res = await fetch(
        `https://staging-snap.tablecheck.com/v2/autocomplete?locale=en&shop_universe_id=57e0b91744aea12988000001&text=${searchQuery}`,
      )
      // this is not working
      // if (res.status !== 200) {
      //   alert('Error happened. Please try again later.')
      // }
      const data = await res.json()
      console.log(data)
      setListing(data)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    // this will fire handlechange when clearing input but there will be an error message
    // if (searchQuery) {
    handleChange()
    // }
  }, [searchQuery])

  const autocomplete = (
    <div>
      {listing.locations && <p>AREA</p>}
      {listing.locations?.map((location, idx) => (
        <Link
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
        <Link
          to={shop.payload.shop_slug}
          key={idx}
          style={{ display: 'block' }}
          state={shop.payload.shop_slug}
        >
          {shop.text}
        </Link>
      ))}
    </div>
  )

  return (
    <SearchPageContent>
      <SearchInput
        type="search"
        placeholder="Area, cuisine or venue"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        // onReset={() => console.log('hey')} this is not working
        shape="sharp"
        shouldFitContainer
        message={autocomplete}
      />
      {/* <div>
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
          <Link
            to={shop.payload.shop_slug}
            key={idx}
            style={{ display: 'block' }}
            state={shop.payload.shop_slug}
          >
            {shop.text}
          </Link>
        ))}
      </div> */}
    </SearchPageContent>
  )
}
