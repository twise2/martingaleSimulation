const maxTosses = 10;
const odds = 5;
let startingValueCents = 100;

const getEvForBet = (betPercent) => {
  let potentialEndStates = [];
  function calculateEndState(currentValueCents, currentToss = 0) {
    //if we hit our end state
    if (currentToss > maxTosses || currentValueCents <= 0) {
      return potentialEndStates.push(currentValueCents);
    }
    let betValue = currentValueCents * betPercent;
    const flipHeadsValue = currentValueCents + betValue * odds;
    const flipsTailsValue = currentValueCents - betValue;
    //calculate next head flip
    calculateEndState(flipHeadsValue, currentToss + 1);
    //calculate next tails flip
    calculateEndState(flipsTailsValue, currentToss + 1);
  }
  calculateEndState(startingValueCents);
  //average the end states
  const expectedEV =
    potentialEndStates.reduce((a, b) => a + b) / potentialEndStates.length;
  return { potentialEndStates, expectedEV, betPercent };
};

betPercentages = Array.from(Array(100).keys()).map((b) => b * 0.01);

results = betPercentages
  .map((bet) => getEvForBet(bet))
  .sort((a, b) => b.expectedEV - a.expectedEV);

results.forEach((res) => {
  console.log(
    `EV for betting ${
      res.betPercent * 100
    }%  of ${startingValueCents} on ${maxTosses} tosses on ${odds} to 1 odds : ${
      res.expectedEV
    }`,
  );
  //uncomment to check all states for sanity
  //console.log("End States of bet", res.potentialEndStates);
});
