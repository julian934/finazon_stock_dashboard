"use client"
/*
import React,{useState,useContext,useEffect,useRef} from 'react';

import Chart,{ChartTypeRegistry} from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

type ChartData = {
  labels:string[];
  values:number[];
}


  const LineChart = ({ data }:{data:ChartData}) => {
    console.log(data)
    const chartRef = useRef<HTMLCanvasElement>(null);
    //let chartInstanceRef =useRef<Chart<keyof ChartTypeRegistry, (number | [number, number] | null)[], unknown> | null>(null);
    let chartInstanceRef=useRef<Chart<"line",(number | [number,number] | null)[],unknown> | null>(null)
    const checkedData=data.values
    console.log(checkedData)
    useEffect(() => {
        if (chartRef.current && data.labels.length === data.values.length) {
          const ctx = chartRef.current.getContext('2d');
          if (ctx) { // Use optional chaining here
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy(); // Destroy existing Chart instance
              }
            chartInstanceRef.current=new Chart(ctx, {
              type: 'line',
              data: {
                labels: data?.labels,
                datasets: [{
                  label: 'Finazon Stock Metrics',
                  data: data?.values,
                  fill: false,
                  borderColor: 'rgb(218, 165, 32)',
                  tension: 0.1,
                  backgroundColor:'rgb(0,0,0)',
                  borderWidth:2,
                  showLine:true,
                  spanGaps:true,
                  xAxisID:"m"
                }]
              },
              options: {
                indexAxis:'x',
                scales: {
                  x: {
                    type: 'time',
                    time: {
                      unit: 'day'
                    }
                  },
                  y:{
                    beginAtZero:true
                  }
                }
              }
            });
          }
        }
      }, [data]);

      useEffect(() => {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.data.labels = data.labels;
          chartInstanceRef.current.data.datasets[0].data = data.values;
          chartInstanceRef.current.update();
        }
      }, [data]);
    
      return <canvas ref={chartRef} />;
    };
    
    export default LineChart;
    */