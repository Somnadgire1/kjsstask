import React, { useEffect, useState } from "react";
import "../styles/ImageHome.css";

const API_KEY = "38231409-4d4dd81adb24d97e4e669e1cb";
const API_URL = `https://pixabay.com/api/?key=${API_KEY}&per_page=10`;

const ImageHome = () => {
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    let url = API_URL;

    if (searchTerm) {
      url += `&q=${encodeURIComponent(searchTerm)}`;
    }

    if (filterCategory) {
      url += `&category=${encodeURIComponent(filterCategory)}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      setImages(data.hits);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchImages();
    setSearchTerm("");
  };

  const handleFilterChange = (event) => {
    setFilterCategory(event.target.value);
    fetchImages();
    setSearchTerm("");
  };
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="container">
      <h1>Photo Gallery</h1>
      <hr/>
      <div className="search-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search images..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <button type="submit" onClick={handleSearch}>
            Search
          </button>
        </div>
        <select value={filterCategory} onChange={handleFilterChange}>
          <option value="">All Categories</option>
          <option value="backgrounds">Backgrounds</option>
          <option value="music">Music</option>
          <option value="fashion">Fashion</option>
          <option value="feelings">Feelings</option>
          <option value="nature">Nature</option>
          <option value="science">Science</option>
        </select>
      </div>
      <div className="gallery">
        {images.length > 0 ? (
          images.map((image) => (
            <div key={image.id} className="image-wrapper">
              <button
                className="image-button"
                onClick={() => handleImageClick(image)}
              >
                <img
                  src={image.webformatURL}
                  alt={image.tags}
                  className="image"
                />
              </button>
            </div>
          ))
        ) : (
          <div>No images found.</div>
        )}
      </div>
      <hr/>

      {selectedImage && (
        <div className="lightbox">
          <div className="lightbox-content">
            <img
              src={selectedImage.largeImageURL}
              alt={selectedImage.tags}
              className="lightbox-image"
            />
            <button className="lightbox-close" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageHome;
