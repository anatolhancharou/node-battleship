import { Ship } from '../../types';

const ships: Ship[][] = [
  [
    {
      position: { x: 0, y: 0 },
      direction: false,
      length: 4,
      type: 'huge',
    },
    {
      position: { x: 9, y: 0 },
      direction: false,
      length: 1,
      type: 'small',
    },
    {
      position: { x: 1, y: 2 },
      direction: true,
      length: 3,
      type: 'large',
    },
    {
      position: { x: 6, y: 2 },
      direction: false,
      length: 1,
      type: 'small',
    },
    {
      position: { x: 8, y: 3 },
      direction: true,
      length: 3,
      type: 'large',
    },
    {
      position: { x: 3, y: 5 },
      direction: true,
      length: 2,
      type: 'medium',
    },
    {
      position: { x: 0, y: 7 },
      direction: false,
      length: 1,
      type: 'small',
    },
    {
      position: { x: 6, y: 7 },
      direction: false,
      length: 2,
      type: 'medium',
    },
    {
      position: { x: 2, y: 9 },
      direction: false,
      length: 2,
      type: 'medium',
    },
    {
      position: { x: 6, y: 9 },
      direction: false,
      length: 1,
      type: 'small',
    },
  ],

  [
    {
      position: { x: 9, y: 0 },
      direction: false,
      length: 1,
      type: 'small',
    },
    {
      position: { x: 1, y: 3 },
      direction: true,
      length: 2,
      type: 'medium',
    },
    {
      position: { x: 3, y: 3 },
      direction: true,
      length: 2,
      type: 'medium',
    },
    {
      position: { x: 5, y: 3 },
      direction: true,
      length: 2,
      type: 'medium',
    },
    {
      position: { x: 9, y: 3 },
      direction: false,
      length: 1,
      type: 'small',
    },
    {
      position: { x: 2, y: 6 },
      direction: false,
      length: 3,
      type: 'large',
    },
    {
      position: { x: 9, y: 6 },
      direction: false,
      length: 1,
      type: 'small',
    },
    {
      position: { x: 2, y: 8 },
      direction: false,
      length: 3,
      type: 'large',
    },
    {
      position: { x: 0, y: 6 },
      direction: true,
      length: 4,
      type: 'huge',
    },
    {
      position: { x: 9, y: 9 },
      direction: false,
      length: 1,
      type: 'small',
    },
  ],

  [
    {
      position: { x: 2, y: 1 },
      direction: false,
      length: 4,
      type: 'huge',
    },
    {
      position: { x: 9, y: 0 },
      direction: true,
      length: 3,
      type: 'large',
    },
    {
      position: { x: 0, y: 2 },
      direction: true,
      length: 3,
      type: 'large',
    },
    {
      position: { x: 9, y: 5 },
      direction: true,
      length: 2,
      type: 'medium',
    },
    {
      position: { x: 0, y: 7 },
      direction: false,
      length: 1,
      type: 'small',
    },
    {
      position: { x: 0, y: 9 },
      direction: false,
      length: 1,
      type: 'small',
    },
    {
      position: { x: 2, y: 9 },
      direction: false,
      length: 1,
      type: 'small',
    },
    {
      position: { x: 4, y: 9 },
      direction: false,
      length: 1,
      type: 'small',
    },
    {
      position: { x: 6, y: 9 },
      direction: false,
      length: 2,
      type: 'medium',
    },
    {
      position: { x: 9, y: 8 },
      direction: true,
      length: 2,
      type: 'medium',
    },
  ],

  [
    {
      position: { x: 0, y: 0 },
      direction: false,
      length: 2,
      type: 'medium',
    },
    {
      position: { x: 7, y: 0 },
      direction: false,
      length: 1,
      type: 'small',
    },
    {
      position: { x: 8, y: 2 },
      direction: false,
      length: 2,
      type: 'medium',
    },
    {
      position: { x: 1, y: 3 },
      direction: false,
      length: 1,
      type: 'small',
    },
    {
      position: { x: 4, y: 2 },
      direction: true,
      length: 4,
      type: 'huge',
    },
    {
      position: { x: 7, y: 5 },
      direction: false,
      length: 1,
      type: 'small',
    },
    {
      position: { x: 1, y: 7 },
      direction: false,
      length: 3,
      type: 'large',
    },
    {
      position: { x: 8, y: 7 },
      direction: false,
      length: 2,
      type: 'medium',
    },
    {
      position: { x: 5, y: 7 },
      direction: true,
      length: 3,
      type: 'large',
    },
    {
      position: { x: 9, y: 9 },
      direction: false,
      length: 1,
      type: 'small',
    },
  ],

  [
    {
      position: { x: 8, y: 0 },
      direction: false,
      length: 1,
      type: 'small',
    },
    {
      position: { x: 3, y: 1 },
      direction: false,
      length: 3,
      type: 'large',
    },
    {
      position: { x: 0, y: 1 },
      direction: true,
      length: 4,
      type: 'huge',
    },
    {
      position: { x: 3, y: 3 },
      direction: true,
      length: 2,
      type: 'medium',
    },
    {
      position: { x: 7, y: 3 },
      direction: false,
      length: 3,
      type: 'large',
    },
    {
      position: { x: 5, y: 6 },
      direction: false,
      length: 1,
      type: 'small',
    },
    {
      position: { x: 8, y: 5 },
      direction: true,
      length: 2,
      type: 'medium',
    },
    {
      position: { x: 1, y: 6 },
      direction: true,
      length: 2,
      type: 'medium',
    },
    {
      position: { x: 3, y: 9 },
      direction: false,
      length: 1,
      type: 'small',
    },
    {
      position: { x: 7, y: 9 },
      direction: false,
      length: 1,
      type: 'small',
    },
  ],
];

export const getBotShips = (): Ship[] => {
  return ships[Math.floor(Math.random() * ships.length)] || [];
};
