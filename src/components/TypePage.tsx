import React from 'react';
import { Link } from 'react-router-dom';

const TypePage = () => {
    return (
        <div className='typePage'>
            <h1>My PokéApp</h1>
                <div className='typePage__links'>
                    <Link to='/'><button type='button'>Pokédex</button></Link>
                    <Link to='/types'><button type='button'>Types</button></Link>
                    <Link to='/'><button type='button'>Constructeur</button></Link>
                </div>
        </div>
    );
};

export default TypePage;