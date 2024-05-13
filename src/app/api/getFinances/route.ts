import { NextApiRequest,NextApiResponse } from "next";
/*export async function fetchDataFromExternalAPI(url:string) {
    console.log(url)
    const searchParams=url
    //const query=searchParams.get('ticker')
    const apiKey = process.env.NEXT_PUBLIC_YELP_API_KEY;
    
    //const currData = `https://api.finazon.io/latest/ticker/snapshot?dataset=us_stocks_essential&ticker=${query}`;

    //Adding headers to the fetch request
    const response = await fetch(url, {
        headers: {
            Authorization: `apikey 0bab36b1007446a08c5ff1729a9dac5b2k`
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch data from external API');
    }
    return await response.json();
}
*/

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const apiKey = process.env.NEXT_PUBLIC_YELP_API_KEY;
        const url = req.query.url as string; // Assuming you're passing the URL as a query parameter

        // Adding headers to the fetch request
        const response = await fetch(url, {
            headers: {
                Authorization: `apikey ${apiKey}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data from external API');
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}