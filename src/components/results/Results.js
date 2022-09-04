import { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import swAlert from "@sweetalert/with-react";

function Results() {

    const [moviesResult, setMovieResult] = useState([]);
    let query = new URLSearchParams(window.location.search);
    let keyword = query.get("keyword")

    useEffect(() => {
        const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=b2be5ba2709a10de7249284e60470a3d&language=es-ES&query=${keyword}`
        axios.get(endPoint)
            .then(response => {
                const movieArray = response.data.results;
                setMovieResult(movieArray);
                if(movieArray.length === 0) {
                    swAlert(<h2>No hay ningún resultado con la busqueda realizada</h2>)
                }
            })
            .catch(error => console.log(error))
    }, [keyword]);

    return (<>
        <h2>Resultados de: "{keyword}"</h2>
        <div className="row">
            {
                moviesResult.map((oneMovie, idx) => {
                    return (
                            <div className="col-4" key={idx}>
                                <div className="card mt-4">
                                    <img className="card-img-top" src={"https://image.tmdb.org/t/p/w500/" + oneMovie.poster_path} alt="Card image cap" />
                                    <div className="card-body">
                                        <h5 className="card-title">{oneMovie.title.substring(0, 25)}</h5>
                                        <p className="card-text">{oneMovie.overview.substring(0, 99)}...</p>
                                        <Link to={"/detalle?movieID=" + oneMovie.id} className="btn btn-primary">Ver detalle</Link>
                                    </div>
                                </div>
                            </div>
                        )
                })
            }
            </div>
    </>);
}

export default Results;