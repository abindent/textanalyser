export const convertToDynamicLocalTime = (
  utcDateString: string,
  timeZone: string
): string => {
  const utcDate = new Date(utcDateString);

  const localDate = new Intl.DateTimeFormat("en-IN", {
    timeZone, // Dynamic timezone
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(utcDate);

  return localDate;
};
