// export function foundPerson(people) {
//     for (let i = 0; i < people.length; i++) {
//         if (people[i] === "Don") {
//             return "Don";
//         }
//         if (people[i] === "Jhon") {
//             return "Jhon";
//         }
//         if (people[i] === "Kent") {
//             return "Kent";
//         }
//     }
//     return "";
// }

export function foundPerson(people) {
    const candidates = ["Don", "Jhon", "Kent"];
    return people.find((p) => candidates.includes(p)) || "";
}
