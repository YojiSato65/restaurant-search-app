import styled from '@emotion/styled';
import { Input } from '@tablecheck/tablekit-input';
import { Spinner } from '@tablecheck/tablekit-spinner';
import { Link } from 'react-router-dom';

export const SearchPageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SearchInput = styled(Input)`
  width: min(90%, 500px);
  box-shadow: inset 0px 0px 0px 1px rgb(0 0 0 / 11%);
  overflow-y: scroll;
  max-height: 50vh;
`;

export const SearchSpinner = styled(Spinner)`
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
`;

export const AutocompleteLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: rgb(50, 50, 50);
  font-size: min(14px, 3vw);
`;
