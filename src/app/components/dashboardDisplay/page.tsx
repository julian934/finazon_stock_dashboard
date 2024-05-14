'use client'
import React,{useState,useEffect,useContext} from 'react'
import { Grid } from 'gridjs-react';
import { useQuery } from '@tanstack/react-query';
//import { getTimeSeries,getDataSnapshot } from '@/app/utils/getStockData/stockData';
import getTimeSeries from '@/app/api/getTimeSeries/getTimeSeries';
import { getDataSnapshot } from '@/app/utils/getStockData/getStockData';
import { StoreStateContext } from '@/app/utils/context/storeContext';
import { useFetchData } from '@/app/api/getMarketList/getData';
//import { getIndividualTicker } from '@/app/utils/getStockData/stockData';
import { getIndividualTicker } from '@/app/utils/getStockData/getStockData';
type Props = {}

/*interface DashboardProps{
  dashboardData:any[];
}*/

const Dashboard=() => {
   //const {stockMenu}=props.data
   //Get Today's Data and yesterdays data
   //Calculate percentage change during price interval.
   //Create an overlay.
   //Use snapshot to get the data you need.
   
   //fetch locally on this component.
   const {data,isLoading,isError}=useFetchData();
   const ctx=useContext(StoreStateContext)
  const getData=(id:any)=>{
    getIndividualTicker(id)
  }
 console.log(data)
 //const newData=props.data
 //const {t,o,h,l,c}=newData
 //Data fetching successful!
 const fetchDataForTicker = async (ticker:any) => {
  try {
      ctx.currTicker(ticker)
      const data = await getIndividualTicker(ticker);
      let newData=await data
      let items:any=[]
      let dataSets = ['1d', '1m', 'lt', 'p1d', '52w', 'ch'];
      for(let i=0;i<dataSets.length;i++){
        let data=dataSets[i]
         items.push(newData[data])
      }
      //let newData=data[checks]
      //ctx.valueData(newData['1d'])
      ctx.valueData(items)
      const displayCheck=[]
      const fullTickerData=[]
      //algo works. filter for correct data and send it to the chart.js widget.
      //Build algo to get keys from data and algo to get values. Input options into slider
      //Idea:slider increases index of accessed displayCHeck values, therefore displaying that index.
      //context for display options.
      for(let vals in data){
        displayCheck.push(vals)
        
      }
      for(let vals in data){
        fullTickerData.push(vals)
      }
       let checker=displayCheck[0] 
      ctx.setDisplay(data[checker])
      
      console.log(ctx.displayData)
      ctx.tickerFullData(fullTickerData)
      console.log(ctx.tickerData)
      // Handle the fetched data
      console.log(data[checker]);
  } catch (error) {
      // Handle errors
      console.error('Error fetching data:', error);
  }
};
 

  return (
    <div className='flex flex-col border-white w-full h-full overflow-hidden' >
      {data?.data.map((item:any)=>(
        <div className='flex flex-row' key={item.ticker} >
          <button onClick={()=>fetchDataForTicker(item.ticker)} >
            <h1>{item.ticker}</h1>
          </button>
        </div>
      ))}
    </div>
  )
}

export default Dashboard