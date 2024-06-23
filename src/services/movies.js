import { HOST } from "../constants"

export const searchMovies=async({search})=>{
    if(search=='')return null
    try{
        const host=HOST.replace(':search',search)
        const res= await fetch(host)
        const json=await res.json()
        const movies=json.Search
    return movies?.map(movie=>(
        {
            id:movie.imdbID,
            title:movie.Title,
            poster:movie.Poster,
            year:movie.Year,
            type:movie.Type
        }
    ))
    }
    catch(ex){
        console.log(ex)
        throw new Error('error en fetch')
    }
}