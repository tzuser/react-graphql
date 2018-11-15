import React, {  useState, useEffect, useContext } from 'react';

//输入框
export function useTextField(initialValue) {
  let [value, setValue] = useState(initialValue);
  function handleChange(e) {
    setValue(e.value);
  }
  useEffect( () => {
      setValue(initialValue);
    }, [initialValue])
  return {
    value,
    onChange: handleChange,
  };
}

//选择框
export function useSelectList(initialValue) {
  return useTextField(initialValue);
}

// 屏幕宽度
export function useWindowWidth() {
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