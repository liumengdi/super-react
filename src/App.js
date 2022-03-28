
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
    flexDirection: 'column',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
  }
};