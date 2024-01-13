class Priority {
    constructor(value) {
        // if (value instanceof Priority) return value;
        if (Priority.legalValues().includes(value)) this._value = value;
        else throw new Error(`<${value}>은 유효하지 않은 우선순위입니다.`);
    }

    toString() {
        return this._value;
    }
    get _index() {
        return Priority.legalValues().findIndex((s) => s === this._value);
    }
    static legalValues() {
        return ["low", "normal", "high", "rush"];
    }

    equals(other) {
        return this._index === other._index;
    }
    higherThan(other) {
        return this._index > other._index;
    }
    lowerThan(other) {
        return this._index < other._index;
    }
}

class Order {
    constructor(data) {
        this._priority = new Priority(data.priority);
    }

    get priority() {
        return this._priority;
    }

    get priorityString() {
        return this._priority.toString();
    }

    set priorityString(value) {
        this._priority = new Priority(value);
    }
}

const orders = [
    new Order({ priority: "normal" }),
    new Order({ priority: "high" }),
    new Order({ priority: "rush" }),
];

export const highPriorityCount = orders.filter((o) =>
    o.priority.higherThan(new Priority("normal"))
).length;
