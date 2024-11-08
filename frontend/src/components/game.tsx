import './App.css';
import { gameObj } from './createPhaser';

class AnotherScene extends Phaser.Scene {
  constructor() {
    // super({ key: '2ndScene' });
    super();
  }
  create() {
    this.add.text(100, 100, 'Welcome to Another Scene', { color: '#fff' });
  }
}

// // Create a new instance of AnotherScene for each unique key
const anotherScene1 = new AnotherScene();
const anotherScene2 = new AnotherScene();

gameObj.scene.add("2ndScene", anotherScene1);
gameObj.scene.start("2ndScene");

// console.log(gameObj.scene.getScene("2thScene")); // shows null

gameObj.events.once("PostBoot", () => {
  gameObj.scene.add("SecondScene", anotherScene2);
  gameObj.scene.start("SecondScene");
  setTimeout(() => {
    console.log('getscene waited 5sec', gameObj.scene.getScene("SecondScene"))
  }, 5000)
  console.log("2nd sceene:", gameObj.scene.getScene("SecondScene")); // shows null
  gameObj.events.emit("updateSceneList");
});

console.log(gameObj);
setTimeout(() => {
  console.log('getscene waited 5sec', gameObj.scene.getScene('SecondScene'))
}, 5000)

function Game() {
  return <div id="phaser-game"></div>;
}

export { Game };