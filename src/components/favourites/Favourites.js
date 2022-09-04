import {Navigate, Link} from "react-router-dom"

function Favourites(props) {

    let token = sessionStorage.getItem("token");

    return (<>

    {!token && <Navigate to="/" />}
    <h2>Sección favoritos</h2>
    { !props.favourites.length && <div>No hay favoritos, vuelve al listado para agregar!</div>}
        <div className="row">
            {
                props.favourites.map((oneMovie, idx) => {
                    return (
                        <div className="col-3 bg-dark" key={idx}>
                            <div className="card mt-4 bg-dark">
                                <img className="card-img-top" src={oneMovie.imgURL} alt="Card image cap" />
                                <button className="btn btn-outline-dark"
                                    onClick={props.addOrRemoveFromFav}
                                    data-movie-id={oneMovie.id}>
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
    </>);
}

export default Favourites;