radio.setGroup(45)
radio.setFrequencyBand(56)
let array = []
let x: number
let y: number
let leftSpeed: number
let rightSpeed: number
let serialNumber: number

radio.onReceivedString(function (receivedString: string) {

    array = receivedString.split(",")
    serialNumber = radio.receivedPacket(RadioPacketProperty.SerialNumber)
    
    if (serialNumber === 182969794) {
        x = parseInt(array[0])
        y = parseInt(array[1])
        y *= -1

        // nastaveni rychlosti //
        leftSpeed = y / 4
        rightSpeed = y / 4

        if (x > 100) {
            leftSpeed += x / 8
            rightSpeed -= x / 8
        } else if (x < -100) {
            leftSpeed -= x / 8 * -1
            rightSpeed += x / 8 * -1
        }

        // checkne jestli presahuje limit //
        if (leftSpeed > 255) {
            leftSpeed = 255
        } else if (leftSpeed < -255) {
            leftSpeed = -255
        }
        if (rightSpeed > 255) {
            rightSpeed = 255
        } else if (rightSpeed < -255) {
            rightSpeed = -255
        }

        //aplikuje rychlost
        PCAmotor.MotorRun(PCAmotor.Motors.M1, -2 * leftSpeed)
        PCAmotor.MotorRun(PCAmotor.Motors.M4, rightSpeed)

    }
})
