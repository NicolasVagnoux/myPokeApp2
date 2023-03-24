import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
    id: string
}

const Navbar = ({ id }: Props) => {
    return (
        <div className='navbar'>
            <h1>My PokéApp</h1>
            <div className='navbar__links'>
                <Link to='/'><button type='button'>Pokédex</button></Link>
                <Link to='/types'><button type='button' className={`${id === '2' && 'active'}`}>Types</button></Link>
                <Link to='/builder'><button type='button' className={`${id === '3' && 'active'}`}>Mon équipe</button></Link>
            </div>
        </div>
    );
};

export default Navbar;