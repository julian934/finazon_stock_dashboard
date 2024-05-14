"use client"
import React,{useState,useEffect,useContext,useRef} from 'react'
import { useFetchData } from '@/app/api/getMarketList/getData'
import { useQuery } from '@tanstack/react-query'
import { fetchDataFromExternalAPI } from '@/app/api/getMarketList/getData'
import { getIndividualTicker } from '@/app/utils/getStockData/page'
import { getStockData } from '@/app/utils/getStockData/page'
import { StoreStateContext } from '@/app/utils/context/page'
//import  {ScrollAreaPage}  from '../UI/scrollBar/page'
import { ScrollAreaPage } from '../UI/scrollBar/page'
type Props = {}

const SearchBar:React.FC<Props> = (props: any) => {
    const [searchTerm,setSearchTerm]=useState<any>(null)
    const [dataSet,setDataSet]=useState([])
     const inputData=useRef<HTMLInputElement | null>(null);
     const ctx=useContext(StoreStateContext)
    const {data,isLoading,isError}=useQuery({
      queryKey:['searchData'],
      queryFn:fetchDataFromExternalAPI,
      staleTime:1000,
      
    })
    //Try mutating via useMutate instead and send data to context state via a function within utils getStockData.
    useEffect(()=>{
      try{
        data && setDataSet(data?.data)
      }catch(error){
        console.log(error)
      }
      
    },[])
    //const searchResults=props.filter((item:any)=>JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase()))
    function handleChange(event:any){
      let current:any=inputData?.current?.value.toLowerCase()
      let checkData=data?.data
      let newData=checkData.filter(((item:any)=>JSON.stringify(item).toLowerCase().includes(current)))
      setSearchTerm(newData)
      //const checkedData=dataSet.filter(val=>val.ticker.includes())
    }
    const fetchDataForTicker = async (ticker:any) => {
      try {
        ctx.currTicker(ticker)
          const data = await getIndividualTicker(ticker);
          const displayCheck=[]
          //algo works. filter for correct data and send it to the chart.js widget.
          //Build algo to get keys from data and algo to get values. Input options into slider
          //Idea:slider increases index of accessed displayCHeck values, therefore displaying that index.
          //context for display options.
          for(let vals in data){
            displayCheck.push(vals)
          }
           let checker=displayCheck[0] 
          ctx.setDisplay(data[checker])
          console.log(ctx.displayData)
          // Handle the fetched data
          console.log(data[checker]);
          setSearchTerm(null)
      } catch (error) {
          // Handle errors
          console.error('Error fetching data:', error);
      }
    };
     
    console.log(searchTerm)
    console.log(data?.data)
  console.log(dataSet)
  console.log(inputData?.current?.value)
  return (
    <div className=' 
     md:ml-12 md:h-12' >
        <input className=' rounded-sm border-2 md:text-2xl ' placeholder='Search for Stock' onChange={handleChange} ref={inputData} />
        {searchTerm!=null? <ScrollAreaPage className=' max-sm:h-[200px] md:h-[100px] max-sm:w-[350px] md:w-[450px] md:z-20 rounded-md border p-4' >
          {searchTerm && searchTerm?.map((item:any)=>(<div key={item.id} className='' >
            <button className='' key={item.id} onClick={()=>fetchDataForTicker(item.ticker)}  > <h1 className='' >{item.ticker}</h1> </button>
  </div>))} 
  </ScrollAreaPage> :<div  >
    </div>}
        
    </div>
  )
}

export default SearchBar