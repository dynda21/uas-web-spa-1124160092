
let totalTransaksi = 0;
let totalPendapatan = 0;

function setMetode(metode) {
  document.getElementById("metode").value = metode;
}

document.getElementById("formPembayaran").addEventListener("submit", function (e) {
  e.preventDefault();

  const nama = document.getElementById("nama").value;
  const email = document.getElementById("email").value;
  const produkEl = document.getElementById("produk");
  const produk = produkEl.value;
  const harga = parseInt(produkEl.selectedOptions[0].getAttribute("data-harga") || "0");
  const jumlah = parseInt(document.getElementById("jumlah").value || "1");
  const metode = document.getElementById("metode").value;
  const total = harga * jumlah;

  if (!produk || harga === 0) {
    alert("Pilih produk yang valid terlebih dahulu.");
    return;
  }

  totalTransaksi++;
  totalPendapatan += total;

  document.getElementById("totalTransaksi").innerText = totalTransaksi;
  document.getElementById("totalPendapatan").innerText = "Rp " + totalPendapatan.toLocaleString();
  document.getElementById("rataRata").innerText = "Rp " + Math.floor(totalPendapatan / totalTransaksi).toLocaleString();

  const riwayat = document.getElementById("riwayatList");
  if (totalTransaksi === 1) {
    riwayat.innerHTML = "";
  }
  const entry = document.createElement("div");
  entry.className = "bg-pink-50 p-2 rounded shadow-sm text-sm";
  entry.innerHTML = "<strong>" + nama + "</strong> beli <strong>" + jumlah + "x " + produk + "</strong> via <strong>" + metode + "</strong> – <span class='text-green-600 font-bold'>Rp " + total.toLocaleString() + "</span>";
  riwayat.prepend(entry);

  Swal.fire({
    icon: 'success',
    title: 'Transaksi Berhasil!',
    html: `
      <p><strong>${nama}</strong></p>
      <p>${jumlah}x ${produk}</p>
      <p>Total: <strong>Rp ${total.toLocaleString()}</strong></p>
      <p>Metode: ${metode}</p>
    `,
    confirmButtonColor: '#ec4899'
  });

  // this.reset();
});

// Toggle Tema
const toggleBtn = document.getElementById("toggleMode");
toggleBtn?.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
});
