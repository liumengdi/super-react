
import React from 'react';
import RouterV5 from './router/routerV5';

function App() {
  return (
    <div style={st.appContainer}>
      <RouterV5 />
    </div>
  );
}

export default App;


const st = {
  appContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    width: '100vw',
    height: '100vh',
  }
};