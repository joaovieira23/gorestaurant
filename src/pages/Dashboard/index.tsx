import React, { useState, useEffect, useCallback } from 'react';
import Header from '../../components/Header';
import Dish from '../../components/Dish';

import api from '../../service/api';

import { DishContainer } from './styles';
import ModalAddFood from '../../components/ModalAddFood';

interface IFoodsProperty {
  id: string;
  image: string;
  name: string;
  price: string;
  description: string;
  available: boolean;
}

const Dashboard: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = useCallback(() => {
    setModalOpen(!modalOpen);
  }, [])

  async function handleAddFood(
    food: Omit<IFoodsProperty, 'id' | 'available'>,
  ): Promise<void> {
    try {
      // TODO ADD A NEW FOOD PLATE TO THE API
      const id = foods.length + 1;

      const updatedFood = { id, ...food, available: true };

      const response = await api.post('foods', updatedFood);

      setFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  const [foods, setFoods] = useState<IFoodsProperty[]>([]);
  useEffect(() => {
    async function loadFoods(): Promise<void> {
      await api.get('foods').then(res => setFoods(res.data))
    }

    loadFoods();
  }, []);

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
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
