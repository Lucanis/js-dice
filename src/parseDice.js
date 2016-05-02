const regex = /(\d*)d(\d*)(?:(\+|\-)(\d+))?/;

export function extractDice(str) {
  const result = str.match(regex);
  if (!result){
    console.log('not a valid string');
    return;
  }
  return {
    number: result[1],
    sides: result[2],
    modifier: result[3],
    modifierNumber: result[4]
  }
}
