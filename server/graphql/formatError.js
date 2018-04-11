const {formatError} = require('graphql');

const  fError=(error) => {
  const data = formatError(error);
  const {originalError} = error;
  data.status = originalError && originalError.status;
  return data;
};
export default fError