// ============================================================
//  ECO-TRACK — main.js
//  Semua logika frontend ditulis di sini
//  Komentar ditulis dalam Bahasa Indonesia agar mudah dipahami
// ============================================================

// ============================================================
//  BAGIAN 1 — AMBIL SEMUA ELEMEN HTML YANG KITA BUTUHKAN
//  document.getElementById("...") = cari elemen berdasarkan id-nya
// ============================================================

// Input form
const inputJarak    = document.getElementById("jarak");
const inputAC       = document.getElementById("durasiAC");
const inputLaptop   = document.getElementById("durasiLaptop");

// Tombol
const btnHitung = document.getElementById("btnHitung");
const btnReset  = document.getElementById("btnReset");

// Area hasil
const resultCard    = document.getElementById("resultCard");
const totalNumber   = document.getElementById("totalNumber");
const totalBadge    = document.getElementById("totalBadge");
const contextMessage = document.getElementById("contextMessage");






// ============================================================
//  BAGIAN 2 — KOEFISIEN EMISI
//  Sesuai rumus dari guidebook
// ============================================================

const KOEF = {
  motor:  0.10, // kg CO2 per km
  mobil:  0.20, // kg CO2 per km
  ac:     0.50, // kg CO2 per jam
  laptop: 0.05, // kg CO2 per jam
};


// ============================================================
//  BAGIAN 3 — FUNGSI HITUNG EMISI
//  Rumus: Emisi = (Jarak × Koef_Kendaraan) + (AC × 0.5) + (Laptop × 0.05)
// ============================================================

function hitungEmisi() {
  // Ambil nilai dari input
  const jarak   = parseFloat(inputJarak.value)   || 0;
  const ac      = parseFloat(inputAC.value)      || 0;
  const laptop  = parseFloat(inputLaptop.value)  || 0;

  // Ambil jenis kendaraan yang dipilih (motor atau mobil)
  const kendaraanEl = document.querySelector('input[name="kendaraan"]:checked');
  const kendaraan   = kendaraanEl ? kendaraanEl.value : "motor";

  // Hitung masing-masing sumber emisi
  const emisiKendaraan = jarak  * KOEF[kendaraan];
  const emisiAC        = ac     * KOEF.ac;
  const emisiLaptop    = laptop * KOEF.laptop;

  // Total
  const total = emisiKendaraan + emisiAC + emisiLaptop;

  return {
    total,
    emisiKendaraan,
    emisiAC,
    emisiLaptop,
  };
}


// ============================================================
//  BAGIAN 4 — TAMPILKAN HASIL KE HALAMAN
// ============================================================

function tampilkanHasil() {
  const { total, emisiKendaraan, emisiAC, emisiLaptop } = hitungEmisi();

  // --- 4a. Tampilkan angka total ---
  totalNumber.textContent = total.toFixed(2);

  // --- 4b. Badge & warna berdasarkan tingkat emisi ---
  // Hapus class badge lama dulu
  totalBadge.className = "total-badge";

  if (total <= 2) {
    totalBadge.textContent = "🟢 Rendah — Aman";
    totalBadge.classList.add("badge-rendah");
    contextMessage.textContent =
      "Keren! Jejak karbonmu hari ini tergolong rendah. Pertahankan kebiasaan baik ini ya! 🌱";
    contextMessage.style.background = "#d8f3dc";
    contextMessage.style.borderLeftColor = "#52b788";
    contextMessage.style.color = "#1a3d2b";

  } else if (total <= 5) {
    totalBadge.textContent = "🟡 Sedang — Perlu Perhatian";
    totalBadge.classList.add("badge-sedang");
    contextMessage.textContent =
      "Emisimu masih bisa dikurangi. Coba kurangi penggunaan AC atau pilih kendaraan yang lebih efisien. 🌤️";
    contextMessage.style.background = "#fff3cd";
    contextMessage.style.borderLeftColor = "#f4a261";
    contextMessage.style.color = "#7a5100";

  } else {
    totalBadge.textContent = "🔴 Tinggi — Berbahaya";
    totalBadge.classList.add("badge-tinggi");
    contextMessage.textContent =
      "Emisimu hari ini cukup tinggi. Yuk cek tips di bawah untuk mulai mengurangi jejak karbonmu! 🌡️";
    contextMessage.style.background = "#fde8e8";
    contextMessage.style.borderLeftColor = "#c1121f";
    contextMessage.style.color = "#c1121f";
  }


  // --- 4d. Tampilkan card hasil (jika sebelumnya tersembunyi) ---
  resultCard.classList.remove("hidden");

  // Update warna background juga
  updateBackground(total);
}


// ============================================================
//  BAGIAN 5 — A1: REAL-TIME UI FEEDBACK
//  Perubahan warna terjadi saat pengguna mengetik (event input)
// ============================================================

function updateBackground(total) {
  document.body.classList.remove("state-aman", "state-sedang", "state-tinggi");

  if (total <= 2) {
    document.body.classList.add("state-aman");
  } else if (total <= 5) {
    document.body.classList.add("state-sedang");
  } else {
    document.body.classList.add("state-tinggi");
  }
}

// Trigger real-time saat user mengetik / mengubah nilai
// Event "input" lebih cepat dari "change" — bereaksi tiap keystroke
function onInputChange() {
  const { total } = hitungEmisi();
  updateBackground(total);
}

inputJarak.addEventListener("input",   onInputChange);
inputAC.addEventListener("input",      onInputChange);
inputLaptop.addEventListener("input",  onInputChange);

// Saat radio kendaraan berubah
document.querySelectorAll('input[name="kendaraan"]').forEach(function(radio) {
  radio.addEventListener("change", onInputChange);
});


// ============================================================
//  BAGIAN 6 — TOMBOL HITUNG
// ============================================================

btnHitung.addEventListener("click", function() {
  // Validasi sederhana — pastikan ada input yang diisi
  const jarak  = parseFloat(inputJarak.value)   || 0;
  const ac     = parseFloat(inputAC.value)      || 0;
  const laptop = parseFloat(inputLaptop.value)  || 0;

  if (jarak === 0 && ac === 0 && laptop === 0) {
    // Beri tahu user jika semua input kosong
    alert("⚠️ Isi minimal salah satu input (jarak, AC, atau laptop) sebelum menghitung!");
    return;
  }

  tampilkanHasil();

  // Scroll ke hasil agar user langsung lihat
  resultCard.scrollIntoView({ behavior: "smooth", block: "start" });
});


// ============================================================
//  BAGIAN 7 — TOMBOL RESET
// ============================================================

btnReset.addEventListener("click", function() {
  // Kosongkan semua input
  inputJarak.value   = "";
  inputAC.value      = "";
  inputLaptop.value  = "";

  // Reset radio ke motor
  document.getElementById("motor").checked = true;

  // Sembunyikan hasil
  resultCard.classList.add("hidden");

  // Reset background ke netral
  document.body.classList.remove("state-aman", "state-sedang", "state-tinggi");
});



// ============================================================
//  BAGIAN 9 — INISIALISASI SAAT HALAMAN DIBUKA
// ============================================================

// Pastikan semua bersih saat pertama kali buka halaman
document.addEventListener("DOMContentLoaded", function() {
  resultCard.classList.add("hidden");
  document.body.classList.remove("state-aman", "state-sedang", "state-tinggi");
});