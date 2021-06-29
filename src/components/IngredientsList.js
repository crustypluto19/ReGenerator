import React from 'react'

const IngredientsList = (props) => {
    const ingredients = props.ingredients
    // TODO: add option to delete ingredients
    return (
        <div className="container mx-auto bg-gray-50 rounded-xl p-10 w-40 m-6">
            { ingredients.length !== 0 && <h2><b>Ingredients</b></h2> }
            <ol className="list-none">
            {ingredients.filter(item => item !== "\n").map(item => (
                <li key={item}>{item}</li>
            ))}
            </ol>
        </div>
    )
}

export default IngredientsList
