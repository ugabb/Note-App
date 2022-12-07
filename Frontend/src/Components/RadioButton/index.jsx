import * as React from 'react';
import { pink } from '@mui/material/colors';
import Radio from '@mui/material/Radio';

import './radio-button.css'

export default function ColorRadioButtons() {
  const [selectedValue, setSelectedValue] = React.useState('a');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  return (
    <div className='radioOptions'>
      <Radio
        {...controlProps('e')}
        sx={{
          color: pink[100],
          '&.Mui-checked': {
            color: pink[100],
          },
        }}
      />
      <span>Todos</span>
      <Radio
        {...controlProps('e')}
        sx={{
          color: pink[100],
          '&.Mui-checked': {
            color: pink[100],
          },
        }}
      />
      <span>Prioridade</span>
      <Radio
        {...controlProps('e')}
        sx={{
          color: pink[100],
          '&.Mui-checked': {
            color: pink[100],
          },
        }}
      />
      <span>Normal</span>
    </div>
  );
}