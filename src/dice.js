import _ from 'lodash';

export function roll(number, sides, compact = false) {
  const results =  _.times(number, _.partial(_.random, 1, sides, false));
  if (compact) {
    return results;
  }
  return {
    number,
    sides,
    results
  }
}
export function explode(dice, limit, multiple = false){
  if (dice.results.length === 0) {
    return dice;
  };
  const {number, sides, results} = dice;
  const exploding = results.filter(d => d >= limit);
  let exploded;;
  if (multiple) {
    exploded = explode(roll(exploding.length, sides), limit, multiple);
  } else {
    exploded = roll(exploding.length, sides);
  }
  return Object.assign({}, dice, {results: dice.results.concat(exploded.results)});
}

export function throwDice(number, sides, modifier = val => val) {
  return modifier(roll(number, sides));
}
export function throwExplodingDice(number, sides, limit, modifier = val => val) {
  return modifier(explode(roll(number, sides), limit, false));
}
export function throwMultipleExplodingDice(number, sides, limit, modifier = val => val) {
  return modifier(explode(roll(number, sides), limit, true));
}

export function prettyConsoleThrow(throwResult) {
  const {number, sides, results} = throwResult;
  const total =  _.sum(results);
  console.log(`rolled ${number}d${sides}: ${results} = ${total}`)
}
