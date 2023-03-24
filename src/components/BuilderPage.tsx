import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import TeamContext from '../contexts/TeamBuilder';
import PokeListItem from './PokeListItem';
import types from '../data/types.json';

const BuilderPage = () => {

    // Context handling
    const { team, setTeam } = useContext(TeamContext);
    console.log(team);

    // To get location url
    const location = useLocation();

    return (
        <div className='builderPage'>
            <Navbar id='3' />
            <h2>Mon équipe :</h2>
            {!team.length && <p className='builderPage__ifNothing'>Ajouter des membres à votre équipe depuis la page Pokédex !</p>}
            <ul className='builderPage__list'>
                {team && team.map(pokemon => 
                <li className='builderPage__list__item' key={pokemon.id}>
                    <PokeListItem id={pokemon.id!} name={pokemon.name!} apiTypes={pokemon.apiTypes!} image={pokemon.image!} location={location.pathname} />
                    <p>Super efficace sur :</p>
                    <div className='builderPage__list__item__types'>
                        {pokemon && pokemon.type1.strenghts.map(x => <p style={{backgroundColor: `${types.filter(type => type.name === x)[0].color}90`}}>{x}</p>)}
                        {pokemon.type2.strenghts && pokemon.type2.strenghts.filter(x => !pokemon.type1.strenghts.includes(x)).map(x => <p style={{backgroundColor: `${types.filter(type => type.name === x)[0].color}90`}}>{x}</p>)}
                    </div>
                </li>
            )}
            </ul>
        </div>
    );
};

export default BuilderPage;