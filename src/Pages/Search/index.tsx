import { Icon } from '@tablecheck/tablekit-icon';
import { InputShape } from '@tablecheck/tablekit-input';
import { Item, ItemGroup } from '@tablecheck/tablekit-item';
import { SpinnerSize } from '@tablecheck/tablekit-spinner';
import * as React from 'react';

import {
  SearchInput,
  SearchPageContent,
  SearchSpinner,
  AutocompleteLink
} from './styles';

import '@tablecheck/tablekit-free-icon-config';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons/faMapMarker';
import { faWarehouse } from '@fortawesome/free-solid-svg-icons/faWarehouse';

type Listing = {
  locations?: [{ text: string; type: string; payload: { geo: {} } }];
  cuisines?: [];
  shops?: [{ text: string; payload: { shop_slug: string } }];
};

export function Search(): JSX.Element {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [listing, setListing] = React.useState<Listing>({});
  const [isLoading, setIsLoading] = React.useState(false);

  const handleChange = async () => {
    try {
      setIsLoading((prev) => !prev); // spinner to true
      const res = await fetch(
        `https://staging-snap.tablecheck.com/v2/autocomplete?locale=en&shop_universe_id=57e0b91744aea12988000001&text=${searchQuery}`
      );
      if (res.status !== 200) {
        alert('Error happened. Please try again later.');
        throw new Error('Error happened. Please try again later.');
      }
      const data = await res.json();
      console.log(data);
      setListing(data);
      setIsLoading((prev) => !prev); // sppiner to false
    } catch (e) {
      console.error(e);
    }
  };

  React.useEffect(() => {
    if (searchQuery) {
      handleChange();
    } else {
      setListing({}); // empties the listing object when clearing the input field with X button
    }
  }, [searchQuery]);

  const autocomplete = (
    <>
      {isLoading ? (
        <SearchSpinner size={SpinnerSize.Regular} />
      ) : (
        <>
          <ItemGroup
            headingText={
              listing.locations && (
                <span>
                  <Icon icon={faMapMarker} />
                  &nbsp;AREA
                </span>
              )
            }
            headingStyles={{ color: 'rgba(50,50,50,0.6)', marginBottom: '0' }}
          >
            {listing.locations?.map((location, idx) => (
              <Item key={idx}>
                <AutocompleteLink
                  to={`shops?term=${searchQuery}`}
                  state={location.payload.geo}
                >
                  {location.text}
                </AutocompleteLink>
              </Item>
            ))}
          </ItemGroup>
          <ItemGroup
            headingText={
              listing.shops && (
                <span>
                  <Icon icon={faWarehouse} />
                  &nbsp;VENUE
                </span>
              )
            }
            headingStyles={{ color: 'rgba(50,50,50,0.6)', marginBottom: '0' }}
          >
            {listing.shops?.map((shop, idx) => (
              <Item key={idx}>
                <AutocompleteLink
                  to={shop.payload.shop_slug}
                  state={shop.payload.shop_slug}
                >
                  {shop.text}
                </AutocompleteLink>
              </Item>
            ))}
          </ItemGroup>
        </>
      )}
    </>
  );

  return (
    <SearchPageContent>
      <SearchInput
        type="search"
        placeholder="Area, cuisine or venue"
        name="term"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        shape={InputShape.Sharp}
        shouldFitContainer
        isMessageHidden={searchQuery.length === 0}
        message={autocomplete}
      />
    </SearchPageContent>
  );
}
