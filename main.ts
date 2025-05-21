radio.setGroup(45)
radio.setFrequencyBand(56)
let array = []
let x: number
let y: number
let leftSpeed: number
let rightSpeed: number
let serialNumber: number

radio.onReceivedString(function (receivedString: string) {
