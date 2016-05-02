import _ from 'lodash';
import {throwDice} from './dice';
import {extractDice} from './parseDice';

document.getElementById('freeDice').addEventListener('keyup', parseDice.bind(null, 'free'));
document.getElementById('d4').addEventListener('keyup', parseDice.bind(null, 'd4'));
document.getElementById('d6').addEventListener('keyup', parseDice.bind(null, 'd6'));
document.getElementById('d8').addEventListener('keyup', parseDice.bind(null, 'd8'));
document.getElementById('d10').addEventListener('keyup', parseDice.bind(null, 'd10'));
document.getElementById('d12').addEventListener('keyup', parseDice.bind(null, 'd12'));
document.getElementById('d100').addEventListener('keyup', parseDice.bind(null, 'd100'));

function parseDice(type, event) {
  if (event.keyCode === 13 && event.target.value) {
    const query = type === 'free' ? event.target.value : event.target.value + type;
    const {number, sides, modifier, modifierNumber} = extractDice(query);
    const dice = throwDice(number, sides);
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
