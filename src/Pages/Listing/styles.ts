import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { BREAKPOINTS } from 'Layouts'

export const ListingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  width: min(90%, 1000px);
  margin-left: auto;
  margin-right: auto;
  margin-top: 3em;
  margin-bottom: 3em;
`

export const ShopLink = styled(Link)`
  text-decoration: none;
  color: rgb(50, 50, 50);
`

export const ShopContainer = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid rgb(0 0 0 / 11%);
  gap: 3%;
  height: 150px;
  padding: 0.5em;
  @media (max-width: ${BREAKPOINTS.tablet}) {
    flex-direction: column;
    height: 300px;
  }
`
export const LeftDiv = styled.div`
  width: 200px;
  @media (max-width: ${BREAKPOINTS.tablet}) {
    width: 100%;
    height: 130px;
  }
`

export const RightDiv = styled.div`
  width: min(70%, 800px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  @media (max-width: ${BREAKPOINTS.tablet}) {
    width: 100%;
  }
`

export const Genre = styled.p`
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  overflow: hidden;
  text-overflow: ellipsis;
`
export const Title = styled.p`
  margin-top: 0;
  margin-bottom: 0;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
