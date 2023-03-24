import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import TeamContext from '../contexts/TeamBuilder';
import PokeListItem from './PokeListItem';

const BuilderPage = () => {

    // Context handling
    const { team, setTeam } = useContext(TeamContext);

    // To get location url
    const location = useLocation();

    return (
        <div className='builderPage'>
            <Navbar id='3' />
            <h2>Mon équipe :</h2>
            <ul className='builderPage__list'>
                {team && team.map(pokemon => 
                <li className='builderPage__list__item' key={pokemon.id}>
                    <PokeListItem id={pokemon.id!} name={pokemon.name!} apiTypes={pokemon.apiTypes!} image={pokemon.image!} location={location.pathname} />
                </li>
            )}
            </ul>
        </div>
    );
};

export default BuilderPage;