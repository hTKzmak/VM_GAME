import { Entity } from "../entities/entity";
import { SPRITES } from "../utils/constants";
import { Item } from "./item";

export class Bubbles extends Item {
    textureKey: string;
    player: Entity;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, type?: string) {
        super(scene, x, y, texture, SPRITES.ITEM.bubbles);

        const anims = this.scene.anims;
        const animsFrameRate = 3;
        this.textureKey = texture;

        // задаём размер хитбокса
        this.setSize(32, 20);

        this.setOffset(0, 0)

        // добавляем цикличную анимацию игровому элементу (в нашем случае это куб)
        anims.create({
            key: 'existing',
            frames: anims.generateFrameNames(this.textureKey, {
                // pet
                frames: [0, 1]
            }),
            frameRate: animsFrameRate,
            repeat: -1
        })

        this.play("existing", true)
    }

    setPlayer(player: Entity) {
        this.player = player;
    }
}