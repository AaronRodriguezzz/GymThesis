export const formatDate = (date) => {
  const formatted = date.toLocaleString("en-US", {
    timeZone: "Asia/Manila",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true // set to false for 24h format
  });
  return formatted;
}
