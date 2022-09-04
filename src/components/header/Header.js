import { Link } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import './header.css'

function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
            <div className="container-fluid">
                <Link to="/"className="navbar-brand text-light">React Challenge</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/listado" className="nav-link text-light active" aria-current="page">Listado</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/favourites" className="nav-link text-light active" aria-current="page">Favoritos</Link>
                        </li>
                    </ul>
                    <SearchBar />
                </div>
            </div>
        </nav>
    )
}

export default Header;