export type DirectionType = 'left' | 'right' | 'top' | 'bottom'

export interface CollisionProtocol {
    verifyGameArea(direction: DirectionType): boolean
}