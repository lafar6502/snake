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
function wyczyscEkran () {
	
}
input.onButtonPressed(Button.A, function () {
    for (let x = 0; x <= szer - 1; x++) {
        setPix(x, x, neopixel.rgb(100, 255, x * 10))
        setPix(szer - 1 - x, x, neopixel.rgb(255, x * 10, x * 10))
    }
})
input.onButtonPressed(Button.B, function () {
	
})
function getPix (x: number, y: number) {
    return ekran[y * szer + x]
}
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
for (let x3 = 0; x3 <= szer * wys; x3++) {
    ekran[x3] = 0
}
basic.forever(function () {
    basic.pause(200)
    kopiujEkranDoNeopixel()
})
