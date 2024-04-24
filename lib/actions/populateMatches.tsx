export default async function populateMatches() {
  const response = await fetch('https://mcsrranked.com/api/playoffs', {
    cache: 'no-cache',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch matches');
  }

  const data = await response.json();
  const matchData = await fetch('/api/match', {
    method: 'POST',
    body: JSON.stringify(data.data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return matchData;
}
