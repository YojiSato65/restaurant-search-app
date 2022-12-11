import styled from '@emotion/styled'

import { Headline, PageWrapper } from 'Layouts'
import { pageTransitionEasing, slideUp } from 'styles'

export const HomeWrapper = styled(PageWrapper)`
  max-width: initial;
  animation: ${slideUp} ${pageTransitionEasing} 0.5s;
  position: relative;
`

export const HomeHeadline = styled(Headline)`
  text-align: center;
`
