import React, { useState } from 'react';
import types from '../data/types.json';
import IType from '../interfaces/IType';
import TypeModal from './TypeModal';

const TypeItem = ({ id, name, image, englishName }: IType) => {

    interface ISelectedType {
        name: string,
        color: string,
        strenghts: string[],
        weaknesses: string[]
    }

    const selectedType : ISelectedType = types.filter(type => type.name === name)[0];

    const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

    return (
        <>
            <div className='typeItem' style={{backgroundColor: `${selectedType.color}60`}} onClick={() => setIsModalOpened(true)}>
                <img src={image} alt={name} />
                <p>{name}</p>
            </div>
            {isModalOpened && <TypeModal setIsModalOpened={setIsModalOpened} name={name} image={image} />}
        </>
    );
};

export default TypeItem;