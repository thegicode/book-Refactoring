import { expect } from "chai";

import {
    getCustomerData,
    getRawDataOfCustomers,
    setRawDataOfCustomers,
    compareUsage,
} from "../../src/chp07/EncapsulateRecord2.js";

describe("EncapsulateRecord2", () => {
    const data = {
        1920: {
            name: "margin",
            id: "1920",
            usages: {
                2016: {
                    1: 50,
                    2: 55,
                },
                2015: {
                    1: 70,
                    2: 63,
                },
            },
        },
        38673: {
            name: "nill",
            id: "38673",
            usages: {
                2016: {
                    1: 50,
                    2: 55,
                },
                2015: {
                    1: 70,
                    2: 63,
                },
            },
        },
    };

    setRawDataOfCustomers(data);

    it("compareUsage", () => {
        const compared = compareUsage(1920, 2016, 1);
        expect(compared.laterAmount).to.equal(50);
        expect(compared.change).to.equal(-20);
    });

    // it("setRawDataOfCustomers", () => {
    //     expect(setRawDataOfCustomers(customerData)).to.equal(customerData);
    // });
});
