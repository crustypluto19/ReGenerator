import './App.css';
import {useState, useEffect} from 'react';
import NavBar from './components/NavBar/NavBar';

function App() {
  // init gpt related stuff
  const OpenAI = require('openai-api');
  const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
  const openai = new OpenAI(OPENAI_API_KEY);
  
  const [ingredients, setIngredients] = useState([])
  const [value, setValue] = useState('')
  const [instructions, setInstructions] = useState([])

  const fetchData = async () => {
    console.log(ingredients);
    let prompt = "Write a recipe based on these ingredients and instructions:\n\nIngredients:"; 
    ingredients.forEach((e) => {
      prompt = prompt.concat("\n").concat(e);
    })
    const api = {
      engine: "curie-instruct-beta",
      prompt: prompt,
       //prompt: "Write a recipe based on these ingredients and instructions:\n\nIngredients:\nchicken thigh  \ndashi\nmirin \nonion\n",
      temperature: 0,
      max_tokens: 50,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    }
    console.log(api);
    
    const gptResponse = await openai.complete(api);
  
    console.log(gptResponse);
    console.log(gptResponse.data.choices[0]);

    // TODO: check if gpt added additional ingredients in response
    setInstructions(gptResponse.data.choices[0].text.split('\n'));

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
    if (value) {
      setIngredients(ingredients.concat(value));
    }
    setValue('');
    event.preventDefault();
  }

  return (
    <div className="App">
      <NavBar />
      
      <form onSubmit={handleSubmit}>
        <input type="text" value={value} onChange={handleChange} />
        <button type="submit">Add ingredient</button>
      </form>
      <button onClick={fetchData}>Click me</button>

      {/*TODO: make component for ingredient list*/}
      <ol>
        {ingredients.map(item => (
          <li key={item}>{item}</li>
        ))}
        
      </ol>
      
      {/*TODO: make component for instruction list*/}
      <ul>
      {instructions.map(item => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
