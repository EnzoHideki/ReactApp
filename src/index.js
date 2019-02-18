import './index.css';
import {render} from 'react-dom';
import React, {Component} from 'react';

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

class Pokemon extends Component{
  render(){
    const {pokemon,id} = this.props;
    return <div className="pokemon--species" onClick={() => this.props.click(id)}>
            <div className="pokemon--species--container">
              <div className="pokemon--species--sprite">
                <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + id + ".png"} /> 
              </div>
              <div className="pokemon--species--name"> {capitalizeFirstLetter(pokemon.name)} </div>
            </div>
          </div>;
    }
}

class PokemonList extends Component{
  constructor(props){
    super(props);
    this.state = {
      species : [],
      fetched : false,
    };

    fetch('https://pokeapi.co/api/v2/pokemon?limit=300').then(res=>res.json())
    .then(response=>{
      this.setState({
        species : response.results,
        fetched : true
      });
    });
  }

  render(){
    const {fetched, species} = this.state;
    let content ;
    if(fetched){
      content = <div className="pokemon--species--list">{species.map((pokemon,index)=><Pokemon key={pokemon.name} 
      id={index+1} pokemon={pokemon} click={(i) => this.props.clica(i)}/>)}</div>;
    }else {
      content = <p> Loading ...</p>;
    }
    return  <div style={{overflow: 'scroll', margin: '1%', overflowX: 'hidden', height: '80vh', width: '48%', float: 'left'}}>
      {content}
    </div>;
  }
}


class PokeView extends Component{
  render() { 
    var info = this.props.info;
    if (info === null) {
      return <div></div>
    } else {
      var i = 1;
      return (
        <div style={{position: 'relative', margin: '1%', float: 'left', height: '80vh', width: '48%'}}>
          <div>
            <div className="card box3">
              <div className="card-body">
                <div><img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + info.id + ".png"} /> </div>
                <div>{capitalizeFirstLetter(info.name)}</div>
              </div>
            </div>
          </div>
          <div className="box1">
            <div className="box2">
              <div className="card box3">
                <div className="card-body">
                  <h5 className="card-title">Abilities</h5>
                  <p className="card-text">{info.abilities.map((item,index) => <div key={i++}>{item.ability.name}</div>)}</p>
                </div>
              </div>
            </div>
            <div className="box2">
              <div className="card box3">
                <div className="card-body">
                  <h5 className="card-title">Stats</h5>
                  <p className="card-text">{info.stats.map((item,index) => <div key={i++}>{item.stat.name} {item.base_stat}</div>)}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="box1">
            <div className="box2">
              <div className="card box3">
                <div className="card-body">
                  <h5 className="card-title">Physical stats</h5>
                  <p className="card-text">Height: {info.height} <br></br> Weight: {info.weight}</p>
                </div>
              </div>
            </div>
            <div className="box2">
              <div className="card box3">
                <div className="card-body">
                  <h5 className="card-title">Types</h5>
                  <p className="card-text">{info.types.map((item,index) => <div key={i++}>{item.type.name}</div>)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

class PokeApp extends Component{
  constructor(props) {
    super(props);
    this.state = {
      info: null,
    };
  }

  handleClick(i) {
    fetch('https://pokeapi.co/api/v2/pokemon/' + i).then(res=>res.json())
      .then(response=>{
        this.setState({ info : response, });
      });
  }

  render(){
    return <div className="pokeapp">
    <div style={{margin: '1%'}}><img src="https://fontmeme.com/permalink/190218/a6dd59a6e8f4e7c50fcde7db78bab361.png" style={{height: '8vh'}} alt="pokemon-font" border="0"></img></div>
      <PokemonList clica={(i) => this.handleClick(i)}/>
      <PokeView  info={this.state.info}/>
    </div>;
  }
}

render(<PokeApp/>,document.getElementById('root'))