import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import IPokedexItem from '../interfaces/IPokedexItem';
import PokeListItem from './PokeListItem';
import types from '../data/types.json';
import MobileFilters from './MobileFilters';

const Home = () => {

    // Pokedex List
    const [pokedexList, setPokedexList] = useState<IPokedexItem[]>();

    // Pagination (by Generation)
    const [generation, setGeneration] = useState(0);
    const allGens = [1,2,3,4,5,6,7,8];

    // Search
    const [search, setSearch] = useState<string>('');

    // Type filters
    const [typeFilters, setTypeFilters] = useState<string[]>([]);

    // API Loading handling
    const [isApiLoading, setIsApiLoading] = useState<boolean>(false);
    useEffect(() => {
        console.log('API Loading : ' + isApiLoading);
    }, [isApiLoading]);

    //Scroll to top when changing filter
    const topRef = useRef<null | HTMLDivElement>(null);
    useEffect(() => {
      topRef.current?.scrollIntoView();
    }, [generation, typeFilters]);

    // API call for pokedex list
    useEffect(() => {
        const getPokedexList = async () => {
            setIsApiLoading(true);
            const { data } = await axios.get('https://pokebuildapi.fr/api/v1/pokemon');
            setPokedexList(data);
            setIsApiLoading(false);
        };
        getPokedexList();
    }, []);

    // Function to add type filters
    const handleTypeFilters = (type: string) => {
        if (!typeFilters.includes(type)) {
            if (typeFilters.length < 2) {
                setTypeFilters([...typeFilters, type]);
            }
        } else {
            setTypeFilters(typeFilters.filter(x => x !== type));
        }
    };

    return (
        <div className='home'>

            <div className='home__filters'>
                <h1>My PokéApp</h1>
                <div className='home__filters__links'>
                    <Link to='/'><button type='button'>Pokédex</button></Link>
                    <Link to='/types'><button type='button'>Types</button></Link>
                    <Link to='/'><button type='button'>Constructeur</button></Link>
                </div>
                <div className='home__filters__search'>
                    <p>Rechercher :</p>
                    <input type='text' value={search} onChange={(e) => setSearch(e.target.value)} />
                    {search && <img src='./assets/cross_b.svg' alt='reset' onClick={() => setSearch('')} />}
                </div>
                <div className='home__filters__genPagination'>
                    <p>Filtrer par génération :</p>
                    <div className='home__filters__genPagination__buttons'>
                        {allGens.map(gen => <button className={`home__filters__genPagination__buttons__button ${gen === generation && 'home__filters__genPagination__buttons__button--selected'}`} type='button' onClick={() => setGeneration(gen)}>{gen}G</button>)}
                        <button className='home__filters__genPagination__buttons__button' type='button' onClick={() => setGeneration(0)}>Toutes</button>
                    </div>
                </div>
                <div className='home__filters__type'>
                    <p>Filtrer par type :<img src='./assets/cross_b.svg' alt='reset' onClick={() => setTypeFilters([])} style={{display: typeFilters.length ? 'initial' : 'none'}}/></p>
                    <div className='home__filters__type__buttons'>
                        {types && types.map(type => 
                            <button className={`home__filters__type__buttons__button ${typeFilters.includes(type.name) && 'home__filters__type__buttons__button--selected'}`} type='button' onClick={() => handleTypeFilters(type.name)}>
                                {type.name}
                            </button>
                        )}
                    </div>
                </div>
                <MobileFilters search={search} setSearch={setSearch} generation={generation} setGeneration={setGeneration} typeFilters={typeFilters} setTypeFilters={setTypeFilters} />
            </div>

            <ul className='home__pokedexList'>
                <div className='topRef' ref={topRef}></div>
                {pokedexList && pokedexList
                    .filter(pokemon => pokemon.name.toLowerCase().startsWith(search.toLowerCase()) || !search)
                    .filter(pokemon => pokemon.apiGeneration === generation || !generation)
                    .filter(pokemon => typeFilters.includes(pokemon.apiTypes[0].name) || typeFilters.includes(pokemon.apiTypes[1]?.name) || typeFilters.length === 0 || typeFilters.length === 2)
                    .filter(pokemon => typeFilters.includes(pokemon.apiTypes[0].name) && typeFilters.includes(pokemon.apiTypes[1]?.name) || typeFilters.length < 2)
                    .map(pokemon => (<PokeListItem {...pokemon} />))
                }
                {isApiLoading && <img className='loading' src='./assets/loading-ball.png' alt='loading' />}
            </ul>
            
        </div>
    );
};

export default Home;