const createID = () => {
  let ID = "";
  const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#¤%&/()=?@£$€{[]}-.,<>;:_|";
  for (var i = 0; i < 64; i++) {
    ID += char.charAt(Math.floor(Math.random() * 89));
  }
  return ID;
};

export default createID;
