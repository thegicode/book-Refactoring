export class Person {
    constructor(name) {
        this._name = name;
        this._courses = [];
    }

    get name() {
        return this._name;
    }
    get courses() {
        return this._courses.slice();
    }

    set courses(aList) {
        this._courses = aList.slice();
    }

    addCourse(aCourse) {
        this._courses.push(aCourse);
    }

    removeCourse(
        aCourse,
        fnIfAbsend = () => {
            throw new RangeError();
        }
    ) {
        const index = this._courses.indexOf(aCourse);
        if (index === -1) fnIfAbsend;
        else this._courses.splice(index, 1);
    }
}

export class Course {
    constructor(name, isAdvanced) {
        this._name = name;
        this._isAdvancde = isAdvanced;
    }

    get name() {
        return this._name;
    }
    get isAdvanced() {
        return this._isAdvancde;
    }
}
