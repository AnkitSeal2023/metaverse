import Phaser from "phaser";
class SecondScene extends Phaser.Scene {
    someUniqueProperty = "If you see me, you are awesome!";

    constructor(key:string) {
        super({ key: key });
    }
    create(data: any) {
        console.log(data)
        this.add.text(100, 100, 'Welcome to SecondScene', { color: '#fff' });
    }
}
let game: any = null
var test;
class MainScene extends Phaser.Scene {
    someUniqueProperty = "I am the Main Scene";

    constructor() {
        super({ key: "MainScene" });
    }

    preload() {
        this.load.image("earth", "https://cdn.phaser.io/sandbox/square-earth.png");
    }

    create() {

        game.scene.add("SecondScene", SecondScene);
        var n = new SecondScene("newScene2");
        test = game.scene.getScene('SecondScene')
        console.log('getscene', test)
        setTimeout(() => {
            console.log('getscene waited', game.scene.getScene('SecondScene'))
        }, 1000)
        game.scene.start("SecondScene", test);



    }

    updateSceneList = () => {
        // const last = Object.keys(this.game.scene.keys).at(-1);
        // const scene = this.scene.get(last);

        // this.scenesList.setText(scene.someUniqueProperty);
    }

}

game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    backgroundColor: '#111111',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [MainScene]
});

function Game() {
    return <div id="phaser-game"></div>;
}
setTimeout(() => {
    console.log('getscene waited 5sec', game.scene.getScene('SecondScene'))
}, 5000)

export { Game };