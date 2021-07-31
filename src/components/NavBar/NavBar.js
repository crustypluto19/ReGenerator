import './NavBar.css'
import {Link} from 'react-router-dom'

function NavBar() {
  return (
    <div>
      <nav className="flex items-center justify-between flex-wrap bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 p-6 mb-10 pl-10">
        <h1 className="logo">ReGenerator</h1>
        <div className="links">
          <Link to="/" className="p-3">Generator</Link>
          <Link to="/recipes" className="p-3">Recipes</Link>
        </div>

      </nav>
    </div>
  )
}

export default NavBar
