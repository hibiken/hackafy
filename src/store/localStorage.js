export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('hackafy');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.log('Error occurred while loading state from Local Storage');
    return undefined;
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('hackafy', serializedState);
  } catch (err) {
    console.log('Error occurred while persisting state to Local Storage');
  }
}
