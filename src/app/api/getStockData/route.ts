import axios from "axios";
import { NextResponse } from "next/server";
const myHeaders = new Headers();
myHeaders.append("Authorization", "apikey 82d7e7011dd94d09bc862d75e429d9d6nw");

const requestOptions:any = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

//get Stock Codes, Last Price, Previous Day Price, Price Change, Percent Change, Max Price, Low Price
export async function GET(){
   const response:any=fetch("https://api.finazon.io/latest/tickers/us_stocks", requestOptions)
   .then((response) => response.json())
   //.then((result) => console.log(result))
   .catch((error) => console.error(error))
   //const newData=response //.then((response:any)=>response.json()).then((result:any)=>console.log(result)).catch((error:any)=>console.log(error))
   //console.log(newData)
    let newData=JSON.stringify(response.data)
    let changedData=response.json()
    console.log(newData)
    console.log(changedData)
   return NextResponse.json(changedData)
}