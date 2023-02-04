import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./component/Photo";

const clientId = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = "https://api.unsplash.com/photos/";
const searchUrl = "https://api.unsplash.com/search/photos";
function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);

  const fetchImages = async () => {
    let url;
    url = `${mainUrl}${clientId}`;
    try {
      setLoading(true);
      const response = await fetch(`${url}`);
      const data = await response.json();
      setPhotos(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleSubmit = (e) => {
    e.prevent.Default();
  };

  return (
    <main>
      <section className="search">
        <form className="search-form">
          <input type="text" placeholder="search" className="form-input" />
          <button type="submit" onClick={handleSubmit}>
            submit
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photos.map(photo => (
              <Photo key={photo.id} {...photo}/>
            ) )}
        </div>
        {loading && <h2 className="loading">Loading...</h2> }
      </section>
    </main>
  );
}

export default App;
