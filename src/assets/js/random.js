export default function (min = 0, max = 50) {
    return Math.floor(Math.random() * (max - min)) + min
}
