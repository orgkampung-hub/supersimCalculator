# ✈️ AKULAS v1.1.7 | SuperSim Pro Hub

**AKULAS SuperSim Pro Hub** adalah kalkulator web minimalis yang dibina khas untuk pemain **Airlines Manager (AM)**. Aplikasi ini direka untuk memudahkan pengiraan harga tiket optimum (SuperSim) dan pengurusan kapasiti pesawat secara terus melalui telefon pintar.

---

## ✨ Kenapa guna AKULAS v1.1.7?

Sistem ini menyelesaikan masalah penggunaan Excel di telefon pintar yang leceh dan lambat. Dengan UI yang fokus kepada kelajuan, anda boleh mengemas kini harga laluan (route) dalam masa beberapa saat sahaja.

### 🌟 Ciri-Ciri Utama:
* **Sticky Results**: Harga SuperSim sentiasa "lock" di atas skrin untuk rujukan pantas.
* **Landscape Dashboard**: Pusing telefon anda untuk paparan "Split-View" (Audit di kiri, Fleet di kanan).
* **Tap-to-Copy**: Cukup sekadar tekan pada kotak harga untuk menyalin nilai terus ke dalam clipboard.
* **Smart Input Focus**: Kotak input akan dikosongkan secara automatik apabila disentuh (Auto-Clear).
* **Live Fleet Logic**: Masukkan jumlah seat asal dan frekuensi, sistem akan mengira kapasiti sebenar secara automatik.
* **Standalone Web App**: Sokongan `manifest.json` membolehkan aplikasi dibuka tanpa bar browser (Full App Mode).

---

## 🛠️ Cara Pemasangan (Setup)

Pastikan anda mempunyai fail-fail berikut di dalam satu folder yang sama:
* `index.html`
* `supersim.css`
* `supersim.js`
* `aircraft.css`
* `aircraft.js`
* `manifest.json`

### Langkah-Langkah:
1. Muat turun semua fail tersebut.
2. **Cara Pro (GitHub)**: Upload ke GitHub Repository dan aktifkan *GitHub Pages*.
3. **Cara Local**: Jalankan menggunakan app *Acode* atau *Web Server for Android*.
4. Gunakan fungsi **"Add to Home Screen"** di Chrome untuk akses pantas dengan ikon aplikasi khas.

---

## 📖 Cara Penggunaan

1. **Audit Price**: Masukkan harga tiket hasil audit laluan anda.
2. **Audit Demand**: Masukkan jumlah permintaan (demand) asal dari audit.
3. **Fleet List**: 
   * Tambah pesawat menggunakan butang **+ ADD AIRCRAFT**.
   * Masukkan jumlah seat asal dari game dan jumlah kekerapan (Frequency).
4. **Copy**: Klik pada kotak harga kuning di bahagian atas skrin untuk salin.

---

## ⚖️ Formula & Logik
Aplikasi ini menggunakan logik algoritma SuperSim untuk mencari titik keseimbangan antara harga dan permintaan bagi memastikan keuntungan (Turnover) dimaksimumkan.

---

### Versi & Kredit
* **Versi**: 1.1.7 (Stable)
* **Pembangun**: AKULAS
* **Tujuan**: Komuniti Airlines Manager Tycoon.

---
*Developed with Passion for the AMT Community.*
