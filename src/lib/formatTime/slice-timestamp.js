export default((time) => {
  const newFormat = time.replace("\r\n", "").trim().slice(0, 10);
  return newFormat;
})