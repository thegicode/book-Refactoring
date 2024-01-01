// function inNewEngland(aCustomer) {
//     return ["NA", "CT", "ME", "VT", "NH", "RI"].includes(
//         aCustomer.address.state
//     );
// }

// function inNewEngland(aCustomer) {
//     const stateCode = aCustomer.address.state;
//     return ["NA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
// }

// function inNewEngland(aCustomer) {
//     const stateCode = aCustomer.address.state;
//     return xxNEWinNewEngland(stateCode);
// }

// function inNewEngland(aCustomer) {
//     return xxNEWinNewEngland(aCustomer.address.state);
// }

// function xxNEWinNewEngland(stateCode) {
//     return ["NA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
// }

function inNewEngland(stateCode) {
    return ["NA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
}

// const inNewEnglanders = somCustomers.filter((c) => inNewEngland(c));
const inNewEnglanders = somCustomers.filter((c) =>
    inNewEngland(c.address.state)
);
