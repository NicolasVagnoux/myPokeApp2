import React, { useState, useEffect } from 'react';
import IPokedexItem from '../interfaces/IPokedexItem';
import types from '../data/types.json';
import PokeModal from './PokeModal';

const PokeListItem = ({ id, name, apiTypes, apiGeneration, image }: IPokedexItem) => {

    interface ISelectedType {
        name: string,
        color: string
    }

    const selectedType : ISelectedType = types.filter(type => type.name === apiTypes[0].name)[0];

    const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

    return (

        <>
            {selectedType && (
            <li className='pokeListItem' style={{backgroundColor: `${selectedType.color}90`}} onClick={() => setIsModalOpened(true)}>
                <p>{name}</p>
                <div className="pokeListItem__content">
                    <div className='pokeListItem__content__types'>
                        <p>{apiTypes[0].name}</p>
                        {apiTypes[1] ? <p>{apiTypes[1].name}</p> : ""}
                    </div>
                    <img src={image} alt={name} />
                </div>
                <img className="ball" src="./assets/white-ball.png" alt='ball' />
            </li>
            )}
            {selectedType && isModalOpened && (
                <PokeModal id={id} setIsModalOpened={setIsModalOpened} />
            )}
        </>
    );
};

export default PokeListItem;