import React, { FC, ReactNode, useRef, useEffect } from 'react';
import { PopoverProps } from '.';
import './style.css';

const Popover: FC<PopoverProps> = ({ content, isOpen, onClickOutside, children }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickOutside = (event: MouseEvent) => {
      const eventTarget = event.target as Node;
      if (!ref.current?.contains(eventTarget)) {
        onClickOutside();
      }
    };
    document.addEventListener('mousedown', clickOutside);
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, []);

  return (
    <div className='container' ref={ref}>
      {children}
      {isOpen && <span className='popover'>{content}</span>}
    </div>
  );
};

export default Popover;
