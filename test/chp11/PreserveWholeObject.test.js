import { expect } from "chai";
import {
    temperatureAlerts,
    HeatingPlan,
} from "../../src/chp11/PreserveWholeObject";

describe("11.4  Preserve Whole Object: temperatureAlerts", () => {
    it("should not report alert when room low and high templeratur are in range", () => {
        const alerts = temperatureAlerts(
            {
                daysTempRange: {
                    low: 1,
                    high: 2,
                },
            },
            new HeatingPlan({ low: 0, high: 3 })
        );

        expect(alerts).to.eql([]);
    });

    it("should repoert alert when room low temparature is outside range", () => {
        const alerts = temperatureAlerts(
            {
                daysTempRange: {
                    low: -1,
                    high: 2,
                },
            },
            new HeatingPlan({ low: 0, high: 3 })
        );

        expect(alerts).to.eql(["room temperature went outside range"]);
    });

    it("should reposrt alert when room high temperature is outside range", () => {
        const alerts = temperatureAlerts(
            {
                daysTempRange: {
                    low: 1,
                    high: 4,
                },
            },
            new HeatingPlan({ low: 0, high: 3 })
        );

        expect(alerts).to.eql(["room temperature went outside range"]);
    });
});
