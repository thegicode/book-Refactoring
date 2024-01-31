import { expect } from "chai";
import {
    plumages,
    speeds,
} from "../../src/chp10/ReplaceConditionalWithPolymorphism";

describe("10.4 Replace Conditional with Polymorphism", () => {
    it("plumages: calulates plumages for all supported birds, gives unknown for unsupported", () => {
        const birds = [
            {
                name: "EuropeanSwallow",
                type: "EuropeanSwallow",
                numberOfCoconuts: 1,
                voltage: 100,
            },
            {
                name: "AfricanSwallow",
                type: "AfricanSwallow",
                numberOfCoconuts: 2,
                voltage: 200,
            },
            {
                name: "NorwegianBlueParrot",
                type: "NorwegianBlueParrot",
                numberOfCoconuts: 3,
                voltage: 300,
            },
            { name: "Foo", type: "Foo" },
        ];

        expect(plumages(birds)).to.deep.equal(
            new Map([
                ["EuropeanSwallow", "average"],
                ["AfricanSwallow", "average"],
                ["NorwegianBlueParrot", "scorched"],
                ["Foo", "unknown"],
            ])
        );
    });

    // calculates airSpeedVelocity for all supported birds, gives null for unsupported
    it("speeds: calulates airSpeedVelocity for all supported birds, gives null for unsupported", () => {
        const birds = [
            {
                name: "EuropeanSwallow",
                type: "EuropeanSwallow",
                numberOfCoconuts: 1,
                voltage: 100,
                isNailed: false,
            },
            {
                name: "AfricanSwallow",
                type: "AfricanSwallow",
                numberOfCoconuts: 2,
                voltage: 200,
                isNailed: false,
            },
            {
                name: "NorwegianBlueParrot",
                type: "NorwegianBlueParrot",
                numberOfCoconuts: 3,
                voltage: 300,
                isNailed: false,
            },
            { name: "Foo", type: "Foo" },
        ];

        expect(speeds(birds)).to.deep.equal(
            new Map([
                ["EuropeanSwallow", 35],
                ["AfricanSwallow", 36],
                ["NorwegianBlueParrot", 40],
                ["Foo", null],
            ])
        );
    });
});
