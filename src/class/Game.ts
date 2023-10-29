import Collision from "./Colision";
import DisplayLoser from "./DisplayLoser";
import Food from "./Food";
import Player from "./Player";
import { CollisionProtocol, DirectionType } from "./type/collision-protocol";
import { FoodProtocol } from "./type/food-protocol";
import { PlayerProtocol } from "./type/player-protocol";

export default class Game {
    private readonly canvasElement: HTMLCanvasElement;
    private readonly canvas: CanvasRenderingContext2D;
    private readonly lofiMusic = document.getElementById('lofi-music') as HTMLAudioElement;
    public player: PlayerProtocol;
    public food: FoodProtocol;
    public collision: CollisionProtocol;

    public displayLoser: DisplayLoser;

    protected score: number = 0;

    public gameMaxArea = {
        width: 500,
        height: 500,
    }

    constructor(
        private readonly scoreElement: HTMLDivElement,
        private readonly cavasElement: HTMLCanvasElement, 
        canvas: CanvasRenderingContext2D,
        private readonly loserContent: HTMLDivElement,
        private readonly returnButton: HTMLButtonElement,
        ) {
        this.canvas = canvas;
        this.canvasElement = cavasElement;

        this.displayLoser = new DisplayLoser(loserContent, returnButton, this);
        
        this.food = new Food(canvas, this.gameMaxArea, this);

        this.player = new Player(canvas, this, this.food);
        
        this.collision = new Collision(this.player, this.gameMaxArea);

    }

    public play() {
        this.update();
        this.events();
        
        this.displayLoser.events();
    }


    protected update() {    
        this.player.movement();
        
        this.food.display();
    }


    protected events() {
        document.addEventListener('keypress',  (event: KeyboardEvent) => {
            const key = event.key;

            if (this.player.direction === 'stop') {
                return;
            }

            switch (key) {
                case 'd':
                    this.player.setDirection('right');
                    break
                
                case 'a':
                    this.player.setDirection('left');
                    break
                case 'w':
                    this.player.setDirection('top');
                    break
                case 's':
                   this.player.setDirection('bottom');
                    break
                default:
                    break
            }
        });
    }


    protected verifyGameMaxArea(direction: DirectionType): boolean {
        return this.collision.verifyGameArea(direction);
    }


    addScore(playerLength: number) {
        this.score = playerLength;
        this.displayScore();
    }

    displayScore() {
        this.scoreElement.textContent = `${this.score - 1}`;
    }

    resetGame() {
        this.canvas.clearRect(0, 0, this.gameMaxArea.width, this.gameMaxArea.height);

        this.player.resetPlayer();

        this.score = 1;
        this.displayScore();

        this.play();
    }
}