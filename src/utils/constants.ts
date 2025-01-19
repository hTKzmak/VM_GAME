// Наши константы. Мы можем импортировать значения разных констант, чтобы мы могли удобно работать, если нам потребуется изменить значение

export const SIZES = {
    TILE: 32,
    PLAYER: {
        // игрок
        WIDTH: 49,
        HEIGHT: 60,
    },
    PET: {
        WIDTH: 24,
        HEIGHT: 24
    },
    PLAYER_WITH_PET: {
        WIDTH: 49,
        HEIGHT: 72,
    },
    DOOR: {
        WIDTH: 32,
        HEIGHT: 52,
    },
    BUBBLES: {
        WIDTH: 32,
        HEIGHT: 32,
    },
    BUTTON:{
        WIDTH: 18,
        HEIGHT: 23,
    }
}

export const SPRITES = {
    PLAYER: 'Player',
    PLAYER_WITH_PET: 'Player_with_pet',
    ITEM: {
        door: 'Door',
        bubbles: 'Bubbles',
        button: 'Button',
    },
    PET: {
        base: 'Pet',
    }
}