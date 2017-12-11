const deepClone = (obj) => {
  const string = JSON.stringify(obj);
  return JSON.parse(string);
};

export default deepClone;
