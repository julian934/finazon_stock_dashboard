"use client"
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useState,useEffect } from 'react'
import { useContext } from 'react'
import { StoreStateContext } from '../utils/context/storeContext'
import { getStockData ,getTimeSeries,getDataSnapshot,getIndividualTicker} from '../utils/getStockData/stockData'
import Link from 'next/link';
import StockData from '../components/scrollBar/page'
import axios from "axios"
import Dashboard from '../components/dashboardDisplay/page'
//import StockChart from '../components/lineChart/page'
import SearchBar from '../components/searchBar/searchBar'
import Footer from '../components/footer/page'
//import Slider from '../components/dataSlider/page'
const myHeaders = new Headers();
myHeaders.append("Authorization", "apikey 82d7e7011dd94d09bc862d75e429d9d6nw");
import { useFetchData } from '../api/getMarketList/getData'
//remove usequery until further notice, stick with context and get it done.
//import LineChart from '../components/lineChart/page'
import LineChart from '../components/revisedLineChart/revisedLineChart'
//import SliderComponent from '../components/dataSlider/page'
import { SliderComponent } from '../components/dataSlider/dataSlider'
import { slider } from '@material-tailwind/react'
import { useMutation } from '@tanstack/react-query'
import { getSliderData } from '../utils/getStockData/stockData'
import Modal from '../components/modals/slidermodal/modal'
const requestOptions:any = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

type Props = {}

const Home = (props: Props) => {
  
  
  const [dashboardData, setDashboardData] = useState<any[]>([]);
  const [sliderValue, setSliderValue] = useState(0); 
  const [currSlide,setCurrSlide]=useState<any>('1d')
  const [prevDay,setPrevDay]=useState<any>([]);
  const [monthData,setMonthData]=useState<any>([]);
  const [yearData,setYearData]=useState<any>([]);
  const [lastPrice,setLastPrice]=useState<any>([])
  const {data,isLoading,isError}=useQuery({
    queryKey:['defaultData'],
    queryFn:()=>getIndividualTicker('AAA')
  })
 
  const ctx=useContext(StoreStateContext)
 
  const displayCheck=[]
  const displayVals:any=[]
   let sliderChange=async()=>{
    
    let dataSets=['1d', '1m', 'lt', 'p1d', '52w', 'ch'];
    if(!sliderValue){
      setCurrSlide(dataSets[0])
    }else{
      const newSlide=dataSets[sliderValue];
      if(newSlide!==currSlide){
        setCurrSlide(newSlide)
      }
    };
    setCurrSlide(dataSets[sliderValue])
}
   if(data){
    let dataSets=['1d', '1m', 'lt', 'p1d', '52w', 'ch']
    let checked=dataSets[sliderValue]
   
    let newData= data[checked]
    
    for(let keys in newData){
      displayCheck.push(keys)
    }
    Object.values(newData).forEach(item=>{
      displayVals.push(item)
    })
   }
    
   console.log(ctx.ticker)
 
  
    for(let keys in ctx.displayData){
      displayCheck.push(keys)
    }
    Object.values(ctx.displayData).forEach(item=>{
      displayVals.push(item)
    })

  console.log(ctx.displayData)
    console.log(ctx.ticker)
    console.log(displayCheck)
    console.log(displayVals)
   
    //console.log(checkableData)
    //Algorithm for if there is no display data saved in ctx is needed.
    //optimize after functionality
    //create a modal that holds the slider and passes values down to the slider as they are accessed.
    const chartData = {
      labels: displayCheck,
      values: displayVals
    };
    const defaultDataCheck=()=>{

    }
    //const { mutate } = useMutation<any>(handleMutation);
    const handleSliderChange =async (newValue:any) => {
      //save ticker snapshot name in context and access it here
      const handleMutation=async(ticker:any,index:any)=>{
        try {
          await getSliderData(ticker, index);
          // Optionally, you can handle the result here
        } catch (error) {
          // Handle errors
          console.error('Error fetching data:', error);
          throw error; // Re-throw the error to be handled by React Query
        }
      }
      try {
        let ticker=ctx.ticker
       
        //let checker=displayCheck[0] 
        let checker=await ctx.tickerData?.[Math.floor(newValue)]
        if(checker){
         

        }
        ctx.tickerFullData(checker)
        //algo works. filter for correct data and send it to the chart.js widget.
        //Build algo to get keys from data and algo to get values. Input options into slider
        //Idea:slider increases index of accessed displayCHeck values, therefore displaying that index.
        //context for display options.
        //Idea:pre-save all available data in context state and as slider moves, access a different portion of the data, since Finazon
        //only allows two connections per minute.
        //expolre the idea of calling a refetch every change and mutating to call this exact value.
        console.log(ctx.tickerData)
    } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error);
    }
      
      setSliderValue(Math.floor(newValue));
      
    };
    
    console.log(ctx.tickerData);//error : addendum, refetching gathers the right data.
  console.log(ctx.ticker);//error
  console.log(sliderValue);
  console.log(prevDay);
  console.log(monthData);
  console.log(yearData);
  console.log(ctx.displayOptions)
  console.log(ctx.values)
  console.log(ctx.values[0])
  console.log(ctx.tickerData)
  useEffect(()=>{
    sliderChange()
    if(data){
      let dataSets = ['1d', '1m', 'lt', 'p1d', '52w', 'ch'];
      //let checked = dataSets[sliderValue];
      //let newData = data[checked];
      let newData=ctx.values
      setPrevDay(data[dataSets[0]]);
      setMonthData(data[dataSets[1]]);
      setYearData(data[dataSets[4]]);
      setLastPrice(data[dataSets[2]])
    }
    let checkData=ctx?.values
    if(checkData?.length>0){
      let dataSets:any = ['1d', '1m', 'lt', 'p1d', '52w', 'ch'];
      let newData=ctx.values;
      setPrevDay(newData[0]);
      setMonthData(newData[1]);
      setYearData(newData[4]);
      setLastPrice(newData[2])
    }
    let check=ctx.values
    if(check.length>0){
      
    }
},[data,sliderValue,ctx.values])
let beginDate=new Date(yearData?.lt)
let endDate=new Date(yearData?.ht)
let lastPriceCheck=new Date(yearData?.tm)
let formattedBeginning=yearData?.lt
let formattedEnding=yearData?.ht
formattedBeginning=beginDate.toLocaleDateString('en-US',{
  year:'numeric',
  month:'2-digit',
  day:'2-digit'
})
console.log(formattedBeginning)
formattedEnding=endDate.toLocaleDateString('en-US',{
  year:'numeric',
  month:'2-digit',
  day:'2-digit'
})
console.log(formattedEnding)

  return (
    <div className=" flex max-sm:flex-col max-sm:space-around max-sm:h-full max-sm:justify-around md:grid md:grid-cols-3  md:grid-rows-3 max-sm:flex-col md:flex-row bg-purple-600 max-sm:space-y-20 md:h-full  " >
      <div className='flex max-sm:justify-center max-sm:h-8 max-sm:pt-4 md:col-start-2 md:row-start-1 md:top-4' >
        <p className=" max-sm:text-2xl md:text-4xl md:pt-8 text-amber-400 " >Finazon Stock Market Dashboard</p>
      </div>
    <div className="flex md:justify-end  md:w-5/6 md:h-5/6 md:ml-12 md:self-end md:col-start-2 border-2 md:mt-10 md:col-span-2 md:flex-col md:row-start-1   z-60 max-sm:justify-center max-sm:w-full max-sm:h-96 max-sm:w-96 max-sm:flex-col max-sm:max-w-sm  bg-purple-900 max-sm:self-center md:w- rounded-xl  " >
      {/* ChartJS Implementation*/}
      
      <div className='flex px-4 ' >
        <h1 className=" text-slate-400 " >Currently Viewing: {ctx.ticker?ctx.ticker:'AAA'} </h1>
      </div>
      <div className=' md:h-5/6 md:w-full ' >
      <LineChart data={chartData} />
      </div>
      
    </div>

    <div className="flex max-sm:flex-col max-sm:space-y-12 max-sm:z-20 md:ml-12 max-sm:mb-20  md:mt-8 md:justify-around md:row-start-2 md:col-start-2 md:col-span-2 md:w-2/3 md:h-1/2 md:self-start max-sm:w-full max-sm:self-center md:w-1/2 bg-purple-900 max-sm:h-72 rounded-xl max-sm:space-around justify-evenly max-sm:max-w-sm " >
    <div className='text-slate-400 max-sm:px-4' >
      <p className='text-slate-400 ' >Dataset: {currSlide}</p>
        <SliderComponent  min={0} max={4} value={sliderValue} onChange={handleSliderChange} />
        <Modal sliderValue={sliderValue}  />
      </div>  
    <div className="flex max-sm:px-4 max-sm:flex-row max-sm:flex-wrap" >
        <div className=" md:h-full  max-sm:w-full max-sm:self-center " >
            <h3 className="  md:text-xl text-center text-amber-400" >Previous Day</h3>
          {/*In Depth Information: 
             percentage changes based on time_series over time or snapshot data over time.
             Max price over period of time
             Lowest price over period of time
              wep(Weekly change price percent)
               dap(daily change price percent)
          
          */} 
          <div className='flex flex-col justify-around md:space-y-6 md:pt-4 md:text-lg text-center text-white' >
          <h3>Closing: $ {prevDay && prevDay?.c} </h3>
          <h3>High: $ {prevDay && prevDay?.h}</h3>
          <h3>Low: $ {prevDay && prevDay?.l}</h3>
          <h3>Open: $ {prevDay && prevDay?.o}</h3>
          <h3>Volume:  {prevDay && prevDay?.v} </h3>
            </div> 
          
        </div>
      </div>
      <div className=" flex md:flex-col max-sm:rounded-md bg-purple-900" >
        <div className=" max-sm:px-4  md:h-full    max-sm:w-full " >
            <h3 className="text-amber-400 md:text-xl text-amber-400 text-center" >Last Month</h3>
          {/*In Depth Information: 
              dap(daily change price percent)
              mop(Monthly change price percent)

              
             */}
        <div className='flex flex-col md:space-y-6 text-center md:pt-4 md:text-lg text-white' >
          <h3 className='' >Closing: $ {monthData && monthData?.c} </h3>
          <h3 className='' >High: $ {monthData && monthData?.c}</h3>
          <h3 className='' >Low: $ {monthData && monthData?.l} </h3>
          <h3 className='' >Open: $ {monthData && monthData?.o}</h3>
          <h3 className='' >Volume: {monthData && monthData?.v}</h3>
            </div>   
        </div>
      </div>
      <div className="flex  flex-col md:bg-purple-900 max-sm:space-y-8" >
        <div className="max-sm:px-4  " >
            <h3 className=" md:text-xl text-center text-amber-400  " >Last 52 Weeks</h3>
          {/* In Depth Information: 
              chlotv (closing price, highest price, lowest price, price at opening of trading interval, 
                timestamp of trading interval opening,
                trading volume recorded during trading interval
              )
              (Double check what all you need from finazon website)

              */}  
              <div className='flex flex-col md:space-y-2 text-center max-sm:z-20 md:pt-2 md:text-lg text-white ' >
                <h3 className='' >Average Volume: {yearData && yearData?.av}</h3>
                <h3 className='' >Change Price: $ {yearData && yearData?.ch}</h3>
                <h3 className='' >Change Price Percent: % {yearData && yearData?.chp} </h3>
                <h3 className='' >Highest Price: $ {yearData && yearData?.h}  </h3>
                <h3 className='' >Highest Price TimeStamp: {yearData && formattedEnding} </h3>
                <h3 className='' >Lowest Price: $ {yearData && yearData?.l} </h3>
                <h3 className='' >Lowest Price TimeStamp:  {yearData && formattedBeginning} </h3>

              </div>
        </div>
      </div>
    </div>
      
      <div className=" flex max-sm:pt-80 max-sm:rounded-lg max-sm:w-5/6  max-sm:h-full max-sm:self-center max-sm:justify-around md:w-5/6 md:h-24 md:row-start-1 md:col-start-1 md:mt-28 md:self-start md:justify-self-center md:border-2  max-sm:flex-col bg-purple-900 rounded-xl max-sm:w-full   " >
        <div className=" max-sm:px-4 md:w-1/2 md:flex md:h-22 md:space-between md:flex-col md:space-y-4 md:py-2 md:px-2 " >
          <h2 className=" text-amber-400 " >Beginning Date: {yearData && formattedBeginning} </h2>
          <h2 className=" text-amber-400 " >Ending Date: {yearData && formattedEnding}</h2>
          {/* Slider Implementation*/}
          </div>
        <div className="max-sm:px-4 md:w-1/2 md:flex md:flex-col md:space-y-2 md:py-2  " >
          <h2 className=" text-amber-400" >
            Last Price Date: {lastPrice && formattedEnding}
          </h2>
          <h3 className=" text-amber-400" >Select the stock code for price/volume visuals</h3>
        </div>
      </div>
      <div className="flex md:space-between max-sm:self-center md:flex-col  max-sm:flex-col md:col-start-1 md:h-full md:mt-28 md:col-span-1 md:justify-around md:self-start md:row-start-1 nd:row-span-2 md:mt-48 " >
        {/* Add Search Bar Here*/}
        
        <div className='md:flex md:-space-y-4 ' >
        <SearchBar  />
        </div>
        <div className='md:flex' >
        <StockData/>
        </div>
       
      </div>
      <div className=" md:flex md:col-start-1 md:row-start-2 md:w-full  md:justify-around md:self-center " >
      <Footer/>
      </div>
      
      {/* Footer */}
      
    </div>
    
  )
}

export default Home