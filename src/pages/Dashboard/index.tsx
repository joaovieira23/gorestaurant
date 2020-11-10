import React, { useState, useEffect, useCallback } from 'react';
import Header from '../../components/Header';
import Dish from '../../components/Dish';

import api from '../../service/api';

import { DishContainer } from './styles';

interface IFoodsProperty {
  id: string;
  image: string;
  name: string;
  price: string;
  description: string;
  available: boolean;
}

const Dashboard: React.FC = () => {

  const [foods, setFoods] = useState<IFoodsProperty[]>([]);
  useEffect(() => {
    async function loadFoods(): Promise<void> {
      await api.get('foods').then(res => setFoods(res.data))
    }

    loadFoods();
  }, []);

  return (
    <>
      <Header />
      <DishContainer>
        {foods &&
          foods.map(food => (
            <Dish
              key={food.id}
              food={food}
            />
          ))}
      </DishContainer>
    </>
  );
}

export default Dashboard;
