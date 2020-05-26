import React, {useState, useEffect} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import './App.css'

const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

export default function App() {
  
  // ACCESS KEY k0-oBa133WaW8nzbZm0x7FQ8rpvgovWvC2i1-L2ELv0
  // SECRET KEY sbJy0kTV8oOj5Gf0PcWCNPab_6T6vTn6S_65N5vgQaQ

  const [page, setPage] = useState(1)
  const [photos, setPhotos] = useState([])
  const [query, setQuery] = useState('')
  const PHOTOS_LIST = 'https://api.unsplash.com/photos?'

  useEffect(() => {
    getPhotos()
  }, [page])

  const searchHandler = (e) => {
    e.preventDefault()
    setPage(1)
    getPhotos()
  }

  const getPhotos = () => {
    let url
    if (!query) url = PHOTOS_LIST + `page=${page}`
    else url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}`
    fetch(url + `&client_id=${accessKey}`)
      .then(res => res.json())
      .then(data => {
        const res = data.results ?? data

        if (page === 1) {
          setPhotos(res)
          return
        }
        setPhotos((d) => [...d, ...res])
      })
  }

  return (
    <div className="app">
      <h1>Unsplash Image Gallery!</h1>

      <form onSubmit={(e) => searchHandler(e)}>
        <input type="text" placeholder="Search Unsplash..." value={query} onChange={(e) => setQuery(e.target.value)}/>
        <button>Search</button>
      </form>

      <InfiniteScroll
        dataLength={photos.length}
        next={() => setPage((page) => page + 1)}
        hasMore={true}
        loader={<h4>Loading...</h4>}>

      <div className="image-grid">
        {
          photos.map((el) => {
            return(
              <a
                className="image"
                key={el.id}
                href={el.links.html}
                target="_blank"
                rel="noopener noreferrer"
              >
              <img src={el.urls.regular} alt={el.alt_description} />
            </a>  
            )
          })
        }
      </div>
      </InfiniteScroll>
    </div>
  );
}
