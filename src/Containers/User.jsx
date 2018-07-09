import React,{Component} from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {Box,Spinner,Text,IconButton,Mask,Image,Avatar,Button,Heading,Column} from 'gestalt';
import Tabs from '../Components/Tabs';
import HeaderContainer from '../Components/HeaderContainer';
import PageLoading from '../Components/PageLoading';

import {errorReply,imageUrl} from 'tools_';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Route} from 'react-router-dom';
import * as configActs from '../actions/config';
import UserPosts from './UserPosts';
import Loadable from 'react-loadable';
import FollowUserButton from 'com_/FollowUserButton';
import FollowCountButton from 'com_/FollowCountButton';

const LoadableUserPosts = Loadable({
  loader: () => import(/* webpackChunkName: 'UserPosts' */ './UserPosts'),
  loading:PageLoading
});
const LoadableUserLikes = Loadable({
  loader: () => import(/* webpackChunkName: 'UserLikes' */ './UserLikes'),
  loading:PageLoading
});



const UserHeader=({goBack})=>(
  <HeaderContainer>
    <Box marginLeft={-3} flex="grow">
    <IconButton accessibilityLabel="返回" icon="arrow-back" onClick={goBack} />
    </Box>
    <Box>
      <FollowUserButton />
    </Box>
  </HeaderContainer>
)

const SelfHeader=({userName})=>(
  <HeaderContainer>
    <Box flex="grow">
    <Text >{userName}</Text>
    </Box>
    <Box >
      <Link to="/create/">
        <IconButton accessibilityLabel="发布" icon="add" />
      </Link>
    </Box>
    <Box marginRight={-3}>
      <Link to="/settings/">
        <IconButton accessibilityLabel="设置" icon="cog" />
      </Link>
    </Box>
  </HeaderContainer>
)
const UserCard=({user})=>{
  if(!user)return null;
  return (
    <Box direction="row" display="flex">
      <Box flex="grow">
      <Heading size="xs">{user.nick_name}</Heading>
      </Box>
      <Box marginLeft={1} column={4} flex="none"><Avatar  name="Long" src={imageUrl(user.avatar)} /></Box>
    </Box>
    )
}

class User extends Component{
  state={tabIndex:0}
  componentWillReceiveProps(nextProps){
    if(nextProps.data && nextProps.data.error){
      errorReply({error:nextProps.data.error,push:nextProps.history.push})
    }
  }

  render(){
    let { data: { error,user, refetch ,fetchMore,loading},history:{goBack,push},
    location:{pathname},
    match:{params:{name:userName}},
    selfUser}=this.props;
    if(loading){
      return <PageLoading />
    }
    const isSlef=selfUser && selfUser.name==userName;
    const name=userName || user.name;
    //tabs
    let tabsData=[
            /*{
              text: "收藏集"
            },*/
            {
              text: "帖子",
              href: `/${name}/post`
            },
            {
              text: "喜欢",
              href: `/${name}/like`
            }
           ];
    let tabsIndex=tabsData.findIndex(item=>pathname.startsWith(item.href));
    tabsIndex=tabsIndex<0?0:tabsIndex;
    return (
      <div>
        <Box paddingX={4}>
          {isSlef?<SelfHeader userName={userName}/>:<UserHeader goBack={goBack}/>}
          <UserCard user={user}/>
          <Box direction="row" display="flex" marginTop={3}>
            <Column span={5}>
              <FollowCountButton to={`/${name}/following`}>
                <Text bold size="sm">0</Text>
                <Text bold size="sm" color="gray">我关注的</Text>
              </FollowCountButton>
            </Column>
            <Column span={5}>
              <FollowCountButton to={`/${name}/followers`}>
                <Text bold size="sm">0</Text>
                <Text bold size="sm" color="gray">关注我的</Text>
              </FollowCountButton>
            </Column>
           
            {/* <Column span={6}>
             <FolloButton to="#">
                 <Text bold size="sm" align="right" truncate={true} overflow="breakWord">
                  https://www.pinterest.com/alivaezbarzani/boards
                 </Text>
              </FolloButton>
            </Column>*/}
          </Box>
          <Box marginTop={4}>
          <Tabs
             tabs={tabsData}
             activeTabIndex={tabsIndex}
             onChange={(e)=>{}}
          />
          </Box>
        </Box>
        <Box marginTop={3} paddingX={2}>
          {tabsIndex==0 && <LoadableUserPosts userName={userName} minCols={2}/>}
          {tabsIndex==1 && <LoadableUserLikes userName={userName} minCols={2}/>}
        </Box>
     </div>
    );
  }
}

const mapStateToProps=(state)=>({
  selfUser:state.config.selfUser
})
const mapDispatchToProps=(dispatch)=>bindActionCreators({

},dispatch)

export default graphql(gql`
  query($name:String){
    user(name:$name){
      id
      name
      nick_name
      avatar
    }
  }
`,{
  options:(props)=>{
      return {
      variables:{
        name:props.match.params.name||null,
      }
  }},
})(

connect(mapStateToProps,mapDispatchToProps)(User)

);