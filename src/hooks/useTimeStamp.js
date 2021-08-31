export default useTimeStamp = () => {
  let currentdate = new Date(),
    datetime = `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;

  return datetime;
};
