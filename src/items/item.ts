// Предметы

import { Physics } from "phaser";

export class Item extends Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, type?: string){
        super(scene, x, y, texture);

        this.scene = scene;

        // они оба нужны:

        // добавление в сцену элемент
        this.scene.add.existing(this);
        
        // добавление физической сущности объекта (будем видеть его хитбокс)
        this.scene.physics.add.existing(this);
    }
}