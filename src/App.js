import './App.css';
import {useState, useEffect} from 'react';
import NavBar from './components/NavBar/NavBar';
import StepCard from './components/StepCard/StepCard';

function App() {
  // init gpt related stuff
  const OpenAI = require('openai-api');
  const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
  const openai = new OpenAI(OPENAI_API_KEY);
  
  const [ingredients, setIngredients] = useState([])
  const [value, setValue] = useState('')
  const [instructions, setInstructions] = useState([])

  const fetchData = async () => {
    let prompt = "Write a recipe based on these ingredients and instructions:\nIngredients:"; 
    ingredients.forEach((e) => {
      prompt = prompt.concat("\n").concat(e);
    })

    const api = {
      engine: "curie-instruct-beta",
      prompt: prompt,
      temperature: 0,
      max_tokens: 120,
      top_p: 1,
      frequency_penalty: 0.2,
      presence_penalty: 0
    }
    const gptResponse = await openai.complete(api);
  
    console.log(gptResponse.data.choices[0]);

    // check for additional ingredients
    let instr = gptResponse.data.choices[0].text;
    let temp = instr.indexOf("Instructions");

    if (temp > 0) {
      let additionalIngredients = instr.substring(0,temp).trim().split('\n');
      let ingr = ingredients.concat(additionalIngredients);
      setIngredients(ingr);
    }

    setInstructions(instr.substring(temp, instr.length).split('\n'));
    // displaySteps(instructions);
  }

  const displaySteps = (instructions) => {
    instructions.forEach((step) => {
      console.log(step);
    })
  }

  const handleChange = event => {
    setValue(event.target.value);
  }

  const handleSubmit = event => {
    // saves 
    // TODO add popup stating ingredient already added
    // display message: ingredient alr added!
    if (value && !ingredients.includes(value)) {
      setIngredients(ingredients.concat(value));
    }
    setValue('');
    event.preventDefault();
  }

  const handleFetch = () => {
    // TODO: add message if < 3 ingredients say at least 3 ingredients needed
    // minimum of 3 ingredients
    if (ingredients.length >= 3) {
      fetchData();
    }
  }

  return (
    <div className="App">
      <NavBar />
      
      <form onSubmit={handleSubmit} className = "w-full">
        <input type="text" value={value} onChange={handleChange} className = "bg-gray-75 appearance-none border-2 border-gray-200 rounded w-full max-w-lg py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 mr-2 mb-4" placeholder="Enter ingredient here..."/>

        <button type="submit" className = "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Add ingredient</button>
      </form>

      <button className = "bg-purple-500 hover:bg-green-500 text-white font-bold py-2 px-4 border-b-4 border-gray-400 hover:border-blue-500 rounded m-3 mb-5" onClick={handleFetch}>Generate recipe</button>

      {/*TODO: make component for ingredient list*/}
      <ol>
        {ingredients.map(item => (
          <li key={item}>{item}</li>
        ))}
        
      </ol>
      
      {/*TODO: make component for instruction list*/}
      {instructions.map(item => (
          <StepCard key = {item} step = {item} />
        ))}
      
    </div>
  );
}

export default App;
