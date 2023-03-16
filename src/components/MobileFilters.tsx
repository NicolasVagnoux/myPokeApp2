import React, { useState } from 'react';
import types from '../data/types.json';

interface Props {
    search: string,
    setSearch: React.Dispatch<React.SetStateAction<string>>,
    generation: number,
    setGeneration: React.Dispatch<React.SetStateAction<number>>,
    typeFilters: string[],
    setTypeFilters: React.Dispatch<React.SetStateAction<string[]>>,
}

const MobileFilters = ({ search, setSearch, generation, setGeneration, typeFilters, setTypeFilters }: Props) => {

    const allGens = [1,2,3,4,5,6,7,8];

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

    const [showFilters, setShowFilters] = useState<boolean>(false);
    
    return (
        <div className='mobileFilters'>
            <button type='button' onClick={() => setShowFilters(!showFilters)} className='toggle'>{showFilters ? 'Masquer les filtres' : 'Afficher les filtres'} <img src='./assets/left-arrow.svg' /></button>
            {showFilters && <div className='mobileFilters__search'>
                <p>Rechercher :</p>
                <input type='text' value={search} onChange={(e) => setSearch(e.target.value)} />
                {search && <img src='./assets/cross_b.svg' alt='reset' onClick={() => setSearch('')} />}
            </div>}
            {showFilters && <div className='mobileFilters__genPagination'>
                <p>Filtrer par génération :</p>
                <div className='mobileFilters__genPagination__buttons'>
                    {allGens.map(gen => <button className={`mobileFilters__genPagination__buttons__button ${gen === generation && 'mobileFilters__genPagination__buttons__button--selected'}`} type='button' onClick={() => setGeneration(gen)}>{gen}G</button>)}
                    <button className='mobileFilters__genPagination__buttons__button' type='button' onClick={() => setGeneration(0)}>Toutes</button>
                </div>
            </div>}
            {showFilters && <div className='mobileFilters__type'>
                <p>Filtrer par type :<img src='./assets/cross_b.svg' alt='reset' onClick={() => setTypeFilters([])} style={{display: typeFilters.length ? 'initial' : 'none'}}/></p>
                <div className='mobileFilters__type__buttons'>
                    {types && types.map(type => 
                        <button className={`mobileFilters__type__buttons__button ${typeFilters.includes(type.name) && 'mobileFilters__type__buttons__button--selected'}`} type='button' onClick={() => handleTypeFilters(type.name)}>
                            {type.name}
                        </button>
                    )}
                </div>
            </div>}
        </div>
    );
};

export default MobileFilters;