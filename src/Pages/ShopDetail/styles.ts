import styled from '@emotion/styled'
import { BREAKPOINTS } from 'Layouts'

export const ShopDetailContainer = styled.div`
  display: flex;
  width: min(80vw, 1100px);
  margin: auto;
  gap: 5%;
  @media (max-width: ${BREAKPOINTS.tablet}) {
    flex-direction: column;
    margin-top: 1em;
  }
`

export const LeftDiv = styled.div`
  width: 60%;
  @media (max-width: ${BREAKPOINTS.tablet}) {
    width: 100%;
  }
`

export const RightDiv = styled.div`
  width: 40%;
  @media (max-width: ${BREAKPOINTS.tablet}) {
    width: 100%;
  }
`
export const NameDiv = styled.div`
  padding: 1em;
  background: white;
  margin-bottom: 1em;
`
export const DescriptionDiv = styled.div`
  padding: 1em;
  background: white;
  margin-bottom: 1em;
`
export const ShopDetailLink = styled.a`
  text-decoration: none;
  color: #7935d2;
  margin-right: 1em;
  :hover {
    text-decoration: underline;
  }
`

export const CuisinePriceContainer = styled.div`
  display: flex;
  @media (max-width: ${BREAKPOINTS.tablet}) {
    flex-direction: column;
  }
`
export const CuisinePriceDiv = styled.div`
  width: 50%;
  margin-bottom: 1em;
`

export const CuisinePrice = styled.h3`
  margin-bottom: 16px;
`
export const ShopImage = styled.img`
  width: 100%;
  max-width: 400px;
  @media (max-width: ${BREAKPOINTS.tablet}) {
    max-width: 800px;
    height: 300px;
    object-fit: contain;
  }
`

export const NoResultDiv = styled.div`
  height: 100vh;
`
