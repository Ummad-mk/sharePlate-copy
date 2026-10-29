/**
 * SharePlate - Impact Analytics Page Logic
 * Synchronizes live impact counter values and initializes Chart.js visualizations
 * (monthly rescued meals trajectory line chart and category breakdown doughnut chart).
 */

document.addEventListener('DOMContentLoaded', () => {
  // Sync dynamic impact stats from data store
  if (typeof SharePlateData !== 'undefined') {
    const stats = SharePlateData.getImpact();
    const mealsEl = document.getElementById('kpi-meals');
    const kgEl = document.getElementById('kpi-kg');
    const co2El = document.getElementById('kpi-co2');
    const ngosEl = document.getElementById('kpi-ngos');

    if (mealsEl) mealsEl.textContent = (stats.mealsSaved || 0).toLocaleString();
    if (kgEl) kgEl.textContent = (stats.kgDiverted || 0).toLocaleString() + ' kg';
    if (co2El) co2El.textContent = (stats.co2SavedKg || (stats.kgDiverted * 2.5)).toLocaleString() + ' kg';
    if (ngosEl) ngosEl.textContent = (stats.partnerNGOs || 0) + ' NGOs';
  }

  // Monthly Rescues Line Chart
  const monthlyCanvas = document.getElementById('monthlyRescuesChart');
  if (monthlyCanvas && typeof Chart !== 'undefined') {
    const ctxMonthly = monthlyCanvas.getContext('2d');
    new Chart(ctxMonthly, {
      type: 'line',
      data: {
        labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        datasets: [{
          label: 'Meals Rescued',
          data: [1200, 1850, 2400, 3100, 4200, 5800],
          borderColor: '#1F5C4A',
          backgroundColor: 'rgba(31, 92, 74, 0.1)',
          fill: true,
          tension: 0.35,
          borderWidth: 3,
          pointBackgroundColor: '#F59E0B',
          pointRadius: 5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { grid: { color: 'rgba(0,0,0,0.05)' } },
          x: { grid: { display: false } }
        }
      }
    });
  }

  // Category Breakdown Doughnut Chart
  const categoryCanvas = document.getElementById('categoryBreakdownChart');
  if (categoryCanvas && typeof Chart !== 'undefined') {
    const ctxCategory = categoryCanvas.getContext('2d');
    new Chart(ctxCategory, {
      type: 'doughnut',
      data: {
        labels: ['Cooked Banquet Meals', 'Bakery & Bread', 'Fresh Farm Produce', 'Packaged Goods'],
        datasets: [{
          data: [48, 22, 18, 12],
          backgroundColor: ['#1F5C4A', '#F59E0B', '#D95D39', '#0284C7'],
          borderWidth: 2,
          borderColor: '#FFFFFF'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { font: { family: 'Poppins', size: 12 }, padding: 16 }
          }
        }
      }
    });
  }

  // Interactive Calculator Slider
  const slider = document.getElementById('portion-calc-slider');
  const sliderVal = document.getElementById('slider-val');
  const calcCo2 = document.getElementById('calc-co2');
  const calcPeople = document.getElementById('calc-people');

  if (slider) {
    slider.addEventListener('input', () => {
      const val = parseInt(slider.value, 10);
      if (sliderVal) sliderVal.textContent = `${val} meals`;
      const annualMeals = val * 52;
      const annualCo2 = Math.round(annualMeals * 1.3);
      if (calcCo2) calcCo2.textContent = `${annualCo2.toLocaleString()} kg`;
      if (calcPeople) calcPeople.textContent = annualMeals.toLocaleString();
    });
  }
});
