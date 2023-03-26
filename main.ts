function kopiujEkranDoNeopixel () {
    for (let x = 0; x <= wys - 1; x++) {
        for (let x2 = 0; x2 <= szer - 1; x2++) {
            let y = 0
            if (y % 2 == 1) {
                strip.setMatrixColor(0, 0, neopixel.colors(NeoPixelColors.Red))
            } else {
                strip.setMatrixColor(x2, y, neopixel.colors(NeoPixelColors.Red))
            }
        }
    }
}
function setPix (x: number, y: number, color: number) {
    ekran[y * szer + x] = color
}
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
	
})
