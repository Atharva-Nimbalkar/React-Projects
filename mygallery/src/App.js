import React, { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './App.css';

const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

export default function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  const getPhotos=useCallback(()=>{
    let apiUrl = 'https://api.unsplash.com/photos?';
    /* This line of code is checking if the `query` state variable has a value. If `query` is not empty
    (truthy), then it modifies the `apiUrl` variable to include the search query parameter in the API
    request URL. */
        if (query) apiUrl = `https://api.unsplash.com/search/photos?query=${query}`;
        apiUrl += `&page=${page}`;
        apiUrl += `&client_id=${accessKey}`;
    
        fetch(apiUrl)
          .then((res) => {
            if (!res.ok) {
              throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
          })
          .then((data) => {
            const imagesFromApi = data.results ?? data;
            if (page === 1) {
              setImages(imagesFromApi);
            } else {//if page is >1 then we are adding for our infinite scroll
              // setImages((prevImages) => [...prevImages, ...data]);

              setImages((images) => [...images, ...imagesFromApi]);
              // setImages(data.result)
              }
          })
          .catch((error) => console.error('Error fetching images:', error));
  },[page,query]);
  useEffect(() => {
    if (accessKey) {
      getPhotos();
    }
  }, [page,getPhotos]);

  // function getPhotos() {
   
  // }

  function searchPhotos(e) {
    e.preventDefault();
    setPage(1);
    getPhotos();
  }

  if (!accessKey) {
    return (
      <div>
        <a href="https://unsplash.com/developers" className="error">
          Required: Your Unsplash API key first
        </a>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Image Gallery</h1>
      <form onSubmit={searchPhotos}>
        <input
          type="text"
          placeholder="Search Unsplash"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <InfiniteScroll
  dataLength={images.length} //This is important field to render the next data
  next={()=>{
    setPage((page)=>page+1);
    getPhotos();
  }}
  hasMore={true}
  loader={<h4>Loading...</h4>}>
      <div className="image-grid">
        {images.map((image, index) => (
          <a className="image" key={index} href={image.links.html} target='_blank' rel="noopener noreferrer">
            <img src={image.urls.small} alt={image.alt_description} />
          </a>
        ))}
      </div>
      </InfiniteScroll> 
    </div>
    
  );
}
