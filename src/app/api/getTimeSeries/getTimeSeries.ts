import { NextApiRequest, NextApiResponse } from 'next';

const myHeaders = new Headers();
myHeaders.append("Authorization", "apikey 82d7e7011dd94d09bc862d75e429d9d6nw");
const requestOptions:any = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
};

export default async function getTimeSeries(request: NextApiRequest, response: NextApiResponse) {
    try {
        const res = await fetch('https://api.finazon.io/latest/time_series', requestOptions);
        const data = await res.json();
        response.status(200).json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
}

/*import { NextResponse } from "next/server";
import { type NextApiRequest } from "next";
const myHeaders = new Headers();
myHeaders.append("Authorization", "apikey 82d7e7011dd94d09bc862d75e429d9d6nw");
const requestOptions:any = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };
export async function GET(request:NextApiRequest){
    const response=fetch('https://api.finazon.io/latest/time_series',requestOptions)
    //destructure response
    console.log(response)
    return NextResponse.json(response)
}
*/