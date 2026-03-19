// Wacht tot de hele pagina geladen is
document.addEventListener('DOMContentLoaded', () => {
  const rangeInput = document.getElementById('experience');
  const displayValue = document.getElementById('val');

  // Check of de elementen wel op deze pagina bestaan
  if (rangeInput && displayValue) {
      rangeInput.addEventListener('input', () => {
          displayValue.innerText = rangeInput.value;
      });
  }
});