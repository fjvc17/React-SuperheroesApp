import { useHistory, Link } from 'react-router-dom'

function Navbar() {
  const history = useHistory()
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Heroes</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link" to="/">Team</Link>
            <Link className="nav-link" to="/search">Search</Link>
            <button className="btn btn-sm btn-outline-secondary" onClick={() => {
              localStorage.removeItem("token")
              history.replace("/login")
            }}>Log out</button>
          </div>
        </div>
      </div>
    </nav>)
}

export default Navbar