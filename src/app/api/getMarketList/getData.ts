import { NextApiRequest, NextApiResponse } from 'next';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export async function fetchDataFromExternalAPI() {
    const apiKey = process.env.NEXT_PUBLIC_YELP_API_KEY;
    const url = 'https://api.finazon.io/latest/tickers/stocks?dataset=us_stocks_essential';

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
export function useFetchData() {
    return useQuery<any,Error>({
        queryKey:['fetchData'], 
        queryFn:fetchDataFromExternalAPI,
        staleTime:3000
    });
}

export default async function getData(request: NextApiRequest, res: NextApiResponse) {
    try {
        const data = await fetchDataFromExternalAPI();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

