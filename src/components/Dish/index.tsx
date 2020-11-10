import React from 'react';
import { FiEdit3, FiTrash } from 'react-icons/fi';

import dishImg from '../../assets/molho.png';

import { Container } from './styles';

const Dish: React.FC = () => {
  return (
    <Container>
      <header>
        <img src={dishImg} alt="dish" />
      </header>
      <section className="body">
        <h2>Ao molho</h2>
        <p>Macarrão ao molho branco, fughi e cheiro verde das montanhas.</p>
        <p className="price">R$ 19.90</p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>Disponível</p>

          <label htmlFor="asfa" className="switch">
            <input type="checkbox" />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
};

export default Dish;
