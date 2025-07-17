import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div>
      <header style={{ backgroundColor: '#282c34', padding: '20px', color: 'white' }}>
        <h1>Vehicle Management System</h1>
        <nav>
          <Link to="/" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>
            Vehicle Models
          </Link>
          <Link to="/create" style={{ color: 'white', textDecoration: 'none' }}>
            Add New Model
          </Link>
        </nav>
      </header>
      <main style={{ padding: '20px' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;