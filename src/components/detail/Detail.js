import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Detail() {
    let token = sessionStorage.getItem("token");
    let query = new URLSearchParams(window.location.search);
    let movieID = query.get("movieID")
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=b2be5ba2709a10de7249284e60470a3d&language=es-ES`
        axios.get(endPoint)
            .then(response => {
                const movieData = response.data;
                setMovie(movieData);
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return (
        <>
            {!token && <Navigate to="/" />}
            {!movie && <>
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </>}
            {movie && <>
                <h2>Detalle de la pelicula</h2>
                <div className="row">
                    <div className="col-4">
                        <img src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} className="card-img-top" alt="movie poster" />
                    </div>
                    <div className="col-8">
                        <h5>Titulo: {movie.title} </h5>
                        <h5>Fecha de estreno: { movie.release_date }</h5>
                        <h5>Rating: {movie.vote_average}</h5>
                        <h5>Reseña:</h5>
                        <p>{movie.overview}</p>
                        <h5>Genero: </h5>
                        <ul>
                            {movie.genres.map(oneGenre => <li key={oneGenre.id}>{oneGenre.name}</li>)}
                        </ul>
                    </div>
                </div>
            </>}
        </>
    )
}

export default Detail;