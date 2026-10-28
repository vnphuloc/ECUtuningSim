export function render3DGraph(data) {
    const { xAxis, yAxis, zData, mapName } = data;

    // Dữ liệu mảng 2D cho trục Z (Z-axis) tương ứng với tọa độ (X: RPM, Y: Load)
    const plotData = [{
        z: zData,
        x: xAxis,
        y: yAxis,
        type: 'surface',
        // Dải màu bám sát heatmap của ECU: Xanh lá (Min) -> Vàng (Mid) -> Đỏ (Max)
        colorscale: [
            [0, 'rgb(100, 255, 100)'],
            [0.5, 'rgb(255, 255, 50)'],
            [1, 'rgb(255, 50, 50)']
        ],
        showscale: false // Ẩn thanh thang màu bên cạnh để tối ưu không gian
    }];

    const layout = {
        title: {
            text: `${mapName} - Đồ thị 3D Surface`,
            font: { color: '#333', size: 16 }
        },
        autosize: true,
        margin: { l: 0, r: 0, b: 10, t: 40 },
        paper_bgcolor: 'transparent',
        scene: {
            xaxis: { title: 'RPM', titlefont: { color: '#333' } },
            yaxis: { title: 'Load (TPS/MAP)', titlefont: { color: '#333' } },
            zaxis: { title: 'Value', titlefont: { color: '#333' } },
            camera: {
                eye: { x: -1.5, y: -1.5, z: 1.2 } // Góc nhìn mặc định dễ quan sát
            }
        }
    };

    const config = { 
        responsive: true,
        displayModeBar: false // Ẩn thanh công cụ Plotly để giao diện gọn gàng
    };

    Plotly.newPlot('graph3d-container', plotData, layout, config);
}
