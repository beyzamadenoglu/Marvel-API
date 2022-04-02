/* eslint-disable react/prop-types */
import React from 'react';
import Character from './Character';


const CharactersContainer = ({ characters, loading }) => {
    return loading ? <div className='loadcontainer'>
        <div className='loader'>
            <div className='loaderdot'> </div>
            <div className='loaderdot'> </div>
            <div className='loaderdot'> </div>
            <div className='loaderdot'> </div>
            <div className='loaderdot'> </div>
            <div className='loaderdot'> </div>
            <div className='loadertext'> </div>
        </div>
    </div>
        :
        <div className='container'>
            <div className='chars-container'>
                {   //check characters exists
                    characters?.map(character => (
                        <Character key={character.id} character={character}></Character>
                    ))
                }
            </div>
        </div>;
};

export default CharactersContainer;