export const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Learn React JS' },
    'task-2': { id: 'task-2', content: 'Learn Vue JS' },
    'task-3': { id: 'task-3', content: 'Learn Angular JS' },
    'task-4': { id: 'task-4', content: 'Learn Svelte JS' },
  },
  cards: {
    'card-1': {
      id: 'card-1',
      title: 'todo',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
      color: '#FFBA08',
    },
    'card-2': {
      id: 'card-2',
      title: 'doing',
      taskIds: [],
      color: '#17C9FF',
    },
    'card-3': {
      id: 'card-3',
      title: 'completed',
      taskIds: [],
      color: '#14E668',
    },
  },
  cardOrder: ['card-1', 'card-2', 'card-3']
}