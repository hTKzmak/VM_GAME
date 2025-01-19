import { Scene } from 'phaser';

export class GameOver extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    gameover_text: Phaser.GameObjects.Text;

    constructor() {
        super('GameOver');
    }

    create() {
        document.title = "Exiting"

        this.camera = this.cameras.main
        this.camera.setBackgroundColor("#000000");

        this.gameover_text = this.add.text(230, 50, 'This program has exited', {
            fontFamily: 'PIXY', fontSize: 28,
            color: '#d4d4d490', align: 'center'
        });
        this.gameover_text.setOrigin(0.5);
    }
}
