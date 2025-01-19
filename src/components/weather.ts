// немного был сделан с помощью ChatGPT :P
// Этот файл предназначен для визуала погоды, по типу дождя

export class Weather {
    private world: any;
    private emitter: any;
    private sprite: string;

    constructor(world: any, sprite: string) {
        this.world = world;
        this.sprite = sprite;

        this.emitter = this.world.add.particles(0, 0, this.sprite, {
            x: { min: 0, max: this.world.scale.width + 100 }, // Распределение по горизонтали
            y: 0, // Начало сверху
            lifespan: 2500, // Время жизни капли
            speedY: { min: 300, max: 500 }, // Скорость падения
            speedX: -70, // перемещение частиц влево во время падения
            scale: 1, // Уменьшение размера капли
            quantity: 1, // Количество капель за эмиссию
            blendMode: 'ADD', // Режим наложения
            rotate: -25, // Вращение частицы
            frequency: 100,
            emitting: false,
        })

        // Отключаем прокрутку частиц относительно камеры
        this.emitter.setScrollFactor(0);
    }

    // проигрываем эффект
    playRain() {
        this.emitter.start()
    }

    // останавливаем эффект
    removeRain() {
        this.emitter.stop();
    }

}