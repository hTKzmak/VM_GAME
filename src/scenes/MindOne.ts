import { Scene } from "phaser";
import { Player } from "../entities/player";
import { SPRITES } from "../utils/constants";
import { Pet } from "../entities/pet";
import { Door } from "../items/door";

export class MindOne extends Scene {

    camera: Phaser.Cameras.Scene2D.Camera;
    dialogueSound: Phaser.Sound.BaseSound;
    player: Player;
    pet: Pet;
    door: Door;
    intro: Phaser.GameObjects.Video;
    VM001_BG_Music: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;


    constructor() {
        super('MindOne');
    }

    create() {
        document.title = "VM001"


        // Добавление видео
        this.intro = this.add.video(1024 / 2, 768 / 2, 'intro_video').setOrigin(0.5, 0.5);
        this.intro.setScrollFactor(0);
        this.intro.setDepth(1)

        this.intro.play();

        this.VM001_BG_Music = this.sound.add('VM001_BG_Music', { loop: true });
        this.VM001_BG_Music.play();

        // добавление звука для диалогов
        const dialogueSound = this.sound.add('dialogueSound');

        // если видео закончтися, то тогда добавляем всё, что нам нужно
        this.intro.on('complete', () => {
            // Плавное исчезновение через tween
            this.tweens.add({
                targets: this.intro,
                alpha: 0, // Прозрачность до 0
                duration: 1000, // Длительность анимации (в миллисекундах)
                ease: 'Linear', // Тип анимации
                onComplete: () => {
                    // Удаление видео после исчезновения
                    this.intro.destroy();
                }
            });

            // добавление сущностей
            this.door = new Door(this, 2000, 300, SPRITES.ITEM.door)
            this.player = new Player(this, 1300, 1000, SPRITES.PLAYER, dialogueSound)
            this.pet = new Pet(this, 1000, 1300, SPRITES.PET.base)

            // работа с камерой и с задним фоном (цветом)
            this.camera = this.cameras.main;
            this.camera.setBackgroundColor('#d4d4d4');
            this.cameras.main.startFollow(this.player)
            this.cameras.main.setBounds(0, 0, 2500, 2500)
    
            // добавление границы локации
            this.physics.world.setBounds(0, 0, 2500, 2500)
            this.player.setCollideWorldBounds(true)
    
            // присваиваем сущностям самого игрока, а игрока сами сущности для взаимодействия 
            this.pet.setPlayer(this.player);
            this.door.setPlayer(this.player);
    
            this.player.setEntities([this.pet, this.door]);
    
            // добавление физики объекту pet и item
            this.physics.add.collider(this.player, this.pet)
            this.physics.add.collider(this.player, this.door)
    
            // делаем объект pet и item недвижимым 
            this.pet.setImmovable(true)
            this.door.setImmovable(true)
        })

    }

    shutdownScene() {
        this.player.notTalking = false;

        // Создаём плавное исчезновение игрока
        this.tweens.add({
            targets: this.player, // Обхект, которую будем анимировать
            alpha: 0, // Прозрачность до 0
            duration: 1300, // Время в миллисекундах (1 секунда)
            ease: 'Linear', // Тип анимации
            onComplete: () => { // После завершения анимации выполняем другие действия

                setTimeout(() => {

                    this.VM001_BG_Music.stop();
                    this.scene.stop();

                    setTimeout(() => {
                        // Переход на следующую сцену
                        this.scene.start("MindTwo");
                    }, 1000)

                }, 1000)
            }
        });
    }

    update(time: number, delta: number): void {
        if (!this.intro.isPlaying() && this.player) {
            this.player.update(delta);
        }
    }
}