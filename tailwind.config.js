module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class', // enables dark mode toggle
  theme: {
    extend: {
      colors: {
        primary: '#4ADE80',
        secondary: '#60A5FA',
      },
    },
  },
  plugins: [],
}

// Initialization
document.getElementById('year').textContent = new Date().getFullYear();
const root = document.documentElement;
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (prefersDark) root.classList.add('dark');

document.getElementById('toggleMode').addEventListener('click', () => {
  root.classList.toggle('dark');
});

// Data storage
let data = JSON.parse(localStorage.getItem('healthmate') || '{}');
data.water = parseFloat(data.water) || 0;
data.steps = parseInt(data.steps) || 0;
data.sleep = parseFloat(data.sleep) || 0;
data.mood = data.mood || 'None';

document.getElementById('waterLog').textContent = data.water;
document.getElementById('stepsLog').textContent = data.steps;
document.getElementById('sleepLog').textContent = data.sleep;
document.getElementById('moodLog').textContent = data.mood;

// Charts
const waterChart = new Chart(document.getElementById('waterChart').getContext('2d'), {
  type: 'doughnut',
  data: { labels: ['Water Intake', 'Remaining'], datasets: [{ data: [data.water, 3 - data.water], backgroundColor: ['#34D399', '#D1FAE5'] }] },
  options: { plugins: { legend: { display: false } } }
});
const stepsChart = new Chart(document.getElementById('stepsChart').getContext('2d'), {
  type: 'doughnut',
  data: { labels: ['Steps', 'Remaining'], datasets: [{ data: [data.steps, 10000 - data.steps], backgroundColor: ['#60A5FA', '#DBEAFE'] }] },
  options: { plugins: { legend: { display: false } } }
});
const sleepChart = new Chart(document.getElementById('sleepChart').getContext('2d'), {
  type: 'doughnut',
  data: { labels: ['Sleep', 'Remaining'], datasets: [{ data: [data.sleep, 8 - data.sleep], backgroundColor: ['#A78BFA', '#EDE9FE'] }] },
  options: { plugins: { legend: { display: false } } }
});

// Save function
function save() {
  localStorage.setItem('healthmate', JSON.stringify(data));
  waterChart.data.datasets[0].data = [data.water, Math.max(0, 3 - data.water)];
  stepsChart.data.datasets[0].data = [data.steps, Math.max(0, 10000 - data.steps)];
  sleepChart.data.datasets[0].data = [data.sleep, Math.max(0, 8 - data.sleep)];
  waterChart.update();
  stepsChart.update();
  sleepChart.update();
}

// Water
document.getElementById('logWaterBtn').addEventListener('click', () => {
  let val = parseFloat(document.getElementById('waterInput').value) || 0;
  data.water = parseFloat((data.water + val).toFixed(1));
  document.getElementById('waterLog').textContent = data.water;
  document.getElementById('waterInput').value = '';
  save();
});

// Steps
document.getElementById('logStepsBtn').addEventListener('click', () => {
  let val = parseInt(document.getElementById('stepsInput').value) || 0;
  data.steps += val;
  document.getElementById('stepsLog').textContent = data.steps;
  document.getElementById('stepsInput').value = '';
  save();
});

// Sleep
document.getElementById('logSleepBtn').addEventListener('click', () => {
  let val = parseFloat(document.getElementById('sleepInput').value) || 0;
  data.sleep = parseFloat((data.sleep + val).toFixed(1));
  document.getElementById('sleepLog').textContent = data.sleep;
  document.getElementById('sleepInput').value = '';
  save();
});

// Mood with unique, captivating messages
document.getElementById('logMoodBtn').addEventListener('click', () => {
  let val = document.getElementById('moodInput').value || 'None';
  data.mood = val;
  document.getElementById('moodLog').textContent = val;
  document.getElementById('moodInput').value = '';

  const messages = {
    "😀 Happy": "🌟 Stay shining bright, you are on your way to a great day!",
    "😐 Neutral": "⚖️ Take a deep breath, today can still turn amazing.",
    "😞 Sad": "💪 It's okay to feel down, tomorrow is a new chance to rise."
  };
  document.getElementById('moodDisplay').innerHTML = `<span class="fade-in">${val} - ${messages[val] || 'Log your mood to track your emotional wellness.'}</span>`;

  save();
});

