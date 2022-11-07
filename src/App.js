import { useCallback, useEffect, useRef, useState } from "react";
import bookQueryHook from "./bookQueryHook";

function App() {

  
  const [pageNum,setPageNum] = useState(0)

  const {loading,error,dataList,hasMore,setLoading} = bookQueryHook(pageNum)
  useEffect(()=>{
    console.log("-------------------      !!!!  Here !!!!!!!!! ----------")
    setPageNum(1)
  },[])
  const observer = useRef()
  const topItem = useRef()
  const endOfList = useRef()
  
  const listRef = useRef()
  const prevTop = useRef()

  const listUpdateObserver = useCallback((node)=>{
    
    if(loading) return
    if(observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver( (entries) =>{
      if(entries[0].isIntersecting && dataList?.length >0 && hasMore){
        console.log("Reached!!!",pageNum)
        setPageNum((prev) => prev+1)
      }
    })
    if(node) observer.current.observe(node)
  },[loading,hasMore,dataList])
  
  
  useEffect(()=>{
    if(loading){
      if(prevTop.current && pageNum > 1){
        prevTop.current.scrollIntoView()
      }else{
        endOfList.current?.scrollIntoView()
      }
      prevTop.current = topItem.current
      setLoading(false)
    }
  },[dataList])
  
  return (
    <div  id="scrollArea" className="App">
      <div ref={listRef}>
        <div ref={listUpdateObserver} >Start of page</div>
        {loading && <div>
          <svg className="spinner" viewBox="0 0 50 50">
            <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
          </svg>
          </div>}
        
        
        {dataList && dataList.length >0 && dataList.map((ele,index)=>{
          
          if(index === 0 ){
            return <div key={ele.key} ref={topItem} className="list-container">
              {ele.key.toString()+ "  :"+ ele.data}
            </div>
          }
          return <div key={ele.key} className="list-container">
            {ele.key.toString()+ "  :"+ ele.data}
          </div>
        })}
        <div ref={endOfList}></div>
      </div>
    </div>
  );
}

export default App;
