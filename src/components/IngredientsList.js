import Card from './Card/Card'

const IngredientsList = (props) => {
    const ingredients = props.ingredients
    // TODO: add option to delete ingredients
    return (
        <div className="container mx-auto bg-gray-50 bg-opacity-80 rounded-xl p-10 lg:w-1/4 w-44 m-6">
            {<h1 className="mt-3 mb-3"><b>Ingredients</b></h1> }
            { ingredients.map((item) => (
                <Card key={"#"+item} element={item} ingredients={ingredients} update={props.update}/>
            ))}
        </div>
    )
}

export default IngredientsList
