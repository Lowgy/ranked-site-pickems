export default async function populateMatches() {
  const response = await fetch('https://mcsrranked.com/api/playoffs', {
    cache: 'no-cache',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch matches');
  }

  const data = await response.json();
  console.log(data.data);
  return data.data;
}
