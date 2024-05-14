import React, { ChangeEvent } from 'react';
import { Slider } from '@material-tailwind/react';

type ValidColor = 'light-blue' | 'blue' | 'indigo' | 'purple' | 'pink' | 'red' | 'orange' | 'yellow' | 'green' | 'teal' | 'cyan';

interface SliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  color?: ValidColor;
  className?: string;
  placeholder?: string;
  translate?: string;
  slot?: string;
  style?: React.CSSProperties;
  title?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  key?: React.Key;
  defaultChecked?: boolean;
}

export const SliderComponent: React.FC<SliderProps> = ({ min, max, value, onChange, color }) => {
  const sliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    onChange(newValue);
  };

  return (
    <Slider
      className='w-full'
      color={color}
      min={min}
      max={max}
      value={String(value)}
      onChange={sliderChange}
      placeholder="Placeholder Text"
      onPointerEnterCapture={()=>{}}
      onPointerLeaveCapture={()=>{}}
    />
  );
};

