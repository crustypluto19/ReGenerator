import './Footer.css'
import { FiGithub } from "react-icons/fi"

const Footer = () => {
    return (
        <div className="parent">
            <footer className="flex footer mt-10 p-10 align-middle">
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/crustypluto19">
                    <FiGithub color="white" className="h-6 w-6 m-3 align-middle" />
                </a>
                <h3 className="text-white">Evan C.</h3>
                <p className="text text-white pr-10">Recipe Generator powered by OpenAI</p>
            </footer>
        </div>
    )
}

export default Footer
