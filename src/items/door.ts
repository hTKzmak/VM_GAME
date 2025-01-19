import { Entity } from "../entities/entity";
import { MindOne } from "../scenes/MindOne";
import { SPRITES } from "../utils/constants";
import { Item } from "./item";

export class Door extends Item {
    textureKey: string;
    player: Entity;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, type?: string) {
        super(scene, x, y, texture, SPRITES.ITEM.door);

        this.textureKey = texture;

        // задаём размер хитбокса
        this.setSize(32, 20);

        this.setOffset(0, 0)
    }

    setPlayer(player: Entity) {
        this.player = player;
    }

    interact() {
        if (this.player) {
            const currentScene = this.scene as MindOne;

            // Очистка ресурсов
            currentScene.shutdownScene();
        }
    }
}