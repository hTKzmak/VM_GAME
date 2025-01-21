import { Scene } from 'phaser';
import { SIZES, SPRITES } from '../utils/constants';

export class Preloader extends Scene {
    constructor() {
        super('Preloader');
    }

    init() {
        // //  We loaded this image in our Boot Scene, so we can display it here
        // this.add.image(512, 384, 'background');

        // //  A simple progress bar. This is the outline of the bar.
        // this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        // //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        // const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        // //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        // this.load.on('progress', (progress: number) => {

        //     //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
        //     bar.width = 4 + (460 * progress);

        // });
    }

    preload() {
        // //  Load the assets for the game - Replace with your own assets
        // this.load.setPath('assets');

        // this.load.image('logo', 'logo.png');

        // Audios
        this.load.audio("errorSound", "assets/sounds/error.mp3")
        this.load.audio("dialogueSound", "assets/sounds/retro_single_v3.mp3")

        // Music
        this.load.audio("VM001_BG_Music", "assets/music/deepMines.mp3")
        this.load.audio("VM002_BG_Music", "assets/music/countdown.mp3")

        // Videos
        this.load.video('intro_video', "assets/video/intro.mp4");
        this.load.video('mindtwo_video', "assets/video/mindtwo.mp4");

        // Sprites
        this.load.spritesheet(SPRITES.PLAYER, 'assets/sprites/hero.png', {
            frameWidth: SIZES.PLAYER.WIDTH,
            frameHeight: SIZES.PLAYER.HEIGHT,
        })

        this.load.spritesheet(SPRITES.PET.base, 'assets/sprites/pet.png', {
            frameWidth: SIZES.PET.WIDTH,
            frameHeight: SIZES.PET.HEIGHT,
        })

        this.load.spritesheet(SPRITES.ITEM.door, 'assets/sprites/door.png', {
            frameWidth: SIZES.DOOR.WIDTH,
            frameHeight: SIZES.DOOR.HEIGHT,
        })

        this.load.spritesheet(SPRITES.ITEM.button, 'assets/sprites/button.png', {
            frameWidth: SIZES.BUTTON.WIDTH,
            frameHeight: SIZES.BUTTON.HEIGHT,
        })

        // Images
        this.load.image("rain", 'assets/sprites/rain.png')
        this.load.image("ripple", 'assets/sprites/ripple.png')

        // Fonts
        this.load.font("pixy", "assets/fonts/PIXY.ttf")
    }

    create() {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('MainMenu');
    }
}
