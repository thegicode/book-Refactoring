import Producer from "./Producer.js";

export default class Province {
    constructor(doc) {
        this._name = doc.name;
        this._producers = [];
        this._totalProduction = 0;
        this._deamnd = doc.demand;
        this._price = doc.price;
        doc.producers.forEach((d) => this.addProducer(new Producer(this, d)));
    }

    addProducer(arg) {
        this._producers.push(arg);
        this._totalProduction += arg.production;
    }

    get name() {
        return this._name;
    }

    get producers() {
        return this._producers;
    }

    get totalProduction() {
        return this._totalProduction;
    }
    set totalProduction(arg) {
        this._totalProduction = arg;
    }

    get demand() {
        return this._deamnd;
    }
    set demand(arg) {
        this._deamnd = parseInt(arg);
    }

    get price() {
        return this._price;
    }
    set price(arg) {
        this._price = parseInt(arg);
    }

    get shortfall() {
        return this._deamnd - this.totalProduction;
    }

    get profit() {
        return this.demandValue - this.demandCost;
    }

    get demandValue() {
        return this.satisfiedDemand * this.price;
    }

    get satisfiedDemand() {
        return Math.min(this._deamnd, this.totalProduction);
    }

    get demandCost() {
        let reaminingDemand = this.demand;
        let result = 0;
        this.producers
            .sort((a, b) => a.cost - b.cost)
            .forEach((p) => {
                const contribution = Math.min(reaminingDemand, p.production);
                reaminingDemand -= contribution;
                result += contribution * p.cost;
            });
        return result;
    }
}
