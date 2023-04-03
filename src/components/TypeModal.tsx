import React from 'react';
import types from '../data/types.json';

interface Props {
    setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>,
    name: string,
    image: string
}

const TypeModal = ({ setIsModalOpened, name, image }: Props) => {

    interface ISelectedType {
        name: string,
        color: string,
        strenghts: string[],
        weaknesses: string[]
    }

    const selectedType : ISelectedType = types.filter(type => type.name === name)[0];

    return (
        <>
            <div className='background' onClick={() => setIsModalOpened(false)}></div>
            <div className='typeModal'>
                <div className='typeModal__content'>
                    <div className='typeModal__content__1st' style={{backgroundColor: `${selectedType.color}90`}}>
                        <button className='typeModal__content__1st__close' type='button' onClick={() => setIsModalOpened(false)}><img src="./assets/cross.svg" alt="close" /></button>
                        <div className='typeModal__content__1st__title'>
                            <h3>{name}</h3>
                            <img src={image} alt={name} />
                        </div>
                    </div>
                    <div className='typeModal__content__2nd'>
                        <div className='typeModal__content__2nd__strenghts'>
                            <p>
                                <img src='./assets/str-weak-arrow-up.svg' alt=':)' />
                                Super efficace contre :
                            </p>
                            <ul>
                                {selectedType && selectedType.strenghts.map(typeS => <li style={{backgroundColor: `${types.filter(type => type.name === typeS)[0].color}90`}}>{typeS}</li>)}
                            </ul>
                        </div>
                        <div className='typeModal__content__2nd__weaknesses'>
                            <p>
                            <img src='./assets/str-weak-arrow-down.svg' alt=':(' />
                                Faible contre :
                            </p>
                            <ul>
                                {selectedType && selectedType.weaknesses.map(typeW => <li style={{backgroundColor: `${types.filter(type => type.name === typeW)[0].color}90`}}>{typeW}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TypeModal;