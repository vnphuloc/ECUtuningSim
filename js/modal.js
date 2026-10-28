export function openModal(cellInfo) {
    const { mapName, rpm, load, value, explanations } = cellInfo;

    // 1. Cập nhật thông số kỹ thuật (Stats)
    document.getElementById('modal-rpm').textContent = rpm;
    document.getElementById('modal-load').textContent = load;
    document.getElementById('modal-value').textContent = value;
    document.getElementById('modal-title').textContent = `${mapName} - Chi tiết ô nhớ`;

    // 2. Cập nhật nội dung giải thích bằng tiếng Việt (Dynamic Text)
    document.getElementById('desc-concept').textContent = explanations.concept || 'Nội dung đang cập nhật...';
    
    // Thay thế các biến động vào chuỗi ý nghĩa
    let meaningText = explanations.meaning || '';
    meaningText = meaningText.replace('{VALUE}', value).replace('{RPM}', rpm).replace('{LOAD}', load);
    document.getElementById('desc-meaning').textContent = meaningText || 'Nội dung đang cập nhật...';
    
    document.getElementById('desc-impact').textContent = explanations.impact || 'Nội dung đang cập nhật...';
    document.getElementById('desc-theory').textContent = explanations.theory || 'Nội dung đang cập nhật...';

    // 3. Hiển thị Modal
    const modal = document.getElementById('explanation-modal');
    modal.style.display = 'block';
}

// Thiết lập logic đóng Modal khi click ra ngoài hoặc bấm nút X
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('explanation-modal');
    const closeBtn = document.getElementById('close-modal');

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
