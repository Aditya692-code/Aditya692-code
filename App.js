import './App.css';
// import Item from './Myitem';
import React from 'react';

class FilmItemRow extends React.Component{
  render(){
    return(
      <li>
        <a href={this.props.url}>{this.state.url}</a>
      </li>
    )
  }
}


class StarWars extends React.Component{

  constructor(){
    super()

    this.state = {
      loadedcharacter: false,
      name: null,
      height: null,
      homeworld: null,
      films: []
    }
  }

  getNewCharacter(){
    const randomNumber = Math.round(Math.random() * 82)
    const url = `https://swapi.dev/api/people/${randomNumber}/`
    fetch(url)
      .then(Response => Response.json())
      .then(data => {
        this.setState({
          name: data.name,
          height: data.height,
          homeworld: data.homeworld,
          films: data.films[0],
          loadedcharacter: true,
        })
      })
    
  }

  render(){

    const movies = this.state.films.map((film, i) => {
      return <FilmItemRow key={i} url={film} />
    })


    return(
      <div>

        {
          this.state.loadedcharacter && 
            <div>

              <h3>{this.state.name}</h3>
              <p>{this.state.height}</p>
              <p><a href={this.state.homeworld}>Homeworld</a></p>
              <ul>
                <li>{this.state.films}</li>
              </ul>

            </div>
        }

        
        <button type='button' className='btn' onClick={()=> this.getNewCharacter()}>Randomize Characters</button>
      </div>
    )
  }
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <StarWars />
      </header>
    </div>
  );
}

export default App;
