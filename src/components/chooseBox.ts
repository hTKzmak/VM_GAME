// Этот компонент/файл предназначен для отображения окна для выбора действий (только да или нет)

import { Scene, GameObjects } from 'phaser';
import { Player } from '../entities/player';

export class ChooseBox {
    private onComplete: () => void; // Обратный вызов

    private scene: Scene;
    private graphics: GameObjects.Graphics;
    private yesText: GameObjects.Text;
    private noText: GameObjects.Text;
    player: Player;
    private startOnComplete: boolean;

    constructor(scene: Phaser.Scene, player: Player, onComplete: () => void) {
        this.scene = scene;

        this.player = player;

        this.player.notTalking = false;

        this.startOnComplete = true;

        this.onComplete = onComplete; // Сохраняем колбэк

        // Создаем графику для фона диалога
        this.graphics = scene.add.graphics();

        this.graphics.lineStyle(10, 0xE8E8E8, 1);
        this.graphics.strokeRect(45, 495, 940, 240);

        this.graphics.fillStyle(0x222222, 1); // Темный фон с непрозрачностью
        this.graphics.fillRect(50, 500, 930, 230); // Координаты и размер окна
        this.graphics.setScrollFactor(0);

        // Создаем текстовый объект
        this.yesText = scene.add.text(370, 580, 'Yes', {
            fontFamily: 'PIXY',
            fontSize: '42px',
            color: '#ffffff',
            wordWrap: { width: 600 }
        });

        this.noText = scene.add.text(570, 580, 'No', {
            fontFamily: 'PIXY',
            fontSize: '42px',
            color: '#ffffff7d',
            wordWrap: { width: 600 }
        });

        this.yesText.setScrollFactor(0);
        this.noText.setScrollFactor(0);

        // Устанавливаем обработчики клавиатуры
        scene.input.keyboard.on('keydown-A', this.chooseYes, this);
        scene.input.keyboard.on('keydown-D', this.chooseNo, this);
        scene.input.keyboard.on('keydown-LEFT', this.chooseYes, this);
        scene.input.keyboard.on('keydown-RIGHT', this.chooseNo, this);

        scene.input.keyboard.on('keydown-ENTER', this.close, this);
    }

    private chooseYes() {
        this.yesText.setColor('#ffffff');
        this.noText.setColor('#ffffff7d');
        this.startOnComplete = true;
    }

    private chooseNo() {
        this.noText.setColor('#ffffff');
        this.yesText.setColor('#ffffff7d');
        this.startOnComplete = false;
    }

    private close() {
        // Удаление объектов
        if (this.graphics) this.graphics.destroy();
        if (this.yesText) this.yesText.destroy();
        if (this.noText) this.noText.destroy();

        // Удаление обработчиков клавиатуры
        this.scene.input.keyboard.off('keydown-A', this.chooseYes, this);
        this.scene.input.keyboard.off('keydown-D', this.chooseNo, this);
        this.scene.input.keyboard.off('keydown-LEFT', this.chooseYes, this);
        this.scene.input.keyboard.off('keydown-RIGHT', this.chooseNo, this);
        this.scene.input.keyboard.off('keydown-ENTER', this.close, this);

        // Устанавливаем, что игрок снова может двигаться
        this.player.notTalking = true;

        if (this.onComplete && this.startOnComplete === true) {
            this.onComplete(); // Вызываем колбэк, если он есть
        }
    }

}