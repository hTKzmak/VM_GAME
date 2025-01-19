import { Scene } from "phaser";
import { Player } from "../entities/player";
import { SPRITES } from "../utils/constants";
import { Button } from "../items/button";
import { Weather } from "../components/weather";
import { Ripple } from "../components/ripple";

export class MindTwo extends Scene {

    dialogueSound: Phaser.Sound.BaseSound;
    camera: Phaser.Cameras.Scene2D.Camera;
    errorSound: Phaser.Sound.BaseSound;
    player: Player;
    button: Button;
    ripple: Ripple;
    mindtwo: Phaser.GameObjects.Video;
    VM002_BG_Music: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;

    constructor() {
        super('MindTwo');
    }

    create() {
        document.title = "VM002"

        // Добавление видео
        this.mindtwo = this.add.video(1024 / 2, 768 / 2, 'mindtwo_video').setOrigin(0.5, 0.5);
        this.mindtwo.setScrollFactor(0);
        this.mindtwo.setDepth(1)

        this.mindtwo.play();

        this.VM002_BG_Music = this.sound.add('VM002_BG_Music', { loop: true });
        this.VM002_BG_Music.play();

        // добавление звука для диалогов
        const dialogueSound = this.sound.add('dialogueSound');

        this.mindtwo.on('complete', () => {

            // Плавное исчезновение через tween
            this.tweens.add({
                targets: this.mindtwo,
                alpha: 0, // Прозрачность до 0
                duration: 1000, // Длительность анимации (в миллисекундах)
                ease: 'Linear', // Тип анимации
                onComplete: () => {
                    // Удаление видео после исчезновения
                    this.mindtwo.destroy();
                }
            });


            this.player = new Player(this, 1000, 500, SPRITES.PLAYER, dialogueSound)
            this.button = new Button(this, 1000, 1900, SPRITES.ITEM.button)

            this.player.setEntities([this.button])
            this.button.setPlayer(this.player)

            // добавление границы локации
            this.physics.world.setBounds(0, 0, 2000, 3000)
            this.player.setCollideWorldBounds(true)

            this.physics.add.collider(this.player, this.button)
            this.button.setImmovable(true)

            // добавление камеры
            this.cameras.main.startFollow(this.player)
            this.cameras.main.setBounds(0, 0, 2000, 3000)
            // this.cameras.setBackgroundColor('#000000')

            // добавляем эффект дождя
            new Weather(this, "rain").playRain()

            // добавляем эффект лужи
            this.ripple = new Ripple(this, "ripple", this.player);
        })

    }

    shutdownScene() {
        this.errorSound = this.sound.add('errorSound', { loop: true });
        this.errorSound.play();
        this.VM002_BG_Music.stop();
        this.scene.pause();

        setTimeout(() => {
            this.errorSound.pause();
            this.scene.start('GameOver');
        }, 3000)
    }

    update(time: number, delta: number): void {
        if (!this.mindtwo.isPlaying() && this.player) {
            this.player.update(delta)

            const isPlayerMoving =
                this.player.body.velocity.x !== 0 ||
                this.player.body.velocity.y !== 0;

            // Управляем Ripple
            if (isPlayerMoving) {
                this.ripple.playRipple();
            } else {
                this.ripple.removeRipple();
            }
        }
    }
}