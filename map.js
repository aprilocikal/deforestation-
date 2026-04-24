// ===== INTERACTIVE INDONESIA DEFORESTATION MAP =====

const PROVINCE_DATA = [
  // Sumatra
  { name: "Aceh", lat: 4.695, lng: 96.749, deforest: 28500, change: "+426%", island: "Sumatra", disaster: true },
  { name: "North Sumatra", lat: 2.5, lng: 99.0, deforest: 32000, change: "+281%", island: "Sumatra", disaster: true },
  { name: "West Sumatra", lat: -0.739, lng: 100.800, deforest: 18500, change: "+1,034%", island: "Sumatra", disaster: true },
  { name: "Riau", lat: 0.293, lng: 101.706, deforest: 22000, change: "+85%", island: "Sumatra" },
  { name: "Jambi", lat: -1.61, lng: 103.61, deforest: 12500, change: "+62%", island: "Sumatra" },
  { name: "South Sumatra", lat: -3.319, lng: 104.914, deforest: 14200, change: "+48%", island: "Sumatra" },
  { name: "Bengkulu", lat: -3.792, lng: 102.259, deforest: 5800, change: "+55%", island: "Sumatra" },
  { name: "Lampung", lat: -4.558, lng: 105.405, deforest: 7200, change: "+40%", island: "Sumatra" },
  // Kalimantan
  { name: "West Kalimantan", lat: -0.132, lng: 109.688, deforest: 38500, change: "+72%", island: "Kalimantan" },
  { name: "Central Kalimantan", lat: -1.682, lng: 113.383, deforest: 42000, change: "+58%", island: "Kalimantan" },
  { name: "South Kalimantan", lat: -3.092, lng: 115.283, deforest: 18300, change: "+45%", island: "Kalimantan" },
  { name: "East Kalimantan", lat: 1.215, lng: 116.419, deforest: 35500, change: "+68%", island: "Kalimantan" },
  { name: "North Kalimantan", lat: 3.073, lng: 116.904, deforest: 24000, change: "+80%", island: "Kalimantan" },
  // Sulawesi
  { name: "North Sulawesi", lat: 0.856, lng: 124.844, deforest: 5200, change: "+35%", island: "Sulawesi" },
  { name: "Central Sulawesi", lat: -1.430, lng: 121.445, deforest: 11500, change: "+52%", island: "Sulawesi" },
  { name: "South Sulawesi", lat: -3.668, lng: 119.974, deforest: 9800, change: "+40%", island: "Sulawesi" },
  { name: "Southeast Sulawesi", lat: -4.145, lng: 122.175, deforest: 8200, change: "+48%", island: "Sulawesi" },
  { name: "West Sulawesi", lat: -2.844, lng: 119.232, deforest: 4985, change: "+30%", island: "Sulawesi" },
  // Papua
  { name: "Papua", lat: -4.269, lng: 138.080, deforest: 35000, change: "+348%", island: "Papua", critical: true },
  { name: "West Papua", lat: -1.338, lng: 133.174, deforest: 22000, change: "+290%", island: "Papua", critical: true },
  { name: "South Papua", lat: -6.5, lng: 139.5, deforest: 12678, change: "+220%", island: "Papua", critical: true },
  { name: "Highland Papua", lat: -3.8, lng: 137.0, deforest: 8000, change: "+180%", island: "Papua" },
  // Java
  { name: "West Java", lat: -6.921, lng: 107.607, deforest: 850, change: "+320%", island: "Java" },
  { name: "Central Java", lat: -7.150, lng: 110.140, deforest: 620, change: "+410%", island: "Java" },
  { name: "East Java", lat: -7.536, lng: 112.238, deforest: 751, change: "+480%", island: "Java" },
  // Maluku & Others
  { name: "Maluku", lat: -3.238, lng: 130.145, deforest: 4500, change: "+55%", island: "Maluku" },
  { name: "North Maluku", lat: 1.570, lng: 127.808, deforest: 3027, change: "+42%", island: "Maluku" },
  { name: "NTB", lat: -8.650, lng: 117.361, deforest: 1800, change: "+35%", island: "Bali & NT" },
  { name: "NTT", lat: -8.657, lng: 121.079, deforest: 2409, change: "+50%", island: "Bali & NT" },
];

function getColor(val) {
  if (val >= 35000) return '#b71c1c';
  if (val >= 20000) return '#e53935';
  if (val >= 10000) return '#ff8f00';
  if (val >= 5000) return '#f9a825';
  if (val >= 2000) return '#c0ca33';
  return '#66bb6a';
}

function getRadius(val) {
  if (val >= 35000) return 22;
  if (val >= 20000) return 18;
  if (val >= 10000) return 14;
  if (val >= 5000) return 11;
  if (val >= 2000) return 8;
  return 6;
}

function initMap() {
  const mapEl = document.getElementById('indonesiaMap');
  if (!mapEl) return;

  const map = L.map('indonesiaMap', {
    center: [-2.5, 118.0],
    zoom: 5,
    minZoom: 4,
    maxZoom: 8,
    zoomControl: false,
    attributionControl: false,
    scrollWheelZoom: true,
  });

  // Light themed tile layer
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map);

  L.control.zoom({ position: 'bottomright' }).addTo(map);

  // Attribution
  L.control.attribution({ position: 'bottomleft', prefix: false })
    .addAttribution('Data: Auriga Nusantara STADI 2025 | Map: CARTO')
    .addTo(map);

  // Add province markers
  PROVINCE_DATA.forEach(prov => {
    const circle = L.circleMarker([prov.lat, prov.lng], {
      radius: getRadius(prov.deforest),
      fillColor: getColor(prov.deforest),
      color: '#fff',
      weight: 1.5,
      opacity: 0.9,
      fillOpacity: 0.75,
      className: 'deforest-marker'
    }).addTo(map);

    // Pulse animation for disaster zones
    if (prov.disaster) {
      const pulse = L.circleMarker([prov.lat, prov.lng], {
        radius: getRadius(prov.deforest) + 8,
        fillColor: 'transparent',
        color: '#e74c3c',
        weight: 2,
        opacity: 0.6,
        className: 'pulse-ring'
      }).addTo(map);
    }

    // Tooltip
    const tooltipContent = `
      <div class="map-tooltip">
        <div class="map-tt-name">${prov.name}</div>
        <div class="map-tt-island">${prov.island}</div>
        <div class="map-tt-row">
          <span class="map-tt-label">Deforestation 2025</span>
          <span class="map-tt-val">${prov.deforest.toLocaleString()} ha</span>
        </div>
        <div class="map-tt-row">
          <span class="map-tt-label">Change vs 2024</span>
          <span class="map-tt-change">${prov.change}</span>
        </div>
        ${prov.disaster ? '<div class="map-tt-alert">⚠ Disaster Zone — Nov 2025</div>' : ''}
        ${prov.critical ? '<div class="map-tt-critical">🔴 Critical: Last Primary Forest Frontier</div>' : ''}
      </div>
    `;

    circle.bindTooltip(tooltipContent, {
      direction: 'top',
      className: 'custom-tooltip',
      offset: [0, -10],
      opacity: 1,
    });

    // Hover effects
    circle.on('mouseover', function() {
      this.setStyle({ fillOpacity: 1, weight: 3, radius: getRadius(prov.deforest) + 4 });
    });
    circle.on('mouseout', function() {
      this.setStyle({ fillOpacity: 0.75, weight: 1.5, radius: getRadius(prov.deforest) });
    });
  });





}

document.addEventListener('DOMContentLoaded', initMap);
