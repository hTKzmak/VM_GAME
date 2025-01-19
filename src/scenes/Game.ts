import { Scene } from 'phaser';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    text: Phaser.GameObjects.Text;
    errorSound: Phaser.Sound.BaseSound;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor('#d4d4d4');

        this.text = this.add.text(300, 600, 'Что-то :D', {
            fontFamily: 'PIXY', fontSize: 38, 
            color: '#222222', align: 'center'
        });
        this.text.setOrigin(0.5);

        this.input.once('pointerdown', () => {

            this.errorSound = this.sound.add('errorSound', { loop: true });
            this.errorSound.play();
            
            this.scene.pause();
            
            setTimeout(() => {
                this.errorSound.pause();
                this.scene.start('GameOver');
            }, 3000)

        });
    }
}
