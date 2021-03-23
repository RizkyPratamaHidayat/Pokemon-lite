import React, { useEffect, useState } from 'react';
import './globalStyles.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider} from "@apollo/react-hooks";
import PokemonsContainer from './Screen/PokemonList';
import PokemonDetail from './Screen/PokemonDetail';
import CatchPokemon from './Screen/CatchPokemon';
import MyPokemonList from './Screen/MyPokemonList';
import Release from './Screen/Release';
import Header from './Components/HeaderNavigation';
import {
  BrowserRouter as Switch,
  Route,
  Router,
 } from 'react-router-dom'


const App = () => {
  const [hiddenHeader, setHiddenHeader] = useState(localStorage.getItem(false))

  const client = new ApolloClient({
    uri: 'https://graphql-pokemon2.now.sh' //atau https://graphql-pokemon2.vercel.app/
  })
  return (
   <ApolloProvider client={client}>

       <Switch>
       <Header />
      <Route exact path="/" component={PokemonsContainer} />
      <Route  path="/list" component={PokemonsContainer} />
      <Route  path="/pokemonDetail" component={PokemonDetail} />
      <Route  path="/catchPokemon" component={CatchPokemon}/>
      <Route path="/myPokemonList" component={MyPokemonList} />
      <Route path="/release" component={Release} />
      </Switch>

 
    
   </ApolloProvider>
  );
}

export default App;
