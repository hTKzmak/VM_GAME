// Ripple.ts - эффект лужи

import { Player } from "../entities/player";

export class Ripple {
    private emitter: any;
    private sprite: string;
    world: any;
    player: Player;

    constructor(world: any, sprite: string, player: Player) {
        this.world = world;
        this.sprite = sprite;
        this.player = player;


        this.emitter = this.world.add.particles(0, 0, this.sprite, {
            lifespan: 400, // жизненый промежуток времени
            scale: { start: 2, end: 4 }, // размер
            alpha: { start: 1, end: 0 }, // прозрачность
            emitting: false, // автоматический запуск без .start() (выключен)
            frequency: 300, // задаёт время в миллисекундах между созданием каждой новой частицы. 
        })

        // следим за местоположением игрока и отрисовываем эффект
        this.emitter.startFollow(this.player, this.player.width - 50, this.player.height - 40, true)

        // определяет глубину (z-индекс) объекта. Объекты с меньшей глубиной будут рисоваться раньше и окажутся "позади".
        this.emitter.setDepth(-1)
    }

    // проигрываем эффект
    playRipple() {
        this.emitter.start()
    }
    
    // останавливаем эффект
    removeRipple() {
        this.emitter.stop(); // Останавливаем генерацию новых частиц
    }
}