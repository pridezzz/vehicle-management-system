import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Layout } from './components';
import { VehicleList, VehicleForm } from './pages';
import './App.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<VehicleList />} />
            <Route path="create" element={<VehicleForm />} />
            <Route path="edit/:id" element={<VehicleForm />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;