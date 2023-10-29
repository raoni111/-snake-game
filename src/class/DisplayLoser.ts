import Game from "./Game";

export default class DisplayLoser {
    private loser = false;

    constructor(
        private readonly loserContent: HTMLDivElement, 
        private readonly returnButton: HTMLButtonElement,
        private readonly game: Game,
    ) {}

    events() {
        this.returnButton.onclick = () => {
            this.game.resetGame();

            this.displayLoserContent();
        }
    }


    displayLoserContent() {
        this.loserContent.classList.remove(`display-${this.loser}`);
        this.loser = !this.loser;
        this.loserContent.classList.add(`display-${this.loser}`);
    
    }
}