import React, { useCallback, useEffect } from 'react';
import { Row } from '../row';
import { Layout } from '../../types';
import './styles.css';

interface IProps {
  layout: Layout;
  onChange?: (value: string) => void;
  autoFocusBtn?: string;
}

export const Keyboard = React.memo(({ layout, onChange, autoFocusBtn }: IProps): React.ReactElement => {
  useEffect(() => {
    if (autoFocusBtn) {
      const autofoucsEl = document.getElementById(autoFocusBtn);
      autofoucsEl && autofoucsEl.focus();
    }
  }, [autoFocusBtn]);
  const onClick = useCallback((event: React.MouseEvent<any>) => {
    const { id } = event.target as HTMLDivElement;
    if (id) {
      if (onChange && typeof onChange === 'function') {
        onChange(id);
      }
    }
  }, [onChange])

  const onFocus = useCallback((event: React.FocusEvent<any>) => {
    console.log('FOCUS', event.target.id)
  }, [])

  const setFocusToElement = (el: any) => {
    if (el) {
      el.focus({ preventScroll: true });
    }
  }

  const goToUpOrDown = useCallback((direction, isLast) => {
    const isUp = direction === 'UP';
    const { right, bottom, top, left } = document.activeElement!.getBoundingClientRect();
    let nextCoords: { x: number, y: number } = { x: 0, y: 0 };
    if (isUp) {
      nextCoords = { x: left + 5, y: top - 10 };
    } else {
      nextCoords = { x: right - 5, y: bottom + 10 };
    }
    const nextEl = document.elementFromPoint(nextCoords.x, nextCoords.y);
    // @ts-ignore
    if (nextEl && nextEl.dataset.type === 'keyboard-btn') {
      setFocusToElement(nextEl);
    } else {
      const nextRowEl = isUp ? document.activeElement!.parentElement!.previousElementSibling : document.activeElement!.parentElement!.nextElementSibling;
      if (nextRowEl) {
        if (isLast) {
          setFocusToElement(nextRowEl.lastChild);
        } else {
          setFocusToElement(nextRowEl.firstChild);
        }
      }
    }
  }, []);

  const onKeyDown = useCallback((e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const { keyCode } = e;
    if (document.activeElement) {
      const { previousSibling, nextSibling } = document.activeElement;
      switch(keyCode) {
        case 38: //UP
          goToUpOrDown('UP', !nextSibling);
          break;
        case 40: //DOWN
          goToUpOrDown('DOWN', !nextSibling);
          break;
        case 37: //LEFT
          if (previousSibling) {
            setFocusToElement(previousSibling);
          }
          break;
        case 39: //RIGHT
          if (nextSibling) {
            setFocusToElement(nextSibling);
          }
          break;
        case 13: //Enter
          if (onChange && typeof onChange === 'function') {
            onChange(document.activeElement.id);
          }
          break;
        default:
          return;
      }
    }
  }, [goToUpOrDown, onChange])
  return (
  <div onKeyDown={onKeyDown} onFocus={onFocus} onClick={onClick}>{layout.map((row, i) => <Row key={`row-${i}`} row={row} />)}</div>
  )
})