export const getLocalDate = () =>
  new Date().toLocaleString("sv-SE", { dateStyle: "short" });
