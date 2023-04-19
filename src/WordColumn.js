import React from 'react';
import WordCard from './WordCard';

const WordColumn = ({ words, onClick, selectedWord, language, pairedWords }) => {
    
    //Custom Styling for borders
    const style = {
    border: '1px solid black',
    minHeight: '100px',
    minWidth: '100px',
    padding: '10px',
    marginTop: '25px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  };

  return (
    <div style={style}>
      <h1>{language.charAt(0).toUpperCase()+language.slice(1)} Words</h1>
      {words.map((word, index) => {
        //Word pairing state variable, creates yellow highlight when paired
        const isPaired = pairedWords.some(
          (pair) =>
            pair[language + "Word"] &&
            pair[language + "Word"].word &&
            pair[language + "Word"].word.index === index &&
            pair.color === 'yellow'
        );
        console.log('WordColumn language:', language, 'index:', index, 'isPaired:', isPaired, 'isSelected:', selectedWord); /************************************************************************************************************/
        return (
            <WordCard
                key={index}
                word={{ text: word, index }}
                onClick={onClick}
                isSelected={
                    (selectedWord && selectedWord.word && selectedWord.language === language && selectedWord.word.index === index)
                    ? selectedWord.color
                    : (
                        pairedWords.some(pair => (
                        pair[language + "Word"] && pair[language + "Word"].word.index === index && pair[language + "Word"].language === language
                        ))
                        ? "yellow"
                        : null
                    )
                }
                language={language}
                pairedWords={pairedWords}
            />
        );
      })}
    </div>
  );
};

export default WordColumn;