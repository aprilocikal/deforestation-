// ===== CHART CONFIGURATION =====
const COLORS = {
  darkest: '#1a3a2a', dark: '#2E5741', mid: '#40916C',
  bright: '#6BBF5E', light: '#C5E8A0', pale: '#e8f5d8',
  red: '#e74c3c', orange: '#f39c12', gold: '#d4a843',
  textMuted: '#6a9472', gridLine: 'rgba(107,191,94,0.1)',
};

Chart.defaults.color = '#a3c4a8';
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.plugins.legend.labels.usePointStyle = true;
Chart.defaults.plugins.legend.labels.padding = 16;
Chart.defaults.scale.grid = { color: COLORS.gridLine };
Chart.defaults.scale.border = { color: 'rgba(107,191,94,0.2)' };

function initCharts() {
  createLineChart();
  createBarChartEra();
  createPieChart();
  createBarChart2125();
  createDonutChart();
  createGroupedBarIslands();
  createScatterPlot();
  createDualAxisBar();
  createAreaChart();
  createComparativeLine();
}

// Figure II.1 — Line Chart: Annual deforestation 2001-2025
function createLineChart() {
  const ctx = document.getElementById('chartLine');
  if (!ctx) return;
  const years = [];
  for (let y = 2001; y <= 2025; y++) years.push(y);
  const data = [
    590,710,680,720,780,810,750,690,640,600,
    520,840,580,620,930,680,480,440,400,320,
    260,250,280,261.575,433.751
  ];
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: years,
      datasets: [{
        label: 'Primary Forest Loss (thousand ha)',
        data: data,
        borderColor: COLORS.bright,
        backgroundColor: 'rgba(107,191,94,0.1)',
        fill: true,
        tension: 0.3,
        pointRadius: (c) => c.dataIndex === 24 ? 8 : c.dataIndex === 14 ? 6 : 3,
        pointBackgroundColor: (c) => c.dataIndex === 24 ? COLORS.red : c.dataIndex === 14 ? COLORS.orange : COLORS.bright,
        pointBorderColor: (c) => c.dataIndex === 24 ? COLORS.red : COLORS.bright,
        borderWidth: 2,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display: true, position: 'top' },
        tooltip: {
          callbacks: {
            label: (c) => `${c.parsed.y.toLocaleString()} thousand hectares`
          }
        }
      },
      scales: {
        y: { beginAtZero: true, title: { display: true, text: 'Thousand Hectares' } },
        x: { title: { display: true, text: 'Year' } }
      }
    }
  });
}

// Figure II.2 — Bar Chart: Average by presidential era
function createBarChartEra() {
  const ctx = document.getElementById('chartEra');
  if (!ctx) return;
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Reform Era\n(1998-2004)', 'SBY Era\n(2004-2014)', 'Jokowi Era\n(2014-2024)', 'Prabowo\n(2024-2025)'],
      datasets: [{
        label: 'Avg. Annual Deforestation (thousand ha)',
        data: [1400, 650, 420, 433.751],
        backgroundColor: [COLORS.mid, COLORS.dark, COLORS.bright, COLORS.red],
        borderColor: [COLORS.mid, COLORS.dark, COLORS.bright, COLORS.red],
        borderWidth: 1, borderRadius: 8, barPercentage: 0.6,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, title: { display: true, text: 'Thousand Hectares / Year' } }
      }
    }
  });
}

// Figure II.3 — Pie Chart: Primary drivers 2001-2016
function createPieChart() {
  const ctx = document.getElementById('chartDrivers');
  if (!ctx) return;
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Oil Palm (23%)', 'Smallholder Farming (20%)', 'Logging (15%)', 'Pulp & Paper (13%)', 'Mining (8%)', 'Fire / Other (21%)'],
      datasets: [{
        data: [23, 20, 15, 13, 8, 21],
        backgroundColor: [COLORS.red, COLORS.orange, COLORS.dark, COLORS.mid, COLORS.gold, COLORS.bright],
        borderColor: '#0d1b14', borderWidth: 2,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { position: 'right', labels: { font: { size: 11 } } }
      }
    }
  });
}

// Figure III.1 — Bar Chart: 2021-2025
function createBarChart2125() {
  const ctx = document.getElementById('chartBar2125');
  if (!ctx) return;
  const vals = [260, 250, 280, 261.575, 433.751];
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['2021', '2022', '2023', '2024', '2025'],
      datasets: [{
        label: 'Deforestation (thousand ha)',
        data: vals,
        backgroundColor: vals.map((_, i) => i === 4 ? COLORS.red : COLORS.mid),
        borderRadius: 8, barPercentage: 0.6,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: (c) => `${c.parsed.y.toLocaleString()} thousand hectares` } }
      },
      scales: { y: { beginAtZero: true, title: { display: true, text: 'Thousand Hectares' } } }
    }
  });
}

// Figure III.2 — Donut Chart: 2025 by concession type
function createDonutChart() {
  const ctx = document.getElementById('chartDonut');
  if (!ctx) return;
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Forestry Concessions (111,042 ha)', 'Mining Concessions (43,743 ha)', 'Oil Palm (37,976 ha)', 'Food/Energy Zones (78,123 ha)', 'Outside Concessions (162,867 ha)'],
      datasets: [{
        data: [111042, 43743, 37976, 78123, 162867],
        backgroundColor: [COLORS.dark, COLORS.gold, COLORS.red, COLORS.orange, COLORS.mid],
        borderColor: '#0d1b14', borderWidth: 3, cutout: '55%',
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { position: 'right', labels: { font: { size: 10 } } },
        tooltip: { callbacks: { label: (c) => `${c.parsed.toLocaleString()} hectares` } }
      }
    }
  });
}

// Figure III.4 — Grouped Bar: By island 2021-2025
function createGroupedBarIslands() {
  const ctx = document.getElementById('chartIslands');
  if (!ctx) return;
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Kalimantan', 'Sumatra', 'Papua', 'Sulawesi', 'Maluku', 'Bali & NT', 'Java'],
      datasets: [
        { label: '2021', data: [95,70,18,22,5,3,0.4], backgroundColor: 'rgba(64,145,108,0.4)', borderRadius: 4 },
        { label: '2022', data: [90,68,16,20,4,2.5,0.3], backgroundColor: 'rgba(64,145,108,0.6)', borderRadius: 4 },
        { label: '2023', data: [100,75,20,25,5,3,0.5], backgroundColor: COLORS.mid, borderRadius: 4 },
        { label: '2024', data: [110,85,17,28,5.5,3.5,0.41], backgroundColor: COLORS.bright, borderRadius: 4 },
        { label: '2025', data: [158.283,144.15,77.678,39.685,7.527,4.209,2.221], backgroundColor: COLORS.red, borderRadius: 4 },
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'top' } },
      scales: { y: { beginAtZero: true, title: { display: true, text: 'Thousand Hectares' } } }
    }
  });
}

// Figure III.6 — Scatter: Deforestation increase vs casualties
function createScatterPlot() {
  const ctx = document.getElementById('chartScatter');
  if (!ctx) return;
  new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'Provinces',
        data: [
          { x: 1034, y: 380, label: 'W. Sumatra' },
          { x: 426, y: 520, label: 'Aceh' },
          { x: 281, y: 304, label: 'N. Sumatra' },
          { x: 120, y: 45, label: 'S. Sulawesi' },
          { x: 80, y: 20, label: 'E. Java' },
          { x: 348, y: 12, label: 'Papua' },
          { x: 50, y: 8, label: 'C. Kalimantan' },
        ],
        backgroundColor: COLORS.red,
        pointRadius: 10,
        pointHoverRadius: 14,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (c) => `${c.raw.label}: +${c.raw.x}% deforestation, ${c.raw.y} casualties`
          }
        }
      },
      scales: {
        x: { title: { display: true, text: '% Deforestation Increase vs 2024' } },
        y: { title: { display: true, text: 'Disaster Casualties' } }
      }
    }
  });
}

// Figure III.7 — Dual-Axis: BNPB budget vs disaster frequency
function createDualAxisBar() {
  const ctx = document.getElementById('chartDualAxis');
  if (!ctx) return;
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['2022', '2023', '2024', '2025'],
      datasets: [
        {
          label: 'BNPB Budget (Trillion Rp)',
          data: [3.8, 4.5, 4.92, 2.01],
          backgroundColor: COLORS.mid, borderRadius: 8,
          yAxisID: 'y', barPercentage: 0.5,
        },
        {
          label: 'Disaster Events',
          data: [2400, 2800, 2900, 3176],
          type: 'line',
          borderColor: COLORS.red, backgroundColor: 'rgba(231,76,60,0.1)',
          fill: true, tension: 0.3, pointRadius: 6,
          pointBackgroundColor: COLORS.red, yAxisID: 'y1',
        }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'top' } },
      scales: {
        y: { beginAtZero: true, position: 'left', title: { display: true, text: 'Budget (Trillion Rp)' } },
        y1: { beginAtZero: true, position: 'right', title: { display: true, text: 'Disaster Events' }, grid: { drawOnChartArea: false } }
      }
    }
  });
}

// Figure III.8 — Area Chart: Agrarian conflicts
function createAreaChart() {
  const ctx = document.getElementById('chartArea');
  if (!ctx) return;
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['2021', '2022', '2023', '2024', '2025'],
      datasets: [{
        label: 'Agrarian Conflicts',
        data: [200, 230, 244, 295, 341],
        fill: true,
        backgroundColor: 'rgba(107,191,94,0.15)',
        borderColor: COLORS.bright, borderWidth: 2,
        tension: 0.4, pointRadius: 6,
        pointBackgroundColor: (c) => c.dataIndex === 4 ? COLORS.red : COLORS.bright,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: true, position: 'top' } },
      scales: { y: { beginAtZero: true, title: { display: true, text: 'Number of Conflicts' } } }
    }
  });
}

// Figure III.9 — Comparative Line: Indonesia vs Brazil
function createComparativeLine() {
  const ctx = document.getElementById('chartCompare');
  if (!ctx) return;
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
      datasets: [
        {
          label: 'Indonesia',
          data: [320, 260, 250, 280, 261.575, 433.751],
          borderColor: COLORS.red, backgroundColor: 'rgba(231,76,60,0.1)',
          fill: true, tension: 0.3, pointRadius: 5, borderWidth: 2,
        },
        {
          label: 'Brazil',
          data: [830, 780, 720, 680, 652, 579.6],
          borderColor: COLORS.bright, backgroundColor: 'rgba(107,191,94,0.1)',
          fill: true, tension: 0.3, pointRadius: 5, borderWidth: 2,
        }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'top' } },
      scales: {
        y: { beginAtZero: true, title: { display: true, text: 'Thousand Hectares' } }
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', initCharts);
