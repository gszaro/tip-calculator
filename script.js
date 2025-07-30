const billInput = document.getElementById('bill');
const customTipInput = document.getElementById('custom-tip');
const peopleInput = document.getElementById('people');
const tipButtons = document.querySelectorAll('[data-tip]');
const tipAmountDisplay = document.getElementById('tip-amount');
const totalPerPersonDisplay = document.getElementById('total-per-person');
const totalDisplay = document.getElementById('total');
const resetBtn = document.getElementById('reset');

let selectedTip = 0;

// Attach tip button handlers
tipButtons.forEach(button => {
  button.addEventListener('click', () => {
    selectedTip = parseFloat(button.dataset.tip);
    customTipInput.value = ''; // Clear custom if a preset is clicked
    calculate();
  });
});

// Custom tip input
customTipInput.addEventListener('input', () => {
  selectedTip = parseFloat(customTipInput.value) || 0;
  calculate();
});

// Main calculation logic
function calculate() {
  const bill = parseFloat(billInput.value);
  const people = parseInt(peopleInput.value);

  if (isNaN(bill) || bill <= 0 || isNaN(people) || people <= 0) {
    tipAmountDisplay.textContent = '0.00';
    totalPerPersonDisplay.textContent = '0.00';
    totalDisplay.textContent = '0.00';
    return;
  }

  const tipTotal = (bill * selectedTip) / 100;
  const total = bill + tipTotal;
  const perPerson = total / people;
  const tipPerPerson = tipTotal / people;

  tipAmountDisplay.textContent = tipPerPerson.toFixed(2);
  totalPerPersonDisplay.textContent = perPerson.toFixed(2);
  totalDisplay.textContent = total.toFixed(2);
}

// Recalculate on all input changes
[billInput, peopleInput].forEach(input =>
  input.addEventListener('input', calculate)
);

// Reset button
resetBtn.addEventListener('click', () => {
  billInput.value = '';
  customTipInput.value = '';
  peopleInput.value = 1;
  selectedTip = 0;
  tipAmountDisplay.textContent = '0.00';
  totalPerPersonDisplay.textContent = '0.00';
  totalDisplay.textContent = '0.00';
});
