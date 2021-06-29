import './App.css';
import {useState} from 'react';
import NavBar from './components/NavBar/NavBar';
import IngredientsList from './components/IngredientsList';
import Form from './components/Form';
import InstructionsList from './components/InstructionsList';

function App() {
  // init gpt related stuff
  const OpenAI = require('openai-api');
  const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
  const openai = new OpenAI(OPENAI_API_KEY);
  
  const [ingredients, setIngredients] = useState([])
  const [value, setValue] = useState('')
  const [instructions, setInstructions] = useState([])
  const [isLoading, setIsLoading] = useState(false)


  const fetchData = async () => {
    let prompt = "Write a recipe based on these ingredients and instructions:\nIngredients:"; 
    ingredients.forEach((e) => {
      prompt = prompt.concat("\n").concat(e);
    })
    prompt.concat("\nDirections:")
    
    // TODO: variable max tokens

    const api = {
      engine: "curie-instruct-beta",
      prompt: prompt,
      temperature: 0,
      max_tokens: 170,
      top_p: 1,
      frequency_penalty: 0.2,
      presence_penalty: 0
    }

    const gptResponse = await openai.complete(api);
  
    console.log(gptResponse.data.choices[0]);

    // check for additional ingredients
    let instr = gptResponse.data.choices[0].text;
    let temp = instr.indexOf("Instructions:");
    temp = temp < 0 ? instr.indexOf(1) : temp

    let additionalIngredients = instr.substring(0,temp).trim().split('\n');
    additionalIngredients.map(e => ingredients.concat(e))
    let ingr = ingredients.concat(additionalIngredients);
    setIngredients(ingr);
    
    //console.log(instr)

    setInstructions(instr.substring(temp, instr.length).split('\n'));
  }

  const handleChange = event => {
    setValue(event.target.value);
  }

  const handleSubmit = event => {
    if (ingredients.includes(value)) {
      alert("You have already added this ingredient!")
    }

    if (value && !ingredients.includes(value)) {
      setIngredients(ingredients.concat(value));
    }

    setValue('');
    event.preventDefault();
  }

  const handleFetch = () => {
    // minimum of 3 ingredients
    if (ingredients.length >= 3) {
      setIsLoading(true)
      fetchData();
      setIsLoading(false)

    } else {
    // TODO: make it look nicer
      alert("Please enter at least 3 ingredients!")
    }
  }

  const reset = () => {
    if (window.confirm('Are you sure you wish to reset everything?')) {
      setIngredients([])
      setInstructions([])
    }
  }

  return (
    <div className="App">
      <NavBar />
      <Form functions={{handleChange, handleFetch, handleSubmit, reset}} value={value} />
      <div className="container mx-auto flex flex-wrap mt-10 items-start w-1/2">
        { ingredients.length !== 0 && <IngredientsList ingredients={ingredients} />}
        { isLoading && <div> Generating recipe... </div> }
        { instructions.length !== 0 && <InstructionsList instructions={instructions} isLoading={isLoading} />}
      </div>
      
    </div>
  );
}

export default App;
