import React from 'react';
import { Button } from '../buttons';
import './styles.css';

interface IProps {
  row: string[];
}

export const Row = React.memo(({ row }: IProps): React.ReactElement => {
  return (
    <div className="row">
      {row.map((btn) => <Button key={btn} button={btn}/>)}
    </div>
  )
})