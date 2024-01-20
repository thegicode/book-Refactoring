import { expect } from "chai";

import { acquireData } from "../../src/chp08/ReplaceLoopWithPipeline";

const csvInput = `office, country, telephone\n
Chicago, USA, +1 312 373 1000\n
Beijing, China, +86 4008 900 505\n
Bangalore, India, +91 80 4064 9570\n
Porto Alegre, Brazil, +55 51 3079 3550\n
Chennai, India, +91 44 660 44766`;

describe("Replace Loop with Pipeline", () => {
    it("acquireData", () => {
        expect(acquireData(csvInput)).to.eql([
            { city: "Bangalore", phone: "+91 80 4064 9570" },
            { city: "Chennai", phone: "+91 44 660 44766" },
        ]);
    });
});
