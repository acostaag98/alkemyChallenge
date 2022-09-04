import { Navigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import swAlert from "@sweetalert/with-react"

function List(props) {
   
    let token = sessionStorage.getItem("token");

    const [moviesList, setMoviesList] = useState([]);

    useEffect(() => {
        const endPoint = "https://api.themoviedb.org/3/discover/movie?api_key=b2be5ba2709a10de7249284e60470a3d&language=es-ES&page=1";
        axios.get(endPoint)
            .then(response => {
                const apiData = response.data;
                setMoviesList(apiData.results)
            })
            .catch(error => {
                swAlert(<div>
                    <h2>Hubo errores al cargar la página</h2>
                    <h2>Por favor intente más tarde.</h2>
                    </div>)
            })
    }, [setMoviesList]);

    return (
        <>
            {!token && <Navigate to="/" />}
            <div className="row">
            {
                moviesList.map((oneMovie, idx) => {
                    return (
                            <div className="col-3 bg-dark" key={idx}>
                                <div className="card mt-4 bg-dark">
                                    <img className="card-img-top" src={"https://image.tmdb.org/t/p/w500/" + oneMovie.poster_path} alt="Card image cap" />
                                    <button
                                     type="button" class="btn btn-dark" data-toggle="button" aria-pressed="false" autocomplete="off"
                                    onClick={props.addOrRemoveFromFav}  
                                    data-movie-id={oneMovie.id} >
                                    🖤</button>
                                    <div className="card-body text-light">
                                        <h5 className="card-title text-light">{oneMovie.title.substring(0, 25)}</h5>
                                        <p className="card-text text-light">{oneMovie.overview.substring(0, 99)}...</p>
                                        <Link to={"/detalle?movieID=" + oneMovie.id} className="btn btn-outline-light">Ver detalle</Link>
                                    </div>
                                </div>
                            </div>
                        )
                })
            }
            </div>
        </>
    );
}

export default List;

//onClick={props.addOrRemoveFromFav} data-movie-id={oneMovie.id}>