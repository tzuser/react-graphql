import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Image, Box, Text, Button, IconButton } from 'gestalt';
import HeaderContainer from '../Components/HeaderContainer';
import styled from 'styled-components';

import hiddenFooter from '../Components/HiddenFooter';
import AddPhoto from '../Components/AddPhoto';
import { imageUrl } from '_tools';
import Markdown from 'com_/Markdown';
const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const EditText = styled.textarea`
  flex-shrink: 0;
  width: 50%;
  border: 0;
  background: #eee;
  padding: 18px;
  box-sizing: border-box;
  resize: none;
  @media screen and (max-width: 574px) {
    width: 100%;
    &.hidden {
      display: none;
    }
  }
`;
const Content = styled.div`
  flex-shrink: 0;
  width: 50%;
  padding-left: 10px;
  overflow: auto;
  box-sizing: border-box;
  @media screen and (max-width: 574px) {
    width: 100%;
    display: none;
    &.show {
      display: block;
    }
  }
`;
const CreteHeader = ({ goBack, onPerview, preview }) => (
  <HeaderContainer>
    <Box marginLeft={-3}>
      <IconButton accessibilityLabel="返回" icon="arrow-back" onClick={goBack} />
    </Box>
    <Box flex="grow">
      <Text bold size="lg">
        创作
      </Text>
    </Box>
    <Box smDisplay="none" display="block">
      <Button
        type="button"
        onClick={onPerview}
        text={preview ? '编辑' : '预览'}
        size="sm"
        color="gray"
      />
    </Box>
    <Box marginLeft={2}>
      <Button type="submit" text="发布" size="sm" color="red" />
    </Box>
  </HeaderContainer>
);
class Create extends Component {
  state = {
    addPhoto: false,
    errorOpen: false,
    message: '',
    type: 'article',
    photos: [],
    content: '',
    thumbnail: '',
    preview: false,
  };
  addPhoto(data) {
    delete data.__typename;
    if (!this.state.thumbnail) {
      this.setState({ thumbnail: data.url });
    }

    this.setState({ photos: this.state.photos.concat([data]), type: 'photo' });
  }
  render() {
    let {
      mutate,
      history: { goBack, push },
      setSelfAct,
    } = this.props;
    let { preview } = this.state;
    return (
      <React.Fragment>
        <EditForm
          onSubmit={e => {
            e.preventDefault();
            mutate({
              variables: {
                type: this.state.type,
                content: this.state.content,
                photos: this.state.photos,
                thumbnail: this.state.thumbnail,
              },
            })
              .then(({ data }) => {
                //setSelfAct({name:this.state.name,token:data.data.login});
                //goBack()
                push(`/Post/${data.addPost}`);
              })
              .catch(err => {
                console.log(err);
                this.setState({
                  message: err.graphQLErrors[0].message,
                  errorOpen: true,
                });
              });
          }}
        >
          <CreteHeader
            goBack={goBack}
            preview={preview}
            onPerview={e => {
              this.setState({ preview: !preview });
            }}
          />
          <div>
            {this.state.photos.map((item, key) => {
              return (
                <Image
                  key={key}
                  alt="创作"
                  color="#fff"
                  naturalHeight={item.height}
                  naturalWidth={item.width}
                  src={imageUrl(item.url)}
                />
              );
            })}
          </div>
          <Box direction="row" flex="grow" display="flex">
            <EditText
              onChange={e => this.setState({ content: e.target.value })}
              id="aboutme"
              placeholder="说点什么"
              value={this.state.content}
              rows={6}
              className={preview ? 'hidden' : 'show'}
            />
            <Content className={preview ? 'show' : 'hidden'}>
              <Markdown source={this.state.content} />
            </Content>
          </Box>
        </EditForm>
        {this.state.addPhoto && (
          <AddPhoto
            onDismiss={() => this.setState({ addPhoto: false })}
            addPhoto={this.addPhoto.bind(this)}
          />
        )}
      </React.Fragment>
    );
  }
}

export default graphql(gql`
  mutation addPost($type: String!, $photos: [PhotoInput!], $content: String, $thumbnail: String) {
    addPost(input: { content: $content, type: $type, photos: $photos, thumbnail: $thumbnail })
  }
`)(hiddenFooter(Create));

/* <div style={{height:56}}>
          <Box color="white" direction="row" display="flex"  position="fixed" left={true} right={true} bottom={true} paddingY={2} paddingX={4}>
          <Box marginLeft={-3}>
            <IconButton
            accessibilityLabel="Love"
            bgColor="white"
            icon="camera"
            onClick={()=>{
              this.setState({addPhoto:true})
            }}
            />
          </Box>
          <Box marginLeft={2}>
            <IconButton
            accessibilityLabel="Love"
            bgColor="white"
            icon="sound"
            />
          </Box>
          <Box marginLeft={2}>
            <IconButton
            accessibilityLabel="Love"
            bgColor="white"
            icon="play"
            />
          </Box>
          </Box>
        </div>*/
