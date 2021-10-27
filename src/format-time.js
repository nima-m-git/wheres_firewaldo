const formatTime = (millisecs) => {
  const pretty = (time) => (time > 10 ? time : '0' + time);
  const mins = pretty(Math.floor(millisecs / 60000));
  const secs = pretty(Math.floor((millisecs % 60000) / 1000));
  return `${mins}:${secs}`;
};

export { formatTime };
