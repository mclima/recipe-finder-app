import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const NutritionChart = ({ recipe }) => {
  const getNutrient = (nutrientName) => {
    const nutrient = recipe.nutrition.nutrients.find(n => n.name === nutrientName);
    return nutrient ? parseFloat(nutrient.amount) : 0;
  };

  const protein = getNutrient('Protein');
  const fat = getNutrient('Fat');
  const carbs = getNutrient('Carbohydrates');
  const calories = getNutrient('Calories');

  const data = {
    labels: ['Protein', 'Fat', 'Carbs'],
    datasets: [
      {
        data: [protein, fat, carbs],
        backgroundColor: ['#f44336', '#3f51b5', '#ff9800'],
        borderColor: ['#f44336', '#3f51b5', '#ff9800'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div style={{ position: 'relative', width: '150px', height: '150px' }}>
      <Doughnut data={data} options={options} />
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}
      >
        <span style={{ fontSize: '24px', fontWeight: 'bold' }}>{Math.round(calories)}</span>
        <div style={{ fontSize: '12px' }}>cals</div>
      </div>
    </div>
  );
};

export default NutritionChart;
