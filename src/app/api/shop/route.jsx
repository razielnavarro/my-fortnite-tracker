import { NextResponse } from 'next/server'

export async function GET(req, res) {
    const apiKey = process.env.FORTNITE_API_KEY_SHOP;
  
    try {
      const apiUrl = "https://fnbr.co/api/shop";
      const response = await fetch(apiUrl, {
        headers: {
          'x-api-key': apiKey
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch data xdxdd");
      }
  
      const data = await response.json();
      return NextResponse.json(data.data, { status: 200 });
    } catch (error) {
      console.error(error.message);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }