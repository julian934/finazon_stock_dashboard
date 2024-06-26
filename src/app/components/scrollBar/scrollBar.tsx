'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
//import { getTimeSeries,getDataSnapshot } from '@/app/utils/getStockData/stockData'
//import getTimeSeries from '@/app/api/getTimeSeries/getTimeSeries'
import { getTimeSeries } from '@/app/utils/getStockData/getStockData'
import { getDataSnapshot } from '@/app/utils/getStockData/getStockData'
//import { ScrollArea } from '../UI/scrollBar/page'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import ScrollAreaPage from '../UI/revisedScrollBar/scrollBar'
import Dashboard from '../dashboardDisplay/page'
type Props = {}

const StockData = (props: Props) => {
    const {data,isError,isLoading,isFetched}=useQuery({
      queryKey:['timeSeries'],
      queryFn:getTimeSeries
    })
    console.log(data);
    //Dashboard fully functional, change names and render data.
  return (
    <div className=" md:space-y-4 " >
      <h1 className="md:ml-12 md:text-3xl md:text-center text-amber-400 " >Available Stock Data</h1>
    <div className=" bg-slate-150 md:ml-12" >
      {/*data && data?.map((item:any)=>(<h2>{item}</h2>))*/}
    {/*<ScrollArea className=" max-sm:h-[200px] md:h-[400px] max-sm:w-[350px] md:w-[450px] rounded-md border p-4 " > */} 
    <ScrollAreaPage className=' max-sm:h-[200px] md:h-[400px] max-sm:w-[350px] md:w-[450px] rounded-md border p-4 ' >
    <Dashboard/>
      </ScrollAreaPage> 
       
      {/* </ScrollArea>*/} 
    </div>
    </div>
  )
}

export default StockData