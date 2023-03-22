import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import IType from '../interfaces/IType';
import TypeItem from './TypeItem';

const TypePage = () => {

    // API call for pokedex list
    const [typesList, setTypesList] = useState<IType[]>([]);
    useEffect(() => {
        const getTypesList = async () => {
            const { data } = await axios.get('https://pokebuildapi.fr/api/v1/types');
            setTypesList(data);
        };
        getTypesList();
    }, []);

    return (
        <div className='typePage'>
            <Navbar id='2' />
            <div className='typePage__list'>
                {typesList && typesList.map(type => <TypeItem {...type} />)}
            </div>
        </div>
    );
};

export default TypePage;