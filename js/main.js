import { renderTable } from './tableRenderer.js';
import { render3DGraph } from './graph3d.js';

let currentMapData = null;

// Fetch JSON data for the selected map
async function loadMapData(mapType) {
    try {
        const response = await fetch(`data/${mapType}.json`);
        if (!response.ok) throw new Error("Data not found");
        
        currentMapData = await response.json();
        
        // Update both 2D table and 3D graph
        renderTable(currentMapData);
        render3DGraph(currentMapData);
    } catch (error) {
        console.error("Error loading map data:", error);
        document.getElementById('ecu-table').innerHTML = 
            `<tr><td style="color:red; padding: 20px;">Error loading data for ${mapType}. Ensure the JSON file exists in the /data folder.</td></tr>`;
        document.getElementById('graph3d-container').innerHTML = '';
    }
}

// Initialize tab switching
function initTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            // Manage active state classes
            tabs.forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            
            // Load corresponding data
            loadMapData(e.target.dataset.map);
        });
    });
}

// Bootstrap application
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    // Load default INJ VE map on startup
    loadMapData('inj_ve');
});
