'use server'
import axios from "axios"
import {useState,useContext, useEffect} from 'react';
import { StoreStateContext } from "../context/storeContext";
import Dashboard from "@/app/components/dashboardDisplay/page";
//import { fetchDataFromExternalAPI } from "@/app/api/getFinances/route";
const myHeaders = new Headers();
myHeaders.append("Authorization", "apikey 82d7e7011dd94d09bc862d75e429d9d6nw");

const requestOptions:any = {
  method: "GET",
  headers: myHeaders,
  
};
/*export const getStockData=async()=>{
    const response:any=await fetch("https://api.finazon.io/latest/tickers/us_stocks?cik=320193", requestOptions)
   .then((response) => response.json())
   .then((result) => console.log(result))
         let checkData:any=await response.json()
          return checkData
        
}*/
/*export const getStockData=async()=>{
    const ctx=useContext(StoreStateContext);
    const response:any=await fetch('/api/getStockData');
    ctx.getData(response.json())
    const data=await response.json()
      return data
}
*/



import React from 'react'

type Props = {}

/*export const getStockData=async()=>{
        
  const response:any=await fetch("https://api.finazon.io/latest/tickers/us_stocks_essential", requestOptions)
 
 const {data}= await response.json()
  return data
}*/
export const getStockData = async () => {
  try {
    const url = '/api/getFinances?url=https://api.finazon.io/latest/tickers/us_stocks_essential';
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch stock data:', error);
    return null;
  }
};

export const getTimeSeries=async()=>{
  const response:any=await fetch("https://api.finazon.io/latest/time_series?dataset=us_stocks_essential&ticker=AAPL&interval=1d",requestOptions);

  const {data}=await response.json()
  console.log(data)
  return data
}

export const getDataSnapshot=async()=>{
  const response:any=await fetch("https://api.finazon.io/latest/ticker/snapshot?dataset=us_stocks_essential&ticker=AAPL",requestOptions);
  const {newData}=await response.json()
  console.log(newData)
  return newData
}

export async function getIndividualTicker(ticker:any){
  //let fetchedData=fetchDataFromExternalAPI('AAPL')
  
  //let i=0;
   /*while (i<=data.testData.length){
    let queryData=data.testData[i].ticker
    
    i++
   }*/
   //let fetchedData=`https://api.finazon.io/latest/ticker/snapshot?dataset=us_stocks_essential&ticker=${ticker}`
    
   //let testedData=await fetchDataFromExternalAPI(fetchedData)
    
   
   //Summon data via get finances and set to global state via context.
   //loops through data and connects to the api/getFinances.
   //Consensus: very promising.
   //Addendum: Algorithm successful but API only gives two requests per minute for free. Need to compensate. 
   //return testedData
   try {
    const url = `/api/getFinances?url=https://api.finazon.io/latest/ticker/snapshot?dataset=us_stocks_essential&ticker=${ticker}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch data for ${ticker}:`, error);
    return null;
  }
} 

export async function getSliderData(ticker:any,index:any){

  //let fetchedData=`https://api.finazon.io/latest/ticker/snapshot?dataset=us_stocks_essential&ticker=${ticker}`
    
   //let testedData=await fetchDataFromExternalAPI(fetchedData)
     //return testedData[index]
     try {
      const url = `/api/getFinances?url=https://api.finazon.io/latest/ticker/snapshot?dataset=us_stocks_essential&ticker=${ticker}`;
      const response = await axios.get(url);
      const data = response.data;
      return data[index];
    } catch (error) {
      console.error(`Failed to fetch slider data for ${ticker} at index ${index}:`, error);
      return null;
    }
}

/*export async function getDefaultTicker(){
  let fetchedData=''
}*/