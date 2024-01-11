import _ from "lodash";

class CustomerData {
    constructor(data) {
        this._data = data;
    }

    get rawData() {
        return _.cloneDeep(this._data);
    }

    setUsage(customerID, year, month, amount) {
        this._data[customerID].usages[year][month] = amount;
    }

    usage(customerID, year, month) {
        return this._data[customerID].usages[year][month];
    }
}

export let customerData = {};

export function getCustomerData() {
    return customerData;
}

export function getRawDataOfCustomers() {
    return customerData.rawData;
}

export function setRawDataOfCustomers(arg) {
    customerData = new CustomerData(arg);
}

// 쓰기
// getCustomerData().setUsage(customerID, year, month, amount);

// 읽기
export function compareUsage(customerID, laterYear, month) {
    const later =
        getCustomerData().rawData[customerID].usages[laterYear][month];
    const earlier =
        getCustomerData().rawData[customerID].usages[laterYear - 1][month];
    return {
        laterAmount: later,
        change: later - earlier,
    };
}
