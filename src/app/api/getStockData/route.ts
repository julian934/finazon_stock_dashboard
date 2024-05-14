import { NextApiRequest, NextApiResponse } from "next";
import { IncomingMessage, ServerResponse } from "http";

const myHeaders = new Headers();
myHeaders.append("Authorization", "apikey 82d7e7011dd94d09bc862d75e429d9d6nw");

const requestOptions: any = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

// Define the type for the 'getData' function's arguments
async function getData(req: NextApiRequest | IncomingMessage, res: NextApiResponse | ServerResponse): Promise<void> {
  try {
    const response = await fetch("https://api.finazon.io/latest/tickers/us_stocks", requestOptions);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);
    // Ensure 'res' is treated as NextApiResponse by using a type assertion
    (res as NextApiResponse).status(200).json(data);
  } catch (error) {
    console.error(error);
    // Ensure 'res' is treated as NextApiResponse by using a type assertion
    (res as NextApiResponse).status(500).json({ error: 'Failed to fetch data' });
  }
}

export { getData as GET };
