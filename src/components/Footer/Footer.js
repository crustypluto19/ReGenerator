import './Footer.css'
import { FiGithub } from "react-icons/fi"

const Footer = () => {
    return (
        <div className="parent flex-row">
            <footer className="bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 footer mt-10 p-10 align-middle flex">
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/crustypluto19">
                    <FiGithub color="white" className="h-6 w-6 m-3 align-middle small" />
                </a>
                <h3 className="text-white text2">Evan C.</h3>
                <p className="text text-white pr-10">Recipe Generator powered by OpenAI</p>
            </footer>
        </div>
    )
}

export default Footer
