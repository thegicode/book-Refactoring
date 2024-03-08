/**
 * 11.9 Replace Function with Command
 * 건강보험 애플리케이션에서 사용하는 점수 계산 함수
 */

{
    function score(candidate, medicalExam, scoringGuide) {
        let result = 0;
        let healthLevel = 0;
        let highMedicalFlag = false;

        if (medicalExam.isSmoker) {
            healthLevel += 10;
            highMedicalFlag = true;
        }

        let critificationGrande = "regular";

        if (scoringGuide.stateWithLowCertification(candidate.originState)) {
            critificationGrande = "low";
            result -= 5;
        }

        // 비슷한 코드가 한참 이어짐
        result -= Math.max(healthLevel - 5, 0);
        return result;
    }
}

/**
 * 1. 시작은 빈 클래스를 만들고 이 함수를 그 클래스로 옮기(8.1절)는 일부터다.
 */
{
    function score(candidate, medicalExam, scoringGuide) {
        return new Scorer().execute(candidate, medicalExam, scoringGuide);
    }

    class Scorer {
        execute(candidate, medicalExam, scoringGuide) {
            let result = 0;
            let healthLevel = 0;
            let highMedicalFlag = false;

            if (medicalExam.isSmoker) {
                healthLevel += 10;
                highMedicalFlag = true;
            }

            let critificationGrande = "regular";

            if (scoringGuide.stateWithLowCertification(candidate.originState)) {
                critificationGrande = "low";
                result -= 5;
            }

            // 비슷한 코드가 한참 이어짐
            result -= Math.max(healthLevel - 5, 0);
            return result;
        }
    }
}

/**
 * 주로 나는 명령이 받는 인수들을 생성자로 옮겨서 execute() 메서드는 매개변수를 받지 않게 하는 편이다.
 */

{
    function score(candidate, medicalExam, scoringGuide) {
        return new Scorer(candidate, medicalExam, scoringGuide).execute();
    }

    class Scorer {
        constructor(candidate, medicalExam, scoringGuide) {
            this._candidate = candidate;
            this._medicalExam = medicalExam;
            this._scoringGuide = scoringGuide;
        }

        execute() {
            let result = 0;
            let healthLevel = 0;
            let highMedicalFlag = false;

            if (this._medicalExam.isSmoker) {
                healthLevel += 10;
                highMedicalFlag = true;
            }

            let critificationGrande = "regular";

            if (
                this._scoringGuide.stateWithLowCertification(
                    this._candidate.originState
                )
            ) {
                critificationGrande = "low";
                result -= 5;
            }

            // 비슷한 코드가 한참 이어짐
            result -= Math.max(healthLevel - 5, 0);
            return result;
        }
    }
}

/**
 * 더 가다듬기
 * 이상으로 함수를 명령으로 바꿔봤다.
 * 하지만 이 리팩터링의 본래 목적은 복잡한 함수를 잘게 나누는 것이다.
 * 먼저 모든 지역 변수를 필드로 바꿔야 한다.
 */

{
    function score(candidate, medicalExam, scoringGuide) {
        return new Scorer(candidate, medicalExam, scoringGuide).execute();
    }

    class Scorer {
        constructor(candidate, medicalExam, scoringGuide) {
            this._candidate = candidate;
            this._medicalExam = medicalExam;
            this._scoringGuide = scoringGuide;
        }

        execute() {
            this._result = 0;
            let healthLevel = 0;
            let highMedicalFlag = false;

            if (this._medicalExam.isSmoker) {
                healthLevel += 10;
                highMedicalFlag = true;
            }

            let critificationGrande = "regular";

            if (
                this._scoringGuide.stateWithLowCertification(
                    this._candidate.originState
                )
            ) {
                critificationGrande = "low";
                this._result -= 5;
            }

            // 비슷한 코드가 한참 이어짐
            this._result -= Math.max(healthLevel - 5, 0);
            return this._result;
        }
    }
}

/**
 * 남은 지역 변수들도 같은 방법으로 바꿔준다.
 */
{
    function score(candidate, medicalExam, scoringGuide) {
        return new Scorer(candidate, medicalExam, scoringGuide).execute();
    }

    class Scorer {
        constructor(candidate, medicalExam, scoringGuide) {
            this._candidate = candidate;
            this._medicalExam = medicalExam;
            this._scoringGuide = scoringGuide;
        }
        execute() {
            this._result = 0;
            this._healthLevel = 0;
            this._highMedicalFlag = false;

            if (this._medicalExam.isSmoker) {
                this._healthLevel += 10;
                this._highMedicalFlag = true;
            }

            this._critificationGrande = "regular";

            if (
                this._scoringGuide.stateWithLowCertification(
                    this._candidate.originState
                )
            ) {
                this._critificationGrande = "low";
                this._result -= 5;
            }

            // 비슷한 코드가 한참 이어짐
            this._result -= Math.max(this._healthLevel - 5, 0);
            return this._result;
        }
    }
}

/**
 * 이제 함수의 상태가 모두 명령 객체로 옮겨졌다.
 * 따라서 함수가 사용하던 변수나 그 유효범위에 구애받지 않고 함수 추출하기(6.1절) 같은 리팩터링을 적용할 수 있다.
 */
{
    function score(candidate, medicalExam, scoringGuide) {
        return new Scorer(candidate, medicalExam, scoringGuide).execute();
    }

    class Scorer {
        constructor(candidate, medicalExam, scoringGuide) {
            this._candidate = candidate;
            this._medicalExam = medicalExam;
            this._scoringGuide = scoringGuide;
        }

        execute() {
            this._result = 0;
            this._healthLevel = 0;
            this._highMedicalFlag = false;

            this.scoreSmoking();
            this._critificationGrande = "regular";

            if (
                this._scoringGuide.stateWithLowCertification(
                    this._candidate.originState
                )
            ) {
                this._critificationGrande = "low";
                this._result -= 5;
            }

            // 비슷한 코드가 한참 이어짐
            this._result -= Math.max(this._healthLevel - 5, 0);
            return this._result;
        }

        scoreSmoking() {
            if (this._medicalExam.isSmoker) {
                this._healthLevel += 10;
                this._highMedicalFlag = true;
            }
        }
    }
}

/**
 * 이제 명령을 중첩 함수처럼 다룰 수 있다.
 * 사실 자바스크립트에서라면 중첩 함수는 명령의 합리적인 대안이 될 수 있다.
 * 그래도 나는 여전히 명령을 사용한다.
 * 내가 명령에 더 익숙하기도 하거니와, 명령을 사용하면 (execute 외의) 서브함수들을 테스트와 디버깅에 활용할 수 있기 때문이다.
 */

// 최종코드

export function score(candidate, medicalExam, scoringGuide) {
    return new Scorer(candidate, medicalExam, scoringGuide).execute();
}

class Scorer {
    constructor(candidate, medicalExam, scoringGuide) {
        this._candidate = candidate;
        this._medicalExam = medicalExam;
        this._scoringGuide = scoringGuide;
    }

    execute() {
        this._result = 0;
        this._healthLevel = 0;
        this._highMedicalRiskFlag = false;

        this.scoreSmoking();

        this._certificationGrade = "regular";
        if (
            this._scoringGuide.stateWithLowCertification(
                this._candidate.originState
            )
        ) {
            this._certificationGrade = "low";
            this._result -= 5;
        }
        // lots more code like this
        this._result -= Math.max(this._healthLevel - 5, 0);
        return this._result;
    }

    scoreSmoking() {
        if (this._medicalExam.isSmoker) {
            this._healthLevel += 10;
            this._highMedicalRiskFlag = true;
        }
    }
}

export class ScoringGuide {
    stateWithLowCertification(state) {
        return state < 5;
    }
}
