import React, { useState, useEffect, useCallback } from 'react';
import Header from '../../components/Header';
import Dish from '../../components/Dish';

import api from '../../service/api';

import { DishContainer } from './styles';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';

interface IFoodsProperty {
  id: string;
  image: string;
  name: string;
  price: string;
  description: string;
  available: boolean;
}

interface IFoodPlate {
  id: number;
  name: string;
  image: string;
  price: string;
  description: string;
  available: boolean;
}

const Dashboard: React.FC = () => {
  const [foods, setFoods] = useState<IFoodPlate[]>([]);
  const [editingFood, setEditingFood] = useState<IFoodPlate>({} as IFoodPlate);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const toggleModal = useCallback(() => {
    setModalOpen(!modalOpen);
  }, [])

  async function handleAddFood(
    food: Omit<IFoodsProperty, 'id' | 'available'>,
  ): Promise<void> {
    try {
      const id = foods.length + 1;

      const updatedFood = { id, ...food, available: true };

      const response = await api.post('foods', updatedFood);

      setFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood(
    food: Omit<IFoodPlate, 'id' | 'available'>,
  ): Promise<void> {
    const { id } = editingFood;

    const updatedFood = { id, ...food, available: true };

    const response = await api.put(`/foods/${editingFood.id}`, updatedFood);

    const updatedState = foods.filter(item => item.id !== id);

    setFoods([...updatedState, response.data]);
  }

  async function handleDeleteFood(id: number): Promise<void> {
    await api.delete(`/foods/${id}`);

    const updatedState = foods.filter(food => food.id !== id);

    setFoods(updatedState);
  }

  useEffect(() => {
    async function loadFoods(): Promise<void> {
      await api.get('foods').then(res => setFoods(res.data))
    }

    loadFoods();
  }, []);

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditFood(food: IFoodPlate): void {
    // TODO SET THE CURRENT EDITING FOOD ID IN THE STATE
    setEditingFood(food);
    setEditModalOpen(true);
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />
      <DishContainer>
        {foods &&
          foods.map(food => (
            <Dish
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </DishContainer>
    </>
  );
}

export default Dashboard;
