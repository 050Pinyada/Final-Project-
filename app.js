document.addEventListener("DOMContentLoaded", () => {

    // ========================================================
    // 1. Quantity Selector (details.html)
    // ========================================================
    const qtyMinus = document.querySelector(".qty-minus");
    const qtyPlus = document.querySelector(".qty-plus");
    const qtyVal = document.querySelector(".qty-val");

    if (qtyMinus && qtyPlus && qtyVal) {
        qtyMinus.addEventListener("click", () => {
            let current = parseInt(qtyVal.textContent);
            if (current > 1) {
                qtyVal.textContent = current - 1;
            }
        });

        qtyPlus.addEventListener("click", () => {
            let current = parseInt(qtyVal.textContent);
            qtyVal.textContent = current + 1;
        });
    }

    // ========================================================
    // 2. Carousel Slider (index.html) — ปุ่มซ้าย/ขวา + Dots + Touch Swipe
    // ========================================================
    const carouselTrack = document.querySelector(".carousel-track");
    const carouselBtns = document.querySelectorAll(".carousel-btn");
    const dots = document.querySelectorAll(".carousel-dots .dot");

    if (carouselTrack) {
        // ฟังก์ชันคำนวณระยะเลื่อน 1 step = ความกว้าง 2 การ์ด
        function getScrollStep() {
            const firstCard = carouselTrack.querySelector(".carousel-card");
            if (!firstCard) return 300;
            const gap = 15;
            return (firstCard.getBoundingClientRect().width + gap) * 2;
        }

        // ปุ่มเลื่อนซ้าย/ขวา
        if (carouselBtns.length === 2) {
            const prevBtn = carouselBtns[0]; // ← (rotated arrow)
            const nextBtn = carouselBtns[1]; // →

            prevBtn.addEventListener("click", () => {
                carouselTrack.scrollBy({ left: -getScrollStep(), behavior: "smooth" });
            });

            nextBtn.addEventListener("click", () => {
                carouselTrack.scrollBy({ left: getScrollStep(), behavior: "smooth" });
            });
        }

        // Dots navigation
        if (dots.length > 0) {
            dots.forEach((dot, idx) => {
                dot.addEventListener("click", () => {
                    dots.forEach(d => d.classList.remove("active"));
                    dot.classList.add("active");
                    const step = getScrollStep();
                    carouselTrack.scrollTo({ left: idx * step, behavior: "smooth" });
                });
            });

            // อัปเดต active dot ตามตำแหน่ง scroll จริง
            carouselTrack.addEventListener("scroll", () => {
                const step = getScrollStep();
                if (step <= 0) return;
                const currentIdx = Math.round(carouselTrack.scrollLeft / step);
                const clampedIdx = Math.min(currentIdx, dots.length - 1);
                dots.forEach(d => d.classList.remove("active"));
                if (dots[clampedIdx]) dots[clampedIdx].classList.add("active");
            });
        }

        // Touch swipe support สำหรับมือถือ
        let touchStartX = 0;
        let touchEndX = 0;

        carouselTrack.addEventListener("touchstart", (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        carouselTrack.addEventListener("touchend", (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                // Swipe threshold 50px
                if (diff > 0) {
                    // Swipe ซ้าย → เลื่อนไปข้างหน้า
                    carouselTrack.scrollBy({ left: getScrollStep(), behavior: "smooth" });
                } else {
                    // Swipe ขวา → เลื่อนกลับ
                    carouselTrack.scrollBy({ left: -getScrollStep(), behavior: "smooth" });
                }
            }
        }, { passive: true });

        // คลิก Carousel Card → ไปหน้ารายละเอียดสินค้าของตัวนั้นๆ (details.html?id=X)
        carouselTrack.querySelectorAll(".carousel-card").forEach((card, idx) => {
            card.addEventListener("click", () => {
                const productId = idx + 1;
                window.location.href = "details.html?id=" + productId;
            });
        });
    }

    // ========================================================
    // 3. Contact Form Validation & Submission (contact.html)
    // ========================================================
    const contactForm = document.querySelector(".contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // ตรวจสอบ input ที่ required
            const inputs = contactForm.querySelectorAll(".form-input[required]");
            let allFilled = true;
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    allFilled = false;
                    input.style.borderColor = "#e54d42";
                    input.style.boxShadow = "0 0 0 3px rgba(229, 77, 66, 0.15)";
                } else {
                    input.style.borderColor = "";
                    input.style.boxShadow = "";
                }
            });

            if (!allFilled) {
                alert("กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน");
                return;
            }

            // ตรวจสอบ email format
            const emailInput = contactForm.querySelector("input[type='email']");
            if (emailInput && emailInput.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailInput.value)) {
                    alert("กรุณากรอกอีเมลให้ถูกต้อง (เช่น example@email.com)");
                    emailInput.style.borderColor = "#e54d42";
                    emailInput.focus();
                    return;
                }
            }

            alert("✅ ขอบคุณสำหรับข้อความ!\nทางทีมงาน 4chan Natural Scent จะติดต่อกลับโดยเร็วที่สุด 🌿");
            contactForm.reset();
            // เคลียร์ border สีแดง
            inputs.forEach(input => {
                input.style.borderColor = "";
                input.style.boxShadow = "";
            });
        });

        // เคลียร์ error style เมื่อพิมพ์
        contactForm.querySelectorAll(".form-input").forEach(input => {
            input.addEventListener("input", () => {
                input.style.borderColor = "";
                input.style.boxShadow = "";
            });
        });
    }

    // ========================================================
    // 4. Mobile Navigation (Hamburger Menu) — ทุกหน้า
    // ========================================================
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const mobileNavOverlay = document.getElementById("mobileNavOverlay");
    const mobileNavPanel = document.getElementById("mobileNavPanel");
    const mobileCloseBtn = document.getElementById("mobileCloseBtn");

    function openMobileNav() {
        if (mobileNavOverlay && mobileNavPanel) {
            mobileNavOverlay.classList.add("active");
            mobileNavPanel.classList.add("active");
            document.body.style.overflow = "hidden"; // ป้องกัน scroll ขณะเมนูเปิด
        }
    }

    function closeMobileNav() {
        if (mobileNavOverlay && mobileNavPanel) {
            mobileNavOverlay.classList.remove("active");
            mobileNavPanel.classList.remove("active");
            document.body.style.overflow = "";
        }
    }

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener("click", openMobileNav);
    }
    if (mobileCloseBtn) {
        mobileCloseBtn.addEventListener("click", closeMobileNav);
    }
    if (mobileNavOverlay) {
        mobileNavOverlay.addEventListener("click", closeMobileNav);
    }

    // ========================================================
    // 5. Login Form (login.html) — Mock Authentication
    // ========================================================
    const loginForm = document.getElementById("loginForm");
    const togglePassword = document.getElementById("togglePassword");
    const loginPasswordInput = document.getElementById("loginPassword");
    const eyeIcon = document.getElementById("eyeIcon");

    // Toggle password visibility
    if (togglePassword && loginPasswordInput && eyeIcon) {
        togglePassword.addEventListener("click", () => {
            if (loginPasswordInput.type === "password") {
                loginPasswordInput.type = "text";
                eyeIcon.textContent = "🙈";
            } else {
                loginPasswordInput.type = "password";
                eyeIcon.textContent = "👁️";
            }
        });
    }

    // Mock login authentication
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const username = document.getElementById("loginUsername").value.trim();
            const password = document.getElementById("loginPassword").value;

            const VALID_USERNAME = "admin";
            const VALID_PASSWORD = "123456";

            if (username === VALID_USERNAME && password === VALID_PASSWORD) {
                alert("✅ เข้าสู่ระบบสำเร็จ");
                window.location.href = "index.html";
            } else {
                alert("❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่");
            }
        });
    }

    // ========================================================
    // 6. Product Cards & Modal Handler (products.html)
    // ========================================================
    const PRODUCTS_MOCK_DATA = {
        "1": {
            name: "Forest Breeze",
            price: "1,500 บาท",
            desc: "กลิ่นหอมสดชื่นจากธรรมชาติ ผสานกลิ่นป่าสนและโอ๊คมอส ให้ความรู้สึกผ่อนคลาย สงบ และมีสมาธิตลอดวัน",
            notes: "กลิ่นแรก: มะนาว, เบอร์กามอต | กลิ่นหลัก: ไม้สน, มะลิ | กลิ่นฐาน: โอ๊คมอส, ไม้ซีดาร์",
            satisfaction: 98,
            gender: "🌿 ใช้ได้ทุกเพศ",
            badge: "🔥 สินค้าขายดี",
            image: "assets/forest_breeze.png",
            filter: "none"
        },
        "2": {
            name: "Rose Bloom",
            price: "1,890 บาท",
            desc: "กลิ่นกุหลาบหอมหวานละมุน คัดสรรจากกลีบกุหลาบสด เพิ่มความโรแมนติกและเสน่ห์ชวนหลงใหล",
            notes: "กลิ่นแรก: พริกไทยชมพู, ส้มแมนดาริน | กลิ่นหลัก: กุหลาบมอญ, โบตั๋น | กลิ่นฐาน: มัสก์ขาว, อำพัน",
            satisfaction: 96,
            gender: "🌸 สำหรับผู้หญิง",
            badge: "🔥 สินค้าขายดี",
            image: "assets/rose_bloom.png",
            filter: "none"
        },
        "3": {
            name: "Ocean Breeze",
            price: "1,750 บาท",
            desc: "กลิ่นสายลมทะเลสดชื่น ผ่อนคลาย สะอาด ปลอดโปร่ง ให้ความรู้สึกสบายใจราวกับพักผ่อนริมชายหาด",
            notes: "กลิ่นแรก: เกลือทะเล, ซิตรัส | กลิ่นหลัก: เซจ, ดอกบัวสาย | กลิ่นฐาน: ขอนไม้ทะเล, มัสก์",
            satisfaction: 94,
            gender: "🌿 ใช้ได้ทุกเพศ",
            badge: "🔥 สินค้าขายดี",
            image: "assets/forest_breeze.png",
            filter: "hue-rotate(180deg)"
        },
        "4": {
            name: "Citrus Bloom",
            price: "1,650 บาท",
            desc: "กลิ่นซิตรัสสดใส เติมพลังชีวิตชีวา ช่วยเพิ่มความกระปรี้กระเปร่าและสดชื่นทันทีที่ฉีด",
            notes: "กลิ่นแรก: เกรปฟรุต, ส้ม | กลิ่นหลัก: ดอกส้ม, ฟรีเซีย | กลิ่นฐาน: หญ้าแฝก",
            satisfaction: 92,
            gender: "🌿 ใช้ได้ทุกเพศ",
            badge: "✨ สินค้าใหม่",
            image: "assets/rose_bloom.png",
            filter: "hue-rotate(45deg)"
        },
        "5": {
            name: "Lavender Dream",
            price: "1,650 บาท",
            desc: "กลิ่นลาเวนเดอร์แท้จากธรรมชาติ ผ่อนคลายสมอง ลดความเครียด ช่วยให้หลับสบายยิ่งขึ้น",
            notes: "กลิ่นแรก: ลาเวนเดอร์, เบอร์กามอต | กลิ่นหลัก: คาโมมายล์ | กลิ่นฐาน: ไม้จันทน์หอม, วนิลา",
            satisfaction: 97,
            gender: "🌿 ใช้ได้ทุกเพศ",
            badge: "✨ สินค้าใหม่",
            image: "assets/rose_bloom.png",
            filter: "hue-rotate(270deg)"
        },
        "6": {
            name: "Jasmine Whisper",
            price: "1,800 บาท",
            desc: "กลิ่นมะลิอบอุ่น อ่อนโยน ให้ความรู้สึกสะอาด บริสุทธิ์ และทรงเสน่ห์แบบไทยประยุกต์",
            notes: "กลิ่นแรก: ใบไม้เขียวสด | กลิ่นหลัก: มะลิลา, กระดังงา | กลิ่นฐาน: อำพันขาว",
            satisfaction: 95,
            gender: "🌸 สำหรับผู้หญิง",
            badge: "🔥 สินค้าขายดี",
            image: "assets/forest_breeze.png",
            filter: "hue-rotate(90deg)"
        },
        "7": {
            name: "Sandalwood",
            price: "2,100 บาท",
            desc: "กลิ่นแก่นไม้หอมนุ่มลึก อบอุ่น ทรงพลัง มอบเอกลักษณ์ความสุขุมและมั่นคง",
            notes: "กลิ่นแรก: กระวาน | กลิ่นหลัก: ดอกไอริส, ปาปิรุส | กลิ่นฐาน: ไม้จันทน์หอมอินเดีย, หนังแท้",
            satisfaction: 93,
            gender: "👔 สำหรับผู้ชาย",
            badge: "✨ สินค้าใหม่",
            image: "assets/forest_breeze.png",
            filter: "sepia(0.6) hue-rotate(330deg)"
        },
        "8": {
            name: "Green Tea",
            price: "1,550 บาท",
            desc: "กลิ่นใบชาเขียวสด สะอาด อ่อนโยน ช่วยปรับอารมณ์ให้สมดุลและผ่อนคลายจากความเหนื่อยล้า",
            notes: "กลิ่นแรก: ใบชาเขียว, สะระแหน่ | กลิ่นหลัก: มะลิ, รูบาร์บ | กลิ่นฐาน: มัสก์, อำพัน",
            satisfaction: 91,
            gender: "🌿 ใช้ได้ทุกเพศ",
            badge: "✨ สินค้าใหม่",
            image: "assets/forest_breeze.png",
            filter: "hue-rotate(60deg) saturate(1.5)"
        },
        "9": {
            name: "Vanilla Bliss",
            price: "1,700 บาท",
            desc: "กลิ่นวนิลาแท้หวานละมุน นุ่มนวล ชวนฝัน มอบความอบอุ่นใจแสนพิเศษ",
            notes: "กลิ่นแรก: อัลมอนด์, ดอกวนิลา | กลิ่นหลัก: ถั่วตองกา | กลิ่นฐาน: วนิลาบาร์บอน, อำพัน",
            satisfaction: 96,
            gender: "🌸 สำหรับผู้หญิง",
            badge: "🔥 สินค้าขายดี",
            image: "assets/rose_bloom.png",
            filter: "sepia(0.5) hue-rotate(10deg)"
        }
    };

    const modalOverlay = document.getElementById("productModalOverlay");
    const modalCloseBtn = document.getElementById("modalCloseBtn");
    const modalCartBtn = document.getElementById("modalCartBtn");

    function openProductModal(productId) {
        const data = PRODUCTS_MOCK_DATA[productId] || PRODUCTS_MOCK_DATA["1"];
        if (!modalOverlay) return;

        // Populate Modal Elements
        const modalImgEl = document.getElementById("modalImg");
        if (modalImgEl) {
            modalImgEl.src = data.image;
            modalImgEl.style.filter = data.filter || "none";
            modalImgEl.alt = data.name;
        }
        document.getElementById("modalImg").alt = data.name;
        document.getElementById("modalBadge").textContent = data.badge;
        document.getElementById("modalGender").textContent = data.gender;
        document.getElementById("modalTitle").textContent = data.name;
        document.getElementById("modalPrice").textContent = data.price;
        document.getElementById("modalDesc").textContent = data.desc;
        document.getElementById("modalNotes").textContent = data.notes;
        document.getElementById("modalSatisfactionText").textContent = data.satisfaction + "%";
        document.getElementById("modalProgressBar").style.width = data.satisfaction + "%";

        // Update 'ดูรายละเอียดเต็ม' button href with product ID
        const modalDetailsBtn = modalOverlay.querySelector(".btn-modal-details");
        if (modalDetailsBtn) {
            modalDetailsBtn.href = "details.html?id=" + productId;
        }

        // Show Modal
        modalOverlay.classList.add("active");
        modalOverlay.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeProductModal() {
        if (!modalOverlay) return;
        modalOverlay.classList.remove("active");
        modalOverlay.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    // Bind click events on product cards
    document.querySelectorAll(".product-card").forEach(card => {
        card.addEventListener("click", () => {
            const productId = card.getAttribute("data-product-id");
            if (productId && modalOverlay) {
                openProductModal(productId);
            } else {
                window.location.href = "details.html";
            }
        });
    });

    // Close Modal Events
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener("click", closeProductModal);
    }
    if (modalOverlay) {
        modalOverlay.addEventListener("click", (e) => {
            if (e.target === modalOverlay) {
                closeProductModal();
            }
        });
    }

    // Modal Add to Cart Button Event
    if (modalCartBtn) {
        modalCartBtn.addEventListener("click", () => {
            const title = document.getElementById("modalTitle").textContent;
            alert("🛒 เพิ่ม '" + title + "' ลงในตระกร้าเรียบร้อยแล้ว!");
            closeProductModal();
        });
    }

    // ========================================================
    // 7. Dynamic Details Page Controller (details.html?id=X)
    // ========================================================
    const detailTitleEl = document.getElementById("detailTitle");
    
    if (detailTitleEl) {
        // Read 'id' from URL query string (e.g. details.html?id=2)
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get("id") || "1"; // Default to product 1 if no ID

        const data = PRODUCTS_MOCK_DATA[productId] || PRODUCTS_MOCK_DATA["1"];

        // Dynamic Details Mock Data dictionary extensions
        const EXTENDED_DETAILS = {
            size: data.size || "50 ml.",
            type: data.scent === "floral" ? "ดอกไม้ (Floral)" : (data.scent === "fresh" ? "สดชื่น (Fresh)" : "ไม้หอม (Woody)"),
            longevity: data.longevity || "8-12 ชั่วโมง",
            gender: data.gender,
            package: "กล่องพรีเมียมแบรนด์ 4chan",
            reviews: data.reviews || "(320 รีวิว)",
            stars: "★★★★★"
        };

        // Populate DOM elements
        const detailImg = document.getElementById("detailImg");
        const detailBadge = document.getElementById("detailBadge");
        const detailSubtitle = document.getElementById("detailSubtitle");
        const detailPrice = document.getElementById("detailPrice");
        const detailRatingStars = document.getElementById("detailRatingStars");
        const detailReviewCount = document.getElementById("detailReviewCount");
        const detailSize = document.getElementById("detailSize");
        const detailType = document.getElementById("detailType");
        const detailLongevity = document.getElementById("detailLongevity");
        const detailGender = document.getElementById("detailGender");
        const detailPackage = document.getElementById("detailPackage");
        const detailDescHeading = document.getElementById("detailDescHeading");
        const detailNotesText = document.getElementById("detailNotesText");

        if (detailImg) {
            detailImg.src = data.image;
            detailImg.style.filter = data.filter || "none";
            detailImg.alt = data.name;
        }
        if (detailBadge) { detailBadge.textContent = data.badge; }
        detailTitleEl.textContent = data.name;
        if (detailSubtitle) { detailSubtitle.textContent = data.desc; }
        if (detailPrice) { detailPrice.textContent = data.price; }
        if (detailRatingStars) { detailRatingStars.textContent = EXTENDED_DETAILS.stars; }
        if (detailReviewCount) { detailReviewCount.textContent = EXTENDED_DETAILS.reviews; }
        if (detailSize) { detailSize.textContent = EXTENDED_DETAILS.size; }
        if (detailType) { detailType.textContent = EXTENDED_DETAILS.type; }
        if (detailLongevity) { detailLongevity.textContent = EXTENDED_DETAILS.longevity; }
        if (detailGender) { detailGender.textContent = EXTENDED_DETAILS.gender; }
        if (detailPackage) { detailPackage.textContent = EXTENDED_DETAILS.package; }
        if (detailDescHeading) { detailDescHeading.textContent = "น้ำหอม 4chan Natural Scent - " + data.name; }
        if (detailNotesText) { detailNotesText.textContent = data.notes + " ทำให้กลิ่นมีมิติติดทนนานตลอดวัน 🌿"; }

        // Details Page Actions (Add to Cart & Favorite)
        const btnCart = document.getElementById("detailBtnCart");
        const btnFav = document.getElementById("detailBtnFav");

        if (btnCart) {
            btnCart.addEventListener("click", () => {
                const qty = qtyVal ? qtyVal.textContent : "1";
                alert("🛒 เพิ่ม '" + data.name + "' จำนวน " + qty + " ชิ้น ลงในตระกร้าเรียบร้อยแล้ว!");
            });
        }

        if (btnFav) {
            btnFav.addEventListener("click", function () {
                if (this.classList.contains("favorited")) {
                    this.classList.remove("favorited");
                    this.textContent = "♥ รายการโปรด";
                    this.style.backgroundColor = "";
                    this.style.color = "";
                    alert("💔 นำ '" + data.name + "' ออกจากรายการโปรดแล้ว");
                } else {
                    this.classList.add("favorited");
                    this.textContent = "♥ อยู่ในรายการโปรด";
                    this.style.backgroundColor = "#ec4899";
                    this.style.color = "#ffffff";
                    alert("💚 บันทึก '" + data.name + "' ลงในรายการโปรดแล้ว");
                }
            });
        }
    }

    // ========================================================
    // 8. Products Live Dynamic Filter (products.html)
    // ========================================================
    const sidebarFilter = document.querySelector(".sidebar-filter");
    const btnFilterSubmit = document.getElementById("btnFilterSubmit");
    const btnFilterReset = document.getElementById("btnFilterReset");
    const productCards = document.querySelectorAll("#productsMainGrid .product-card");

    function applyProductFilters() {
        if (!sidebarFilter || productCards.length === 0) return;

        // Collect checked inputs by name group
        const selectedFilters = {
            status: Array.from(sidebarFilter.querySelectorAll('input[name="status"]:checked')).map(cb => cb.value),
            price: Array.from(sidebarFilter.querySelectorAll('input[name="price"]:checked')).map(cb => cb.value),
            scent: Array.from(sidebarFilter.querySelectorAll('input[name="scent"]:checked')).map(cb => cb.value),
            gender: Array.from(sidebarFilter.querySelectorAll('input[name="gender"]:checked')).map(cb => cb.value)
        };

        let visibleCount = 0;

        productCards.forEach(card => {
            const cardStatus = card.getAttribute("data-status");
            const cardPrice = parseInt(card.getAttribute("data-price") || "0");
            const cardScent = card.getAttribute("data-scent");
            const cardGender = card.getAttribute("data-gender");

            // 1. Check Status Filter
            const matchStatus = selectedFilters.status.length === 0 || selectedFilters.status.includes(cardStatus);

            // 2. Check Price Filter
            const matchPrice = selectedFilters.price.length === 0 || selectedFilters.price.some(range => {
                if (range === "0-1000") return cardPrice <= 1000;
                if (range === "1000-2000") return cardPrice >= 1000 && cardPrice <= 2000;
                if (range === "2000-3000") return cardPrice >= 2000 && cardPrice <= 3000;
                return true;
            });

            // 3. Check Scent Filter
            const matchScent = selectedFilters.scent.length === 0 || selectedFilters.scent.includes(cardScent);

            // 4. Check Gender Filter (unisex matches all)
            const matchGender = selectedFilters.gender.length === 0 || selectedFilters.gender.includes(cardGender) || cardGender === "unisex";

            // AND Logic across all filter groups
            const isMatched = matchStatus && matchPrice && matchScent && matchGender;

            if (isMatched) {
                card.classList.remove("filter-hidden");
                visibleCount++;
            } else {
                card.classList.add("filter-hidden");
            }
        });

        // Show empty result notification if no products match
        let noResultMsg = document.getElementById("noFilterResultMsg");
        if (visibleCount === 0) {
            if (!noResultMsg) {
                noResultMsg = document.createElement("div");
                noResultMsg.id = "noFilterResultMsg";
                noResultMsg.style.cssText = "grid-column: 1 / -1; text-align: center; padding: 40px; font-weight: 700; color: #6b21a8; background: #fdf4ff; border-radius: 16px; border: 1px dashed #c084fc; margin-top: 10px;";
                noResultMsg.innerHTML = "🌸 ไม่พบสินค้าที่ตรงกับเงื่อนไขการค้นหา<br><span style='font-size: 13px; font-weight: 500; color: #777;'>กรุณาลองเลือกตัวกรองใหม่อีกครั้ง</span>";
                const grid = document.getElementById("productsMainGrid");
                if (grid) grid.appendChild(noResultMsg);
            }
        } else if (noResultMsg) {
            noResultMsg.remove();
        }
    }

    // Live update on checkbox click
    if (sidebarFilter) {
        sidebarFilter.querySelectorAll('input[type="checkbox"]').forEach(cb => {
            cb.addEventListener("change", applyProductFilters);
        });
    }

    if (btnFilterSubmit) {
        btnFilterSubmit.addEventListener("click", (e) => {
            e.preventDefault();
            applyProductFilters();
        });
    }

    if (btnFilterReset) {
        btnFilterReset.addEventListener("click", (e) => {
            e.preventDefault();
            if (sidebarFilter) {
                sidebarFilter.querySelectorAll('input[type="checkbox"]').forEach(cb => {
                    cb.checked = false;
                });
            }
            applyProductFilters();
        });
    }

    // ========================================================
    // 9. Pagination — Active State (products.html)
    // ========================================================
    const pageNums = document.querySelectorAll(".products-pagination .page-num");
    pageNums.forEach(num => {
        num.addEventListener("click", function () {
            pageNums.forEach(n => {
                n.classList.remove("active");
                n.style.backgroundColor = "#e5e5e5";
                n.style.color = "black";
            });
            this.classList.add("active");
            this.style.backgroundColor = "";
            this.style.color = "";
            // Scroll ขึ้นบนสุดของ product grid
            const grid = document.querySelector(".products-main-grid");
            if (grid) grid.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    // ========================================================
    // 10. "SHOP NOW" & "ดูสินค้า" links — ตรวจสอบ dead links
    // ========================================================
    // ลิงก์เหล่านี้ทั้งหมดใช้ <a href="products.html"> อยู่แล้ว → ทำงานถูกต้อง

    // ========================================================
    // 12. Scent Identities Interactive Reader Modal (about.html)
    // ========================================================
    const SCENT_IDENTITIES_DATA = {
        "oakmoss": {
            title: "Oakmoss (โอ๊คมอส)",
            tag: "🌲 กลิ่นไม้หอมป่าสน",
            desc: "กลิ่นหอมชื้นเขียวขจีอันทรงเอกลักษณ์จากผืนป่าสน ให้ความรู้สึกสงบ หนักแน่น อบอุ่น และลุ่มลึกอย่างเป็นธรรมชาติ เหมาะสำหรับผู้ที่รักความสงบและสมาธิ",
            tone: "✨ โทนกลิ่น: อบอุ่น ลุ่มลึก ธรรมชาติ",
            feeling: "🌿 ให้ความรู้สึก: ผ่อนคลาย สงบ มั่นใจ",
            perfumes: "Forest Breeze, Sandalwood",
            image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=300&auto=format&fit=crop&q=60"
        },
        "amber": {
            title: "Amber (อำพัน)",
            tag: "✨ กลิ่นอำพันหรูหรา",
            desc: "กลิ่นอำพันหอมอบอุ่น หวานเย้ายวน มอบสัมผัสแห่งความพรีเมียม นุ่มนวล ชวนหลงใหล และช่วยเพิ่มความติดทนนานอันยาวนานให้แก่น้ำหอม",
            tone: "✨ โทนกลิ่น: อบอุ่น หวานละมุน หรูหรา",
            feeling: "💖 ให้ความรู้สึก: มีเสน่ห์ ทรงพลัง โรแมนติก",
            perfumes: "Rose Bloom, Vanilla Bliss, Jasmine Whisper",
            image: "assets/amber.png"
        },
        "sweet": {
            title: "Sweet (ความหวานละมุน)",
            tag: "🍬 กลิ่นหวานชวนฝัน",
            desc: "กลิ่นหอมหวานนุ่มนวลที่ผสานความนุ่มลึกของวนิลาแท้และเกสรดอกไม้ยามเช้า สร้างบรรยากาศอบอุ่น ชวนฝัน และเติมเต็มรอยยิ้มได้ตลอดวัน",
            tone: "✨ โทนกลิ่น: หวานละมุน นุ่มนวล น่าหลงใหล",
            feeling: "🌸 ให้ความรู้สึก: อ่อนโยน น่ารัก สดใส",
            perfumes: "Vanilla Bliss, Rose Bloom",
            image: "assets/sweet.png"
        },
        "balsamic": {
            title: "Balsamic (ยางไม้หอม)",
            tag: "🌿 กลิ่นยางไม้ธรรมชาติ",
            desc: "กลิ่นหอมจากยางไม้นุ่มนวล ลุ่มลึก อบอุ่น ช่วยปลอบประโลมจิตใจ ลดความเครียด และสร้างสมดุลทางอารมณ์ได้อย่างละมุนตา",
            tone: "✨ โทนกลิ่น: อบอุ่น สุขุม ผ่อนคลาย",
            feeling: "🧘 ให้ความรู้สึก: ปลอดโปร่ง ผ่อนคลาย จิตใจสงบ",
            perfumes: "Sandalwood, Forest Breeze",
            image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=300&auto=format&fit=crop&q=60"
        },
        "iris": {
            title: "Iris (ดอกไอริส)",
            tag: "🌸 กลิ่นแป้งหอมสะอาด",
            desc: "กลิ่นแป้งหอมสะอาดบริสุทธิ์จากดอกไอริส ให้ความรู้สึกสง่างาม นุ่มนวล เรียบหรู สะอาดตา และเปี่ยมด้วยเอกลักษณ์สไตล์ผู้ดี",
            tone: "✨ โทนกลิ่น: แป้งหอม สะอาด ละมุน",
            feeling: "👑 ให้ความรู้สึก: สง่างาม เรียบหรู บริสุทธิ์",
            perfumes: "Jasmine Whisper, Sandalwood",
            image: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=300&auto=format&fit=crop&q=60"
        },
        "animalic": {
            title: "Animalic / Musk (มัสก์ธรรมชาติ)",
            tag: "🕊️ กลิ่นมัสก์เย้ายวน",
            desc: "กลิ่นมัสก์ธรรมชาติอันอบอุ่น ทรงเสน่ห์เฉพาะตัว ช่วยตรึงกลิ่นหอมให้อยู่ติดทนนานบนผิวอย่างนุ่มนวล เป็นหัวใจสำคัญของน้ำหอมระดับคลาสสิก",
            tone: "✨ โทนกลิ่น: มัสก์อบอุ่น ติดทนนาน",
            feeling: "💎 ให้ความรู้สึก: เย้ายวน มั่นใจ มีระดับ",
            perfumes: "Rose Bloom, Ocean Breeze, Green Tea",
            image: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=300&auto=format&fit=crop&q=60"
        },
        "warmwoods": {
            title: "Warm Woods (แก่นไม้หอมอบอุ่น)",
            tag: "🪵 กลิ่นไม้หอมพรีเมียม",
            desc: "กลิ่นแก่นไม้จันทน์หอมและซีดาร์ มอบเอกลักษณ์ความอบอุ่น สุขุม ทรงพลัง ให้ความรู้สึกมั่นคงและมีสมาธิตลอดวัน",
            tone: "✨ โทนกลิ่น: ไม้หอม อบอุ่น สุขุม",
            feeling: "👔 ให้ความรู้สึก: มั่นใจ มั่นคง ทรงพลัง",
            perfumes: "Sandalwood, Forest Breeze",
            image: "assets/forest_breeze.png"
        },
        "citrusbloom": {
            title: "Citrus Bloom (ซิตรัสสดใส)",
            tag: "🍊 กลิ่นซิตรัสชีวา",
            desc: "กลิ่นส้มและเกรปฟรุตสดชื่น เติมพลังชีวิตชีวา ปลุกความสดชื่นกระปรี้กระเปร่า ให้ความรู้สึกเบิกบานใจทันทีที่ฉีด",
            tone: "✨ โทนกลิ่น: ซิตรัส สดใส เปรี้ยวหวานพอดี",
            feeling: "☀️ ให้ความรู้สึก: สดชื่น กระปรี้กระเปร่า มีชีวิตชีวา",
            perfumes: "Citrus Bloom, Ocean Breeze",
            image: "assets/rose_bloom.png"
        },
        "lavender": {
            title: "Lavender (ลาเวนเดอร์ผ่อนคลาย)",
            tag: "🪻 กลิ่นลาเวนเดอร์ธรรมชาติ",
            desc: "กลิ่นดอกลาเวนเดอร์แท้จากธรรมชาติ ผ่อนคลายสมอง คลายความเหนื่อยล้า และช่วยส่งเสริมการนอนหลับพักผ่อนได้อย่างหลับสบาย",
            tone: "✨ โทนกลิ่น: ลาเวนเดอร์ อ่อนโยน ผ่อนคลาย",
            feeling: "🌙 ให้ความรู้สึก: ผ่อนคลาย หลับสบาย คลายเครียด",
            perfumes: "Lavender Dream",
            image: "assets/rose_bloom.png"
        },
        "floral": {
            title: "Floral (ดอกไม้หอมละมุน)",
            tag: "🌹 กลิ่นมวลดอกไม้สด",
            desc: "กลิ่นหอมหวานจากกลีบกุหลาบและมะลิลาสด ให้บรรยากาศโรแมนติก อ่อนโยน สดใส และทรงเสน่ห์น่าทะนุถนอม",
            tone: "✨ โทนกลิ่น: ดอกไม้หวาน โรแมนติก",
            feeling: "💖 ให้ความรู้สึก: หวานละมุน อ่อนโยน โรแมนติก",
            perfumes: "Rose Bloom, Jasmine Whisper, Vanilla Bliss",
            image: "assets/rose_bloom.png"
        }
    };

    const scentReaderOverlay = document.getElementById("scentReaderOverlay");
    const scentReaderCloseBtn = document.getElementById("scentReaderCloseBtn");

    function openScentModal(key) {
        const data = SCENT_IDENTITIES_DATA[key];
        if (!data || !scentReaderOverlay) return;

        const imgEl = document.getElementById("scentReaderImg");
        if (imgEl) {
            imgEl.src = data.image;
            imgEl.alt = data.title;
        }

        document.getElementById("scentReaderTag").textContent = data.tag;
        document.getElementById("scentReaderTitle").textContent = data.title;
        document.getElementById("scentReaderDesc").textContent = data.desc;
        document.getElementById("scentReaderTone").textContent = data.tone;
        document.getElementById("scentReaderFeeling").textContent = data.feeling;
        document.getElementById("scentReaderPerfumes").textContent = data.perfumes;

        scentReaderOverlay.classList.add("active");
        scentReaderOverlay.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeScentModal() {
        if (!scentReaderOverlay) return;
        scentReaderOverlay.classList.remove("active");
        scentReaderOverlay.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    // Bind click events on scent cards & banner cards
    document.querySelectorAll(".scent-card[data-scent-key], .scent-banner-card[data-scent-key]").forEach(card => {
        card.addEventListener("click", () => {
            const key = card.getAttribute("data-scent-key");
            if (key) openScentModal(key);
        });
    });

    if (scentReaderCloseBtn) scentReaderCloseBtn.addEventListener("click", closeScentModal);
    if (scentReaderOverlay) {
        scentReaderOverlay.addEventListener("click", (e) => {
            if (e.target === scentReaderOverlay) closeScentModal();
        });
    }

    // ========================================================
    // 11. Scroll-to-top เมื่อเปลี่ยนหน้า (UX improvement)
    // ========================================================
    window.scrollTo(0, 0);

});
