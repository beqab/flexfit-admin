export const formatDateUxFriendly = (date: Date | string): string => {
  const now = new Date();
  const visitDate = new Date(date);
  ``;
  const diffMs = now.getTime() - visitDate.getTime();

  const mins = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7));

  // Less than 1 hour -> show minutes ago
  if (mins < 60 && mins >= 0) {
    return `${mins === 0 ? 1 : mins} ${
      mins === 1 ? "minute ago" : "minutes ago"
    }`;
  }
  // Less than 24 hours -> show hours ago
  if (hours < 24 && hours >= 1) {
    return `${hours} ${hours === 1 ? "hour ago" : "hours ago"}`;
  }
  // Less than 7 days -> show days ago
  if (days < 7 && days >= 1) {
    return `${days} ${days === 1 ? "day ago" : "days ago"}`;
  }
  // More than 7 days -> show full date/time: yyyy-mm-dd hh:mm
  // (or you can always show full date after a week)
  const yyyy = visitDate.getFullYear();
  const mm = String(visitDate.getMonth() + 1).padStart(2, "0");
  const dd = String(visitDate.getDate()).padStart(2, "0");
  const h = String(visitDate.getHours()).padStart(2, "0");
  const m = String(visitDate.getMinutes()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd} ${h}:${m}`;
};
