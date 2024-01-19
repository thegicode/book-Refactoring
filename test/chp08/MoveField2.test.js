import { expect } from "chai";

import { Account, AccountType } from "../../src/chp08/MoveField2";

describe("Move Field2", () => {
    it("get interestRage", () => {
        const account = new Account("Grace", new AccountType("Grace", 6));

        expect(account.interestRate).to.equal(6);
    });
});
