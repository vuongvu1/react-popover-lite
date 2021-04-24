import React, { FC, useRef, useEffect } from 'react';
import { PopoverProps } from '.';
import './style.min.css';

const Popover: FC<PopoverProps> = ({
  content,
  isOpen,
  onClickOutside,
  position = 'bottom',
  children,
}) => {
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
      {isOpen && <span className={`popover ${position}`}>{content}</span>}
    </div>
  );
};

export default Popover;
