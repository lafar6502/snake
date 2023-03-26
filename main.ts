function kopiujEkranDoNeopixel () {
    for (let x = 0; x <= wys - 1; x++) {
        for (let y = 0; y <= szer - 1; y++) {
            if (y % 2 == 1) {
                strip.setMatrixColor(szer - 1 - x, y, getPix(x, y))
            } else {
                strip.setMatrixColor(x, y, getPix(x, y))
            }
        }
    }
    strip.show()
}
function setPix (x: number, y: number, color: number) {
    ekran[y * szer + x] = color
}
function idzieWaz () {
    if (dir == 1) {
        snakeX += 1
    } else if (dir == 2) {
        snakeY += -1
    } else if (dir == 3) {
        snakeX += -1
    } else {
        snakeY += 1
    }
    snakeX = snakeX % szer
    snakeY = snakeY % wys
}
function wyczyscEkran () {
    for (let x3 = 0; x3 <= szer * wys; x3++) {
        ekran[x3] = 0
    }
}
input.onButtonPressed(Button.A, function () {
    dir = (dir - 1) % 4
})
input.onButtonPressed(Button.B, function () {
    dir = (dir + 1) % 4
})
function getPix (x: number, y: number) {
    return ekran[y * szer + x]
}
function rysujWaz () {
    setPix(snakeX, snakeY, neopixel.rgb(255, 10, 10))
}
let snakeX = 0
let dir = 0
let snakeY = 0
let ekran: number[] = []
let strip: neopixel.Strip = null
let wys = 0
let szer = 0
// szerokość ekranu
szer = 20
// wysokosc ekranu
wys = 20
strip = neopixel.create(DigitalPin.P1, szer * wys, NeoPixelMode.RGB)
strip.setMatrixWidth(szer)
ekran = [0]
wyczyscEkran()
snakeY = 10
snakeY = 10
dir = 1
basic.forever(function () {
    idzieWaz()
    wyczyscEkran()
    rysujWaz()
    kopiujEkranDoNeopixel()
    basic.pause(200)
})
