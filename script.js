const ANTON = 182;
const possibleScores = [100, 75, 50, 25, 20, 10, 5, 2];
const scoreTexts = {
    100: ['Goal'],
    75: ['Epic save'],
    50: ['Assist', 'Save'],
    25: ['Overtime goal', 'Hat trick', 'Playmaker', 'Savior'],
    20: ['Aerial goal', 'Backwards goal', 'Bicycle goal', 'Long goal', 'Turtle goal', 'Clear ball', 'Extermination'],
    10: ['Center ball', 'Shot on goal'],
    5: ['Low fives'],
    2: ['Touch the ball']
}

const isNumberKey = (evt) =>
      {
         var charCode = (evt.which) ? evt.which : event.keyCode
         if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;

         return true;
      }

const checkNumber = () => {
    const number = document.getElementById("inputBox").value;
    const result = document.getElementById("answer");
    const requiredScore = canAddUpToTarget(number);
    if(!requiredScore) {
        result.innerHTML = "Impossible :("
        return;
    }
    result.innerHTML = formatScore(requiredScore);
}

const formatScore = (score) => {
    return score.map(s => `<b>${s}:</b> ${scoreTexts[s]}`).join('<br>');
}

const canAddUpToTarget = baseValue => {
    const targetNumber = ANTON - baseValue;
    const scoreStack = [];
    let currentNumber = possibleScores[0];
    while(areTherePossibilities(currentNumber, scoreStack)) {
        if(foundMatchingSequence(scoreStack, currentNumber, targetNumber)) {
            scoreStack.push(currentNumber);
            return scoreStack;
        }
        if(isLowerThanTargetNumber(scoreStack, currentNumber, targetNumber)) {
            scoreStack.push(currentNumber);
        } else {
            currentNumber = getNextNumberInStack(currentNumber);
            if(typeof currentNumber === 'undefined') {
                topOfStack = scoreStack.pop();
                currentNumber = getNextNumberInStack(topOfStack);
            }
        }
    }
    return false;
}

const foundMatchingSequence = (scoreStack, currentNumber, targetNumber) =>
    scoreStack.reduce((c, a) => c + a, 0) + currentNumber === targetNumber;

const isLowerThanTargetNumber = (scoreStack, currentNumber, targetNumber) => 
    scoreStack.reduce((c, a) => c + a, 0) + currentNumber < targetNumber;

const areTherePossibilities = (currentNumber, scoreStack) => typeof currentNumber !== 'undefined' || scoreStack.length;

function getAllSmallerNumbers(number) {
    return possibleScores.filter(n => n <= number);
}

function getNextNumberInStack(number) {
    if(typeof number === 'undefined') {
        return undefined;
    }
    return possibleScores[possibleScores.indexOf(number) + 1];
}
