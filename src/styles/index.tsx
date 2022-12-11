import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { Spinner } from '@tablecheck/tablekit-spinner'

export const pageTransitionEasing = 'cubic-bezier(0.23, 1, 0.32, 1)' // easeOutQuint
export const commonTransition = `all ${pageTransitionEasing} 0.5s`

export const slideUp = keyframes`
  from { transform: translate3d(0, 100vh, 0); }
  to { translate3d(0, 0, 0); }
`

export const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export const ListingSpinner = styled(Spinner)`
  width: 100%;
  height: 100vh;
`
