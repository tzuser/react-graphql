import React,{Component} from 'react';
import { graphql } from 'react-apollo';
import { Box,Spinner,Text,IconButton,Mask,Image,Avatar,Button,Icon} from 'gestalt';
import HeaderContainer from '../Components/HeaderContainer';
import styled from 'styled-components';
import Scroll from '../Components/Scroll';
import PageLoading from '../Components/PageLoading';
import MoreLikes from './MoreLikes';
import {GrayButton,RedButton} from '../Components/IconButton.jsx';
import { Mutation } from "react-apollo";
import gql from 'graphql-tag';
import {imageUrl,vidoeUrl} from '_tools';
import {errorReply} from '_public';
import {Link} from 'react-router-dom';
import {connect } from 'react-redux';
import LikePostButton from 'com_/post/LikePostButton';
import Block from 'com_/Block';
import DEL_POST from 'gql_/delPost.gql';
import postQuery from 'gql_/post.gql';
const Card=styled.div`
  transition: all 0.1s;
  border-radius:10px;
  transform: scale(1,1);
  &:active{
    transform: scale(0.99,0.99);
    background:rgb(239, 239, 239);
  }
`
const ItemImg=styled.div`
margin-bottom:2px;
&:last-child{
  margin-bottom:0;
}`

const Tag=styled(Link)`
padding:5px 10px;
color:#999;
font-size:13px;
`

const UserNode=({user,content,userClick})=>(
  <Box direction="row" marginTop={2} display="flex" alignItems="start" paddingY={2}>
    <div onClick={(e)=>userClick(e,user)}>
      <Avatar
      size="md"
      src={imageUrl(user.avatar)}
      name="Long"
      />
    </div>
    <Box paddingX={2}>
      <div  onClick={(e)=>userClick(e,user)}>
        <Text bold size="xs" inline >{user.nick_name}</Text>
      </div>
      <Box paddingY={1}>
        <Text overflow="normal" leading="tall" size="sm">{content}</Text>
      </Box>
    </Box>
  </Box>
)

const OtherHeader=({isAdmin,postID,goBack,push})=>{
  return (<HeaderContainer transparent={false}>
          <Box marginLeft={-3} flex="grow">
          <IconButton accessibilityLabel="返回" icon="arrow-back" onClick={()=>goBack()} />
          </Box>
          {isAdmin && <Box >
            <DeleteButton postID={postID} goBack={goBack} push={push}/>
          </Box>}
          <Box>
          {/*<GrayButton>
            <Icon accessibilityLabel="分享" icon="share" onClick={()=>goBack()} />
            分享
          </GrayButton>*/}
            <LikePostButton postID={postID} push={push} initLike={false} />
          </Box>
          
        </HeaderContainer>)
}

const DeleteButton=({postID,goBack,push})=>(
  <Mutation mutation={DEL_POST}>
  {(mutate)=>(            
    <Button text="删除" size="sm" onClick={()=>{
      mutate({variables:{post:postID}}).then(data=>{
        goBack()
      }).catch(error=>{
        errorReply({error,push})
      });
    }}/>
  )}
  </Mutation>
)

const SelfHeader=({postID,goBack,push})=>{
  return (<HeaderContainer transparent={false}>
          <Box marginLeft={-3} flex="grow">
          <IconButton accessibilityLabel="返回" icon="arrow-back" onClick={()=>goBack()} />
          </Box>
          <Box>
          {/*<GrayButton>
            <Icon accessibilityLabel="分享" icon="share" onClick={()=>goBack()} />
            分享
          </GrayButton>*/}
          </Box>
          <Box marginLeft={2}>
            <DeleteButton postID={postID} goBack={goBack} push={push}/>
          </Box>
        </HeaderContainer>)
}

const Video=({src})=>{
  return <video controls="controls" width="100%" autoPlay="autoplay">
     <source src={vidoeUrl(src)}  type="video/mp4"/>
  </video>
}
const Photo=({photos,thumbnail})=>{
  return <Card onClick={(e)=>(console.log('点击'))}>
              <Mask shape="rounded">
                {photos.length==0 && <ItemImg >
                     <Image
                     alt=""
                     naturalHeight={thumbnail.height}
                     naturalWidth={thumbnail.width}
                     src={imageUrl(thumbnail.url)}
                     />
                   </ItemImg>}

                {photos.length>0 && photos.map((item,key)=>(
                   <ItemImg key={key}>
                     <Image
                     alt=""
                     naturalHeight={item.height}
                     naturalWidth={item.width}
                     src={imageUrl(item.url)}
                     />
                   </ItemImg>))}
              </Mask>
            </Card>
}
const Content=({post,postID,push})=>{
  let {user,content,type,tags,commentNum,hotNum,likeNum,src,thumbnail}=post;
  let photos=post.photos || [];
  return (
    <Block>
        {type=='video' && <Video src={src}/>}
        {type=='photo' && <Photo photos={photos} thumbnail={thumbnail}/>}
        <UserNode user={user} content={content} userClick={(e,data)=>push(`/${data.name}/`)}/>
        <Box direction="row" display="flex" wrap={true} >
          <Box>
            <Text color="gray" size="xs">热度 {hotNum}</Text>
          </Box>
          <Box marginLeft={2}>
            <Text color="gray" size="xs">喜欢 {likeNum}</Text>
          </Box>
        </Box>
        <Box paddingY={2}>
          <Link to={`/comments/${postID}/`}><Button text={`添加评论(${commentNum})`} /></Link>
        </Box>
        <hr />
        <Box direction="row" display="flex" wrap={true} >
        {tags.map((item,key)=><Tag to={`/search/${item}`} key={key} padding={2}>#{item}</Tag>)}
        </Box>
      </Block>
        )
}
class Post extends Component{
  render(){
    let { data: {error, post, refetch ,fetchMore,loading},history:{goBack,push},match:{params:{id}},selfUser}=this.props;
    /*if(loading ){
      return <PageLoading />
    }*/
    if(error){
      return (<div>文章没找到或已被删除!</div>)
    }
    let isSelf=false;
    let isAdmin=false;

    if(!loading && post){
      isSelf=selfUser && selfUser.name==post.user.name;
      isAdmin=selfUser && selfUser.roles.includes('admin');
    }
    return (
      <div>
        {isSelf?<SelfHeader postID={id} goBack={goBack} />:<OtherHeader isAdmin={isAdmin} postID={id} goBack={goBack} push={push}/>}
        {loading && <PageLoading />}
        {!loading && 
          <div>
            <Content post={post} postID={id} push={push}/>
            <Box paddingX={4} marginTop={2}>
              <Text bold>相似</Text>
            </Box>
            <MoreLikes id={id}/>
          </div>
        }
     </div>
    );
  }
}


const mapStateToProps=(state)=>({
  selfUser:state.config.selfUser
})


export default graphql(postQuery,
{options:(props)=>{
    return {
      variables:{
        id:props.match.params.id
      },
      //fetchPolicy: "network-only"
    }
  }
})(
  connect(mapStateToProps)(Post)
);
