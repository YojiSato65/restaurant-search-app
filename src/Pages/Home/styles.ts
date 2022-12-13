import styled from '@emotion/styled';

import { Headline, PageWrapper } from 'Layouts';
import { pageTransitionEasing, slideUp } from 'styles';
import { BREAKPOINTS } from 'Layouts';

export const HomeWrapper = styled(PageWrapper)`
  max-width: initial;
  animation: ${slideUp} ${pageTransitionEasing} 0.5s;
  position: relative;
  padding-right: 300px;
  @media (max-width: ${BREAKPOINTS.tablet}) {
    padding-right: 16px;
  }
`;

export const HomeHeadline = styled(Headline)`
  text-align: center;
  text-shadow: 0px 0px 10px rgb(255 255 255);
`;

export const BackgroundImageDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
`;

export const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scaleX(-1);
  @media (max-width: ${BREAKPOINTS.tablet}) {
    width: auto;
    transform: none;
    -webkit-mask-image: -webkit-gradient(
      linear,
      left bottom,
      left top,
      from(rgba(0, 0, 0, 0.7)),
      to(rgba(0, 0, 0, 0))
    );
  }
`;
