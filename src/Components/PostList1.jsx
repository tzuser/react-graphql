import React from 'react';
import { Avatar, Box, Masonry, Spinner, Text, Image, Mask, Icon } from 'gestalt';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { imageUrl, countColumn } from '_tools';
import { connect } from 'react-redux';
import Markdown from 'com_/Markdown';

const ItemImg = styled(Link)`
  margin-bottom: 2px;
  &:last-child {
    margin-bottom: 0;
  }
`;
const Card = styled.div`
  transition: all 0.1s;
  border-radius: 10px;
  padding: 8px;
  transform: scale(1, 1);
  user-select: none;
  box-sizing: border-box;
  &:active {
    transform: scale(0.99, 0.99);
    background: rgb(239, 239, 239);
  }
`;

const PlayIcon = styled.div`
  position: relative;
  svg {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    margin-top: -12px;
    margin-left: -12px;
  }
`;

const ThumbnailNode = ({ thumbnail, itemTo }) => (
  <Mask shape="rounded">
    <ItemImg to={itemTo}>
      <Image
        alt=""
        naturalHeight={thumbnail.height}
        naturalWidth={thumbnail.width}
        src={imageUrl(thumbnail.url)}
      />
    </ItemImg>
  </Mask>
);
const UserNode = ({ user, userTo }) => (
  <Link to={userTo}>
    <Box direction="row" display="flex" alignItems="center" paddingY={1}>
      <Box>
        <Avatar size="sm" src={imageUrl(user.avatar)} name="Long" />
      </Box>
      <Box paddingX={2}>
        <Text bold size={'xs'} inline>
          {user.nick_name}
        </Text>
      </Box>
    </Box>
  </Link>
);
const Photo = ({ userTo, itemTo, user, thumbnail, content, id }) => (
  <div>
    <ThumbnailNode thumbnail={thumbnail} itemTo={itemTo} />
    <Link to={itemTo}>
      <Box>
        <Text overflow="normal" leading="tall" size="xs" overflow="breakWord">
          {content}
        </Text>
      </Box>
    </Link>
    <UserNode user={user} userTo={userTo} />
  </div>
);
const Video = ({ userTo, itemTo, user, thumbnail, content, id }) => (
  <div>
    <PlayIcon>
      <Link to={itemTo}>
        <Icon accessibilityLabel="播放" icon="play" size={24} color="white" />
      </Link>
      <ThumbnailNode thumbnail={thumbnail} itemTo={itemTo} />
    </PlayIcon>
    <Link to={itemTo}>
      <Box>
        <Text overflow="normal" leading="tall" size="xs" overflow="breakWord">
          {content}
        </Text>
      </Box>
    </Link>
    <UserNode user={user} userTo={userTo} />
  </div>
);
const Article = ({ userTo, itemTo, user, thumbnail, content }) => {
  const isText = !thumbnail || !thumbnail.url;
  return (
    <div>
      {!isText && <ThumbnailNode thumbnail={thumbnail} itemTo={itemTo} />}
      <Link to={itemTo}>
        <Box
          shape={isText ? 'rounded' : 'square'}
          color={isText ? 'lightGray' : 'transparent'}
          padding={isText ? 2 : 0}
          overflow="hidden"
        >
          <Markdown source={content.substring(0, 50)} />
        </Box>
      </Link>
      <UserNode user={user} userTo={userTo} />
    </div>
  );
};

/*const mapStateToProps = state => ({
  width: state.config.width,
});
@connect(mapStateToProps)*/
class PostList extends React.Component {
  componentDidMount(){
    console.log('componentDidMount')
  }
  renderItem({ data, itemIdx, addRelatedItems }) {
    let { id, content, type, user, photos, thumbnail } = data;
    let itemTo = {
      pathname: `/post/${id}/`,
    };
    return (
      <Card key={id}>
        {type == 'video' && (
          <Video
            id={id}
            user={user}
            thumbnail={thumbnail}
            content={content}
            itemTo={itemTo}
            userTo={`/${user.name}/`}
          />
        )}
        {type == 'photo' && (
          <Photo
            id={id}
            user={user}
            thumbnail={thumbnail}
            content={content}
            itemTo={itemTo}
            userTo={`/${user.name}/`}
          />
        )}
        {type == 'article' && (
          <Article
            id={id}
            user={user}
            thumbnail={thumbnail}
            content={content}
            itemTo={itemTo}
            userTo={`/${user.name}/`}
          />
        )}
      </Card>
    );
  }
  render() {
    let { list = [], loadItems, store, minCols = 1, virtualize = false } = this.props;
    //let column = countColumn({ minCols, defaultWidth: width });
    return (
        <Masonry
          comp={this.renderItem.bind(this)}
          items={list}
          loadItems={loadItems}
          scrollContainer={() => window}
          minCols={1}
          virtualize={virtualize}
          flexible={true}
          gutterWidth={0}
        />
    );
  }
}

export default PostList;
