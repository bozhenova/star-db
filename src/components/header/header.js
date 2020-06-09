import React from 'react';

import './header.css';

const Header = () => {
  return (
    <div className='header d-flex'>
      <h3>
        <a href='ya.ru'>Star DB</a>
      </h3>
      <ul className='d-flex'>
        <li>
          <a href='ya.ru'>People</a>
        </li>
        <li>
          <a href='ya.ru'>Planets</a>
        </li>
        <li>
          <a href='ya.ru'>Starships</a>
        </li>
      </ul>
    </div>
  );
};

export default Header;
