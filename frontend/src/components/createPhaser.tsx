import Phaser, { Game } from 'phaser';
import { io } from 'socket.io-client';

try {
    var socket = io('http://localhost:3001');
    console.log("initialized socket");

}
catch (err) {
    console.log(err);
}

var player: any;
var cursors: any;

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            // gravity: { x: 0, y: 200 },
            debug: false,
        },
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
    callbacks: {
        postBoot: function(game:any) {
            game.events.emit("PostBoot");
        }
    }
};

function preload(this: Phaser.Scene) {
    this.load.image('sky', 'assets/sky.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('dude2', 'assets/dude2.png', { frameWidth: 32, frameHeight: 48 });
}

function create(this: Phaser.Scene) {
    this.add.image(400, 300, 'sky').setScale(2);
    this.physics.world.setBounds(-400, -306, 1602, 1205);
    player = createPlayer.call(this, 111, 450, "dude");
    var player2 = createPlayer.call(this, 131, 450, "dude2");
    var camera = this.cameras.main; //main camera
    camera.startFollow(player);

    this.cameras.add(0, 0, 800, 600, false, "camera11"); //new camera for player1
    const cam1 = this.cameras.getCamera("camera11");

    cam1?.startFollow(player2);
    // console.log(this.scene.key);
}

function createPlayer(this: Phaser.Scene, x: number, y: number, dude: string): object {
    player = this.physics.add.sprite(x, y, dude);
    player.setCollideWorldBounds(true);
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers(dude, { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1,
    });
    this.anims.create({
        key: 'turn',
        frames: [{ key: dude, frame: 4 }],
        frameRate: 20,
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers(dude, { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1,
    });
    if (this.input && this.input.keyboard) {
        cursors = this.input.keyboard.createCursorKeys();
    }
    return player;
}

function update(this: Phaser.Scene) {
    if (cursors.left.isDown) {
        socket.emit("left");
        player.setVelocityX(-600);
        player.anims.play('left', true);
    } else if (cursors.right.isDown) {
        socket.emit("right");
        player.setVelocityX(600);
        player.anims.play('right', true);
    } else {
        player.setVelocityX(0);
        player.anims.play('turn');
    }
    if (cursors.up.isDown) {
        socket.emit("down");
        player.setVelocityY(-500);
    }
    if (cursors.up.isUp) {
        player.setVelocityY(0);
    }
    if (cursors.down.isDown) {
        socket.emit("up");
        player.setVelocityY(500);
    }
}

const gameObj = new Phaser.Game(config);
export {gameObj};