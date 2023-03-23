import React, { useEffect, useState, useContext } from 'react';
import IPokedexItem from '../interfaces/IPokedexItem';
import types from '../data/types.json';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StatChart from './StatChart';
import DefensiveChart from './DefensiveChart';
import TeamContext from '../contexts/TeamBuilder';
import ITeamMember from '../interfaces/ITeamMember';

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
            setIsInTheTeam(team.map(poke => poke.id).includes(data.id) ? true : false);
        };
        getInfo();
    }, [currentId]);

    // Context handling
    const { team, setTeam } = useContext(TeamContext);

    // Type color handling
    interface ISelectedType {
        name: string,
        color: string,
        strenghts: string[],
        weaknesses: string[]
    }
    const selectedType : ISelectedType = types.filter(type => type.name === info?.apiTypes[0].name)[0];
    const selectedType2 : ISelectedType = types.filter(type => type.name === info?.apiTypes[1]?.name)[0] || {};

    // Toastify
    const notifyAdding = () =>
        toast.info("Ajout dans l'équipe effectué !", {
            position: 'top-right',
            autoClose: 3000,
            closeOnClick: true,
    });
    const notifyRemoving = () =>
        toast.info("Retrait de l'équipe effectué !", {
            position: 'top-right',
            autoClose: 3000,
            closeOnClick: true,
    });
    const notifyFullTeam = () =>
        toast.warning("L'équipe ne peut pas comporter plus de 6 pokémons", {
            position: 'top-right',
            autoClose: 3000,
            closeOnClick: true,
    });

    // Adding/removing pokemon in the team
    const [isInTheTeam, setIsInTheTeam] = useState<boolean>(false);
    const addPokeToTheTeam = () => {
        if (team.length < 6) {
            const newTeam: any = team.push({id: info?.id, name: info?.name, image: info?.image, apiTypes: info?.apiTypes, type1: selectedType, type2: selectedType2});
            setTeam(newTeam);
            setIsInTheTeam(true);
            notifyAdding();
        } else {
            notifyFullTeam();
        }
        // console.log(team);
    };
    const removePokeFromTheTeam = () => {
        const index = team.map(x => x.id).indexOf(info?.id);
        setTeam(team.splice(index, 1));
        setIsInTheTeam(false);
        notifyRemoving();
        // console.log(team);
    }
    
    return (
        <>
        {info &&
        <div className='pokeModal'>
            <div className='pokeModal__content'>
                <div className='pokeModal__content__1st' style={{backgroundColor: `${selectedType.color}90`}}>
                    <button className='pokeModal__content__1st__close' type='button' onClick={() => setIsModalOpened(false)}><img src="./assets/cross.svg" alt="close" /></button>
                    <div className='pokeModal__content__1st__title'>
                        <h2>{info.name}</h2>
                        <div>
                            <button type='button' onClick={isInTheTeam ? removePokeFromTheTeam : addPokeToTheTeam}><img src={`${isInTheTeam ? './assets/remove.svg' : './assets/add.svg'}`} title={`${isInTheTeam ? 'Retirer de mon équipe' : 'Ajouter à mon équipe'}`} alt='add/remove' /></button>
                            <h3>#{info.id < 10 ? '00'+info.id : info.id < 100 ? '0'+info.id : info.id}</h3>
                        </div>
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