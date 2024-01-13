/*
// 배송 추적 정보
class TrackingInformation {
    // 배송 회사
    get shippingCompany() {
        return this._shippingCompany;
    }
    set shippingCompany(arg) {
        this._shippingCompany = arg;
    }

    // 추적 번호
    get trackingNumber() {
        return this._trackingNumber;
    }
    set trackingNumber(arg) {
        this._trackingNumber = arg;
    }

    get display() {
        return `${this.shippingCompany}: ${this.trackingNumber}`;
    }
}

// 배송
class Shipment {
    constructor() {}

    get trackingInformation() {
        return this._trackingInformation.display;
    }
    set trackingInformation(aTrackingInforamtion) {
        this._trackingInformation = aTrackingInforamtion;
    }
}

// 클라이언트
// aShipment.trackingInformation.shippingCompany = request.vendor;

*/

// 배송
export class Shipment {
    constructor(shippingCompany, trackingNumber) {
        this._shippingCompany = shippingCompany;
        this._trackingNumber = trackingNumber;
    }

    // 배송 회사
    get shippingCompany() {
        return this._shippingCompany;
    }
    set shippingCompany(arg) {
        this._shippingCompany = arg;
    }

    // 추적 번호
    get trackingNumber() {
        return this._trackingNumber;
    }
    set trackingNumber(arg) {
        this._trackingNumber = arg;
    }

    get trackingInfo() {
        return `${this.shippingCompany}: ${this.trackingNumber}`;
    }
}

// 클라이언트
// aShipment.shippingCompany = request.vendor;
