import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import WordColumn from './WordColumn';
import WordCard from './WordCard';
import { useDrag } from 'react-dnd';

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
  const [englishWords, setEnglishWords] = useState(words.map((w) => w.english));
  const [frenchWords, setFrenchWords] = useState(words.map((w) => w.french).sort(() => Math.random() - 0.5));
  const [buttonText, setButtonText] = useState('GO');
  const [grade, setGrade] = useState(null);

  const handleButtonClick = () => {
    if (buttonText === 'GO') {
      setButtonText('GRADE');
      setGrade(null);
    } else {
      const correct = englishWords.filter((ew, i) => ew === words.find((w) => w.french === frenchWords[i]).english).length;
      const percentage = (correct / englishWords.length) * 100;
      setGrade(percentage);
      setButtonText('GO');
    }
  };

  const handleDrop = (index) => {
    const droppedWord = frenchWords.find((w) => w.isDragging);
    if (droppedWord) {
      const newEnglishWords = [...englishWords];
      newEnglishWords[index] = { ...newEnglishWords[index], french: droppedWord.word };
      setEnglishWords(newEnglishWords);
  
      const newFrenchWords = frenchWords.map((w) => {
        if (w.word === droppedWord.word) {
          return { ...w, isDragging: false };
        }
        return w;
      });
      setFrenchWords(newFrenchWords.filter((w) => w.word !== droppedWord.word));
    }
  };
  
  

  return (
    <div className="App">
      <button onClick={handleButtonClick}>{buttonText}</button>
      {grade !== null && <p>Percentage Correct: {grade.toFixed(2)}%</p>}
      <DndProvider backend={HTML5Backend}>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <WordColumn words={englishWords} onDrop={() => {}} />
          <WordColumn words={englishWords} emptySlots onDrop={handleDrop} />
          <WordColumn
            words={frenchWords}
            onDrop={() => {}}
            onDragEnd={(item, dropResult) => {
              if (!dropResult) {
                const newFrenchWords = frenchWords.map((w) => {
                  if (w.word === item.word) {
                    return { ...w, isDragging: false };
                  }
                  return w;
                });
                setFrenchWords(newFrenchWords);
              }
            }}
          />
        </div>
      </DndProvider>
    </div>
  );
}

export default App;