import React, { useCallback, useEffect, useRef, useState } from 'react'
import dataJson from './data/data.json'

export default function GetDataHook(pageNum) {
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState(null)
  const [dataList,setdataList] = useState([])
  const [hasMore,setHasMore] = useState(true)

  
  const getData = useCallback(async (n)=>{
    const data = dataList.length>0? dataJson.dataList.slice(-1*(dataList.length + n),-1*dataList.length):  dataJson.dataList.slice(-1*(dataList.length + n))
    console.log(pageNum , ": pageNum   || length:", data.length)
    setHasMore(dataJson.dataList.length > dataList.length)
    return data;
  },[dataList,setHasMore])
  
  useEffect(()=>{
    if(pageNum>0){
      setLoading(true)
      setError(null)
      
      setTimeout(function(){  
        getData(27).then((newData)=>{

          console.log(newData)
          
            setdataList((prev)=>{
              if(prev.length === 0) return newData;
              return newData.concat(prev)
            });
            window.scrollTo(0, document.body.scrollHeight);
            
          
          window.scrollTo(0, document.body.scrollHeight);
        
        })
      },2000)
      
    }
  },[pageNum])
  
  return {loading,error,dataList,hasMore,setLoading}
}
