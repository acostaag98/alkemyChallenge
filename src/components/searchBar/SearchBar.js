import swAlert from "@sweetalert/with-react"
import { useNavigate } from "react-router-dom"

function SearchBar() {

    let token = sessionStorage.getItem("token");

    const navigate = useNavigate();
    const submitHandler = e => {
        e.preventDefault();
        const keyword = e.currentTarget.keyword.value.trim();
        if (keyword.length < 4) {
                swAlert(<h2>Tienes que escribir una palabra clave</h2>)
            } else {
                e.currentTarget.keyword.value = ""
                navigate(`/results?keyword=${keyword}`)
            }
        }

    return (
        <>
            {token && 
            <form className="d-flex ml-4" onSubmit={submitHandler}>
                <input className="form-control me-2" type="text" name="keyword" placeholder="Buscar pelicula" aria-label="Search" />
                <button className="btn btn-success ml-2 text-light" type="submit">Buscar</button>
            </form>
            } 
        </>
    );
}

export default SearchBar;