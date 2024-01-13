import { expect } from "chai";
import { Shipment } from "../../src//chp07/InlineClass";

describe("Shipment", () => {
    it("report tracking information", () => {
        const aShipment = new Shipment("AAA", 999);
        expect(aShipment.trackingInfo).to.eql("AAA: 999");

        aShipment.shippingCompany = "COSCO";
        expect(aShipment.trackingInfo).to.eql("COSCO: 999");

        aShipment.trackingNumber = "111";
        expect(aShipment.trackingInfo).to.eql("COSCO: 111");
    });
});
