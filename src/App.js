import React, {useState} from 'react';
import Card from './Card';
import styled from 'styled-components';
import {initialData} from './initialData.js';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';

const Title = styled.h1`
  color: #7B7B7B;
  font-family: sans-serif;
  font-size: 30px;
  text-align: center;
  padding-top: 25px;
`

const CardContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 25px;
`

const App = () => {
  const [state, setState] = useState(initialData);

  const onDragEnd = (result) => {
    const {draggableId, source, destination, type} = result;
    if ((!destination) || (source.droppableId === destination.droppableId && source.index === destination.index)) {
      return;
    }

    if (type === "card") {
      const newCardOrder = Array.from(state.cardOrder);
      newCardOrder.splice(source.index, 1);
      newCardOrder.splice(destination.index, 0, draggableId);
      
      const newState = {
        ...state,
        cardOrder: newCardOrder
      }
      setState(newState);
      return;
    }

    if (type === "task") {
      const start = state.cards[source.droppableId];
      const finish = state.cards[destination.droppableId];
  
      if (start === finish) {
        const card = state.cards[source.droppableId];
        const newTaskIds = Array.from(card.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);
        const newCard = {
          ...card,
          taskIds: newTaskIds
        };
        const newState = {
          ...state,
          cards: {
            ...state.cards,
            [newCard.id]: newCard
          }
        }
        setState(newState);
        return
      }
      // move to another card
      const startTaskIds = Array.from(start.taskIds);
      startTaskIds.splice(source.index, 1);
      const newStart = {
        ...start,
        taskIds: startTaskIds
      }
  
      const finishTaskIds = Array.from(finish.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finish,
        taskIds: finishTaskIds
      }
  
      const newState = {
        ...state,
        cards: {
          ...state.cards,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish
        }
      }
      setState(newState);
      return;
    }
  }

  return (
    <React.Fragment>
      <Title>Drag & Drop React JS</Title>
      <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="all-cards" direction="horizontal" type="card">
            {(provided) => (
              <CardContainer ref={provided.innerRef} {...provided.droppableProps}>
                {
                  state.cardOrder.map((cardId, index) => {
                    const card = state.cards[cardId];
                    const tasks = card.taskIds.map(taskId => state.tasks[taskId]);
                    return <Card key={cardId} card={card} tasks={tasks} index={index} />
                  })
                }
                {provided.placeholder}
              </CardContainer>
            )}
          </Droppable>
      </DragDropContext>
    </React.Fragment>
  )
  
}

export default App;