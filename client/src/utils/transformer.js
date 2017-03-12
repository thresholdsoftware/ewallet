export const getTableHeader = (result = []) => {
  let headers = [];
  result.every((eachrow) => {
    headers = Object.keys(eachrow);
    return false;
  });
  return headers;
};
