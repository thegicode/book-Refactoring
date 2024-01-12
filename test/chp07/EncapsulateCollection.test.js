import { expect } from "chai";

import { Person, Course } from "../../src/chp07/EncapsulateCollection.js";

describe("EncapsulateCollection", () => {
    it("can set a courses", () => {
        const aPerson = new Person("Grace");
        const courses = [new Course("Math", true)];

        courses.forEach((course) => aPerson.addCourse(course));

        expect(aPerson.name).to.equal("Grace");
        expect(aPerson.courses).to.eql(courses);
    });

    it("can add courses", () => {
        const aPerson = new Person("Grace");
        aPerson.addCourse(new Course("Math", false));
        aPerson.addCourse(new Course("Photography", false));

        expect(aPerson.name).to.equal("Grace");
        expect(aPerson.courses).to.eql([
            new Course("Math", false),
            new Course("Photography", false),
        ]);
    });

    it("can remove course", () => {
        const aPerson = new Person("Grace");
        let courseToBeRemoved = new Course("Math", false);
        aPerson.addCourse(courseToBeRemoved);
        aPerson.addCourse(new Course("Photography", false));
        aPerson.removeCourse(courseToBeRemoved);

        expect(aPerson.courses).to.eql([new Course("Photography", false)]);
    });

    it("internal courses can not be modified by the courses passed to setter", () => {
        const aPerson = new Person("Grace");
        const courses = [new Course("Math", false)];

        aPerson.courses = courses;

        courses.push(new Course("Photography", true));

        expect(aPerson.courses).to.eql([new Course("Math", false)]);
    });

    it("internal courses can not be modified by the courses obtained by getter", () => {
        const aPerson = new Person("Grace");
        aPerson.courses = [new Course("Math", false)];

        const coursedByGetter = aPerson.courses;

        coursedByGetter.push(new Course("Photography", true));

        expect(aPerson.courses).to.eql([new Course("Math", false)]);
    });
});
