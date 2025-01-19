// Made by ChatGPT :)
// Этот компонент/файл предназначен для отображения диалогового окна
// в него передаются такие параметры: сцена (scene), текст для отображения в окне, звук и сам класс игрока (для того, чтобы во время диалогов мы не могли его двигать)

// звук изначально находится в mind.ts, который потом передаётся в player.ts, а от туда работает сам DialogBox
// такой костыль был сделан из-за того, что в dialogBox.ts и в Player.ts не сработают параметры load и sound для загрузки аудио.
// Естественно, это нужно будет переделать, но пусть будет как временный вариант

import { Scene, GameObjects, Time } from 'phaser';
import { Player } from '../entities/player';

export class DialogueBox {
    private onComplete: () => void; // Обратный вызов

    private scene: Scene;
    private graphics: GameObjects.Graphics;
    private text: GameObjects.Text;
    private dialogue: string;
    private allDialogues: string[];
    private currentCharIndex: number;
    private currentDialogIndex: number;
    private isComplete: boolean;
    private textTimer: Time.TimerEvent;
    private sound: Phaser.Sound.BaseSound;
    player: Player;

    constructor(scene: Phaser.Scene, allDialogues: string[], sound: Phaser.Sound.BaseSound, player: Player, onComplete: () => void) {
        this.scene = scene;
        this.sound = sound;
        this.currentCharIndex = 0;
        this.currentDialogIndex = 0;
        this.allDialogues = allDialogues;
        this.dialogue = allDialogues[this.currentDialogIndex];
        this.isComplete = false;

        this.player = player;

        this.onComplete = onComplete; // Сохраняем колбэк

        // Создаем графику для фона диалога
        this.graphics = scene.add.graphics();

        this.graphics.lineStyle(10, 0xE8E8E8, 1);
        this.graphics.strokeRect(45, 495, 940, 240);

        this.graphics.fillStyle(0x222222, 1); // Темный фон с непрозрачностью
        this.graphics.fillRect(50, 500, 930, 230); // Координаты и размер окна
        this.graphics.setScrollFactor(0);

        // Создаем текстовый объект
        this.text = scene.add.text(90, 530, '', {
            fontFamily: 'PIXY',
            fontSize: '26px',
            color: '#ffffff',
            wordWrap: { width: 600 }
        });

        // Запускаем эффект печатания
        this.startTyping();

        this.text.setScrollFactor(0);

        // Добавляем возможность пропустить анимацию по клику
        scene.input.keyboard.on('keydown-ENTER', this.skipOrNext, this);
    }

    // функция для эффекта печатания
    private startTyping() {

        // добавляем значение false, чтобы не воспроизводился заново диалог во время самогй его работы по нажатию на E
        this.player.notTalking = false;

        this.textTimer = this.scene.time.addEvent({
            delay: 30, // Задержка между символами
            callback: this.typeText,
            callbackScope: this,
            loop: true
        });
    }

    private typeText() {
        if (this.isComplete) return;

        // Отображаем текст посимвольно
        this.text.text += this.dialogue[this.currentCharIndex];
        this.currentCharIndex++;

        this.sound.play();

        // Завершаем анимацию, если весь текст отображен
        if (this.currentCharIndex >= this.dialogue.length) {
            this.textTimer.remove(false);
            this.isComplete = true;
        }
    }

    private skipOrNext() {
        if (!this.isComplete) {
            // Пропустить анимацию и сразу показать весь текст
            this.text.text = this.dialogue;
            this.textTimer.remove(false);
            this.isComplete = true;

            this.player.notTalking = false;
        }
        else if (this.currentDialogIndex < this.allDialogues.length - 1) {
            // меняем предыдущий диалог на следующий
            this.currentDialogIndex++
            this.dialogue = this.allDialogues[this.currentDialogIndex]

            this.currentCharIndex = 0; // Обнуляем индекс символов
            this.isComplete = false;
            this.text.text = ''; // Очищаем текстовое поле

            this.player.notTalking = false;

            // Запускаем новый таймер для печатания следующего диалога
            this.startTyping();
        }
        else {
            // убираем окно
            this.close();
        }
    }

    private close() {
        this.graphics.destroy();
        this.text.destroy();
        this.scene.input.keyboard.off('keydown-ENTER', this.skipOrNext, this);
        this.player.notTalking = true;

        if (this.onComplete) {
            this.onComplete(); // Вызываем колбэк
        }
    }
}