/* export function renderPerson(person) {
    const result = [];
    result.push(`<p>${person.name}</p>`);
    result.push(rendperPhoto(person.photo));
    result.push(`<p>제목: ${person.photo.title}</p>`);
    result.push(emitPhotoData(person.photo));
    return result.join("\n");
}

export function photoDiv(p) {
    return [
        "<div>",
        `<p>제목: ${p.title}</p>`,
        emitPhotoData(p),
        "</div>",
    ].join("\n");
}

function emitPhotoData(aPhoto) {
    const result = [];
    result.push(`<p>위치: ${aPhoto.location}</p>`);
    result.push(`<p>날짜: ${aPhoto.date.toDateString()}</p>`);
    return result.join("\n");
}

function rendperPhoto(aPhoto) {
    return "";
}
 */

/* 1. emitPhotoData을 두 곳에서 호출
 * 2. 호출하는 두 곳 모두 바로 앞에는 제목 title 출력 코드가 나온다.
 * 3. 제목을 출력하는 코드를 emitPhotoData안에 옮겨 중복을 없앤다.
 */

export function renderPerson(person) {
    const result = [];
    result.push(`<p>${person.name}</p>`);
    result.push(rendperPhoto(person.photo));
    result.push(emitPhotoData(person.photo));
    return result.join("\n");
}

export function photoDiv(p) {
    return ["<div>", emitPhotoData(p), "</div>"].join("\n");
}

function emitPhotoData(p) {
    return [
        `<p>제목: ${p.title}</p>`,
        `<p>위치: ${p.location}</p>`,
        `<p>날짜: ${p.date.toDateString()}</p>`,
    ].join("\n");
}

function rendperPhoto(aPhoto) {
    return "";
}
