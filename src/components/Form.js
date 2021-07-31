import React from 'react'

const Form = (props) => {
    const functions = props.functions;
    const length = props.length;

    const handleSubmit = functions.handleSubmit;
    const handleChange = functions.handleChange;
    const handleFetch = functions.handleFetch;
    const handleSave = functions.handleSave;
    const value = props.value;
    const reset = functions.reset;

    return (
        <div>
             <form onSubmit={handleSubmit} className = "w-full">
                <input type="text" value={value} onChange={handleChange} className = "bg-gray-75 appearance-none border-2 border-gray-200 rounded w-full max-w-lg py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 mr-2 mb-4" placeholder="Enter ingredient here..."/>
                <button type="submit" className = "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    Add ingredient
                </button>
            </form>

            <button onClick={handleFetch} className = "bg-gradient-to-r bg-purple-500 hover:from-green-400 via-indigo-400 to-blue-500 text-white font-bold py-2 px-4 border-b-4 border-gray-400 hover:border-purple-300 rounded m-1 mb-3">
                        Generate recipe
            </button>

            {length !== 0 && 
                <button onClick={handleSave} className = "bg-transparent hover:bg-green-400 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-700 hover:border-transparent rounded m-1 mb-3">
                    Save
                </button>
            }
            
            <button onClick={reset} className = "bg-transparent hover:bg-red-400 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-700 hover:border-transparent rounded m-1 mb-3">
                    Reset
            </button>

        </div>
    )
}

export default Form
