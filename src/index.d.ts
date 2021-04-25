import { ReactNode, FC } from 'react';

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
  /**
   * Determine the popover content
   */
  content: ReactNode;
  isOpen: boolean;
  onClickOutside: () => void;
  position?: Position;
}

declare const Popover: FC<PopoverProps>;

export default Popover;
