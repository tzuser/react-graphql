import React from 'react';
import { Avatar,Box,Masonry,Spinner,Text,Image,Mask,Icon } from 'gestalt';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {imageUrl} from '../public';
import {connect} from 'react-redux';
//import {bindActionCreators} from 'redux';
const ItemImg=styled(Link)`
margin-bottom:2px;
&:last-child{
  margin-bottom:0;
}
`
const Card=styled.div`
  transition: all 0.1s;
  border-radius:10px;
  padding:8px;
  transform: scale(1,1);
  user-select: none;
  box-sizing: border-box;
  &:active{
    transform: scale(0.99,0.99);
    background:rgb(239, 239, 239);
  }
`

const PlayIcon=styled.div`
  position:relative;
  svg{
    position:absolute;
    z-index:1;
    top:50%;
    left:50%;
    margin-top:-12px;
    margin-left:-12px;

  }
`

/* {photos.map((item,key)=>(
   <ItemImg key={key}>
     <Image
     alt=""
     naturalHeight={item.height}
     naturalWidth={item.width}
     src={item.url}
     />
   </ItemImg>)
 )}*/

const ThumbnailNode=({thumbnail,itemTo})=>(
   <Mask shape="rounded">
     <ItemImg  to={itemTo}>
      <Image
      alt=""
      naturalHeight={thumbnail.height}
      naturalWidth={thumbnail.width}
      src={imageUrl(thumbnail.url)}
      />
    </ItemImg>
  </Mask>
)
const UserNode=({user,userTo})=>(
  <Link to={userTo}>
    <Box direction="row" display="flex" alignItems="center" paddingY={1} >
      <Box>
        <Avatar
        size="sm"
        src={imageUrl(user.avatar)}
        name="Long"
        />
      </Box>
      <Box paddingX={2}>
        <Text bold size={"xs"} inline >{user.nick_name}</Text>
      </Box>
    </Box>
  </Link>
)
const getPhoto=({userTo,itemTo,user,thumbnail,content,id})=>(
  <div>
    <ThumbnailNode  thumbnail={thumbnail} itemTo={itemTo} />
    <Link to={itemTo}>
      <Box>
        <Text overflow="normal" leading="tall" size="xs">{content}</Text>
      </Box>
    </Link>
    <UserNode user={user} userTo={userTo} />
  </div>
)
const getVideo=({userTo,itemTo,user,thumbnail,content,id})=>(
  <div>
    <PlayIcon>
      <Link to={itemTo}>
        <Icon accessibilityLabel="播放" icon="play" size={24} color="white" />
      </Link>
      <ThumbnailNode  thumbnail={thumbnail} itemTo={itemTo} />
    </PlayIcon>
    <Link to={itemTo}>
      <Box>
        <Text overflow="normal" leading="tall" size="xs">{content}</Text>
      </Box>
    </Link>
    <UserNode user={user} userTo={userTo} />
  </div>
)
const getArticle=({userTo,itemTo,user,thumbnail,content})=>{
  const isText=!thumbnail || !thumbnail.url
  return <div>
    {!isText &&<ThumbnailNode thumbnail={thumbnail} itemTo={itemTo} />}
    <Link to={itemTo}>
      <Box 
      shape={isText?"rounded":"square"} 
      color={isText?"lightGray":"transparent"}
      padding={isText?2:0}
      >
        <Text overflow="normal" leading="tall" size={isText?"sm":"xs"}>{content}</Text>
      </Box>
    </Link>
    <UserNode user={user} userTo={userTo}/>
  </div>
}

const mapStateToProps=(state)=>({
  width:state.config.width
})
@connect(mapStateToProps)
class PostList extends React.Component{
  renderItem({data,itemIdx,addRelatedItems}){
    let {id,content,type,user,photos,thumbnail}=data;
    return (
    <Card key={id}>
      {type=="video" && getVideo({
        user,
        thumbnail,
        content,
        id,
        itemTo:`/post/${id}/`,
        userTo:`/${user.name}/`,
      })}
      {type=="photo" && getPhoto({
        user,
        thumbnail,
        content,
        id,
        itemTo:`/post/${id}/`,
        userTo:`/${user.name}/`,
      })}
      {type=="article" && getArticle({
        user,
        thumbnail,
        content,
        itemTo:`/post/${id}/`,
        userTo:`/${user.name}/`,
      })}
    </Card>
    )
  }
  render(){
    let { list=[],loadItems,store,minCols=1,width,virtualize=true }=this.props;
    let newMinCols=minCols;
    if(width>640)newMinCols=2;
    if(width>860)newMinCols=3;
    if(width>1080)newMinCols=4;
    if(width>1400)newMinCols=6;
    //newMinCols=newMinCols*minCols;
    let listWidth=width-16
    let columnWidth=listWidth/newMinCols;

    

    return (
      <div style={{width:listWidth,margin:'0 auto'}}>
        <Masonry
          comp={this.renderItem.bind(this)}
          items={list}
          loadItems={loadItems}
          scrollContainer={()=>window}
          minCols={newMinCols}
          virtualize={virtualize}
          flexible={false}
          columnWidth={columnWidth}
          gutterWidth={0}
        />
      </div>
    );
  }
}


export default PostList;