import React,{Component} from 'react';
import styled from 'styled-components';
const IconButtonBase=styled.a`
  background-color: #bd081c;
  border-radius: 4px;
  padding: 10px 14px 9px 8px;

  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  display: inline-block;
  text-decoration: none;
  color:#fff;
  font-weight:900;
  font-size:14px;
  margin-left:10px;
  line-height: 1.2;
  height:36px;
  & svg{
    fill: currentColor;
    stroke-width: 0;
    vertical-align: middle;
    display: inline-block;
    color:#fff;
    padding:0 4px;
  }
`
export const RedButton=IconButtonBase.extend`
  background-color: #bd081c;
  color:#fff;
  & svg{
    color:#fff;
  }`
export const GrayButton=IconButtonBase.extend`
  background-color: #efefef;
  color:#555;
  & svg{
    color:#555;
  }`