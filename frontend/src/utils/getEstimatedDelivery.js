const getEstimatedDelivery = () => {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
};
export default getEstimatedDelivery;
