import React, { useEffect, useState } from "react";

const ImageDetails = ({ match }) => {
  const [image, setImage] = useState(null);
  const imageId = match.params.id;

  useEffect(() => {
    const fetchImageDetails = async () => {
      const API_KEY = "38231409-4d4dd81adb24d97e4e669e1cb";
      const API_URL = `https://pixabay.com/api/?key=${API_KEY}&id=${imageId}`;
      try {
        const response = await fetch(`${API_URL}&id=${imageId}`);
        const data = await response.json();
        setImage(data.hits[0]);
      } catch (error) {
        console.error("Error fetching image details:", error);
      }
    };

    fetchImageDetails();
  }, [imageId]);

  if (!image) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2>{image.tags}</h2>
      <img src={image.largeImageURL} alt={image.tags} />
      <p>By {image.user}</p>
    </div>
  );
};

export default ImageDetails;
