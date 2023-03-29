import React from 'react';
import AppRouter from './router/AppRouter';
import DefaultLayout from './layouts/DefaultLayout';

function App() {
  return (
    <div className="App">
      <DefaultLayout>
        <AppRouter />
      </DefaultLayout>
    </div>
  );
}

export default App;
