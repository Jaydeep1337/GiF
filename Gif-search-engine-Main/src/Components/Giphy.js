import React, { useState } from 'react'

export const Giphy = () => {

    const Giphyapi ="yPnwrH8lyHgS1j99J6Mg091Z8OX7VVQ8";

    const [state , setState] = useState({

        query:"",
        mode:"recent",
        page:1
     });

     const [annoyed,setMood] = useState(false)

     const [Giphy,setGiphyState]=useState({
        
        data:[],
        pagination:[],
        meta:[]
    })

     function Update(type,newdata)
     {
       setState(data =>{
     
         return{
           ...data,[type]:newdata
         }
   
       });
     };

     function getStuffGiphy()
  {

     if(state.query=== "" || typeof(state.query) === "undefined")
     {
         setMood(!annoyed);
     } 
     
     else
    {
     fetch("https://api.giphy.com/v1/gifs/search?api_key="+ Giphyapi+"&q="+state.query+"&limit=25&offset="+ 0+"&rating=g&lang=en&sort="+state.mode)
      .then(res => res.json())
      .then((newdata) =>{
          setGiphyState(() =>({
              data:newdata.data,
              pagination:newdata.pagination,
              meta:newdata.meta
          })
      )})
      .catch(console.log)
        }
  }

    function prev()
    {
        fetch("https://api.giphy.com/v1/gifs/search?api_key="+ Giphyapi+"&q="+state.query+"&limit=25&offset="+ (((state.page - 1) * 25) - 1)+"&rating=g&lang=en")
      .then(res => res.json())
      .then((newdata) =>{
          setGiphyState(() =>({
              data:newdata.data,
              pagination:newdata.pagination,
              meta:newdata.meta
          })
      )})
      .catch(console.log)
      Update('page',state.page-1)
    }

    function next()
    {
        fetch("https://api.giphy.com/v1/gifs/search?api_key="+ Giphyapi+"&q="+state.query+"&limit=25&offset="+ (state.page*25)+"&rating=g&lang=en")
        .then(res => res.json())
        .then((newdata) =>{
            setGiphyState(() =>({
                data:newdata.data,
                pagination:newdata.pagination,
                meta:newdata.meta
            })
        )})
        .catch(console.log)
        Update('page',state.page+1)
    }

    return (
        <div className="Giphy">
        <div className="Search">
        <button type="button" onClick={getStuffGiphy} ><i class="fas fa-search"></i></button>
            <input type="text" id="search_query" name="search_query" placeholder={annoyed ? "Bruh type something first":"Search stuff here"} onChange={
                (e) => {
                    Update('query',e.target.value)
                    getStuffGiphy() }
                    } />
        <select className="dropdown1" onChange={
            (e) =>{ 
                
                Update('mode',e.target.value) 
                getStuffGiphy()        
        
        }}>
                <option value="recent">Recent </option>
                <option value="relevant">Relevant </option>
            </select>
        </div>
        <div className="data">
        {
            Giphy.data && Giphy.data.map(data =><div className="card" key={data.id}><video src={data.images.preview.mp4} autoPlay loop/>
        <span id="firstline">From: {data.username}</span> <span id="secondline">Source: <a href={data.bitly_url}>{data.bitly_url}</a></span></div>)
        
        }

       
        </div>
        <div className="buttons">
           { state.page > 1 ? <button onClick={prev}>Prev</button> :"" }
           {state.page > 1 ? state.page :""}
           { Giphy.data.length !==0 ? <button onClick={next}>Next</button> :"" } 
        </div>
        </div>
    )
}
