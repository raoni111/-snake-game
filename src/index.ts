import Food from './class/Food';
import Game from './class/Game';
import Player from './class/Player';
import './style.css';

const scoreElement = document.getElementById('score-content') as HTMLDivElement;

const canvasElement = document.getElementById('my-canvas') as HTMLCanvasElement;
const canvas = canvasElement.getContext('2d');

const loserContent = document.getElementById('loser-content') as HTMLDivElement;

const returnButton = document.getElementById('return-button') as HTMLButtonElement;

const lofiMusic = document.getElementById('lofi-music') as HTMLAudioElement;

const game = new Game(
    scoreElement, 
    canvasElement, 
    canvas,
    loserContent,
    returnButton,
);

game.play()

