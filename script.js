let totalTransaksi = 0;
let totalPendapatan = 0;
let diskon = 0;

function setMetode(metode) {
  document.getElementById("metode").value = metode;
}

function applyPromo() {
  const kode = document.getElementById("promo").value.trim().toUpperCase();
  if (kode === "CANTIK10") {
    diskon = 0.1;
    Swal.fire("Kode promo diterapkan!", "Diskon 10% berhasil digunakan.", "success");
  } else {
    diskon = 0;
    Swal.fire("Kode tidak valid", "Silakan coba lagi.", "error");
  }
}

document.getElementById("formPembayaran").addEventListener("submit", function (e) {
  e.preventDefault();

  const nama = document.getElementById("nama").value;
  const produkEl = document.getElementById("produk");
  const produk = produkEl.value;
  const harga = parseInt(produkEl.selectedOptions[0].getAttribute("data-harga") || "0");
  const jumlah = parseInt(document.getElementById("jumlah").value || "1");
  const metode = document.getElementById("metode").value;

  let total = harga * jumlah;
  if (diskon > 0) {
    total = total - total * diskon;
  }

  totalTransaksi++;
  totalPendapatan += total;

  document.getElementById("totalTransaksi").innerText = totalTransaksi;
  document.getElementById("totalPendapatan").innerText = "Rp " + totalPendapatan.toLocaleString();
  document.getElementById("rataRata").innerText = "Rp " + (totalPendapatan / totalTransaksi).toLocaleString();

  const riwayat = document.getElementById("riwayatList");
  if (totalTransaksi === 1) {
    riwayat.innerHTML = "";
  }

  const entry = document.createElement("div");
  entry.className = "bg-gray-100 dark:bg-gray-800 p-2 rounded";
  entry.innerHTML = `<strong>${nama}</strong> beli <strong>${jumlah}x ${produk}</strong> via <strong>${metode}</strong> – <span class="text-green-600 font-bold">Rp ${total.toLocaleString()}</span>`;
  riwayat.prepend(entry);

  Swal.fire({
    icon: "success",
    title: "Transaksi Berhasil!",
    html: `
      <p><strong>${nama}</strong></p>
      <p>${jumlah}x ${produk}</p>
      <p>Total: <strong>Rp ${total.toLocaleString()}</strong></p>
      <p>Metode: ${metode}</p>
    `,
    confirmButtonColor: "#1e3a8a"
  });

  this.reset();
  diskon = 0;
});

// Toggle Mode
document.getElementById("toggleMode").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});