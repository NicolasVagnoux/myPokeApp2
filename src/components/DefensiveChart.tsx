import React from 'react';
import IPokedexItem from '../interfaces/IPokedexItem';

const DefensiveChart = (info: IPokedexItem) => {

    const defensiveColors : {[key: string]: string} = {
        'immune': '#9fa29f90',
        'twice_vulnerable': '#e72324',
        'vulnerable': '#e7232490',
        'neutral': '#bbbbfe',
        'resistant': '#3da32490',
        'twice_resistant': '#3da324'
    };

    return (
        <div className='defensiveChart'>
            {info && 
                info.apiResistances.map((resistance, i) => 
                <div className='defensiveChart__item' key={i} style={{backgroundColor: `${defensiveColors[`${resistance.damage_relation}`]}`}}>
                    <p>{resistance.name}</p>
                    <p>x{resistance.damage_multiplier}</p>
                </div>    
            )}
        </div>
    );
};

export default DefensiveChart;