# Eco-Track — [Dana Wikara Antfalih]
## Tentang Project
Eco-Track adalah aplikasi web sederhana membantu pengguna menghitung estimasi jejak karbon aktivitas transportasi dan penggunaan energi. Pengguna memasukkan jarak berkendara, durasi pemakaian AC,laptop, lalu aplikasi menghitung total emisi CO₂ dalam satu hari.
## Masalah Iklim yang Ingin Disoroti
Banyak orang gasadar aktivitas sehari-hari keliatan sepele — seperti menyalakan AC terlalu lama atau berkendara jarak jauh — secara kumulatif berkontribusi besar terhadap emisi karbon. Krisis iklim engga cuma soal pabrik atau kebijakan pemerintah, tapi juga soal kebiasaan individu yang terus berulang setiap hari. Lewat Eco-Track, aku mau orang bisa liat dampak nyata dari rutinitas mereka dalam angka, soalnya kesadaran itu langkah pertama menuju perubahan.
## Jalur Spesialisasi yang Dipilih [FrontEnd]
- [X] A1. Real-time UI Feedback
- [ ] A2. Interactive Tips (Action Plan)
- [x] A3. Dynamic Result Display
- [ ] B1. Static File Serving
- [ ] B2. The Carbon API
- [ ] B3. Smart Validation
(Centang [x] yang berhasil diselesaikan)
## Cara Menjalankan Project [pakai live server vscode]
1. instal extensions live server
2. buka folder /public yang berisi html,css,js
3. pada tampilan vs code klik kanan dan pilih "open with live server"
## Tantangan yang Dihadapi
Tantangan terbesarnya memahami gimana CSS dan JavaScript bisa bekerja sama secara real-time. Awalnya bingung kenapa background tidak berubah pas mengetik — ternyata karena pakai event change bukan input. Setelah ganti ke event input, perubahan langsung kedeteksi  tiap keystroke. Dari itu aku tau pemilihan jenis event listener berpengaruh ke experience pengguna.