declare module 'react-pageflip' {
  import { ReactNode } from 'react';

  export interface HTMLFlipBookProps {
    width?: number;
    height?: number;
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
    maxShadowOpacity?: number;
    showCover?: boolean;
    mobileScrollSupport?: boolean;
    clickEventForward?: boolean;
    usePortrait?: boolean;
    startPage?: number;
    drawShadow?: boolean;
    flippingTime?: number;
    useMouseEvents?: boolean;
    swipeDistance?: number;
    showPageCorners?: boolean;
    disableFlipByClick?: boolean;
    size?: 'fixed' | 'stretch';
    min?: number;
    max?: number;
    onFlip?: (e: { data: number }) => void;
    onChangeOrientation?: (e: { data: number }) => void;
    onChangeState?: (e: { data: string }) => void;
    children?: ReactNode;
  }

  export default function HTMLFlipBook(props: HTMLFlipBookProps): JSX.Element;
}

