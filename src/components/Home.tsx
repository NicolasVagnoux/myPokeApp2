import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import IPokedexItem from '../interfaces/IPokedexItem';
import PokeListItem from './PokeListItem';


const Home = () => {

    // Pokedex List
    const [pokedexList, setPokedexList] = useState<IPokedexItem[]>();

    // Pagination (by Generation)
    const [generation, setGeneration] = useState(1);
    const allGens = [1,2,3,4,5,6,7,8];

    //Scroll to top when changing filter
    const topRef = useRef<null | HTMLDivElement>(null);
    useEffect(() => {
      topRef.current?.scrollIntoView();
    }, [generation]);

    // API call for pokedex list
    useEffect(() => {
        const getPokedexList = async () => {
            const { data } = await axios.get('https://pokebuildapi.fr/api/v1/pokemon');
            setPokedexList(data);
        };
        getPokedexList();
    }, []);

    return (
        <div className='home'>
            <div className='homme_filters'>
                <div className='home__filters__genPagination'>
                    {allGens.map(gen => <button className={`home__filters__genPagination__button ${gen === generation && 'home__filters__genPagination__button--selected'}`} type='button' onClick={() => setGeneration(gen)}>{gen}G</button>)}
                </div>
            </div>
            <ul className='home__pokedexList'>
                <div className='topRef' ref={topRef}></div>
                {pokedexList && pokedexList.filter(pokemon => pokemon.apiGeneration === generation).map(pokemon => (<PokeListItem {...pokemon} />))}
            </ul>
        </div>
    );
};

export default Home;