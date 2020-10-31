import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Keyboard } from './components';

interface IRenderKeyBoard {
  layout: string[][];
  id: string;
  onChange: (value: string) => void;
  autoFocusBtn?: string;
}

const RenderKeyBoard = function(props: IRenderKeyBoard) {
  ReactDOM.render(
    <Keyboard {...props} />,
    document.getElementById(props.id)
  );
}

// @ts-ignore
window.renderKeyBoard = RenderKeyBoard;
