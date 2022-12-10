import styled from '@emotion/styled'
import { Input } from '@tablecheck/tablekit-input'

import { Headline, MainWrapper, PageContent, PageWrapper } from 'Layouts'

export const SearchPageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const SearchInput = styled(Input)`
  width: min(80%, 500px);
`
