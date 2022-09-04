import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";


import Login from "./components/login/Login.js";
import List from "./components/list/List.js";
import Header from "./components/header/Header.js";
import Detail from "./components/detail/Detail.js";
import Results from "./components/results/Results.js";
import Favourites from "./components/favourites/Favourites.js";


function App() {

  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const favInLocal = localStorage.getItem('favs');
    if (favInLocal !== null) {
      const favsArray = JSON.parse(favInLocal);
      setFavourites(favsArray);
    }
  }, []);


  const addOrRemoveFromFav = e => {

    const favMovies = localStorage.getItem('favs');

    let tempMoviesInFavs;

    if (favMovies === null) {
      tempMoviesInFavs = [];
    } else {
      tempMoviesInFavs = JSON.parse(favMovies);
    }

    console.log(tempMoviesInFavs);


    const btn = e.currentTarget;
    const parent = btn.parentElement;
    const imgURL = parent.querySelector('img').getAttribute('src');
    const title = parent.querySelector('h5').innerText;
    const overview = parent.querySelector('p').innerText;
    const movieData = {
      imgURL, title, overview,
      id: btn.dataset.movieId
    };
    let movieIsInArray = tempMoviesInFavs.find(oneMovie => {
      return oneMovie.id === movieData.id
    })
    if (!movieIsInArray) {
      tempMoviesInFavs.push(movieData);
      localStorage.setItem('favs', JSON.stringify(tempMoviesInFavs));
      setFavourites(tempMoviesInFavs);
      console.log("Se agrego la pelicula")
    } else {
      let moviesLeft = tempMoviesInFavs.filter(oneMovie => {
        return oneMovie.id !== movieData.id
      });
      localStorage.setItem('favs', JSON.stringify(moviesLeft))
      setFavourites(moviesLeft);
      console.log('Se elimino la pelicula');

    }
  }

  return (
    <>

      <Header />
      <div className="container mt-3">
        <Routes>
          <Route exact path="/listado" element={<List addOrRemoveFromFav={addOrRemoveFromFav} />} />
          <Route exact path="/" element={<Login />} />
          <Route exact path="/detalle" element={<Detail />} />
          <Route exact path="/results" element={<Results />} />
          <Route exact path="/favourites" element={<Favourites favourites={favourites} addOrRemoveFromFav={addOrRemoveFromFav} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
