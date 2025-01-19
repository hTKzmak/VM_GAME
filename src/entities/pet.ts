import { SPRITES } from "../utils/constants";
import { Entity } from "./entity";

export class Pet extends Entity {

    textureKey: string;
    player: Entity;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, type?: string) {
        super(scene, x, y, texture, SPRITES.PET.base);

        const anims = this.scene.anims;
        const animsFrameRate = 3;
        this.textureKey = texture;

        // задаём размер хитбокса
        this.setSize(26, 26);

        // задаём положение хитбокса
        this.setOffset(0, 0)

        // добавляем цикличную анимацию игровому элементу (в нашем случае это куб)
        anims.create({
            key: 'calm',
            frames: anims.generateFrameNames(this.textureKey, {
                // pet
                frames: [0, 1, 2, 3, 2, 1, 0]
            }),
            frameRate: animsFrameRate,
            repeat: -1
        })

        this.play("calm", true)
    }

    setPlayer(player: Entity){
        this.player = player;
    }
}