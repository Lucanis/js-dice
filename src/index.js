import _ from 'lodash';
import {throwDice, throwExplodingDice, throwMultipleExplodingDice} from './dice';
import {extractDice} from './parseDice';

document.getElementById('freeDice').addEventListener('keyup', parseDice.bind(null, 'free'));

function parseDice(type, event) {
  if (event.keyCode === 13 && event.target.value) {
    const query = type === 'free' ? event.target.value : event.target.value + type;
    const {number, sides, isExplosive, explosiveLimit, modifier, modifierNumber} = extractDice(query);
    console.log(isExplosive);
    const dice = isExplosive ? throwMultipleExplodingDice(number, sides, explosiveLimit) : throwDice(number, sides);
    console.log(dice);
    displayDiceResults(Object.assign({}, dice, {modifier, modifierNumber}));
  }
}


function formatResults(dice) {
  const {number, sides, results, modifier, modifierNumber} = dice;
  let total =  _.sum(results);
  const formattedResults = results.reduce((acc, next) => `${acc} + ${next}`);
  const baseString = `rolled ${number}d${sides} => ${results.length > 1 ? formattedResults + ' =' : ''} <span class="total">${total}</span>`;
  if (modifier && modifierNumber) {
    return `${baseString} ${modifier} ${modifierNumber} = ${total + parseFloat(modifier + modifierNumber)}`
  }
  return baseString;
}

function displayDiceResults(dice) {
  const el = document.createElement('div');
  el.innerHTML = formatResults(dice);
  document.getElementById('results').appendChild(el);
}
