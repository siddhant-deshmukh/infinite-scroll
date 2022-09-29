import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'

export default function BookQueryHook(query,pageNum) {
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState(null)
  const [bookList,setBookList] = useState([])
  const [hasMore,setHasMore] = useState(true)

  const pageNumRef = useRef();
  const queryRef = useRef();

  useEffect(()=>{
    setLoading(true)
    setError(null)
    
    //console.log(query)

    queryRef.current = query 
    axios({
        method:"GET",
        url:"http://openlibrary.org/search.json",
        params:{q:query,page:pageNum}
    }).then((res)=>{
        
        if(queryRef.current === query){
          //console.log(query , "  :" ,res?.config?.params?.q)        
          if(!pageNumRef.current) pageNumRef.current = pageNum
          //console.log("  Boolean : ",pageNumRef.current === pageNum , " query === params.q",res?.config?.params?.q,query)
          if(pageNumRef.current === pageNum){
            console.log(res.data.numFound,bookList.length)
            setBookList([...res.data.docs])
          }else{
            console.log(res.data.numFound,bookList.length)
            // setBookList((prevList)=>{
            //   const arr = [...prevList,...res.data.docs]
            //   //console.log("arr :",arr)
            //   const allKeys = new Set(arr.map((ele)=>{return ele.key}))
            //   //console.log("allkeys :",allKeys)
            //   const newArr = []
            //   for(let i in arr){
            //     const obj = arr[i]
            //     //console.log( obj.key)
            //     if(allKeys.has(obj.key)){
            //       newArr.push(obj)
            //       allKeys.delete(obj.key)
            //     }
            //   }
            //   //console.log(newArr) 
            //   return newArr
            // })
            setBookList((prevList)=>{
              let newList = [...prevList,...res.data.docs] 
              setHasMore(newList.length <= res.data.numFound)
              return newList
            })
          }
          
          pageNumRef.current = pageNum
          setLoading(false)
        }
    }).catch((err)=>{
        setLoading(false)
        return
    })
  },[query,pageNum])
  return {loading,error,bookList,hasMore}
}
