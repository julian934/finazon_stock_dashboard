import { NextResponse } from "next/server";
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