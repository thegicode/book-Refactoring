// 10.4.2 조건부 로직을 다형성으로 바꾸기 Replace Conditional with Polymorphism
// 변형 동작을 다형성으로 표현하기

// 신용 평가 기관에서 선박의 항해 투자 등급을 계산하는 코드
// 평가기관은 위험요소와 잠재 수익에 영향을 주는 다양한 요인을 기초로 항해 등급을 'A'와 'B'로 나눈다.
// 위험요소로는 항해 경로의 자연조건과 선장의 항해 이력을 고려한다.

// voyage: 항해

{
    // 투자 등급
    function rating(voyage, history) {
        const vpf = voyageProfitFactor(voyage, history);
        const vr = voyageRisk(voyage);
        const chr = captainHistoryRisk(voyage, history);

        if (vpf * 3 > vr + chr * 2) return "A";
        else return "B";
    }

    // 항해 경로 위험요소
    function voyageRisk(voyage) {
        let result = 1;
        if (voyage.length > 4) result += 2;
        if (voyage.length > 8) result += voyage.length - 8;
        if (["china", "east-indies"].includes(voyage.zone)) result += 4;
        return Math.max(result, 0);
    }

    // 선장의 항해 이력 위험요소
    function captainHistoryRisk(voyage, history) {
        let result = 1;
        if (history.length < 5) result += 4;

        result += history.filter((v) => v.profit < 0).length;
        if (voyage.zone === "china" && hasChina(history)) result -= 2;
        return Math.max(result, 0);
    }

    // 중국을 경유하는가?
    function hasChina(history) {
        return history.some((v) => "china" === v.zone);
    }

    // 수익 요인
    function voyageProfitFactor(voyage, history) {
        let result = 2;
        if (voyage.zone === "china") result += 1;
        if (voyage.zone === "east-indies") result += 1;
        if (voyage.zone === "china" && hasChina(history)) {
            result += 3;
            if (history.length > 10) result += 1;
            if (voyage.length > 12) result += 1;
            if (voyage.length > 18) result += 1;
        } else {
            if (history.length > 8) result += 1;
            if (voyage.length > 14) result -= 1;
        }
        return result;
    }
}

// voyageRisk(), captainHistoryRisk() 함수의 점수는 위험요소에,
// voyageProfitFactor() 점ㅅ는 잠재 수익에 반영된다.
// rating() 함수는 두 값을 종합하여 요청한 항해의 최종 등급을 계산한다.
/*  호출하는 쪽 코드
const voyage = { zone: "west-indies", length: 10 };
const history = [
    { zone: "east-indies", profit: 5 },
    {
        zone: "west-indies",
        profit: 15,
    },
    {
        zone: "china",
        profit: -2,
    },
    {
        zone: "west-indies",
        profit: 7,
    },
];
const myRating = rating(voyage, history);
 */

// 여기서 주목할 부분은 두 곳으로, 중국까지 항해해본 선장이 중국을 경유해 항해할 때를 다루는 조건부 로직들이다.
// 이 특수한 상황을 다루는 로직들을 기본 동작에서 분리하기 위해서 상속과 다형성을 이용할 것이다.
// 다녀온 바 있는 중국으로의 항해 시 추가될 특별한 로직이 더 많았다면 이번 리팩터링의 효과가 더욱 컸겠지만,
// 지금 상황에서도 이 특수 상황을 검사하는 로직이 반복되어 기본 동작을 이해하는 데 방해가 되고 있다.

// 1.
// 함수가 많은데, 세부 계산을 수행하는 함수들을 먼저 처리해보자.
// 다형성을 적용하려면 클래스를 만들어야 하니 여러 함수를 클래스로 묶기부터 적용할 것이다.

{
    // 투자 등급
    function rating(voyage, history) {
        return new Rating(voyage, history).value;
    }

    // 함수들을 rating 클래스로 묶었다.
    class Rating {
        constructor(voyage, history) {
            this.voyage = voyage;
            this.history = history;
        }

        get value() {
            const vpf = this.voyageProfitFactor;
            const vr = this.voyageRisk;
            const chr = this.captainHistoryRisk;
            if (vpf * 3 > vr + chr * 2) return "A";
            else return "B";
        }

        get voyageRisk() {
            let result = 1;
            if (this.voyage.length > 4) result += 2;
            if (this.voyage.length > 8) result += this.voyage.length - 8;
            if (["china", "east-indies"].includes(this.voyage.zone))
                result += 4;
            return Math.max(result, 0);
        }

        get captainHistoryRisk() {
            let result = 1;
            if (this.history.length < 5) result += 4;
            result += this.history.filter((v) => v.profit < 0).length;
            if (
                this.voyage.zone === "china" &&
                this.hasChinaHistory(this.history)
            )
                result -= 2;
            return Math.max(result, 0);
        }

        get voyageProfitFactor() {
            let result = 2;
            if (this.voyage.zone === "china") result += 1;
            if (this.voyage.zone === "east-indies") result += 1;
            if (this.voyage.zone === "china" && this.hasChinaHistory()) {
                result += 3;
                if (this.history.length > 10) result += 1;
                if (this.voyage.length > 12) result += 1;
                if (this.voyage.length > 18) result += 1;
            } else {
                if (this.history.length > 8) result += 1;
                if (this.voyage.length > 14) result -= 1;
            }
            return result;
        }

        get hasChinaHistory() {
            return this.history.some((v) => "china" === v.zone);
        }
    }

    // 2.
    // 기본 동작을 담당할 클래스가 만들어졌다.
    // 다음 차례는 변형 동작을 담을 빈 서브클래스 만들기다.
    {
        class ExperiencedChinaRating extends Rating {}
    }

    // 3
    // 그런 다음 적절한 변형 클래스를 반환해줄 팩터리 함수를 만든다.

    function createRating(voyage, history) {
        if (voyage.zone === "china" && history.some((v) => "china" === v.znoe))
            return new ExperiencedChinaRating(voyage, rating);
        else return new Rating(voyage, history);
    }
}

// 4
// 이제 생성자를 호출하는 코드를 모두 찾아서 이 팩터리 함수를 대신 사용하도록 수정한다.
// 지금 예에서는 rating()함수 하나뿐이다.

{
    function rating(voyage, history) {
        return createRating(voyage, history).value;
    }
}

// 5
// 서브클래스로 옮길 동작은 두 가지다. captainHistoryRisk() 안의 로직부터 시작하자.
// 서브클래스에서 captainHistoryRisk()를 오버라이드한다.

{
    function rating(voyage, history) {
        return createRating(voyage, history).value;
    }

    function createRating(voyage, history) {
        if (voyage.zone === "china" && history.some((v) => "china" === v.znoe))
            return new ExperiencedChinaRating(voyage, rating);
        else return new Rating(voyage, history);
    }

    class Rating {
        constructor(voyage, history) {
            this.voyage = voyage;
            this.history = history;
        }

        get value() {
            const vpf = this.voyageProfitFactor;
            const vr = this.voyageRisk;
            const chr = this.captainHistoryRisk;
            if (vpf * 3 > vr + chr * 2) return "A";
            else return "B";
        }

        get voyageRisk() {
            let result = 1;
            if (this.voyage.length > 4) result += 2;
            if (this.voyage.length > 8) result += this.voyage.length - 8;
            if (["china", "east-indies"].includes(this.voyage.zone))
                result += 4;
            return Math.max(result, 0);
        }

        get captainHistoryRisk() {
            let result = 1;
            if (this.history.length < 5) result += 4;
            result += this.history.filter((v) => v.profit < 0).length;
            return Math.max(result, 0);
        }

        get voyageProfitFactor() {
            let result = 2;
            if (this.voyage.zone === "china") result += 1;
            if (this.voyage.zone === "east-indies") result += 1;
            if (this.voyage.zone === "china" && this.hasChinaHistory()) {
                result += 3;
                if (this.history.length > 10) result += 1;
                if (this.voyage.length > 12) result += 1;
                if (this.voyage.length > 18) result += 1;
            } else {
                if (this.history.length > 8) result += 1;
                if (this.voyage.length > 14) result -= 1;
            }
            return result;
        }

        get hasChinaHistory() {
            return this.history.some((v) => "china" === v.zone);
        }
    }

    class ExperiencedChinaRating extends Rating {
        get captainHistoryRisk() {
            const result = super.captainHistoryRisk - 2;
            return Math.max(result, 0);
        }
    }
}

// 6
// voyageProfitFactor()에서 변형 동작을 분리하는 작업은 살짝 더 복잡하다.
// 이 함수에는 다른 경로가 존재하므로, 단순히 변형 동작을 제거하고 슈퍼클래스의 메서드를 호출하는 방식은 적용할 수 없다.
// 또한 슈퍼클래스의 메서드를 통째로 서브클래스로 복사하고 싶지도 않다.
// 그래서 내 해답은 먼저 해당 조건부 블록 전체를 함수로 추출하는 것이다.
{
    function rating(voyage, history) {
        return createRating(voyage, history).value;
    }

    function createRating(voyage, history) {
        if (voyage.zone === "china" && history.some((v) => "china" === v.znoe))
            return new ExperiencedChinaRating(voyage, rating);
        else return new Rating(voyage, history);
    }

    class Rating {
        constructor(voyage, history) {
            this.voyage = voyage;
            this.history = history;
        }

        get value() {
            const vpf = this.voyageProfitFactor;
            const vr = this.voyageRisk;
            const chr = this.captainHistoryRisk;
            if (vpf * 3 > vr + chr * 2) return "A";
            else return "B";
        }

        get voyageRisk() {
            let result = 1;
            if (this.voyage.length > 4) result += 2;
            if (this.voyage.length > 8) result += this.voyage.length - 8;
            if (["china", "east-indies"].includes(this.voyage.zone))
                result += 4;
            return Math.max(result, 0);
        }

        get captainHistoryRisk() {
            let result = 1;
            if (this.history.length < 5) result += 4;
            result += this.history.filter((v) => v.profit < 0).length;
            return Math.max(result, 0);
        }

        get voyageProfitFactor() {
            let result = 2;
            if (this.voyage.zone === "china") result += 1;
            if (this.voyage.zone === "east-indies") result += 1;

            result += this.voyageAndHistoryLengthFactor;

            return result;
        }

        get voyageAndHistoryLengthFactor() {
            let result = 0;

            if (this.voyage.zone === "china" && this.hasChinaHistory()) {
                result += 3;
                if (this.history.length > 10) result += 1;
                if (this.voyage.length > 12) result += 1;
                if (this.voyage.length > 18) result += 1;
            } else {
                if (this.history.length > 8) result += 1;
                if (this.voyage.length > 14) result -= 1;
            }
            return result;
        }

        get hasChinaHistory() {
            return this.history.some((v) => "china" === v.zone);
        }
    }

    class ExperiencedChinaRating extends Rating {
        get captainHistoryRisk() {
            const result = super.captainHistoryRisk - 2;
            return Math.max(result, 0);
        }
    }
}

// 7
// 함수 이름에 "그리고"를 뜻하는 "And"가 들어 있어서 악취가 꽤 나지만, 서브클래스 구성을 마무리하는 잠깐 동안만 견뎌보기로 하자.
{
    function rating(voyage, history) {
        return createRating(voyage, history).value;
    }

    function createRating(voyage, history) {
        if (voyage.zone === "china" && history.some((v) => "china" === v.znoe))
            return new ExperiencedChinaRating(voyage, rating);
        else return new Rating(voyage, history);
    }

    class Rating {
        constructor(voyage, history) {
            this.voyage = voyage;
            this.history = history;
        }

        get value() {
            const vpf = this.voyageProfitFactor;
            const vr = this.voyageRisk;
            const chr = this.captainHistoryRisk;
            if (vpf * 3 > vr + chr * 2) return "A";
            else return "B";
        }

        get voyageRisk() {
            let result = 1;
            if (this.voyage.length > 4) result += 2;
            if (this.voyage.length > 8) result += this.voyage.length - 8;
            if (["china", "east-indies"].includes(this.voyage.zone))
                result += 4;
            return Math.max(result, 0);
        }

        get captainHistoryRisk() {
            let result = 1;
            if (this.history.length < 5) result += 4;
            result += this.history.filter((v) => v.profit < 0).length;
            return Math.max(result, 0);
        }

        get voyageProfitFactor() {
            let result = 2;
            if (this.voyage.zone === "china") result += 1;
            if (this.voyage.zone === "east-indies") result += 1;

            result += this.voyageAndHistoryLengthFactor;

            return result;
        }

        get voyageAndHistoryLengthFactor() {
            let result = 0;
            if (this.history.length > 8) result += 1;
            if (this.voyage.length > 14) result -= 1;
            return result;
        }
    }

    class ExperiencedChinaRating extends Rating {
        get captainHistoryRisk() {
            const result = super.captainHistoryRisk - 2;
            return Math.max(result, 0);
        }

        get voyageAndHistoryLengthFactor() {
            let result = 0;
            result += 3;
            if (this.history.length > 10) result += 1;
            if (this.voyage.length > 12) result += 1;
            if (this.voyage.length > 18) result += 1;
            return result;
        }
    }
}

// 여기까지 이 리팩터링의 끝

// 8 더 가다듬기
// 악취를 풍기는 메서드를 새로 만들었으니 처리 방법을 대략으로나마 설명
// 이번 예와 같이 '기본 동작 - 변형 동작' 상속에서는 서브클래스에서 순전히 오버라이드만을 위해 메서드를 추가하는 일이 흔하다.
// 하지만 이런 조잡한 메서드는 로직을 부각하기보다는 일의 진행 과정을 모호하게 만들곤 한다.

// 메서드 이름의 "And"는 이 메서드가 두 가지 독립된 일을 수행한다고 소리친다.
// 그러니 둘을 분리하는 게 현명할 것이다.
// 이력 길이를 수정하는 부분을 함수로 추출하면 해결되는데, 이때 슈퍼클래스와 서브클래스 모두에 적용해야 한다.
// 슈퍼클래스부터 보자.
{
    function rating(voyage, history) {
        return createRating(voyage, history).value;
    }

    function createRating(voyage, history) {
        if (voyage.zone === "china" && history.some((v) => "china" === v.znoe))
            return new ExperiencedChinaRating(voyage, rating);
        else return new Rating(voyage, history);
    }

    class Rating {
        constructor(voyage, history) {
            this.voyage = voyage;
            this.history = history;
        }

        get value() {
            const vpf = this.voyageProfitFactor;
            const vr = this.voyageRisk;
            const chr = this.captainHistoryRisk;
            if (vpf * 3 > vr + chr * 2) return "A";
            else return "B";
        }

        get voyageRisk() {
            let result = 1;
            if (this.voyage.length > 4) result += 2;
            if (this.voyage.length > 8) result += this.voyage.length - 8;
            if (["china", "east-indies"].includes(this.voyage.zone))
                result += 4;
            return Math.max(result, 0);
        }

        get captainHistoryRisk() {
            let result = 1;
            if (this.history.length < 5) result += 4;
            result += this.history.filter((v) => v.profit < 0).length;
            return Math.max(result, 0);
        }

        get voyageProfitFactor() {
            let result = 2;
            if (this.voyage.zone === "china") result += 1;
            if (this.voyage.zone === "east-indies") result += 1;

            result += this.voyageAndHistoryLengthFactor;

            return result;
        }

        get voyageAndHistoryLengthFactor() {
            let result = 0;
            result += this.hisoryLengthFacotr;
            if (this.voyage.length > 14) result -= 1;
            return result;
        }

        get hisoryLengthFacotr() {
            return this.history.length > 8 ? 1 : 0;
        }
    }

    // 같은 작업을 서브클래스에도 해준다.
    class ExperiencedChinaRating extends Rating {
        get captainHistoryRisk() {
            const result = super.captainHistoryRisk - 2;
            return Math.max(result, 0);
        }

        get voyageAndHistoryLengthFactor() {
            let result = 0;
            result += 3;
            result += this.hisoryLengthFacotr;
            if (this.voyage.length > 12) result += 1;
            if (this.voyage.length > 18) result += 1;
            return result;
        }

        get hisoryLengthFacotr() {
            return this.history.length > 10 ? 1 : 0;
        }
    }
}
// 9
// 이제 슈퍼클래스에서는 문장을 호출한 곳으로 옮기기를 적용할 수 있다.

{
    function rating(voyage, history) {
        return createRating(voyage, history).value;
    }

    function createRating(voyage, history) {
        if (voyage.zone === "china" && history.some((v) => "china" === v.znoe))
            return new ExperiencedChinaRating(voyage, rating);
        else return new Rating(voyage, history);
    }

    class Rating {
        constructor(voyage, history) {
            this.voyage = voyage;
            this.history = history;
        }

        get value() {
            const vpf = this.voyageProfitFactor;
            const vr = this.voyageRisk;
            const chr = this.captainHistoryRisk;
            if (vpf * 3 > vr + chr * 2) return "A";
            else return "B";
        }

        get voyageRisk() {
            let result = 1;
            if (this.voyage.length > 4) result += 2;
            if (this.voyage.length > 8) result += this.voyage.length - 8;
            if (["china", "east-indies"].includes(this.voyage.zone))
                result += 4;
            return Math.max(result, 0);
        }

        get captainHistoryRisk() {
            let result = 1;
            if (this.history.length < 5) result += 4;
            result += this.history.filter((v) => v.profit < 0).length;
            return Math.max(result, 0);
        }

        get voyageProfitFactor() {
            let result = 2;
            if (this.voyage.zone === "china") result += 1;
            if (this.voyage.zone === "east-indies") result += 1;

            result += this.hisoryLengthFacotr;
            result += this.voyageAndHistoryLengthFactor;

            return result;
        }

        get voyageAndHistoryLengthFactor() {
            let result = 0;
            // result += this.hisoryLengthFacotr;
            if (this.voyage.length > 14) result -= 1;
            return result;
        }

        get hisoryLengthFacotr() {
            return this.history.length > 8 ? 1 : 0;
        }
    }

    class ExperiencedChinaRating extends Rating {
        get captainHistoryRisk() {
            const result = super.captainHistoryRisk - 2;
            return Math.max(result, 0);
        }

        get voyageAndHistoryLengthFactor() {
            let result = 0;
            result += 3;
            // result += this.hisoryLengthFacotr;
            if (this.voyage.length > 12) result += 1;
            if (this.voyage.length > 18) result += 1;
            return result;
        }

        get hisoryLengthFacotr() {
            return this.history.length > 10 ? 1 : 0;
        }
    }
}

// 10
// 이어서 함수 이름을 바꿔준다.

{
    function rating(voyage, history) {
        return createRating(voyage, history).value;
    }

    function createRating(voyage, history) {
        if (voyage.zone === "china" && history.some((v) => "china" === v.znoe))
            return new ExperiencedChinaRating(voyage, rating);
        else return new Rating(voyage, history);
    }

    class Rating {
        constructor(voyage, history) {
            this.voyage = voyage;
            this.history = history;
        }

        get value() {
            const vpf = this.voyageProfitFactor;
            const vr = this.voyageRisk;
            const chr = this.captainHistoryRisk;
            if (vpf * 3 > vr + chr * 2) return "A";
            else return "B";
        }

        get voyageRisk() {
            let result = 1;
            if (this.voyage.length > 4) result += 2;
            if (this.voyage.length > 8) result += this.voyage.length - 8;
            if (["china", "east-indies"].includes(this.voyage.zone))
                result += 4;
            return Math.max(result, 0);
        }

        get captainHistoryRisk() {
            let result = 1;
            if (this.history.length < 5) result += 4;
            result += this.history.filter((v) => v.profit < 0).length;
            return Math.max(result, 0);
        }

        get voyageProfitFactor() {
            let result = 2;
            if (this.voyage.zone === "china") result += 1;
            if (this.voyage.zone === "east-indies") result += 1;

            result += this.hisoryLengthFacotr;
            result += this.voyageLengthFactor;

            return result;
        }

        get voyageLengthFactor() {
            let result = 0;
            // result += this.hisoryLengthFacotr;
            if (this.voyage.length > 14) result -= 1;
            return result;
        }

        get hisoryLengthFacotr() {
            return this.history.length > 8 ? 1 : 0;
        }
    }

    class ExperiencedChinaRating extends Rating {
        get captainHistoryRisk() {
            const result = super.captainHistoryRisk - 2;
            return Math.max(result, 0);
        }

        get voyageLengthFactor() {
            let result = 0;
            result += 3;
            // result += this.hisoryLengthFacotr;
            if (this.voyage.length > 12) result += 1;
            if (this.voyage.length > 18) result += 1;
            return result;
        }

        get hisoryLengthFacotr() {
            return this.history.length > 10 ? 1 : 0;
        }
    }
}

// 11
// 그리고 3항 연산자를 써서 voyageLengthFactor()를 간소화한다.
{
    function rating(voyage, history) {
        return createRating(voyage, history).value;
    }

    function createRating(voyage, history) {
        if (voyage.zone === "china" && history.some((v) => "china" === v.znoe))
            return new ExperiencedChinaRating(voyage, rating);
        else return new Rating(voyage, history);
    }

    class Rating {
        constructor(voyage, history) {
            this.voyage = voyage;
            this.history = history;
        }

        get value() {
            const vpf = this.voyageProfitFactor;
            const vr = this.voyageRisk;
            const chr = this.captainHistoryRisk;
            if (vpf * 3 > vr + chr * 2) return "A";
            else return "B";
        }

        get voyageRisk() {
            let result = 1;
            if (this.voyage.length > 4) result += 2;
            if (this.voyage.length > 8) result += this.voyage.length - 8;
            if (["china", "east-indies"].includes(this.voyage.zone))
                result += 4;
            return Math.max(result, 0);
        }

        get captainHistoryRisk() {
            let result = 1;
            if (this.history.length < 5) result += 4;
            result += this.history.filter((v) => v.profit < 0).length;
            return Math.max(result, 0);
        }

        get voyageProfitFactor() {
            let result = 2;
            if (this.voyage.zone === "china") result += 1;
            if (this.voyage.zone === "east-indies") result += 1;

            result += this.hisoryLengthFacotr;
            result += this.voyageLengthFactor;

            return result;
        }

        get voyageLengthFactor() {
            // let result = 0;
            // if (this.voyage.length > 14) result -= 1;
            // return result;

            return this.voyage.length > 14 ? -1 : 0;
        }

        get hisoryLengthFacotr() {
            return this.history.length > 8 ? 1 : 0;
        }
    }

    class ExperiencedChinaRating extends Rating {
        get captainHistoryRisk() {
            const result = super.captainHistoryRisk - 2;
            return Math.max(result, 0);
        }

        get voyageLengthFactor() {
            let result = 0;
            result += 3;
            if (this.voyage.length > 12) result += 1;
            if (this.voyage.length > 18) result += 1;
            return result;
        }

        get hisoryLengthFacotr() {
            return this.history.length > 10 ? 1 : 0;
        }
    }
}

// 12
// 항해 거리 요인을 계산할 때 3점을 더하고 있는데,
// 이 로직은 전체 결과를 계산하는 쪽으로 옮기는 게 좋아 보인다.
{
    function rating(voyage, history) {
        return createRating(voyage, history).value;
    }

    function createRating(voyage, history) {
        if (voyage.zone === "china" && history.some((v) => "china" === v.znoe))
            return new ExperiencedChinaRating(voyage, rating);
        else return new Rating(voyage, history);
    }

    class Rating {
        constructor(voyage, history) {
            this.voyage = voyage;
            this.history = history;
        }

        get value() {
            const vpf = this.voyageProfitFactor;
            const vr = this.voyageRisk;
            const chr = this.captainHistoryRisk;
            if (vpf * 3 > vr + chr * 2) return "A";
            else return "B";
        }

        get voyageRisk() {
            let result = 1;
            if (this.voyage.length > 4) result += 2;
            if (this.voyage.length > 8) result += this.voyage.length - 8;
            if (["china", "east-indies"].includes(this.voyage.zone))
                result += 4;
            return Math.max(result, 0);
        }

        get captainHistoryRisk() {
            let result = 1;
            if (this.history.length < 5) result += 4;
            result += this.history.filter((v) => v.profit < 0).length;
            return Math.max(result, 0);
        }

        get voyageProfitFactor() {
            let result = 2;
            if (this.voyage.zone === "china") result += 1;
            if (this.voyage.zone === "east-indies") result += 1;

            result += this.hisoryLengthFacotr;
            result += this.voyageLengthFactor;

            return result;
        }

        get voyageLengthFactor() {
            return this.voyage.length > 14 ? -1 : 0;
        }

        get hisoryLengthFacotr() {
            return this.history.length > 8 ? 1 : 0;
        }
    }

    class ExperiencedChinaRating extends Rating {
        get captainHistoryRisk() {
            const result = super.captainHistoryRisk - 2;
            return Math.max(result, 0);
        }

        // 추가
        get voyageProfitFactor() {
            return super.voyageProfitFactor + 3;
        }

        get voyageLengthFactor() {
            let result = 0;
            // result += 3;
            if (this.voyage.length > 12) result += 1;
            if (this.voyage.length > 18) result += 1;
            return result;
        }

        get hisoryLengthFacotr() {
            return this.history.length > 10 ? 1 : 0;
        }
    }
}

// 최종코드

export function rating(voyage, history) {
    return createRating(voyage, history).value;
}

function createRating(voyage, history) {
    if (voyage.zone === "china" && history.some((v) => "china" === v.znoe))
        return new ExperiencedChinaRating(voyage, rating);
    else return new Rating(voyage, history);
}

class Rating {
    constructor(voyage, history) {
        this.voyage = voyage;
        this.history = history;
    }

    get value() {
        const vpf = this.voyageProfitFactor;
        const vr = this.voyageRisk;
        const chr = this.captainHistoryRisk;
        if (vpf * 3 > vr + chr * 2) return "A";
        else return "B";
    }

    get voyageRisk() {
        let result = 1;
        if (this.voyage.length > 4) result += 2;
        if (this.voyage.length > 8) result += this.voyage.length - 8;
        if (["china", "east-indies"].includes(this.voyage.zone)) result += 4;
        return Math.max(result, 0);
    }

    get captainHistoryRisk() {
        let result = 1;
        if (this.history.length < 5) result += 4;
        result += this.history.filter((v) => v.profit < 0).length;
        return Math.max(result, 0);
    }

    get voyageProfitFactor() {
        let result = 2;
        if (this.voyage.zone === "china") result += 1;
        if (this.voyage.zone === "east-indies") result += 1;
        result += this.hisoryLengthFacotr;
        result += this.voyageLengthFactor;
        return result;
    }

    get voyageLengthFactor() {
        return this.voyage.length > 14 ? -1 : 0;
    }

    get hisoryLengthFacotr() {
        return this.history.length > 8 ? 1 : 0;
    }
}

// 중국 항해 경험이 있을 때를 담당하는 다음 클래스는 기본 클래스와의 차이만 담고 있다.

class ExperiencedChinaRating extends Rating {
    get captainHistoryRisk() {
        const result = super.captainHistoryRisk - 2;
        return Math.max(result, 0);
    }

    get voyageLengthFactor() {
        let result = 0;
        if (this.voyage.length > 12) result += 1;
        if (this.voyage.length > 18) result += 1;
        return result;
    }

    get hisoryLengthFacotr() {
        return this.history.length > 10 ? 1 : 0;
    }

    get voyageProfitFactor() {
        return super.voyageProfitFactor + 3;
    }
}
