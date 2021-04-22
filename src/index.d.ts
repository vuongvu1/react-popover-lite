import { ReactNode } from 'react';

export type Position =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight';

export interface PopoverProps {
  content: ReactNode;
  isOpen: boolean;
  onClickOutside: () => void;
  position?: Position;
}
