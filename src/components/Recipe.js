import RecipeCard from './RecipeCard/RecipeCard'

const Recipe = (props) => {
    const recipes = JSON.parse(localStorage.getItem('Recipes'))
    return (
        <div>
            { recipes.length === 0 && <h4 className="text-center">No recipes saved yet!</h4>}
            <div className="content-center flex flex-row">
            { recipes.map((e, index) => (
                <RecipeCard number={index} ingredients={e.ingredients} instructions={e.instructions} />
            ))}
            </div>
        </div>
        
    )
}

export default Recipe
