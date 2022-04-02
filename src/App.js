import React, {useEffect, useState} from 'react';
import './App.css';
import Header from './components/Header';
import CharactersContainer from './components/CharactersContainer';
import axios from 'axios';

function App() {
   
    //React only checks the changes that we use state
    //change is first applied in virtual dome
    //then changes in the actual dom
    //does not check the real dom all the time, it checks the virtual dom
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [index, setIndex] = useState(1);
    const [offset, setOffset] = useState(1);

    //states for pagination
    const [pageNumberLimit, setPageNumberLimit] = useState(7);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(7);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

    //variables for api requests
    const charactersSize = 20;
    const all = 1560;

    //handle pagination
    const handleClick = (event) => {
        setIndex(Number(event.target.id));
    };

    //calculate page nos
    const pages = [];
    for(let i=1; i<Math.ceil(all/charactersSize); i++){
        pages.push(i);
    }

    const renderPageNumbers = pages.map((number) => {

        if(number < maxPageNumberLimit+1 && number > minPageNumberLimit){
            return(
                <li key = {number} id = {number} onClick={handleClick} className = {index == number ? 'active' : null}>
                    {number}
                </li>
            );
        }
        else {
            return null;
        }
        
    });

    const handleNextButton = () => {
        setIndex(index + 1);
        //reset pagination
        if(index + 1 > maxPageNumberLimit){
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
        console.log(index);
    };

    const handlePrevButton = () => {
        setIndex(index - 1);
        //reset pagination
        if((index - 1) % pageNumberLimit == 0){
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        } 
    };
        //...'s for pagination blanks
    let pageIncrementButton = null;
    if(pages.length > maxPageNumberLimit){
        pageIncrementButton = <li onClick = {handleNextButton}> &hellip; </li>;
    }
    //...'s for pagination blanks
    let pageDecrementButton = null;
    if(pages.length > maxPageNumberLimit){
        pageDecrementButton = <li onClick = {handlePrevButton}> &hellip; </li>;
    }

    //apply when changes index
    useEffect(() => {
        //scroll when get new data
        window.scrollTo(0, 0);
        const value = sessionStorage.getItem(index);
        if(value) {
            setCharacters(JSON.parse(value));
        }
        else {
            getData();
        }

        setPageNumberLimit();
    }, [index]);

    //get data to print window
    const getData = () =>{
        setLoading(true);
        setOffset((index - 1));
        console.log(offset);
        //check if there is data at sessionStorage 
        const characters = JSON.parse(sessionStorage.getItem(index));
        //if there is data
        if(characters){
            setCharacters(characters);
            setLoading(false);
        }
        else {

            //api request
            const fetch = async () => {
                const res = await axios('http://gateway.marvel.com/v1/public/characters?ts=1&apikey=334ad051ef7227d4bcb95dced206fe41&hash=c45f19449a7dfdbc0b2502dd4e37d8a0&offset='+ offset);
                console.log(res.data.data.results);
                sessionStorage.setItem(index, JSON.stringify(res.data.data.results));
                setCharacters(res.data.data.results);
                setLoading(false);
            };

            fetch();
        }
    };

    //the page users will see
    return (
        <div>
            <Header />
            <CharactersContainer characters = {characters} loading = {loading}/>
            <div>
                <ul className = 'pagination'>
                    <li>
                        <button onClick = {handlePrevButton}
                            disabled = {index == pages[1] ? true : false}>
                        &#60;
                        </button>
                    </li>
                    {pageDecrementButton}
                    {renderPageNumbers}
                    {pageIncrementButton}
                    <li>
                        <button onClick = {handleNextButton}
                            disabled = {index == pages[pages.length] ? true : false}
                        >&#62;</button>
                    </li>
                </ul>

                <button className = 'loadmore'>

                </button>
            </div>
        </div>
    );

}
export default App;
