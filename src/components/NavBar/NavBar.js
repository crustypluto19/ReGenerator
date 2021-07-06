import './NavBar.css'

function NavBar() {
  return (
    <div>
      <nav className="flex items-center justify-between flex-wrap bg-purple-500 p-6 mb-10 pl-10">
        <h1 className="logo">ReGenerator</h1>
        <p className="text-white">Recipe Generator powered by OpenAI</p>
      </nav>
    </div>
  )
}

export default NavBar
