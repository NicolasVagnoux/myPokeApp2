import React from 'react';
import IPokedexItem from '../interfaces/IPokedexItem';

const StatChart = (info: IPokedexItem) => {
    return (
        <div className='statChart'>
            <div className='statChart__bar'>
                <p>PV</p>
                <div style={{width: `calc((100% - 140px) * ${info.stats.HP / 200})`, backgroundColor: `${info.stats.HP < 50 ? '#e7232490' : info.stats.HP < 100 ? '#ff810090' : '#3da32490'}`}}></div>
                <h6>{info.stats.HP}</h6>
            </div>
            <div className='statChart__bar'>
                <p>Attaque</p>
                <div style={{width: `calc((100% - 140px) * ${info.stats.attack / 200})`, backgroundColor: `${info.stats.attack < 50 ? '#e7232490' : info.stats.attack < 100 ? '#ff810090' : '#3da32490'}`}}></div>
                <h6>{info.stats.attack}</h6>
            </div>
            <div className='statChart__bar'>
                <p>Défense</p>
                <div style={{width: `calc((100% - 140px) * ${info.stats.defense / 200})`, backgroundColor: `${info.stats.defense < 50 ? '#e7232490' : info.stats.defense < 100 ? '#ff810090' : '#3da32490'}`}}></div>
                <h6>{info.stats.defense}</h6>
            </div>
            <div className='statChart__bar'>
                <p>Attaque spéciale</p>
                <div style={{width: `calc((100% - 140px) * ${info.stats.special_attack / 200})`, backgroundColor: `${info.stats.special_attack < 50 ? '#e7232490' : info.stats.special_attack < 100 ? '#ff810090' : '#3da32490'}`}}></div>
                <h6>{info.stats.special_attack}</h6>
            </div>
            <div className='statChart__bar'>
                <p>Défense spéciale</p>
                <div style={{width: `calc((100% - 140px) * ${info.stats.special_defense / 200})`, backgroundColor: `${info.stats.special_defense < 50 ? '#e7232490' : info.stats.special_defense < 100 ? '#ff810090' : '#3da32490'}`}}></div>
                <h6>{info.stats.special_defense}</h6>
            </div>
            <div className='statChart__bar'>
                <p>Vitesse</p>
                <div style={{width: `calc((100% - 140px) * ${info.stats.speed / 200})`, backgroundColor: `${info.stats.speed < 50 ? '#e7232490' : info.stats.speed < 100 ? '#ff810090' : '#3da32490'}`}}></div>
                <h6>{info.stats.speed}</h6>
            </div>
        </div>
    );
};

export default StatChart;