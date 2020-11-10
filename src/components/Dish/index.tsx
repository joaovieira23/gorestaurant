import React, { useState } from 'react';
import { FiEdit3, FiTrash } from 'react-icons/fi';

// import dishImg from '../../assets/molho.png';

import { Container } from './styles';

interface IFoodProperty {
  id: string;
  name: string;
  image: string;
  price: string;
  description: string;
  available: boolean;
}

interface IProps {
  food: IFoodProperty;
}

const Dish: React.FC<IProps> = ({
  food
}: IProps) => {
  const [isAvailable, setIsAvailable] = useState(food.available);

  async function toggleAvailable(): Promise<void> {
    // TODO UPDATE STATUS (available)
    setIsAvailable(!isAvailable);
  }

  return (
    <Container available={isAvailable}>
      <header>
        <img src={food.image} alt="dish" />
      </header>
      <section className="body">
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p className="price">R$ {food.price}</p>
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
          <p>{food.available}</p>

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
