import React from 'react'

const IngredientsList = (props) => {
    const ingredients = props.ingredients
    // TODO: add option to delete ingredients
    return (
        <div>
            <ol>
            {ingredients.map(item => (
                <li key={item}>{item}</li>
            ))}
            </ol>
        </div>
    )
}

export default IngredientsList
