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
    if (awaria) {
        return
    }
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
    k = kolizja()
    if (k == 1) {
        dlugosc += 1
        punkty += 1
        music.playSoundEffect(music.createSoundEffect(WaveShape.Square, 400, 600, 255, 0, 100, SoundExpressionEffect.Warble, InterpolationCurve.Linear), SoundExpressionPlayMode.InBackground)
        losujZarcie()
    } else if (k == 2) {
        awaria = 1
        music.playSoundEffect(music.createSoundEffect(WaveShape.Square, 775, 1, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.UntilDone)
        basic.showString("GAME OVER")
        basic.showNumber(punkty)
        return
    }
    waz.push(snakeX)
    waz.push(snakeY)
    while (waz.length > 2 * dlugosc) {
        waz.shift()
        waz.shift()
    }
}
function wyczyscEkran () {
    for (let x2 = 0; x2 <= szer * wys; x2++) {
        ekran[x2] = 0
    }
}
input.onButtonPressed(Button.A, function () {
    dir = ((dir - 1) % 4 + 4) % 4
})
function kolizja () {
    p = getPix(snakeX, snakeY)
    if (p == 0) {
        return 0
    }
    serial.writeValue("kolizja", snakeX)
    if (snakeX == zarcieX && snakeY == zarcieY) {
        return 1
    }
    return 2
}
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
function losujZarcie () {
    zarcieY = randint(0, wys - 1)
    zarcieX = randint(0, szer - 1)
    while (getPix(zarcieX, zarcieY) != 0) {
        zarcieY = randint(0, wys - 1)
        zarcieX = randint(0, szer - 1)
    }
}
function rysujWaz () {
    indeks = 0
    c = neopixel.rgb(255, 3, 144)
    if (awaria) {
        c = neopixel.rgb(80, 80, 80)
    }
    while (indeks < waz.length) {
        setPix(waz[indeks], waz[indeks + 1], c)
        indeks += 2
    }
}
let c = 0
let indeks = 0
let zarcieY = 0
let zarcieX = 0
let p = 0
let k = 0
let awaria = 0
let snakeX = 0
let waz: number[] = []
let punkty = 0
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
punkty = 0
waz = [snakeX, snakeY]
losujZarcie()
serial.redirectToUSB()
serial.setBaudRate(BaudRate.BaudRate115200)
basic.forever(function () {
    idzieWaz()
    wyczyscEkran()
    rysujWaz()
    setPix(zarcieX, zarcieY, neopixel.rgb(0, 255, 0))
    kopiujEkranDoNeopixel()
    basic.pause(100)
})
