import { redirect } from "next/navigation";
export default async function GET(req, res) {
  if (req.method === 'GET') {
    try {
      const name = await req.json;
      const timeWindow = 'lifetime';
      const accountType = 'epic';
      const image = 'all';

      const apiUrl = `https://fortnite-api.com/v2/stats/br/v2?name=${name}&accountType=${accountType}&timeWindow=${timeWindow}&image=${image}`;

      // Set up the Headers object with the authorization header
      const headers = new Headers();
      headers.append('Authorization', process.env.API_KEY);

      // Make the API request to the Fortnite API
      const apiResponse = await fetch(apiUrl, { headers });
      const data = await apiResponse.json();

      // Extract the image URL from the data
      const imageUrl = data.data.image;
      res.status(200).json({ imageUrl });
      redirect('/profile/${encodeURIComponent(name)}')
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}