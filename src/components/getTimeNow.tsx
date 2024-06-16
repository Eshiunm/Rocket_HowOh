const getTimeNow = () => {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1);
  const day = String(date.getDate());
  const hours = String(date.getHours());
  const minutes = String(date.getMinutes());

  return `${year}年${month}月${day}日 ${hours}:${minutes}`;
}

export default getTimeNow;