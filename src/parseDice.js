const regex = /(\d*)d(\d*)(?:(e)+(\d*))?(?:(\+|\-)(\d+))?/;

export function extractDice(str) {
  const result = str.match(regex);
  console.log(result);
  if (!result){
    console.log('not a valid string');
    return;
  }
  return {
    number: result[1],
    sides: result[2],
    isExplosive: result[3],
    explosiveLimit: result[4],
    modifier: result[5],
    modifierNumber: result[6]
  }
}
