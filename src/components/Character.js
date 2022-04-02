/* eslint-disable react/prop-types */
import React from 'react';

const Character = ({character}) => {
    return (
        <div className='box'>
            <img className='character' src={character.thumbnail.path + '/portrait_fantastic.jpg'} />
            <p>{character.name}</p>
        </div>
    );
};

export default Character;