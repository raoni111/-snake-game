export interface FoodProtocol {
    displayed: boolean;
    
    positionY: number;
    positionX: number;
    
    width: number;
    height: number;

    display(): void;
}