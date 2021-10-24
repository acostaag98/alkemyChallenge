import { Component } from "react";
import "./Home.scss"
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Home extends Component {

    cerrarSesion = () => {
        cookies.remove("id", { path: "/" })
        cookies.remove("Apellido", { path: "/" })
        cookies.remove("Nombre", { path: "/" })
        cookies.remove("username", { path: "/" })
        cookies.remove("password", { path: "/" })
        window.location.href = "./"

    }
    componentDidMount() {
        if (!cookies.get("username")) {
            window.location.href = "./"
        }
    }

    render() {
        return (
            <div className=''>
                <nav className="navbar fixed-top navbar-expand-lg navbar-dark p-md-3">
                    <div className="container">
                        <a className="navbar-brand" href="/home">SuperHero Team</a>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarNav">
                            <div className="mx-auto"></div>
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link text-white" href="/login" onClick={() => this.cerrarSesion()}>Cerrar Sesión</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <nav className="main">
                    <a href="/buscador">Buscador de heroes</a>
                    <a href="/team">Mi team</a>
                    <div id="indicator"></div>
                </nav>

            </div>

        )
    }
}

export default Home;