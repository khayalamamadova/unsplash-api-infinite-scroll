import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Photo from "./component/Photo";

const clientId = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = "https://api.unsplash.com/photos/";

function App() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(2);
  const [more, setMore] = useState(true);

  const urlPage = `&page=${page}`;

  useEffect(() => {
    const getPhotos = async () => {
      const response = await fetch(`${mainUrl}${clientId}&page=1`);
      const data = await response.json();
      setPhotos(data);
    };
    getPhotos();
  }, []);
  console.log(photos);

  const fetchPhotos = async () => {
    const response = await fetch(`${mainUrl}${clientId}${urlPage}`);
    const data = await response.json();
    return data;
  };

  const fetchData = async () => {
    const photosFromServer = await fetchPhotos();

    setPhotos([...photos, ...photosFromServer]);
    if (photosFromServer.length === 0) {
      setMore(false);
    }
    setPage(page + 1);
  };

  return (
    <main>
      <InfiniteScroll
        dataLength={photos.length}
        next={fetchData}
        hasMore={more}
        loader={<h2 className="loading">Loading...</h2>}
        endMessage={<h2>the end</h2>}
      >
        <section className="photos">
          <div className="photos-center">
            {photos.map((photo) => (
              <Photo key={photo.id} {...photo} />
            ))}
          </div>
        </section>
      </InfiniteScroll>
    </main>
  );
}

export default App;
