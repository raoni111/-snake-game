import randomNumber from "../services/randomNumber";
import Game from "./Game";
import { FoodProtocol } from "./type/food-protocol";

export default class Food implements FoodProtocol {
    public displayed = false;

    public positionY = 0;
    public positionX = 0;

    public width = 20;
    public height = 20;

    protected popAudio = document.getElementById('pop-audio') as HTMLAudioElement;

    constructor(
        private readonly canvas: CanvasRenderingContext2D,
        private readonly gameArea: {
            width: number,
            height: number,
        },
        private game: Game,
    ) {}

    display() {
        this.popAudio.currentTime = 0;
        this.popAudio.play();  
        this.canvas.clearRect(this.positionX, this.positionY, this.width, this.height);
        
        let positionIsValid = true;
        const x = randomNumber(this.gameArea.width / this.width) * this.width;
        const y = randomNumber(this.gameArea.height / this.height) * this.height;

        this.game.player.afterPosition.forEach(position => {
            if (position.x === x && position.y === y) {
                positionIsValid = false;
            }
        });

        if (!positionIsValid) {
            this.display();
            return;
        }

        this.positionX = x;
        this.positionY = y;

        const img = new Image();

        img.src = './an-8-bit-retro-styled-pixel-art-illustration-of-a-raspberry-free-png.jpg';
        

        img.onload = () => {

            this.canvas.drawImage(img, this.positionX, this.positionY,  this.width, this.height);
        }
        
    }
    
    createFood() {
        console.log('teste');
        this.popAudio.play();        
        this.display();
    }
}