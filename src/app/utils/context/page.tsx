"use client"
import {createContext,useContext,useState} from 'react'
import React from 'react'

// Define the types for the context
interface ContextType {
    menu: any[];
    getData: (info: any) => void;
    dashboardData: (info: any) => void;
    dashData: any[];
    displayData:any[],
    setDisplay:(data:any)=>void;
    displayOptions:string[],
    currTicker:(ticker:string)=>void;
    ticker:string,
    tickerFullData:(ticker:any)=>void;
    tickerData:any[],
    values:any[],
    valueData:(ticker:any)=>void;
  }
  
  // Define the initial context values
  const initialContext: ContextType = {
    menu: [],
    getData: () => {},
    dashboardData: () => {},
    dashData: [],
    displayData:[],
    setDisplay:()=>{},
    displayOptions:[],
    currTicker:(ticker)=>{},
    ticker:'',
    tickerFullData:(ticker)=>{},
    tickerData:[],
    valueData:(ticker)=>{},
    values:[]
  };
export const StoreStateContext=createContext<ContextType>(initialContext)

export const StoreStateContextProvider:React.FC<{children:any}>=(props)=>{
    const [menuData, setMenuData] = useState<any[]>([]);
    const [dashData, setDashData] = useState<any[]>([]);
    const [displayData,setDisplayData]=useState<any>([])
    const [displayOptions,setDisplayOptions]=useState<any>([]);
    const [displayValues,setDisplayValues]=useState<any>([]);
    const [displayKeys,setDisplayKeys]=useState<any>([])
    const [tickerData,setTickerData]=useState<any>([]);
    const [ticker,setTicker]=useState<any>('')
    const [values,setValues]=useState<any>([])
    let getData=(info:any)=>{
        console.log(info)
        setMenuData(info)
        console.log(menuData)

    }
    let dashboardData=(info:any)=>{
         setDashData(info)
    }
    let setDisplay=(data:any)=>{
        setDisplayData(data)
    }
    let createDisplayOptions=(options:string[])=>{
        setDisplayOptions(options)
        for(let keys in displayOptions){
            setDisplayKeys((item:any)=>{
                return [...item,keys]
            })
          }
          Object.values(displayOptions).forEach(vals=>{
            setDisplayValues((item:any)=>{
                return [...item,vals]
            })
          })
    }
    let currTicker=(ticker:string='AAA')=>{
        !ticker && setTicker('AAA');
        
         setTicker(ticker)
    }
    let tickerFullData=(tickerData:any)=>{
       setTickerData(tickerData)
    }
    let valueData=(ticker:any)=>{
        setValues(ticker)
    }

    const contextValue:any={
        menu:menuData,
        getData:getData,
        setDash:dashboardData,
        dashData:dashData,
        setDisplay:setDisplay,
        displayData:displayData,
        createDisplayOptions:createDisplayOptions,
        displayOptions:displayOptions,
        currTicker:currTicker,
        ticker:ticker,
        tickerFullData:tickerFullData,
        tickerData:tickerData,
        valueData:valueData,
        values:values
    }

    return(<StoreStateContext.Provider value={contextValue} >
        {props.children}
    </StoreStateContext.Provider>)
}

export default StoreStateContextProvider