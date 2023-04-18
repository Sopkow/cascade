import React from 'react';
import { useDrop } from 'react-dnd';
import WordCard from './WordCard';

const WordColumn = ({ words, onDrop, emptySlots, onDragEnd }) => {
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: 'WORD',
        drop: () => ({ name: 'WordColumn' }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));

    const isActive = canDrop && isOver;
    const backgroundColor = isActive ? 'lightgreen' : 'white'
  
    const style = {
    border: '1px solid black',
    minHeight: '100px',
    minWidth: '200px',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  };

  const slotStyle = {
    border: '1px dashed gray',
    minHeight: '20px',
    minWidth: '200px',
    margin: '5px',
  };

  return (
    <div style={style}>
      {words.map((word, index) => (
        <div key={index} style={{ display: 'flex' }}>
          {!emptySlots && <WordCard word={word} isFrench={!emptySlots} onDragEnd={onDragEnd} />}
          {emptySlots && (
            <div
              style={slotStyle}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                onDrop(index);
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default WordColumn;
