import './App.css';
import {useState, useEffect} from 'react';
import NavBar from './components/NavBar/NavBar';
import IngredientsList from './components/IngredientsList';
import Form from './components/Form';
import InstructionsList from './components/InstructionsList';
import text from "./PromptAPI"
import Loading from './components/Loading';
import Recipe from './components/Recipe'
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  // init gpt related stuff
  const OpenAI = require('openai-api');
  const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
  const openai = new OpenAI(OPENAI_API_KEY);
  
  const [ingredients, setIngredients] = useState([])
  const [value, setValue] = useState('')
  const [instructions, setInstructions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    return () => {
      setIsLoading(false)
    }
  }, [instructions]);


  useEffect(() => {
    localStorage.setItem('Recipes', JSON.stringify(recipes))
  }, [recipes])

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
  
    //console.log(gptResponse.data);
    
    let instr = gptResponse.data.choices[0].text;
    let temp = instr.indexOf("Instructions:");
    temp = temp < 0 ? instr.indexOf(1) : temp

    setInstructions(instr.substring(temp, instr.length).split('\n').filter((e) => e !== ""));
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
      alert("Please enter at least 3 ingredients!")
    }
  }

  const handleSave = () => {
    recipes.push({ingredients, instructions})
    localStorage.setItem('Recipes', JSON.stringify(recipes))
    setRecipes(recipes)
    window.alert("Successfully saved recipe!")
    //console.log(recipes)
  }

  const reset = () => {
    if (window.confirm('Are you sure you wish to reset everything?')) {
      setIngredients([])
      setInstructions([])
    }
  }

  return (
    <Router>
        <div className="App h-screen relative">
          <NavBar />
          <Switch>
            <Route exact path="/">
              <div className="m-10 content pb-10">
                <Form functions={{handleChange, handleFetch, handleSubmit, reset, handleSave}} length={instructions.length} value={value} />
                <div className="container mx-auto flex flex-wrap mt-5 w-5/6 content-center justify-center mb-30">
                  { ingredients.length !== 0 && !isLoading && <IngredientsList ingredients={ingredients} update={setIngredients} />}
                  <div className="">{ isLoading && <Loading /> }</div>
                  { instructions.length !== 0 && !isLoading && <InstructionsList instructions={instructions} />}
                </div>
              </div>
            </Route>
            <Route path="/recipes">
              <div className="container">
               <h1><b>Recipes</b></h1>
              </div>
              <div className="pb-10 content">
                <Recipe recipes={recipes}/>
              </div>
            </Route>
          </Switch>
        <Footer />

        </div>
    </Router>
    
  );
}

export default App;
