import { PlayerProtocol } from "./type/player-protocol";

export default class Collision {
    constructor(
        private readonly player: PlayerProtocol, 
        private readonly gameMaxArea: {
            width: number,
            height: number,
        }
    ) {}

    verifyGameArea(direction: 'left' | 'right' | 'top' | 'bottom') {
        let validation = true;

        switch (direction) {
            case 'left':
                if (this.player.playerX === 0) {
                    validation = false;
                }
                break
            
            case 'right':
                if (this.player.playerX === this.gameMaxArea.width - this.player.playerWidth) {
                    validation = false;
                }
                break
        
            case 'top':
                if (this.player.playerY === 0) {
                    validation = false;
                }
                break

            case 'bottom':
                if (this.player.playerY === this.gameMaxArea.height - this.player.playerHeight) {
                    validation = false;
                }
                break
            
            default: 
                break
        }

        return validation;
    }
}