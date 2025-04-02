export const formatDate = (dateString, withTime = false) => {
  const date = new Date(dateString);
  const dayOfWeek = date.toLocaleString('en', { weekday: 'long' });
  if (withTime) {
    const time = date.toLocaleString('en', { hour: '2-digit', minute: '2-digit', hour12: false });
    return `${dayOfWeek} ${time}`;
  }
  return dayOfWeek;
};