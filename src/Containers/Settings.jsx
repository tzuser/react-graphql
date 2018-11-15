import React, { Component } from 'react';
import hiddenFooter from '../Components/HiddenFooter';
import { Box, Label, Text, Button, TextField, SelectList, Heading, IconButton } from 'gestalt';
import initSelf from 'com_/InitSelf';
import HeaderContainer from 'com_/HeaderContainer';
import { useTextField, useSelectList } from '_hooks';
import { graphql, Mutation } from 'react-apollo';
import editUserQuery from 'gql_/editUser.gql';
import selfQuery from 'gql_/self.gql';
import logoutMutation from 'gql_/logout.gql';

function Settings(props) {
  const {
    selfUser,
    history: { goBack, push },
    mutate,
  } = props;
  let sexOptions = [{ label: '男', value: '1' }, { label: '女', value: '2' }];
  let nickName = useTextField(selfUser.nick_name);
  let avatar = useTextField(selfUser.avatar);
  let website = useTextField(selfUser.website || '');
  let sex = useSelectList(selfUser.sex);

  return (
    <React.Fragment>
      <form
        onSubmit={e => {
          e.preventDefault();
          mutate({
            variables: {
              nick_name: nickName.value,
              avatar: avatar.value,
              sex: +sex.value,
              website: website.value,
            },
            //更新缓存
            update: (store, { data: { editUser } }) => {
              const data = store.readQuery({ query: selfQuery });
              Object.assign(data.self, editUser);
              store.writeQuery({ query: selfQuery, data });
            },
          })
            .then(({ data }) => {
              console.log('修改成功');
            })
            .catch(err => {
              console.log('修改失败');
            });
          console.log('提交');
        }}
      >
        <CreteHeader goBack={goBack} />

        <Box padding={4}>
          <Heading size="xs">{selfUser.name}</Heading>
          <Box marginTop={6}>
            <ItemField name="nickName" label="昵称" {...nickName} />
            <ItemField name="avatar" label="头像" {...avatar} />
            <ItemField name="website" label="web 站点" {...website} />
            <Box>
              <Box paddingY={2}>
                <Label htmlFor="sex">
                  <Text>性别</Text>
                </Label>
              </Box>
              <SelectList
                id="sex"
                name="sex"
                options={sexOptions}
                placeholder="选择性别"
                {...sex}
              />
            </Box>
            <Box marginTop={6}>
              <Mutation
                mutation={logoutMutation}
                onCompleted={data => {
                  if (data) push('/login');
                }}
              >
                {logout => (
                  <Button
                    text="注销"
                    onClick={e => {
                      logout();
                    }}
                  />
                )}
              </Mutation>
            </Box>
          </Box>
        </Box>
      </form>
    </React.Fragment>
  );
}
Settings = hiddenFooter(Settings);
Settings = initSelf(true)(Settings);
Settings = graphql(editUserQuery)(Settings);
export default Settings;

function ItemField({ name, label, ...other }) {
  return (
    <Box marginBottom={4}>
      <Box marginBottom={2}>
        <Label htmlFor={name}>
          <Text>{label}</Text>
        </Label>
      </Box>
      <TextField id={name} {...other} />
    </Box>
  );
}

function CreteHeader({ goBack }) {
  return (
    <HeaderContainer>
      <Box marginLeft={-3}>
        <IconButton accessibilityLabel="返回" icon="arrow-back" onClick={goBack} />
      </Box>
      <Box flex="grow">
        <Text bold size="lg">
          设置
        </Text>
      </Box>
      <Box>
        <Button type="submit" text="保存" size="sm" color="red" />
      </Box>
    </HeaderContainer>
  );
}
