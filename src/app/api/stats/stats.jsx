// pages/api/createProfile.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const formData = new FormData(req);
      const playerName = formData.get('name');
      const timeWindow = 'lifetime';
      const accountType = 'epic';
      const image = 'all';

      const apiUrl = `https://fortnite-api.com/v2/stats/br/v2?name=${playerName}&accountType=${accountType}&timeWindow=${timeWindow}&image=${image}`;

      // Make the API request to the Fortnite API
      const apiResponse = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: process.env.API_KEY
        },
      });


      const data = await apiResponse.json();

      if (!apiResponse.ok) {
        // Log the entire response for debugging
        console.error('Fortnite API Error:', data);
        throw new Error('Failed to fetch Fortnite API data');
      }

      // Extract the image URL from the data
      const imageUrl = data.data.image;

      // You can perform any server-side logic here (e.g., saving to a database)

      // Redirect to the profile page after creating the profile
      res.redirect(`/profile/${encodeURIComponent(playerName)}`);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
