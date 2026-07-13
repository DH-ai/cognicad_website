
export function getTimeStamp(): string {
  const now = new Date();

  // Extract individual components
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0'); // January is 0!
  const year = now.getFullYear();

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  // Combine into your desired format (e.g., "YYYY-MM-DD HH:mm")
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}