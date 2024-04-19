import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//context
import UserState from './context/userState.js';

//import pages
import Interface from './Pages/interface.js';

const App = () => {
  return (
    <UserState>
            <BrowserRouter>
              <Routes>
                {/* starting interface page */}
                <Route path='/' element={<Interface />} />

              </Routes>
            </BrowserRouter>

    </UserState>
  );
}

export default App;
