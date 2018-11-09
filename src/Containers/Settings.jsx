import React, { Component, useState, useEffect, useContext } from 'react';
import hiddenFooter from '../Components/HiddenFooter';
import { Box, Label, Text, Button, TextField, SelectList, Heading, IconButton } from 'gestalt';
import initSelf from 'com_/InitSelf';
import HeaderContainer from 'com_/HeaderContainer';

const CreteHeader = ({ goBack }) => (
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

function Settings(props) {
  const {
    selfUser,
    history: { goBack },
  } = props;
  let sexOptions = [{ label: '男', value: '1' }, { label: '女', value: '2' }];
  let nickName = useTextField(selfUser.nick_name);
  let avatar = useTextField(selfUser.avatar);
  let sex = useSelectList('1');

  return (
    <React.Fragment>
      <CreteHeader goBack={goBack} />
      <Box padding={4}>
        <Heading size="xs">{selfUser.name}</Heading>
        <Box marginTop={6}>
          <ItemField name="nickName" label="昵称" {...nickName} />
          <ItemField name="avatar" label="头像" {...avatar} />
          <Box>
            <Box paddingY={2}>
              <Label htmlFor="sex">
                <Text>性别</Text>
              </Label>
            </Box>
            <SelectList id="sex" name="sex" options={sexOptions} placeholder="选择性别" {...sex} />
          </Box>
          <Box marginTop={6}>
            <Button text="注销" />
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default initSelf(hiddenFooter(Settings), true);

function useTextField(initialValue) {
  let [value, setValue] = useState(initialValue);
  function handleChange(e) {
    setValue(e.value);
  }
  return {
    value,
    onChange: handleChange,
  };
}

function useSelectList(initialValue) {
  return useTextField(initialValue);
}

function useWindowWidth() {
  let [width, setWidth] = useState(window.innerWidth);
  useEffect(
    () => {
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    },
    [width]
  );
  function handleResize(e) {
    setWidth(window.innerWidth);
  }
  return width;
}

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
