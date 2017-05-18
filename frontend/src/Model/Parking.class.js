

import StandardParkingSlot from "./StandardParkingSlot.class.js"
import DisabledParkingSlot from "./DisabledParkingSlot.class.js"
import TruckParkingSlot from "./TruckParkingSlot.class.js"
import SedanCar from "./SedanCar.class"
import Truck from "./Truck.class"
import DisabledCar from "./DisabledCar.class"

export default class Parking {
    constructor(numOfStandardSlots = 15, numOfDisabledSlots = 5, numOfTruckSlots = 10) {
        this._numOfStandardSlots = numOfStandardSlots;
        this._numOfDisabledSlots = numOfDisabledSlots;
        this._numOfTruckSlots = numOfTruckSlots;
        this._standardSlots = new Array(numOfStandardSlots);
        this._disabledSlots = new Array(numOfDisabledSlots);
        this._truckSlots = new Array(numOfTruckSlots);
        this._occupiedSlots = new Map();
        this._createSlots();
    }

    get numOfStandardSlots() {
        return this._numOfStandardSlots;
    }

    get numOfDisabledSlots() {
        return this._numOfDisabledSlots;
    }

    get numOfTruckSlots() {
        return this._numOfTruckSlots;
    }

    get freeSlots() {
        return this.numOfStandardSlots + this.numOfDisabledSlots + this.numOfTruckSlots - this._occupiedSlots.size;
    }

    get busySlots() {
        return this._occupiedSlots;
    }

    _createSlots() {
        let i;
        for(i = 1; i <= this._standardSlots.length; i++) {
            this._standardSlots.push(new StandardParkingSlot(i));
        }
        for(i = 1; i <= this._disabledSlots.length; i++) {
            this._disabledSlots.push(new DisabledParkingSlot(i));
        }
        for(i = 1; i <= this._truckSlots.length; i++) {
            this._truckSlots.push(new TruckParkingSlot(i));
        }
    }

    static getFirstEmptySlot(slots) {
        for(let slot of slots) {
            if(!slot.isOccupied())
                return slot
        }

        return null;
    }

    parkVehicle(vehicle) {
        let slot;

        //На обычных местах могут парковаться только обычные машины или инвалидные.
        //На грузовых местах могут парковаться все виды машин, но приоритет инвалидкам и грузовым в первую очередь.
        //На инвалидных местах могут парковаться только инвалидные машины.
        if (vehicle instanceof DisabledCar) {
            if ((slot = Parking.getFirstEmptySlot(this._disabledSlots)) !== null) {
                return this._parkHelper(slot, vehicle);
            } else if ((slot = Parking.getFirstEmptySlot(this._truckSlots)) !== null) {
                return this._parkHelper(slot, vehicle);
            } else if ((slot = Parking.getFirstEmptySlot(this._standardSlots)) !== null) {
                return this._parkHelper(slot, vehicle);
            }
        } else if (vehicle instanceof Truck) {
            if ((slot = Parking.getFirstEmptySlot(this._truckSlots)) !== null) {
                return this._parkHelper(slot, vehicle);
            }
        } else if (vehicle instanceof SedanCar) {
            if ((slot = Parking.getFirstEmptySlot(this._standardSlots)) !== null) {
                return this._parkHelper(slot, vehicle);
            } else if ((slot = Parking.getFirstEmptySlot(this._truckSlots)) !== null) {
                return this._parkHelper(slot, vehicle);
            }
        }

        return -1;
    }

    unParkVehicle(uniqueToken) {
        this._occupiedSlots.get(uniqueToken).unParkVehicle();
        return this._occupiedSlots.delete(uniqueToken);
    }

    _parkHelper(slot, vehicle) {
        slot.parkVehicle(vehicle);
        let uniqueToken = Math.random();
        this._occupiedSlots.set(uniqueToken, slot);
        return uniqueToken;
    }

    getParkingStatus() {
        return {
            freeSlots: this.numOfFreeSlots,
            busySlots: this.busySlots,
            // busyBySedan: 10,
            // busyByTruck: 5,
            // busyByHandicapped: 3,
            // freeSedan: 20
        };
    }
}
