import { useCallback, useEffect, useRef, useState } from "react";
import bookQueryHook from "./bookQueryHook";

function App() {

  const [query,setQuery] = useState('')
  const [pageNum,setPageNum] = useState(0)

  const endOfPage = useRef()
  const listOfSearches = useRef()
  function handleChange(e){
    setQuery(e.target.value)
    setPageNum(1)
  }
  const {loading,error,bookList,hasMore} = bookQueryHook(query,pageNum)
  
  const reachingEndOfPage = useCallback((entry,observer)=>{
    if(!hasMore) console.log(hasMore)
    if(entry[0].isIntersecting && bookList.length>0 && pageNum>0 && !loading && hasMore){
      console.log(" reached !!",bookList.length,pageNum,bookList.length)
      setPageNum(pageNum+1)
    }
  },[pageNum,setPageNum,bookList,loading,hasMore])

  useEffect(()=>{
    let options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0
    }
    let observer = new IntersectionObserver(reachingEndOfPage, options);
    observer.observe(endOfPage.current  )
  },[endOfPage,reachingEndOfPage])
  return (
    <div ref={listOfSearches} id="scrollArea" className="App">
      <input  value={query} onChange={handleChange}/>
      <div >
        {bookList.map((book)=>{
          return <div key={book.key}>
            {book.title}
          </div>
        })}
        {loading && <div>
          <svg className="spinner" viewBox="0 0 50 50">
            <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
          </svg>
          </div>}
        <div ref={endOfPage} >End of page</div>
      </div>
    </div>
  );
}

export default App;
