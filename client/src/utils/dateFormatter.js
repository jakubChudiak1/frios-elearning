export const dateFormater = (date) => {
  const euDate = new Date(date);
  const formatedDate = `${euDate.getDate()}-${
    euDate.getMonth() + 1
  }-${euDate.getFullYear()} ${euDate.getHours()}:${euDate.getMinutes()}:${euDate.getSeconds()}`;
  return formatedDate;
};
