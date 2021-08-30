export default useTimeStamp = () => {
  let currentdate = new Date(),
    datetime = ` Last Sync: ${currentdate.getHours()} : ${currentdate.getMinutes()} : ${currentdate.getSeconds()}`;

  return datetime;
};
