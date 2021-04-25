import React, { FC, useEffect, useState, useRef, useCallback, ReactNode } from 'react';
import Popover from './Popover';
import Portal from './Portal';
import './style.min.css';

export type CoordType = {
  left?: number;
  top?: number;
  transform?: string;
};

export type Position =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight';

type Props = {
  isOpen: boolean;
  content: ReactNode;
  position?: Position;
  onClickOutside?: () => void;
};

const TooltipPopover: FC<Props> = ({
  children,
  content,
  isOpen,
  position = 'bottom',
  onClickOutside,
}) => {
  const [coords, setCoords] = useState<CoordType>({});
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const updateCoords = useCallback(
    (trigger: HTMLDivElement | null) => {
      if (!trigger) return;
      const rect = trigger.getBoundingClientRect();
      let pos: CoordType = {
        left: rect.x + rect.width / 2,
        top: rect.y + window.scrollY,
      };

      switch (position) {
        case 'top':
          pos = {
            ...pos,
            transform: 'translate(-50%, -100%)',
          };
          break;
        case 'bottom':
          pos = {
            ...pos,
            transform: `translate(-50%, ${rect.height}px)`,
          };
          break;
        case 'left':
          pos = {
            ...pos,
            transform: `translate(calc(-100% - ${rect.width / 2}px), -${rect.height / 2}px)`,
          };
          break;
        case 'right':
          pos = {
            ...pos,
            transform: `translate(${rect.width / 2}px, -${rect.height / 2}px)`,
          };
          break;
        case 'topLeft':
          pos = {
            ...pos,
            transform: `translate(-${rect.width / 2}px, -100%)`,
          };
          break;
        case 'topRight':
          pos = {
            ...pos,
            transform: `translate(calc(${rect.width / 2}px - 100%), -100%)`,
          };
          break;
        case 'bottomLeft':
          pos = {
            ...pos,
            transform: `translate(-${rect.width / 2}px, ${rect.height}px)`,
          };
          break;
        case 'bottomRight':
          pos = {
            ...pos,
            transform: `translate(calc(${rect.width / 2}px - 100%), ${rect.height}px)`,
          };
          break;
        default:
          break;
      }

      setCoords({ ...pos });
    },
    [position],
  );

  useEffect(() => {
    const clickOutside = (event: MouseEvent) => {
      const eventTarget = event.target as Node;
      if (
        onClickOutside &&
        !contentRef.current?.contains(eventTarget) &&
        !triggerRef.current?.contains(eventTarget)
      ) {
        onClickOutside();
      }
    };
    document.addEventListener('mousedown', clickOutside);
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [onClickOutside]);

  return (
    <>
      <div
        ref={triggerRef}
        className='container'
        onClick={(e) => updateCoords(e.target as HTMLDivElement)}
      >
        {children}
      </div>
      {isOpen && (
        <Portal>
          <Popover
            ref={contentRef}
            coords={coords}
            updateCoords={() => updateCoords(triggerRef.current)}
          >
            {content}
          </Popover>
        </Portal>
      )}
    </>
  );
};

export default TooltipPopover;
