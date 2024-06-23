
import { useRef, useState,useCallback,useMemo } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies({search,sort}){
    const [movies,setMovies]=useState([])
    const previousSearch=useRef(search)
    const [loading,setLoading]=useState(false)
    

    const getMovies= useCallback(async ({search}) =>{
        if(search===previousSearch.current) return

    try{
        previousSearch.current=search
        setLoading(true)
        const newMovies=await searchMovies({search})
        
        setMovies(newMovies)
    }catch(e){
        throw new Error('error ')
    }finally{
        setLoading(false)
    }
    }
    ,[])

    const sortedMovies= useMemo(()=>{
        return sort?[...movies].sort((a,b)=>a.title.localeCompare(b.title)):movies
    },[sort,movies]) 

    return { movies:sortedMovies,getMovies,loading }
}