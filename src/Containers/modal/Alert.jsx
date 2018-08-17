import React from 'react';
import { Button,Modal,Box,Text} from 'gestalt';

class Alert extends React.Component {
  render() {
    const {title='提示',content,onClose,onCancel,onConfirm } = this.props;
    return (
      <Modal
        accessibilityCloseLabel="关闭"
        accessibilityModalLabel="确认"
        heading={title}
        onDismiss={onClose}
        footer={
          <Box
            display="flex"
            marginLeft={-1}
            marginRight={-1}
            justifyContent="end"
          >
            <Box padding={1}>
              <Button
                size="lg"
                text="取消"
                onClick={()=>{
                  if(onCancel)onCancel();//执行取消
                  if(onClose)onClose();//关闭
                }}
              />
            </Box>
            <Box padding={1}>
              <Button
                size="lg"
                color="red"
                text="确认"
                onClick={()=>{
                  if(onConfirm)onConfirm();
                  if(onClose)onClose();//关闭
                }}
              />
            </Box>
          </Box>
        }
        role="alertdialog"
        size="sm"
      >
        <Box paddingX={4} paddingY={2}>
          <Text>
            {content}
          </Text>
        </Box>
      </Modal>
    );
  }
}
export default Alert