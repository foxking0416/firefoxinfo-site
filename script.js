document.addEventListener('DOMContentLoaded', () => {
    const carouselTrack = document.querySelector('.carousel-track');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const featureItems = document.querySelectorAll('.feature-item');
    const indicatorsContainer = document.querySelector('.carousel-indicators'); // 新增：獲取指示器容器
    let currentIndex = 0;
    let startX; // 用於記錄觸摸開始時的 X 座標
    let endX;   // 用於記錄觸摸結束時的 X 座標

    if (carouselTrack && prevButton && nextButton && featureItems.length > 0 && indicatorsContainer) {

        // 計算單個輪播項目的完整寬度，包含 padding 和 border
        const calculateItemFullWidth = () => {
            if (featureItems.length === 0) return 0;
            return featureItems[0].getBoundingClientRect().width;
        };

        // 更新輪播位置的函數
        const updateCarouselPosition = () => {
            const itemFullWidth = calculateItemFullWidth();
            carouselTrack.style.transform = `translateX(-${currentIndex * itemFullWidth}px)`;
            updateIndicators(); // 新增：更新指示器狀態
        };

        // 新增：生成指示器點的函數
        const createIndicators = () => {
            indicatorsContainer.innerHTML = ''; // 清空現有指示器
            featureItems.forEach((_, index) => {
                const indicator = document.createElement('div');
                indicator.classList.add('indicator');
                indicator.dataset.index = index; // 儲存對應的索引
                indicator.addEventListener('click', () => {
                    currentIndex = index;
                    updateCarouselPosition();
                });
                indicatorsContainer.appendChild(indicator);
            });
        };

        // 新增：更新指示器活躍狀態的函數
        const updateIndicators = () => {
            document.querySelectorAll('.indicator').forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        };

        // 監聽視窗大小改變事件，重新計算位置
        window.addEventListener('resize', () => {
            updateCarouselPosition();
            // 在 resize 時重新生成指示器，確保與項目數量一致
            // 如果項目數量是固定的，這裡可以不用重新生成，只更新狀態
            // 如果項目數量會動態變化，則需要重新生成
            // 這裡假設項目數量是固定的，所以只更新位置和指示器狀態
        });

        const goToNextSlide = () => {
            currentIndex = (currentIndex + 1) % featureItems.length;
            updateCarouselPosition();
        };

        const goToPrevSlide = () => {
            currentIndex = (currentIndex - 1 + featureItems.length) % featureItems.length;
            updateCarouselPosition();
        };

        nextButton.addEventListener('click', goToNextSlide);
        prevButton.addEventListener('click', goToPrevSlide);

        // --- 手勢滑動邏輯 ---
        const carouselContainer = document.querySelector('.carousel-container'); // 獲取輪播的父容器來監聽觸控

        carouselContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX; // 記錄觸摸開始時的 X 座標
        });

        carouselContainer.addEventListener('touchmove', (e) => {
            // 防止頁面滾動，僅在需要時使用，可能會影響使用者體驗
            // e.preventDefault();
        });

        carouselContainer.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX; // 記錄觸摸結束時的 X 座標
            const sensitivity = 50; // 滑動的敏感度，移動超過 50px 算一次有效滑動

            if (startX - endX > sensitivity) { // 從右往左滑 (下一頁)
                goToNextSlide();
            } else if (endX - startX > sensitivity) { // 從左往右滑 (上一頁)
                goToPrevSlide();
            }
        });
        // --- 手勢滑動邏輯結束 ---

        // 初始化時：生成指示器，並顯示正確的位置
        createIndicators(); // 先生成指示器
        updateCarouselPosition(); // 再更新位置，也會觸發指示器狀態更新

        // Optional: Auto-play carousel
         setInterval(goToNextSlide, 6000); // Change slide every 5 seconds
    } else {
        console.warn("Carousel elements or indicators container not found, or no feature items.");
        if (prevButton) prevButton.style.display = 'none';
        if (nextButton) nextButton.style.display = 'none';
        if (indicatorsContainer) indicatorsContainer.style.display = 'none'; // 如果沒有輪播元素，也隱藏指示器
    }

    // --- 漢堡菜單邏輯 (只新增這部分) ---
    const hamburgerToggle = document.querySelector('.hamburger-menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('#main-nav ul li a'); // 獲取所有導航連結

    if (hamburgerToggle && mainNav) {
        hamburgerToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active'); // 切換 nav 的 active 類別
            hamburgerToggle.classList.toggle('active'); // 切換漢堡按鈕的 active 類別 (用於動畫)
            document.body.classList.toggle('no-scroll'); // 防止背景滾動
        });

        // 點擊導航連結後關閉菜單
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active'); // 移除 nav 的 active 類別
                hamburgerToggle.classList.remove('active'); // 移除漢堡按鈕的 active 類別
                document.body.classList.remove('no-scroll'); // 恢復背景滾動
            });
        });

        // 當螢幕尺寸改變時，如果菜單是打開的，強制關閉它 (避免從手機模式切換到桌面模式時菜單依然打開)
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) { // 假設 768px 是手機和桌面模式的斷點
                mainNav.classList.remove('active');
                hamburgerToggle.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    }
});