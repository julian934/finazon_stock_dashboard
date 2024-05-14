import axios from "axios";
import { NextResponse } from "next/server";
const myHeaders = new Headers();
myHeaders.append("Authorization", "apikey 82d7e7011dd94d09bc862d75e429d9d6nw");
//import Error from "next/error";
import NextError from "next/error"
import { NextApiRequest,NextApiResponse } from "next";

const requestOptions:any = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

//get Stock Codes, Last Price, Previous Day Price, Price Change, Percent Change, Max Price, Low Price
export async function getData(req:NextApiRequest,res:NextApiResponse){
  try {
    const response = await fetch("https://api.finazon.io/latest/tickers/us_stocks", requestOptions);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);
    return res.status(200).json(data);
} catch (error) {
    console.error(error);
    return res.status(500).json({errir:'Failed to fetch data'})
}
}