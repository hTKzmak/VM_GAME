import { SPRITES } from "../utils/constants";
import { Entity } from "./entity";
import dialogue from '../dialogue.json';
import { DialogueBox } from "../components/dialogueBox";
import { ChooseBox } from "../components/chooseBox";

// Игрок
export class Player extends Entity {
    textureKey: string;
    entities: any[];
    private moveSpeed: number;
    notTalking: boolean;
    private sound: Phaser.Sound.BaseSound;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, sound?: Phaser.Sound.BaseSound, type?: string) {
        super(scene, x, y, texture, SPRITES.PLAYER);

        const anims = this.scene.anims;
        this.textureKey = texture;

        const animsFrameRate = 4;
        this.moveSpeed = 23;
        
        this.notTalking = true;

        this.sound = sound;

        this.setSize(28, 50);
        this.setOffset(10, 5);

        anims.create({
            key: 'up',
            frames: anims.generateFrameNumbers(this.textureKey, {
                frames: [7, 8, 9, 8]
            }),
            frameRate: animsFrameRate,
            repeat: -1
        })

        anims.create({
            key: 'down',
            frames: anims.generateFrameNumbers(this.textureKey, {
                frames: [5, 0, 6, 0]
            }),
            frameRate: animsFrameRate,
            repeat: -1
        })

        anims.create({
            key: 'left',
            frames: anims.generateFrameNumbers(this.textureKey, {
                start: 1,
                end: 2
            }),
            frameRate: animsFrameRate,
            repeat: -1
        })

        anims.create({
            key: 'right',
            frames: anims.generateFrameNumbers(this.textureKey, {
                start: 3,
                end: 4
            }),
            frameRate: animsFrameRate,
            repeat: -1
        })
    }

    // функция по добавлению списка сущностей для взаимодействия
    setEntities(entities: any[]) {
        this.entities = entities;
    }

    // нахождение ближайшего существа
    private findTarget(entities: any[]) {
        let target = null;
        let minDistance = 50;

        for (const entity of entities) {
            //  отслеживание дистанции между игроком (this) и существа (entity)
            const distanceToEntity = Phaser.Math.Distance.Between(this.x, this.y, entity.x, entity.y);

            // если значение distanceToEntity меньше 50, то есть, значении minDistance, то...
            if (distanceToEntity < minDistance) {
                minDistance = distanceToEntity;
                target = entity;
            }
        }

        return target;
    }

    update(delta: number) {
        const keys = this.scene.input.keyboard.createCursorKeys();

        let keyW = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        let keyA = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        let keyS = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        let keyD = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // клавишы для действий
        let keyE = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        if ((keys.up.isDown || keyW.isDown) && this.notTalking) {
            this.play('up', true)
            // this.setPosition(this.x, this.y - delta * 0.25)
            this.setVelocity(0, -delta * this.moveSpeed)
        }
        else if ((keys.down.isDown || keyS.isDown) && this.notTalking) {
            this.play('down', true)
            // this.setPosition(this.x, this.y + delta * 0.25)
            this.setVelocity(0, delta * this.moveSpeed)
        }
        else if ((keys.left.isDown || keyA.isDown) && this.notTalking) {
            this.play('left', true)
            // this.setPosition(this.x - delta * 0.25, this.y)
            this.setVelocity(-delta * this.moveSpeed, 0)
        }
        else if ((keys.right.isDown || keyD.isDown) && this.notTalking) {
            this.play('right', true)
            // this.setPosition(this.x + delta * 0.25, this.y)
            this.setVelocity(delta * this.moveSpeed, 0)
        }
        else if (Phaser.Input.Keyboard.JustDown(keyE) && this.notTalking) {
            const target = this.findTarget(this.entities);

            // если цель замечена, то персонажем теперь не можем двигать и показываем диалоговое окно
            if (target) {
                const dialogText = dialogue.find(entity => entity.entity === target.textureKey);

                if (target.textureKey == 'Door' || target.textureKey == 'Button') {
                    new DialogueBox(this.scene, dialogText.dialogues, this.sound, this, () => {
                        new ChooseBox(this.scene, this, () => {
                            target.interact();
                        })
                    });
                }
                else {
                    if (dialogText) {
                        new DialogueBox(this.scene, dialogText.dialogues, this.sound, this, null);
                    }
                }
            }
        }
        else {
            this.stop()
            this.setVelocity(0, 0)
        }
    }
}