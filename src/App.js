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
  const [isLoading, setIsLoading] = useState(true)


  const fetchData = async () => {
    let prompt = "Write a recipe based on these ingredients and instructions:\nIngredients:"; 
    ingredients.forEach((e) => {
      prompt = prompt.concat("\n").concat(e);
    })

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
    let temp = instr.indexOf("Instructions");


    if (temp > 0) {
      let additionalIngredients = instr.substring(0,temp).trim().split('\n');
      let ingr = ingredients.concat(additionalIngredients);
      setIngredients(ingr);
    }

    setInstructions(instr.substring(temp, instr.length).split('\n'));
    setIsLoading(false)
  }

  /*
  const displaySteps = (instructions) => {
    instructions.forEach((step) => {
      console.log(step);
    })
  }
  */

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
      fetchData();
    } else {
    // TODO: make it look nicer
      alert("Please enter at least 3 ingredients!")
    }
  }

  const reset = () => {
    if (window.confirm('Are you sure you wish to reset everything?')) {
      setIngredients([])
      setInstructions([])
      setIsLoading(true)
    }
  }

  return (
    <div className="App">
      <NavBar />
      <Form functions={{handleChange, handleFetch, handleSubmit, reset}} value={value} />
      <IngredientsList ingredients={ingredients} />
      <InstructionsList instructions={instructions} isLoading={isLoading} />
      
    </div>
  );
}

export default App;
