class APIError extends Error{
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}
export default APIError


/*
'不能关注自己!',1


'用户未登录!',1001

'昵称不合法',1002
'昵称已存在！',1002

'用户名不合法',1003
'用户已存在！',1003

"账号或密码错误",1004
'密码不合法',1004

'用户无权限!',1005


'获取文章失败',1015

*/