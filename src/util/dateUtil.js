export function nowISODate() {
  const d = new Date();
  return (
    d.getFullYear() +
    "-" +
    String(d.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(d.getDate()).padStart(2, "0")
  );
}

export function subDaysISO(isoDate, days) {
  const [y, m, d] = isoDate.split("-").map(Number);

  // build as UTC date to avoid timezone shifting
  const date = new Date(Date.UTC(y, m - 1, d));
  date.setUTCDate(date.getUTCDate() - days);

  return date.toISOString().slice(0, 10);
}

export function isISOInRange(isoDate, start, end) {
  return isoDate >= start && isoDate <= end;
}
