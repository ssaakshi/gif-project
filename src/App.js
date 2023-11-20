import './App.css';
import { useState } from "react";
import Spinner from './components/Spinner';


function App() {

  const [searchBarText, setText] = useState("Enter text to search");
  const [loading, setLoading] = useState(false)

  const [gif, setGif] = useState([])
  const changeHandler = (event) => {
    setText(event.target.value);
  }

  function sleep(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  

  const submitHandler = async () => {
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=U5oTb4iIB71RhG9a9kRkQzDMKWrcDOhv&q=${searchBarText}&limit=20`);
    setLoading(true)
    await sleep(2000);
    
    const movies = await response.json();
    // console.log(movies);
    // console.log(movies.data);
    setGif(movies.data)
    setLoading(false)
    console.log(movies.data[0].url)

  }

  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
      const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=U5oTb4iIB71RhG9a9kRkQzDMKWrcDOhv&q=${searchBarText}&limit=20`);
    setLoading(true)
    await sleep(2000);
    
    const movies = await response.json();
    console.log(movies);
    console.log(movies.data);
    setGif(movies.data)
    setLoading(false)


    }
  }

  return (
    <div className='main'>
      <div className='search-div'>
        <input type="text" name="searchbar" onChange={changeHandler} onKeyDown={handleKeyDown} placeholder={searchBarText}/>
        <button onClick={submitHandler}>Search</button>
      </div>

      {loading && <Spinner />}


      <div className='imagediv'>
        
        {gif.map((item) => (
          <a>
          <img src={item.images.fixed_height_still.url}  alt=""/>
          <img src={item.images.fixed_height.url}  alt=""/>
          </a>

        ))}
      </div>

    </div>
  );
}

export default App;
