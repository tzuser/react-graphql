import React, { Component } from 'react';
import Header from '../Components/Header';
import Block from 'com_/Block';
import { Box, Spinner, Text, Heading } from 'gestalt';
import { ListLink, ListTitle } from '../Components/ListButton';

class Find extends Component {
  render() {
    return (
      <div>
        <Header />
        <Block>
          <ListLink to={`/search/all/流行`} text="流行" />
          <ListLink to={`/search/all/Gifs`} text="Gifs" />
          <ListLink to={`/search/all/视频`} text="视频" />
          <ListTitle text="全部分类" />
          <ListLink to={`/search/all/a`} text="a" />
        </Block>
      </div>
    );
  }
}

export default Find;
