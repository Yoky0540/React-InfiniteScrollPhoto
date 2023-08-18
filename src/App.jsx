import { useEffect, useState } from 'react'
import './App.css'
import PhotoComponent from './components/PhotoComponent'

function App() {

  const apiKey = 'zJW27UPNANyLoTcTE9vxy7bocW4XY2ys6bGtZ8vc7aM'
  const [photos,setPhotos] = useState([])
  const [page,setPage] = useState(0)
  const [isLoading,setIsLoading] = useState(false)
  
  const fetchImage = async() =>{
    setIsLoading(true)
    try{
      const apiurl = `https://api.unsplash.com/photos/?client_id=${apiKey}&page=${page}`
      const response = await fetch(apiurl)
      const data = await response.json()
      setPhotos((oldePhotos)=>{
        return([...oldePhotos,...data])
      })
    }catch (err){
      console.log(err)
    }
    setIsLoading(false)
  }

  useEffect(()=>{
    fetchImage()
  },[page])

  useEffect(()=>{
    const event = window.addEventListener('scroll',()=>{
      if(window.innerHeight+window.scrollY > document.body.offsetHeight -500 && !isLoading){
        setPage((oldPage)=>{
          return oldPage+1
        })
      }
    })
    return window.removeEventListener('scroll',event)
  },[])

  return (
    <main>
      <h1>Infinite Scroll Photo | Unsplash API</h1>
      <section className='photos'>
        <div className="display-photo">
          {photos.map((data,index)=>{
            return <PhotoComponent key={index} {...data}/>
          })}
        </div>
      </section>
      
      
    </main>
  )
}

export default App
