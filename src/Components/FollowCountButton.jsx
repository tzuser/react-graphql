import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
const FollowCountButton=styled(Link)`
  display:block;
  padding:1px 4px;
  border-radius:6px;
  text-decoration: none;
  &:active{
    background-color:#efefef;
  }
`

export const FollowCountShow=styled.div`
  display:block;
  padding:1px 4px;
  border-radius:6px;
  text-decoration: none;
`
export default FollowCountButton