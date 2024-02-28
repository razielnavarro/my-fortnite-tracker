import { NextResponse } from 'next/server';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");
    const apiKey = process.env.FORTNITE_API_KEY;

    try {
        const accountType = 'epic';
        const timeWindow = 'lifetime';
        const image = 'all';

        const apiUrl = `https://fortnite-api.com/v2/stats/br/v2?name=${name}&accountType=${accountType}&timeWindow=${timeWindow}&image=${image}`;

        const response = await fetch(apiUrl, {
            headers: {
                'Authorization': apiKey,
            },
        });

        console.log('Response Status:', response.status);
        console.log('Response Headers:', response.headers);

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();

        console.log('Received Data:', data);

        // Use NextResponse.json to send JSON response
        return NextResponse.json(data.data, { status: 200 });
    } catch (error) {
        console.error(error.message);

        // Use NextResponse.json to send JSON response
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
