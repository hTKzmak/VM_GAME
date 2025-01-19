import { Entity } from "../entities/entity";
import { MindTwo } from "../scenes/MindTwo";
import { SPRITES } from "../utils/constants";
import { Item } from "./item";

export class Button extends Item {
    textureKey: string;
    player: Entity;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, type?: string) {
        super(scene, x, y, texture, SPRITES.ITEM.button);

        this.textureKey = texture;

        // задаём размер хитбокса
        this.setSize(18, 20);

        // задаём размер спрайта
        this.displayWidth = 32;
        this.displayHeight = 42;

        this.setOffset(0, 0)
    }

    setPlayer(player: Entity) {
        this.player = player;
    }

    interact() {
        if (this.player) {
            const currentScene = this.scene as MindTwo;

            // Очистка ресурсов
            currentScene.shutdownScene();
        }
    }
}