import React, { useRef } from 'react';

const WordCard = ({ word, language, onClick, isSelected }) => {
  console.log('WordCard isSelected:', isSelected, 'word:', word); /************************************************************************************************************/

  const wordRef = useRef(null);
  
  const style = {
    border: '1px solid black',
    padding: '5px',
    margin: '5px',
    backgroundColor: isSelected ? (isSelected === 'cyan' ? 'cyan' : 'yellow') : 'white',
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