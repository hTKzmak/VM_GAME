import { Scene, GameObjects } from 'phaser';

export class MainMenu extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    text: GameObjects.Text;

    constructor() {
        super('MainMenu');
    }

    create() {
        document.title = "Press Enter"

        this.camera = this.cameras.main;
        this.camera.setBackgroundColor('#d4d4d4');

        this.text = this.add.text(300, 600, 'Press Enter', {
            fontFamily: 'PIXY', fontSize: 38,
            color: '#222222', align: 'center'
        });
        this.text.setOrigin(0.5);

        this.input.keyboard.on("keydown-ENTER", () => {

            this.scene.stop();

            setTimeout(() => {
                this.scene.start('MindOne');
            }, 1000)

        });
    }
}
