import { openModal } from './modal.js';

// Calculate standard ECU Heatmap color: Green (Min) -> Yellow (Mid) -> Red (Max)
function getHeatmapColor(value, min, max) {
    if (max === min) return `rgb(100, 255, 100)`; // Default green if map is entirely flat

    // Normalize value between 0 and 1
    const ratio = (value - min) / (max - min);
    
    let r, g;
    const b = 50; // Keep blue low for standard warm scale
    
    if (ratio < 0.5) {
        // Transition: Green (0, 200, 50) to Yellow (255, 255, 50)
        r = Math.round(255 * (ratio * 2));
        g = 200 + Math.round(55 * (ratio * 2)); 
    } else {
        // Transition: Yellow (255, 255, 50) to Red (255, 50, 50)
        r = 255;
        g = 255 - Math.round(205 * ((ratio - 0.5) * 2));
    }
    
    return `rgb(${r}, ${g}, ${b})`;
}

export function renderTable(data) {
    const table = document.getElementById('ecu-table');
    table.innerHTML = ''; // Clear existing table

    const { xAxis, yAxis, zData, mapName, explanations } = data;
    
    // 1. Find Min and Max globally for accurate heatmap scaling
    const flatData = zData.flat();
    const minVal = Math.min(...flatData);
    const maxVal = Math.max(...flatData);

    // 2. Build Table Header (X-Axis: RPM)
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    const cornerCell = document.createElement('th');
    cornerCell.textContent = 'Load \\ RPM';
    headerRow.appendChild(cornerCell);

    xAxis.forEach(rpm => {
        const th = document.createElement('th');
        th.textContent = rpm;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // 3. Build Table Body (Y-Axis: Load + Z-Data Cells)
    const tbody = document.createElement('tbody');
    
    yAxis.forEach((load, rowIndex) => {
        const tr = document.createElement('tr');
        
        // Y-Axis label cell
        const yCell = document.createElement('td');
        yCell.textContent = load;
        tr.appendChild(yCell);

        // Z-Data value cells
        zData[rowIndex].forEach((val, colIndex) => {
            const td = document.createElement('td');
            td.textContent = val;
            
            // Apply dynamic inline heatmap color
            td.style.backgroundColor = getHeatmapColor(val, minVal, maxVal);
            td.style.color = '#000'; // Black text ensures readability on bright heatmap background

            // Bind click event to trigger educational modal
            td.addEventListener('click', () => {
                openModal({
                    mapName: mapName,
                    rpm: xAxis[colIndex],
                    load: load,
                    value: val,
                    explanations: explanations
                });
            });

            tr.appendChild(td);
        });
        
        tbody.appendChild(tr);
    });
    
    table.appendChild(tbody);
}