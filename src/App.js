import React, { useState, useEffect } from 'react';
import WordColumn from './WordColumn';

const words = [
  { english: 'forest', french: 'forêt' },
  { english: 'sibling', french: 'frère et sœur' },
  { english: 'cereal', french: 'céréale' },
  { english: 'desk', french: 'bureau' },
  { english: 'camel', french: 'chameau' },
  { english: 'butter', french: 'beurre' },
  { english: 'bicycle', french: 'vélo' },
  { english: 'railroad', french: 'chemin de fer' },
  { english: 'folder', french: 'dossier' },
  { english: 'weekly', french: 'hebdomadaire' },
  { english: 'hungry', french: 'faim' },
  { english: 'limestone', french: 'calcaire' },
];

function App() {
  const [selectedWord, setSelectedWord] = useState(null);
  const [randomizedWords, setRandomizedWords] = useState(words);
  const [pairedWords, setPairedWords] = useState([]);
  const [connections, setConnections] = useState([]);
  const [buttonText, setButtonText] = useState('GO');
  const [grade, setGrade] = useState(null);

  //Draw all lines once connection made between two words after getting coordinates
  const getCoordinates = (element) => {
    if (!element) {
      return { x: 0, y: 0 };
    }
  
    const rect = element.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2 + window.pageXOffset,
      y: rect.top + rect.height / 2 + window.pageYOffset,
    };
  };
  //Connections between paired words
  const lines = connections.map((connection, index) => {
      if (connection.englishWord && connection.frenchWord && connection.englishWord.element && connection.frenchWord.element) {
        const { x: x1, y: y1 } = getCoordinates(connection.englishWord.element);
        const { x: x2, y: y2 } = getCoordinates(connection.frenchWord.element);
    
        return (
          <line
            key={index}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={connection.color}
            strokeWidth="2"
            markerEnd="url(#arrow)"
          />
        );
      }
      return null;
  });

  // Handle Word Click Function
  const handleWordClick = (word, language, wordRef) => {
    const isPaired = pairedWords.some(
      (pair) => pair[language + "Word"].word.index === word.index && pair.color === 'yellow'
    );
    //Check for selected word exists and its the same language.
    if (selectedWord && selectedWord.language !== language) {
      // Pairing words
      const newPair = selectedWord.language === 'english'
        ? { englishWord: selectedWord, frenchWord: { word, element: wordRef.current } }
        : { englishWord: { word, element: wordRef.current }, frenchWord: selectedWord };
      
      setConnections((prevConnections) => [
        ...prevConnections.filter((c) => c.color !== 'cyan'),
        { ...newPair, color: 'yellow' },
      ]);
      setPairedWords((prevPairedWords) => [...prevPairedWords, { ...newPair, color: 'yellow' }]);
      setSelectedWord(null);
    } else if (!isPaired) {
      // Deal with unpaired words
      const existingPairIndex = pairedWords.findIndex(pair => (
        pair[language + "Word"].word.index === word.index && pair[language + "Word"].language === language
      ));
  
      if (existingPairIndex !== -1) {
        const updatedPairedWords = [...pairedWords];
        updatedPairedWords.splice(existingPairIndex, 1);
        setPairedWords(updatedPairedWords);
      }
  
      setSelectedWord({ word: { text: word.text, index: word.index }, language, element: wordRef.current, color: isPaired ? 'yellow' : 'cyan' });
    }
  };
  
  //Manage button clicks
  const handleButtonClick = () => {
    if (buttonText === 'GO') {
      setButtonText('GRADE');
      setGrade(null);
      const randomizedEnglish = [...words].sort(() => Math.random() - 0.5);
      const randomizedFrench = [...words].sort(() => Math.random() - 0.5);
      setRandomizedWords(randomizedEnglish.map((w, i) => ({ english: w.english, french: randomizedFrench[i].french })));
    } 
    else {
      const correct = pairedWords.filter(
        (p) => words.find((w) => w.english === p.englishWord.word.text).french === p.frenchWord.word.text
      ).length;
      const percentage = (correct / words.length) * 100;
      setGrade(percentage);
      setButtonText('GO');
    }
  };
  


  // Add this useEffect hook inside your component
  useEffect(() => {
    console.log('App Updated pairedWords:', pairedWords); /************************************************************************************************************/
  }, [pairedWords]);

  return (
    <div className="App">
      <h1>Welcome to Word Match!</h1>
      <h3>Click one word, then another to pair it with an <em>alternative language</em> counterpart <em>permanently!</em></h3>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <WordColumn
          words={randomizedWords.map((w) => w.english)}
          onClick={handleWordClick}
          selectedWord={selectedWord}
          language="english"
          pairedWords={pairedWords}
        />
        <WordColumn
          words={randomizedWords.map((w) => w.french)}
          onClick={handleWordClick}
          selectedWord={selectedWord}
          language="french"
          pairedWords={pairedWords}
        />
        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {lines}
        </svg>
      </div>
      {buttonText === 'GO' ? <h3>Click "GO" to start, goodluck!</h3> : <h3>When your done, click "GRADE" to check your score!</h3>}
      <button onClick={handleButtonClick}>{buttonText}</button>
      {grade !== null && <h3>Percentage Correct: {grade.toFixed(2)}%</h3>}
    </div>
  );
}

export default App;