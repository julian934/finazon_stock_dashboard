export async function fetchDataFromExternalAPI(url:string) {
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