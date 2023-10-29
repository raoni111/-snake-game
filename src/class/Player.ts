import Game from "./Game";
import { FoodProtocol } from "./type/food-protocol";
import { DirectionType, PlayerProtocol } from "./type/player-protocol";

export default class Player implements PlayerProtocol {
    public playerX = 100;
    public playerY = 100;
    public playerWidth = 20;
    public playerHeight = 20;

    public direction: DirectionType = 'right';

    private playerLength = 1;

    public afterPosition: {
        x: number,
        y: number,
    }[]  = [];

    private intervalId: any;

    constructor(
        private readonly canvas: CanvasRenderingContext2D,
        private readonly game: Game,
        private readonly food: FoodProtocol,
    ) {}

    display() {
        if (this.afterPosition.length > this.playerLength - 1) {
            this.canvas.clearRect(
                this.afterPosition[this.afterPosition.length - this.playerLength].x, 
                this.afterPosition[this.afterPosition.length - this.playerLength].y, 
                this.playerWidth, 
                this.playerHeight
            );
        }

        this.canvas.fillStyle = '#fff';
        this.canvas.fillRect(this.playerX, this.playerY, this.playerWidth, this.playerHeight);


    }

    savePosition() {
        this.afterPosition.push({
            x: this.playerX,
            y: this.playerY
        });

        if (this.afterPosition.length > this.playerLength) {
            this.afterPosition.splice(0, 1);
        }
    }

    setDirection(direction: DirectionType) {
        if (this.direction === 'right' && direction === 'left' && this.playerLength > 1) {
            return;
        }
        if (this.direction === 'left' && direction === 'right' && this.playerLength > 1) {
            return;
        }
        if (this.direction === 'top' && direction === 'bottom' && this.playerLength > 1) {
            return;
        }
        if (this.direction === 'bottom' && direction === 'top' && this.playerLength > 1) {
            return;
        }
        this.direction = direction;
        this.movement();
    }


    moveToLeft() {
        this.savePosition();


        if (this.playerX === 0) {
            this.playerX = this.game.gameMaxArea.width;
        }
        this.playerX -= this.playerWidth;
        
    }

    moveToRight() {
        this.savePosition();
        this.playerX += this.playerWidth;

        if (this.playerX === this.game.gameMaxArea.width) {
            this.playerX = 0;
        }

    }

    moveToTop() {
        this.savePosition();

        if (this.playerY === 0) {
            this.playerY = this.game.gameMaxArea.height;
        }

        this.playerY -= this.playerHeight;

    }

    moveToBottom() {
        this.savePosition();
        this.playerY += this.playerHeight;

        if (this.playerY === this.game.gameMaxArea.height) {
            this.playerY = 0;
        }
    }

    movement() {
        clearInterval(this.intervalId);

        if (this.direction === 'stop') {
            return;
        }
        
        this.intervalId = setInterval(() => {
            switch(this.direction) {
                case 'stop':
                    return;
                case 'right':
                    this.moveToRight();
                    break
                case 'left':
                    this.moveToLeft();
                    break
                case 'top':
                    this.moveToTop();
                    break
                case 'bottom':
                    this.moveToBottom();
                    break
                default:
                    break
                    
            }

            this.playerLose();

            this.ateTheFood();
            this.display();
        }, 100)
        
    }

    playerLose() {
        this.afterPosition.forEach((position) => {
            if (position.x === this.playerX && position.y === this.playerY) {
                this.direction = 'stop';

                this.game.displayLoser.displayLoserContent();
            }
        });
    }

    ateTheFood() {
        if (this.playerX === this.food.positionX && this.playerY === this.food.positionY) {
            this.food.display();

            this.playerLength++;

            this.game.addScore(this.playerLength);
        }
    }

    resetPlayer() {
        this.direction = 'right';
        this.playerLength = 1;
        this.afterPosition = [];
        this.playerX = 100;
        this.playerY = 100;

        clearInterval(this.intervalId);    
    }
}