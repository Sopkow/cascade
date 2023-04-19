import React, { useRef, useState, useEffect } from 'react';

const WordCard = ({ word, language, onClick, pairedWords, isSelected }) => {
    const wordRef = useRef(null);
    const [color, setColor] = useState('white');

    useEffect(() => {
        setColor(pairedWords.some(pair => pair[language + "Word"].word.index === word.index && pair.color === 'yellow') ? 'yellow' : 'white');
    }, [pairedWords]);

    const style = {
        fontSize: '30px',
        border: '1px solid black',
        padding: '5px',
        margin: '5px',
        zIndex: '10',
        backgroundColor: (isSelected ? isSelected : color), //colors word cyan after first click, yellow if second click and paired
    };

    return (
        <div
        onClick={() => onClick(word, language, wordRef)}
        style={style}
        ref={wordRef}
        >
        {word.text}
        </div>
    );
};

export default WordCard;