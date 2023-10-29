export type DirectionType = 'left' | 'right' | 'top' | 'bottom' | 'stop';


export interface PlayerProtocol {
    playerX: number;
    playerY: number;
    playerWidth: number;
    playerHeight: number;

    direction: DirectionType

    afterPosition: {
        x: number,
        y: number,
    }[]

    display(): void

    moveToLeft(): void; 
    moveToRight(): void; 
    moveToTop(): void; 
    moveToBottom(): void; 
    setDirection(direction: DirectionType): void;
    movement(): void;
    resetPlayer(): void;
}