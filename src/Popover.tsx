import React, { useEffect, ReactNode, forwardRef } from 'react';
import debounce from './debounce';
import { CoordType } from '.';
import './style.min.css';

type Props = {
  coords: CoordType;
  updateCoords: () => void;
  children: ReactNode;
  zIndex?: number;
};

const Popover = forwardRef<HTMLDivElement, Props>(
  ({ children, coords, updateCoords, zIndex }, ref) => {
    useEffect(() => {
      const updatePopoverCoords = debounce(updateCoords, 100);
      window.addEventListener('resize', updatePopoverCoords);
      return () => window.removeEventListener('resize', updatePopoverCoords);
    }, [updateCoords]);

    return (
      <div className='popover' style={{ ...coords, zIndex }} ref={ref}>
        {children}
      </div>
    );
  },
);

export default Popover;
