import React, { useEffect, useState } from 'react';
import './App.css';

const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
console.log('Access Key:', accessKey); // Debugging line, remove this in production

export default function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (accessKey) {
      getPhotos();
    }
  }, [page]);

  function getPhotos() {
    let apiUrl = 'https://api.unsplash.com/photos?';
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
        } else {
          setImages((prevImages) => [...prevImages, ...imagesFromApi]);
        }
      })
      .catch((error) => console.error('Error fetching images:', error));
  }

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
      <div className="image-grid">
        {images.map((image, index) => (
          <div className="image" key={index}>
            <img src={image.urls.small} alt={image.alt_description} />
          </div>
        ))}
      </div>
    </div>
  );
}
