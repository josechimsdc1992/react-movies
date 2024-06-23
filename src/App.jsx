import './App.css'
import './Style.css'
import { useMovies } from './hooks/useMovies.js';
import Movies from './components/movies.jsx'
import { useRef,useState,useEffect, useCallback } from 'react';
import debounce from 'just-debounce-it'

function useSearch(){
    const [search,updateSearch]=useState('')
    const [error,setError]=useState(null)
    const isFirstInput=useRef(true)
    

    useEffect(()=>{
    if(isFirstInput.current){
        isFirstInput.current=search===''
        return
    }
    setError(null)
     if(search===''){
        setError('No se puede buscar por vacio')
     }   
     
    },[search])

    return {search,updateSearch,error}
}
export default function App() {
    
    const [sort,setSort]=useState(false)
    const inputRef=useRef()
    const {search,updateSearch,error} =useSearch()
    const { movies,getMovies,loading }=useMovies({search,sort})
    const debouncedGetMovies=useCallback(
        debounce(search=>{
            console.log('debounce getmovies')
            getMovies({search})
    
        },300)
        ,[])
    

    const handleSubmit=(event)=>{
        event.preventDefault()
        getMovies({search})
    }
    const handleChange=(event)=>{
        const newQuery=event.target.value
        
        if(newQuery.startsWith(' ')) return
        updateSearch(newQuery)
        debouncedGetMovies(newQuery)
    }

    const handleSort=()=>{
        setSort(!sort)
    }
    
    return (
        <div className='page'>
            <header>
                <h1>
                    Buscador de peliculas
                </h1>
                <form className='form' onSubmit={handleSubmit}>
                    <input style={{ border:'1 px solid transparent',borderColor:error?'red':'transparent'}} onChange={handleChange} value={search} name='query' placeholder='Avenger, Matrix ...'></input>
                    <button type='submit'>Search</button>
                    <input type='checkbox' onChange={handleSort} checked={sort}></input>
                </form>
                {error && <p style={{color:'red'}}>{error}</p>}
            </header>
            <main>
                {loading?(
                <p>Cargando</p>
                ):(
                <Movies movies={movies}/>
                )}
                

            </main>
        </div>
    )
}