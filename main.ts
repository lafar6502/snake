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
    snakeX = (snakeX % szer + szer) % szer
    snakeY = (snakeY % wys + wys) % wys
    waz.push(snakeX)
    waz.push(snakeY)
    while (waz.length > 2 * dlugosc) {
        waz.shift()
        waz.shift()
    }
}
function wyczyscEkran () {
    for (let x3 = 0; x3 <= szer * wys; x3++) {
        ekran[x3] = 0
    }
}
input.onButtonPressed(Button.A, function () {
    dir = ((dir - 1) % 4 + 4) % 4
})
function debug () {
    serial.writeValue("x", snakeX)
    serial.writeValue("y", snakeY)
    serial.writeValue("d", dir)
}
input.onButtonPressed(Button.B, function () {
    dir = (dir + 1) % 4
})
function getPix (x: number, y: number) {
    return ekran[y * szer + x]
}
function rysujWaz () {
    indeks = 0
    while (indeks < waz.length) {
        setPix(waz[indeks], waz[indeks + 1], neopixel.rgb(255, 3, 144))
        indeks += 2
    }
}
let indeks = 0
let snakeX = 0
let waz: number[] = []
let dir = 0
let dlugosc = 0
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
dlugosc = 3
dir = 1
waz = [snakeX, snakeY]
serial.redirectToUSB()
serial.setBaudRate(BaudRate.BaudRate115200)
basic.forever(function () {
    idzieWaz()
    wyczyscEkran()
    rysujWaz()
    kopiujEkranDoNeopixel()
    debug()
    basic.pause(100)
})
