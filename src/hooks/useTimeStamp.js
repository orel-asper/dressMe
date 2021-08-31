export default useTimeStamp = () => {
  let currentdate = new Date(),
    datetime = `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`,
    datetimeObj = {
      hours: currentdate.getHours(),
      minutes: currentdate.getMinutes(),
      seconds: currentdate.getSeconds(),
    };

  return datetimeObj;
};
