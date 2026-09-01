# 🌿 4chan Natural Scent — From Figma to Live Website

โปรเจกต์พัฒนาเว็บไซต์ร้านน้ำหอมธรรมชาติ 100% **"4chan Natural Scent"** สแกนจากดีไซน์ Figma สู่เว็บไซต์จริงที่ทำงานได้สมบูรณ์ (Fully Functional Website) รองรับการแสดงผลแบบ Responsive บนทุกอุปกรณ์และรองรับการ Deploy บน GitHub Pages

---

## 🔗 Live Demo (GitHub Pages)
👉 **Live URL:** [https://050Pinyada.github.io/Final-Project-/](https://050Pinyada.github.io/Final-Project-/)

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)
* **HTML5** — โครงสร้างแบบ Semantic HTML และ Data Attributes สำหรับการประมวลผล
* **CSS3** — Custom Responsive Grid/Flexbox, Pastel Glassmorphism Theme, Custom Animations
* **Vanilla JavaScript (ES6+)** — URL Parameters (`details.html?id=X`), Dynamic DOM Rendering, Live Filter, Touch Swipe Carousel, Product Modal Reader

---

## ✨ ฟีเจอร์หลักของโปรเจกต์ (Key Features)

### 1. 🏠 หน้าแรก (index.html)
- **Interactive Carousel Slider:** ปุ่มสไลด์ซ้าย-ขวา, จุด Indicator คอนโทรล, และรองรับ Touch Swipe บนมือถือ
- **Direct Navigation:** คลิกการ์ดสินค้าใน Carousel เพื่อลิงก์ไปยังหน้ารายละเอียดสินค้านั้นๆ อัตโนมัติ (`details.html?id=X`)

### 2. 📖 เรื่องราวของเรา (about.html)
- **Interactive Scent Identity Reader:** คลิกการ์ดเอกลักษณ์กลิ่น (**Oakmoss, Amber, Sweet, Balsamic, Iris, Animalic, Warm Woods, Citrus Bloom, Lavender, Floral**) เพื่อเปิดหน้าต่างอ่านเรื่องราวภาษาไทย โทนกลิ่น อารมณ์ความรู้สึก และรายชื่อน้ำหอมที่ใช้โน้ตกลิ่นนั้นๆ

### 3. 🛍️ หน้าผลิตภัณฑ์ (products.html)
- **Live Dynamic Product Filter:** ตัวกรองสินค้าแบบเรียลไทม์ (AND Logic) กรองตาม **สถานะสินค้า**, **ช่วงราคา**, **กลุ่มกลิ่น (ภาษาไทย 100%)** และ **เพศผู้ใช้**
- **Product Modal Pop-up:** คลิกการ์ดสินค้าเพื่อเปิดหน้าต่างป๊อปอัปพาสเทลชมพูม่วง แสดงลักษณะกลิ่น (Scent Notes), เปอร์เซ็นต์ความชอบ (Progress Bar 98%) และเพศ
- **Bestseller & New Badges:** ป้ายกำกับสินค้าเรืองแสง (`🔥 สินค้าขายดี`, `✨ สินค้าใหม่`) เด่นชัดทุกการ์ด

### 4. 🔬 หน้ารายละเอียดสินค้าแบบไดนามิก (details.html)
- **URL Query Parameter Parsing:** อ่านค่า `?id=X` เพื่อดึงข้อมูล รูปภาพ โทนสี filter ราคา คุณสมบัติ และรายละเอียดกลิ่นของสินค้านั้นๆ มาแสดงผลสด
- **Quantity Control:** ปุ่มเพิ่ม-ลดจำนวนสินค้า (ขั้นต่ำ 1 ชิ้น)
- **Interactive Buttons:** ปุ่มเพิ่มลงตระกร้าแสดง Alert จำนวน และปุ่มรายการโปรด Toggle สีพาสเทลชมพู

### 5. 📞 หน้าติดต่อเรา (contact.html) & 🔑 เข้าสู่ระบบ (login.html)
- **Form Validation & Password Toggle:** ตรวจสอบอีเมลแบบ Regex และซ่อน/แสดงรหัสผ่าน

---

## 📁 โครงสร้างโปรเจกต์ (Directory Structure)
```
fima/
├── index.html        # หน้าแรก (Hero Banner, Carousel Slider)
├── about.html        # หน้าเรื่องราวของเรา (Interactive Scent Identities Reader)
├── products.html     # หน้าผลิตภัณฑ์ (Live Dynamic Filter, Product Modal)
├── details.html      # หน้ารายละเอียดสินค้าแบบไดนามิก (?id=X)
├── contact.html      # หน้าติดต่อเรา (Contact Form Validation)
├── login.html        # หน้าเข้าสู่ระบบ (Mock Login & Password Toggle)
├── style.css         # ระบบสไตล์หลัก (Pastel Theme, Responsive Media Queries)
├── app.js            # ตรรกะการทำงานหลัก (Vanilla JS Controllers)
├── assets/           # โฟลเดอร์รูปภาพ สินค้า โลโก้ และไดอะแกรม
└── README.md         # เอกสารสรุปโครงงาน
```

---

## 📱 การรองรับอุปกรณ์ (Responsive Breakpoints)
ทดสอบผ่านทุกความละเอียดหน้าจอ:
- **Desktop / Laptop:** 1920px, 1366px, 1024px
- **Tablet / Mobile:** 768px, 428px, 414px, 390px, 375px
- **No Horizontal Scroll / No Content Overflow 100%**
