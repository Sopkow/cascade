import React from 'react';
import { useDrag } from 'react-dnd';

const WordCard = ({ word, isFrench, onDragEnd }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'WORD',
      item: { word, isFrench },
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult();
        onDragEnd(item, dropResult);
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));

  const style = {
    border: '1px solid black',
    padding: '5px',
    margin: '5px',
    backgroundColor: isFrench ? 'cyan' : 'white',
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={drag} style={style}>
      {word}
    </div>
  );
};

export default WordCard;

