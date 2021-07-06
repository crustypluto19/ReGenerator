import './Card.css'
import { HiOutlineTrash } from "react-icons/hi"


const Card = (props) => {
  // for ingredientsList
  // const id = props.id
  const ingredients = props.ingredients
  const elem = props.element

  const handleDelete = () => {
    props.update(ingredients.filter((e) => elem !== e.substr(0, e.length)))
  }

  return (
    <div className = "card flex">
      <div className="text-center m-auto">
        <h4>{elem}</h4>
      </div>
      
      <div className="text-right">
        { ingredients && <button onClick={handleDelete}>
            <HiOutlineTrash className="h-5 w-5 text-red-700 mt-1" />
          </button> 
        }
      </div>
    </div>
  )
}

export default Card
