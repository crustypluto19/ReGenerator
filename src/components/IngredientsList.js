import Card from './Card/Card'

const IngredientsList = (props) => {
    const ingredients = props.ingredients
    // TODO: add option to delete ingredients
    return (
        <div className="container bg-clip-padding bg-opacity-80 border border-gray-200 backdrop-filter-blur bg-gradient-to-br
         from-white to-gray-50 rounded-xl p-10 lg:w-1/4 mt-6">
            {<h1 className="pt-3 pb-3"><b>Ingredients</b></h1> }
            { ingredients.map((item) => (
                <Card key={"#"+item} element={item} ingredients={ingredients} update={props.update}/>
            ))}
        </div>
    )
}

export default IngredientsList
