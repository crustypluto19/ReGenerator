import './App.css';
import {useState, useEffect} from 'react';
import NavBar from './components/NavBar/NavBar';
import IngredientsList from './components/IngredientsList';
import Form from './components/Form';
import InstructionsList from './components/InstructionsList';
import text from "./PromptAPI"
import Loading from './components/Loading';
import Footer from './components/Footer/Footer';

function App() {
  // init gpt related stuff
  const OpenAI = require('openai-api');
  const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
  const openai = new OpenAI(OPENAI_API_KEY);
  
  const [ingredients, setIngredients] = useState([])
  const [value, setValue] = useState('')
  const [instructions, setInstructions] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    return () => {
      setIsLoading(false)
    }
  }, [instructions]);

  const fetchData = async () => {
    let prompt = text; 
    ingredients.forEach((e) => {
      prompt = prompt.concat("\n").concat(e);
    })
    prompt.concat("\nDirections:")


    const api = {
      engine: "curie-instruct-beta",
      prompt: prompt,
      temperature: 0,
      max_tokens: 240,
      top_p: 1,
      frequency_penalty: 0.15,
      presence_penalty: 0
    }

    const gptResponse = await openai.complete(api);
  
    //console.log(gptResponse.data.choices[0]);
    
    let instr = gptResponse.data.choices[0].text;
    let temp = instr.indexOf("Instructions:");
    temp = temp < 0 ? instr.indexOf(1) : temp

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
    <div className="App relative min-h-screen">
      <NavBar />

      <div className="m-10 min-h-screen">
        <Form functions={{handleChange, handleFetch, handleSubmit, reset}} value={value} />
        <div className="container mx-auto flex flex-wrap mt-5 w-5/6 content-center justify-center mb-30">
          { ingredients.length !== 0 && !isLoading && <IngredientsList ingredients={ingredients} update={setIngredients} />}
          <div className="">{ isLoading && <Loading /> }</div>
          { instructions.length !== 0 && !isLoading && <InstructionsList instructions={instructions} />}
        </div>
      </div>
      
      <Footer />

    </div>
  );
}

export default App;
