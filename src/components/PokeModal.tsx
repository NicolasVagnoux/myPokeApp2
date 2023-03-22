import React, { useEffect, useState } from 'react';
import IPokedexItem from '../interfaces/IPokedexItem';
import types from '../data/types.json';
import axios from 'axios';
import StatChart from './StatChart';
import DefensiveChart from './DefensiveChart';

interface Props {
    id: number,
    setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>,
}

const PokeModal = ({ id, setIsModalOpened }: Props) => {

    // To change directly the displayed pokemon
    const [currentId, setCurrentId] = useState<number>(id);
    const decreaseId = () => {
        currentId > 1 && setCurrentId(currentId-1);
    };
    const increaseId = () => {
        currentId < 898 && setCurrentId(currentId+1);
    };

    //info storage
    const [info, setInfo] = useState<IPokedexItem>();

    // API call
    useEffect(() => {
        const getInfo = async () => {
            const { data } = await axios.get(`https://pokebuildapi.fr/api/v1/pokemon/${currentId}`);
            setInfo(data);
        };
        getInfo();
    }, [currentId]);

    // Type color handling
    interface ISelectedType {
        name: string,
        color: string
    }
    const selectedType : ISelectedType = types.filter(type => type.name === info?.apiTypes[0].name)[0];
    
    return (
        <>
        {info &&
        <div className='pokeModal'>
            <div className='pokeModal__content'>
                <div className='pokeModal__content__1st' style={{backgroundColor: `${selectedType.color}90`}}>
                    <button className='pokeModal__content__1st__close' type='button' onClick={() => setIsModalOpened(false)}><img src="./assets/cross.svg" alt="close" /></button>
                    <div className='pokeModal__content__1st__title'>
                        <h2>{info.name}</h2>
                        <h3>#{info.id < 10 ? '00'+info.id : info.id < 100 ? '0'+info.id : info.id}</h3>
                    </div>
                    <div className='pokeModal__content__1st__types'>
                        <h3>{info.apiTypes[0].name}</h3>
                        <h3>{info.apiTypes[1] && info.apiTypes[1].name}</h3>
                    </div>
                    <img className='pokeModal__content__1st__image' src={info.image} alt={info.name} />
                </div>
                <div className='pokeModal__content__2nd'>
                    <div className='pokeModal__content__2nd__arrows'>
                        <button onClick={decreaseId}><img src='./assets/left-arrow.svg' alt='left-arrow' /></button>
                        <button onClick={increaseId}><img src='./assets/left-arrow.svg' alt='right-arrow' /></button>
                    </div>
                    <div className='pokeModal__content__2nd__strat'>
                        <div className='pokeModal__content__2nd__strat__stats'>
                            <p>Statistiques :</p>
                            <StatChart {...info} />
                        </div>
                        <div className='pokeModal__content__2nd__strat__resistances'>
                            <p>Sensibilités :</p>
                            <DefensiveChart {...info} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        }
        </>
    );
};

export default PokeModal;