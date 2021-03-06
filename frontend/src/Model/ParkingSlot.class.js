

export default class ParkingSlot {
    /**
     * @param slotNumber - порядковий номер паркомісця
     */
    constructor(slotNumber = null) {
        this._slotNumber = slotNumber;
        this._isOccupied = false;
        this._parkedVehicle = null;
    }

    get isOccupied() {
        return this._isOccupied;
    }
    set isOccupied(val) {
        this._isOccupied = val;
    }

    get slotNumber() {
        return this._slotNumber;
    }
    set slotNumber(val) {
        this._slotNumber = val;
    }

    parkVehicle(vehicle) {
        this._isOccupied = true;
        vehicle.setParkingNumber(this.slotNumber);
        this._parkedVehicle = vehicle;
        return this.slotNumber;
    }

    unParkVehicle() {
        this._isOccupied = false;
        this._parkedVehicle.resetParkingNumber();
        return this.slotNumber;
    }
}
