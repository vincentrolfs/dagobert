export const previousDate = (dateString: string): string => {
  // Create a new Date object from the input string
  const date = new Date(dateString);

  // Add one day to the date
  date.setDate(date.getDate() - 1);

  // Format the new date as YYYY-MM-DD
  return date.toISOString().split("T")[0];
};
