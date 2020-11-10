import React from 'react';
import Header from '../../components/Header';
import Dish from '../../components/Dish';

import { DishContainer } from './styles';

const Dashboard: React.FC = () => {
  return (
    <>
      <Header />
      <DishContainer>
        <Dish />
        <Dish />
        <Dish />
        <Dish />
      </DishContainer>
    </>
  );
}

export default Dashboard;
