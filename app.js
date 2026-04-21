/* ═══════════════════════════════════════════════
   TOKO SUTORO — app.js
   Database: LocalStorage
   Golden Rules: Consistency, Shortcuts, Feedback,
   Design, Error Prevention, Reversal, Control, Load
   ═══════════════════════════════════════════════ */
"use strict";

/* ════════════════════════════════
   DATABASE (LocalStorage)
════════════════════════════════ */
const DB = {
  _get(k)       { try { return JSON.parse(localStorage.getItem(k)) || []; } catch { return []; } },
  _getObj(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  _set(k, v)    { localStorage.setItem(k, JSON.stringify(v)); },

  // PRODUK
  getProduk()         { return this._get('storo_produk'); },
  setProduk(d)        { this._set('storo_produk', d); },
  addProduk(p)        { const d = this.getProduk(); d.push(p); this.setProduk(d); },
  updateProduk(id, u) { this.setProduk(this.getProduk().map(p => p.id === id ? { ...p, ...u } : p)); },
  deleteProduk(id)    { this.setProduk(this.getProduk().filter(p => p.id !== id)); },
  findProduk(id)      { return this.getProduk().find(p => p.id === id); },

  // TRANSAKSI
  getTransaksi()    { return this._get('storo_transaksi'); },
  addTransaksi(t)   { const d = this.getTransaksi(); d.unshift(t); this._set('storo_transaksi', d); },

  // PROFIL TOKO
  getProfil() {
    return this._getObj('storo_profil', {
      nama: 'Toko Sutoro', tagline: 'Sembako & Kelontong',
      deskripsi: 'Toko Sutoro adalah toko kelontong dan sembako milik keluarga yang terletak di Desa Piasa Wetan, Kecamatan Susukan, Kabupaten Banjarnagera. Terletak di pertigaan yang ramai dilewati pengguna jalan yang menyebabkan lokasinya sangat strategis. Toko ini telah melayani masyarakat sekitar sejak tahun 2016 sampai sekarang. Kami hadir dengan komitmen untuk menyediakan kebutuhan sehari-hari dengan harga terjangkau dan kualitas terjamin. Belanja tenang, hati senang, dompet aman.',
      telepon: '+62 812-2515-0082', email: 'tokosutoro@gmail.com',
      alamat: 'Karajan, Desa Piasa Wetan, Kec. Susukan, Kab. Banjarnegara, Jawa Tengah, 53475',
      maps: 'https://maps.app.goo.gl/VUhWu3qZkjnnkPbU8',
      jamSenJum: '06.00 – 22.00 WIB', jamSabtu: '06.00 – 22.00 WIB',
      jamMinggu: '06.00 – 24.00 WIB', jamRaya: '06.00 – 24.00 WIB'
    });
  },
  setProfil(d) { this._set('storo_profil', d); },

  // COUNTER
  nextId(k) {
    const n = (parseInt(localStorage.getItem(k) || '0') + 1);
    localStorage.setItem(k, n); return n;
  }
};

/* ════════════════════════════════
   SEED DATA
════════════════════════════════ */
function seedData() {
  // ═══════════════════════════════════════════════════════════════
  // CARA MENAMBAH / MENGGANTI FOTO PRODUK:
  //   1. Simpan file foto ke folder:  images/produk/
  //   2. Tulis nama filenya di kolom  foto:'...'  di bawah
  //      Contoh: foto:'beras premium 5kg.webp'
  //   3. Simpan app.js lalu refresh browser → foto langsung muncul
  //
  // Foto TIDAK akan pernah hilang karena selalu dibaca dari sini,
  // bukan dari localStorage. Stok & harga tetap aman di localStorage.
  // ═══════════════════════════════════════════════════════════════

  const PRODUK_MASTER = [
    { id:'P001', nama:'Beras Premium 5kg',     kategori:'Beras & Gandum',  hargaBeli:65000, hargaJual:72000,  stok:50,  stokMin:10, satuan:'karung', foto:'beras premium 5kg.jpg',   deskripsi:'Beras kualitas premium, pulen dan harum' },
    { id:'P002', nama:'Beras Medium 5kg',       kategori:'Beras & Gandum',  hargaBeli:55000, hargaJual:62000,  stok:40,  stokMin:10, satuan:'karung', foto:'beras medium 5kg.jpg',     deskripsi:'Beras medium, cocok untuk kebutuhan harian' },
    { id:'P003', nama:'Minyak Goreng 1L',       kategori:'Minyak & Lemak',  hargaBeli:14000, hargaJual:17000,  stok:60,  stokMin:15, satuan:'botol',  foto:'minyak goreng 1L.jpg',            deskripsi:'Minyak goreng jernih, cocok untuk memasak' },
    { id:'P004', nama:'Minyak Goreng 2L',       kategori:'Minyak & Lemak',  hargaBeli:27000, hargaJual:31000,  stok:4,   stokMin:10, satuan:'botol',  foto:'minyak goreng 2L.jpg',            deskripsi:'Ekonomis untuk keluarga besar' },
    { id:'P005', nama:'Gula Pasir 1kg',         kategori:'Gula & Garam',    hargaBeli:13000, hargaJual:16000,  stok:80,  stokMin:20, satuan:'kg',     foto:'gula pasir 1kg.jpg',           deskripsi:'Gula pasir murni, manis alami' },
    { id:'P006', nama:'Garam Halus 250g',       kategori:'Gula & Garam',    hargaBeli:2500,  hargaJual:3500,   stok:3,   stokMin:10, satuan:'bks',    foto:'garam halus 250g.webp',          deskripsi:'Garam beryodium halus' },
    { id:'P007', nama:'Teh Celup Sariwangi',    kategori:'Minuman',         hargaBeli:7000,  hargaJual:9500,   stok:45,  stokMin:10, satuan:'pak',    foto:'teh celup.jpg',        deskripsi:'Teh celup original, aromanya khas' },
    { id:'P008', nama:'Kopi Kapal Api',         kategori:'Minuman',         hargaBeli:8500,  hargaJual:11000,  stok:30,  stokMin:10, satuan:'pak',    foto:'kopi kapal api 60g.jpg',       deskripsi:'Kopi tubruk pilihan para penikmati kopi' },
    { id:'P009', nama:'Indomie Goreng',         kategori:'Snack & Makanan', hargaBeli:2700,  hargaJual:3500,   stok:120, stokMin:24, satuan:'pcs',    foto:'indomie goreng.png',       deskripsi:'Mi goreng instan favorit keluarga' },
    { id:'P010', nama:'Indomie Soto',           kategori:'Snack & Makanan', hargaBeli:2700,  hargaJual:3500,   stok:90,  stokMin:24, satuan:'pcs',    foto:'indomie soto.jpg',         deskripsi:'Mi soto dengan kuah gurih segar' },
    { id:'P011', nama:'Sabun Mandi Lifebuoy',   kategori:'Sabun & Detergen',hargaBeli:4500,  hargaJual:6000,   stok:2,   stokMin:10, satuan:'pcs',    foto:'sabun lifebuoy batang besar.jpg',       deskripsi:'Sabun mandi antibakteri' },
    { id:'P012', nama:'Detergen Rinso 800g',    kategori:'Sabun & Detergen',hargaBeli:18000, hargaJual:22000,  stok:20,  stokMin:8,  satuan:'bks',    foto:'rinso 800g.jpg',       deskripsi:'Detergen bubuk bersih sempurna' },
    { id:'P013', nama:'Susu Kental Manis',      kategori:'Minuman',         hargaBeli:11000, hargaJual:14500,  stok:24,  stokMin:6,  satuan:'kaleng', foto:'susu kaleng.jpg',    deskripsi:'Susu kental manis creamy' },
    { id:'P014', nama:'Tepung Terigu Segitiga', kategori:'Beras & Gandum',  hargaBeli:10000, hargaJual:13000,  stok:35,  stokMin:10, satuan:'kg',     foto:'segitiga biru 1kg.jpg',      deskripsi:'Tepung serbaguna untuk masak & kue' },
    { id:'P015', nama:'Kecap Manis Bango',      kategori:'Lainnya',         hargaBeli:12000, hargaJual:15500,  stok:18,  stokMin:6,  satuan:'btl',    foto:'kecap botol.png',          deskripsi:'Kecap manis kental pilihan dapur' },
    { id:'P016', nama:'Mie Sedaap Goreng',      kategori:'Snack & Makanan', hargaBeli:2800,  hargaJual:3500,   stok:80,  stokMin:20, satuan:'pcs',    foto:'sedaap goreng.jpg',           deskripsi:'Mie goreng dengan bumbu sedap' },
  ];

  // Buat peta: { 'P001': 'beras premium 5kg.webp', ... }
  const fotoMap = {};
  PRODUK_MASTER.forEach(p => { fotoMap[p.id] = p.foto; });

  if (DB.getProduk().length === 0) {
    // Pertama kali buka: simpan semua produk
    DB.setProduk(PRODUK_MASTER);
    localStorage.setItem('storo_produk_ctr', PRODUK_MASTER.length);
  } else {
    // Sudah ada data: SELALU timpa kolom foto dari kode di atas
    // (stok, harga, dll tetap dari localStorage — tidak ditimpa)
    const synced = DB.getProduk().map(p => ({
      ...p,
      foto: fotoMap.hasOwnProperty(p.id) ? fotoMap[p.id] : p.foto
    }));
    DB.setProduk(synced);
  }
}

/* ════════════════════════════════
   STATE
════════════════════════════════ */
let keranjang       = [];
let editProdukId    = null;
let katAktif        = 'semua';

/* ════════════════════════════════
   NAVBAR — SCROLL & MOBILE
════════════════════════════════ */
window.addEventListener('scroll', () => {
  const nb = document.getElementById('navbar');
  if (nb) nb.classList.toggle('scrolled', window.scrollY > 40);

  // Aktifkan nav-link sesuai section
  const sections = ['beranda','produk','tentang','galeri','kontak'];
  let current = '';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 100) current = id;
  });
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + current);
  });
});

function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ════════════════════════════════
   PRODUK PUBLIK (Golden Rule 1: Consistency)
════════════════════════════════ */
function filterKategori(btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  katAktif = btn.dataset.kat;
  renderProdukPublik();
}

function renderProdukPublik() {
  const cari  = (document.getElementById('searchPublik')?.value || '').toLowerCase();
  let produk  = DB.getProduk();

  if (katAktif && katAktif !== 'semua') produk = produk.filter(p => p.kategori === katAktif);
  if (cari) produk = produk.filter(p => p.nama.toLowerCase().includes(cari) || p.kategori.toLowerCase().includes(cari) || (p.deskripsi||'').toLowerCase().includes(cari));

  const grid  = document.getElementById('produkGrid');
  const empty = document.getElementById('produkEmpty');

  if (produk.length === 0) {
    grid.innerHTML = '';
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';

  grid.innerHTML = produk.map(p => {
    const stokTag = p.stok === 0
      ? `<span class="prod-stok-tag stok-habis">Habis</span>`
      : p.stok <= p.stokMin
        ? `<span class="prod-stok-tag stok-tipis">Hampir Habis</span>`
        : `<span class="prod-stok-tag stok-ada">Tersedia</span>`;
        
    const imgSrc = p.foto ? `images/produk/${esc(p.foto)}` : '';

    return `
    <div class="prod-card">
      <div class="prod-card-img">
        ${imgSrc
          ? `<img src="${imgSrc}" alt="${esc(p.nama)}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/><div class="prod-no-img" style="display:none"><i class="fas fa-box-open"></i><span>${esc(p.kategori)}</span></div>`
          : `<div class="prod-no-img"><i class="fas fa-box-open"></i><span>${esc(p.kategori)}</span></div>`
        }
        <span class="prod-card-badge">${esc(p.kategori)}</span>
      </div>
      <div class="prod-card-body">
        <div class="prod-cat">${esc(p.kategori)}</div>
        <div class="prod-name">${esc(p.nama)}</div>
        ${p.deskripsi ? `<div class="prod-desk">${esc(p.deskripsi)}</div>` : ''}
        <div class="prod-footer">
          <div class="prod-price">${rupiah(p.hargaJual)}<span style="font-size:.72rem;font-weight:400;color:var(--gray)"> /${esc(p.satuan||'pcs')}</span></div>
          ${stokTag}
        </div>
      </div>
    </div>`;
  }).join('');

  // Update hero stat
  document.getElementById('heroJumlahProduk').textContent = DB.getProduk().length + '+';
}

/* ════════════════════════════════
   PROFIL TOKO — TAMPILAN PUBLIK
════════════════════════════════ */
function applyProfil() {
  const p = DB.getProfil();
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

  set('deskripsiToko', p.deskripsi);
  set('alamatToko',    p.alamat);
  set('teleponToko',   p.telepon);
  set('emailToko',     p.email);

  const waLink   = document.getElementById('waLink');
  const gmLink   = document.getElementById('gmapsLink');
  if (waLink) waLink.href = 'https://wa.me/' + p.telepon.replace(/[^0-9]/g,'');
  if (gmLink) { gmLink.href = p.maps; gmLink.nextElementSibling?.remove?.(); }

  // Jam buka
  const jamList = document.getElementById('jamList');
  if (jamList) {
    jamList.innerHTML = `
      <div class="jam-item"><span>Senin – Jumat</span><span class="jam-time">${esc(p.jamSenJum)}</span></div>
      <div class="jam-item"><span>Sabtu</span><span class="jam-time">${esc(p.jamSabtu)}</span></div>
      <div class="jam-item"><span>Minggu</span><span class="jam-time">${esc(p.jamMinggu)}</span></div>
      <div class="jam-item"><span>Hari Raya</span><span class="jam-time">${esc(p.jamRaya)}</span></div>`;
  }

  // Kontak
  const kinfos = document.querySelectorAll('.kinfo-card');
  if (kinfos[1]) {
    const ph = kinfos[1].querySelector('p');
    const wa = kinfos[1].querySelector('.wa-btn');
    if (ph) ph.textContent = p.telepon;
    if (wa) wa.href = 'https://wa.me/' + p.telepon.replace(/[^0-9]/g,'');
  }
  if (kinfos[3]) { const ph = kinfos[3].querySelector('p'); if (ph) ph.textContent = p.email; }
}

/* ════════════════════════════════
   ADMIN: LOGIN (Golden Rule 8: Reduce cognitive load)
════════════════════════════════ */
const ADMIN_PASS = 'admin123';

function bukaAdmin() {
  openModal('loginOverlay');
  setTimeout(() => document.getElementById('loginPass').focus(), 200);
}

function loginAdmin() {
  const val = document.getElementById('loginPass').value;
  const err = document.getElementById('loginErr');
  if (val !== ADMIN_PASS) {
    err.style.display = 'flex';
    document.getElementById('loginPass').value = '';
    document.getElementById('loginPass').focus();
    return;
  }
  err.style.display = 'none';
  closeModal('loginOverlay');
  document.getElementById('loginPass').value = '';
  document.getElementById('publicSite').style.display  = 'none';
  document.getElementById('adminPanel').style.display  = 'flex';
  localStorage.setItem('isAdmActive', 'true');
  admPage('dashboard');
  updateAdmDate();
}

function keluarAdmin() {
  document.getElementById('adminPanel').style.display  = 'none';
  document.getElementById('publicSite').style.display  = 'block';
  applyProfil();
  renderProdukPublik();
}

function togglePass() {
  const inp  = document.getElementById('loginPass');
  const icon = document.getElementById('eyeIcon');
  if (inp.type === 'password') { inp.type = 'text'; icon.classList.replace('fa-eye','fa-eye-slash'); }
  else { inp.type = 'password'; icon.classList.replace('fa-eye-slash','fa-eye'); }
}

/* ════════════════════════════════
   ADMIN: NAVIGASI HALAMAN
════════════════════════════════ */
const admTitles = { dashboard:'Dashboard', produk:'Manajemen Produk', kasir:'Kasir / Transaksi', riwayat:'Riwayat Transaksi', laporan:'Laporan Keuangan' };

function admPage(page) {
  document.querySelectorAll('.adm-page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.adm-nav-item').forEach(n => n.classList.remove('active'));

  const pg = document.getElementById('adm-' + page);
  if (pg) pg.classList.add('active');
  document.querySelector(`[data-adm="${page}"]`)?.classList.add('active');
  document.getElementById('admTopTitle').textContent = admTitles[page] || page;

  localStorage.setItem('activeAdmPage', page);

  if (page === 'dashboard') renderDashboard();
  if (page === 'produk')    renderAdmProduk();
  if (page === 'kasir')     { renderKasirProduk(); renderKeranjang(); }
  if (page === 'riwayat')   renderRiwayat();
  if (page === 'laporan')   renderLaporan();

  // Mobile: tutup sidebar
  if (window.innerWidth <= 768) document.getElementById('admSidebar').classList.remove('open');
}

function toggleAdmSidebar() {
  const sidebar = document.getElementById('admSidebar');
  
  if (window.innerWidth <= 768) {
    // Mode Mobile: Sidebar muncul dari samping (overlay)
    sidebar.classList.toggle('open');
  } else {
    // Mode Desktop: Sidebar menyusut (collapse)
    sidebar.classList.toggle('collapsed');
    
    // Opsional: Simpan status di storage agar saat refresh tidak balik lagi
    const isCollapsed = sidebar.classList.contains('collapsed');
    localStorage.setItem('sidebarStatus', isCollapsed ? 'hidden' : 'visible');
  }
}

function updateAdmDate() {
  const el = document.getElementById('admDate');
  if (el) el.textContent = new Date().toLocaleDateString('id-ID', { weekday:'long', day:'numeric', month:'long', year:'numeric' });
}

/* ════════════════════════════════
   DASHBOARD (Golden Rule 3: Informative feedback)
════════════════════════════════ */
function renderDashboard() {
  const produk = DB.getProduk();
  const trx    = DB.getTransaksi();
  const today  = new Date().toDateString();

  const todayTrx  = trx.filter(t => new Date(t.tanggal).toDateString() === today);
  const pendapatan = todayTrx.reduce((s, t) => s + t.total, 0);
  const stokRendah = produk.filter(p => p.stok <= p.stokMin);

  document.getElementById('dsProduk').textContent    = produk.length;
  document.getElementById('dsTrx').textContent       = todayTrx.length;
  document.getElementById('dsPendapatan').textContent= rupiah(pendapatan);
  document.getElementById('dsStokRendah').textContent= stokRendah.length;

  // Stok rendah list
  const sl = document.getElementById('dsStokList');
  sl.innerHTML = stokRendah.length === 0
    ? `<div class="empty-state"><i class="fas fa-check-circle" style="color:var(--success);opacity:1"></i><p>Semua stok aman</p></div>`
    : stokRendah.map(p => `
        <div class="ds-stok-item">
          <div><div class="sn">${esc(p.nama)}</div><div style="font-size:.72rem;color:var(--gray)">${esc(p.kategori)}</div></div>
          <div class="ss">Sisa ${p.stok} ${esc(p.satuan||'')}</div>
        </div>`).join('');

  // Transaksi terbaru
  const tl = document.getElementById('dsTrxList');
  tl.innerHTML = trx.slice(0,6).length === 0
    ? `<div class="empty-state"><i class="fas fa-receipt"></i><p>Belum ada transaksi</p></div>`
    : trx.slice(0,6).map(t => `
        <div class="ds-trx-item">
          <div><div class="tn">${esc(t.id)}</div><div class="tt">${fmtDt(t.tanggal)}</div></div>
          <div class="tv">${rupiah(t.total)}</div>
        </div>`).join('');
}

/* ════════════════════════════════
   PRODUK — ADMIN TABLE
════════════════════════════════ */
function renderAdmProduk() {
  const cari = (document.getElementById('admSrchProduk')?.value || '').toLowerCase();
  const kat  = document.getElementById('admFltKat')?.value || '';
  let produk = DB.getProduk();

  if (cari) produk = produk.filter(p => p.nama.toLowerCase().includes(cari) || p.kategori.toLowerCase().includes(cari));
  if (kat)  produk = produk.filter(p => p.kategori === kat);

  const tbody = document.getElementById('admProdukBody');
  if (produk.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9"><div class="empty-state"><i class="fas fa-boxes-stacked"></i><p>Tidak ada produk ditemukan</p></div></td></tr>`;
    return;
  }

  tbody.innerHTML = produk.map((p, i) => {
    const badge = p.stok === 0
      ? `<span class="badge b-danger">Habis</span>`
      : p.stok <= p.stokMin
        ? `<span class="badge b-warn">Menipis</span>`
        : `<span class="badge b-ok">Tersedia</span>`;
    const imgSrc = p.foto ? `images/produk/${esc(p.foto)}` : '';
    return `
    <tr>
      <td>${i+1}</td>
      <td>
        <div class="tbl-prod-img">
          ${imgSrc
            ? `<img src="${imgSrc}" alt="" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/><div class="no-img" style="display:none"><i class="fas fa-image"></i></div>`
            : `<div class="no-img"><i class="fas fa-image"></i></div>`}
        </div>
      </td>
      <td><div class="pname">${esc(p.nama)}</div><div style="font-size:.75rem;color:var(--gray)">${esc(p.deskripsi||'')}</div></td>
      <td><span class="badge" style="background:var(--blue-50);color:var(--blue-700)">${esc(p.kategori)}</span></td>
      <td>${rupiah(p.hargaBeli)}</td>
      <td style="font-weight:700;color:var(--blue-700)">${rupiah(p.hargaJual)}</td>
      <td><strong>${p.stok}</strong> <span style="color:var(--gray);font-size:.78rem">${esc(p.satuan||'')}</span></td>
      <td>${badge}</td>
      <td>
        <div class="act-btns">
          <button class="act-btn edit" title="Edit" onclick="editProduk('${p.id}')"><i class="fas fa-pen"></i></button>
          <button class="act-btn del"  title="Hapus" onclick="hapusProduk('${p.id}')"><i class="fas fa-trash"></i></button>
        </div>
      </td>
    </tr>`;
  }).join('');
}

/* ════════════════════════════════
   PRODUK — MODAL (Golden Rule 5: Error prevention)
════════════════════════════════ */
function openProdukModal() {
  editProdukId = null;
  document.getElementById('produkModalTitle').textContent = 'Tambah Produk';
  ['pId','pNamaProduk','pKategori','pHargaBeli','pHargaJual','pStok','pStokMin','pSatuan','pDesk'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  openModal('produkOverlay');
}

function editProduk(id) {
  const p = DB.findProduk(id);
  if (!p) return;
  editProdukId = id;
  document.getElementById('produkModalTitle').textContent = 'Edit Produk';
  document.getElementById('pId').value          = p.id;
  document.getElementById('pNamaProduk').value  = p.nama;
  document.getElementById('pKategori').value    = p.kategori;
  document.getElementById('pHargaBeli').value   = p.hargaBeli;
  document.getElementById('pHargaJual').value   = p.hargaJual;
  document.getElementById('pStok').value        = p.stok;
  document.getElementById('pStokMin').value     = p.stokMin || 5;
  document.getElementById('pSatuan').value      = p.satuan || '';
  document.getElementById('pDesk').value        = p.deskripsi || '';
  openModal('produkOverlay');
}

function simpanProduk() {
  const nama      = document.getElementById('pNamaProduk').value.trim();
  const kategori  = document.getElementById('pKategori').value;
  const hargaBeli = parseInt(document.getElementById('pHargaBeli').value);
  const hargaJual = parseInt(document.getElementById('pHargaJual').value);
  const stok      = parseInt(document.getElementById('pStok').value);
  const stokMin   = parseInt(document.getElementById('pStokMin').value) || 5;
  const satuan    = document.getElementById('pSatuan').value.trim() || 'pcs';
  const deskripsi = document.getElementById('pDesk').value.trim();

  if (!nama)                         return toast('Nama produk wajib diisi!', 'error');
  if (!kategori)                     return toast('Pilih kategori terlebih dahulu!', 'error');
  if (isNaN(hargaBeli)||hargaBeli<0) return toast('Harga beli tidak valid!', 'error');
  if (isNaN(hargaJual)||hargaJual<0) return toast('Harga jual tidak valid!', 'error');
  if (isNaN(stok)||stok<0)           return toast('Stok tidak valid!', 'error');
  if (hargaJual < hargaBeli)         return toast('Peringatan: harga jual lebih kecil dari harga beli!', 'warn');

  if (editProdukId) {
    // Saat edit: pertahankan foto yang sudah ada, jangan ditimpa
    const existing = DB.findProduk(editProdukId);
    DB.updateProduk(editProdukId, { nama, kategori, hargaBeli, hargaJual, stok, stokMin, satuan, deskripsi, foto: existing?.foto || '' });
    toast('Produk berhasil diperbarui ✓', 'success');
  } else {
    // Produk baru: foto kosong dulu, nanti tambahkan di PRODUK_MASTER
    const n  = DB.nextId('storo_produk_ctr');
    const id = 'P' + String(n).padStart(3, '0');
    DB.addProduk({ id, nama, kategori, hargaBeli, hargaJual, stok, stokMin, satuan, deskripsi, foto: '' });
    toast(`Produk berhasil ditambahkan (ID: ${id}) ✓\nTambahkan foto di PRODUK_MASTER app.js dengan id:'${id}'`, 'success');
  }

  closeModal('produkOverlay');
  renderAdmProduk();
  renderDashboard();
}

function hapusProduk(id) {
  const p = DB.findProduk(id);
  if (!p) return;
  // Golden Rule 6: Permit easy reversal — konfirmasi sebelum hapus
  if (!confirm(`Hapus produk "${p.nama}"?\nTindakan ini tidak dapat dibatalkan.`)) return;
  DB.deleteProduk(id);
  renderAdmProduk();
  renderDashboard();
  toast('Produk dihapus.', 'warn');
}

/* pFoto tidak lagi ada di form — foto dikelola dari PRODUK_MASTER di seedData() */

/* ════════════════════════════════
   KASIR / TRANSAKSI
════════════════════════════════ */
function renderKasirProduk() {
  const cari  = (document.getElementById('kasirSrch')?.value || '').toLowerCase();
  let produk  = DB.getProduk();
  if (cari) produk = produk.filter(p => p.nama.toLowerCase().includes(cari) || p.kategori.toLowerCase().includes(cari));

  const grid = document.getElementById('kasirGrid');
  if (produk.length === 0) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><i class="fas fa-box-open"></i><p>Produk tidak ditemukan</p></div>`;
    return;
  }

  grid.innerHTML = produk.map(p => {
    const habis  = p.stok === 0;
    const imgSrc = p.foto ? `images/produk/${esc(p.foto)}` : '';
    return `
    <div class="kasir-card ${habis ? 'habis' : ''}" onclick="${habis ? '' : `addToKeranjang('${p.id}')`}" title="${habis ? 'Stok habis' : p.nama}">
      <div class="kasir-card-img">
        ${imgSrc
          ? `<img src="${imgSrc}" alt="" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/><div class="no-img" style="display:none"><i class="fas fa-box-open"></i></div>`
          : `<div class="no-img"><i class="fas fa-box-open"></i></div>`}
      </div>
      <div class="kc-cat">${esc(p.kategori)}</div>
      <div class="kc-name">${esc(p.nama)}</div>
      <div class="kc-price">${rupiah(p.hargaJual)}</div>
      <div class="kc-stok">${habis ? '⚠ Stok habis' : `Stok: ${p.stok} ${esc(p.satuan||'')}`}</div>
    </div>`;
  }).join('');
}

function addToKeranjang(produkId) {
  const p = DB.findProduk(produkId);
  if (!p || p.stok === 0) return toast('Stok produk habis!', 'error');
  const ex = keranjang.find(k => k.produkId === produkId);
  if (ex) {
    if (ex.qty >= p.stok) return toast('Stok tidak mencukupi!', 'warn');
    ex.qty++; ex.subtotal = ex.qty * ex.hargaJual;
  } else {
    keranjang.push({ produkId, nama: p.nama, satuan: p.satuan||'pcs', hargaJual: p.hargaJual, qty: 1, subtotal: p.hargaJual });
  }
  renderKeranjang();
  hitungTotal();
}

function renderKeranjang() {
  const el = document.getElementById('keranjangList');
  if (!el) return;
  if (keranjang.length === 0) {
    el.innerHTML = `<div class="kr-empty"><i class="fas fa-cart-shopping"></i>Keranjang masih kosong<br>Pilih produk di sebelah kiri</div>`;
    hitungTotal();
    return;
  }
  el.innerHTML = keranjang.map((item, i) => `
    <div class="kr-item">
      <div class="kr-info">
        <div class="kr-n">${esc(item.nama)}</div>
        <div class="kr-p">${rupiah(item.hargaJual)} / ${esc(item.satuan)}</div>
      </div>
      <div class="qty-ctrl">
        <button onclick="ubahQty(${i},-1)">−</button>
        <span>${item.qty}</span>
        <button onclick="ubahQty(${i},1)">+</button>
      </div>
      <div class="kr-total">${rupiah(item.subtotal)}</div>
    </div>`).join('');
  hitungTotal();
}

function ubahQty(idx, delta) {
  const item = keranjang[idx];
  const prod = DB.findProduk(item.produkId);
  const nq   = item.qty + delta;
  if (nq <= 0) { keranjang.splice(idx, 1); }
  else if (prod && nq > prod.stok) { return toast('Stok tidak mencukupi!', 'warn'); }
  else { item.qty = nq; item.subtotal = nq * item.hargaJual; }
  renderKeranjang();
}

function hitungTotal() {
  const subtotal = keranjang.reduce((s, k) => s + k.subtotal, 0);
  const diskon   = parseFloat(document.getElementById('kDiskon')?.value || 0);
  const total    = Math.round(subtotal - (subtotal * diskon / 100));

  setText('kSubtotal', rupiah(subtotal));
  setText('kTotal',    rupiah(total));
  hitungKembalian();
  return total;
}

function hitungKembalian() {
  const totalStr = document.getElementById('kTotal')?.textContent || 'Rp 0';
  const total    = parseInt(totalStr.replace(/[^0-9]/g, '')) || 0;
  const bayar    = parseFloat(document.getElementById('kBayar')?.value || 0);
  const kemb     = bayar - total;
  setText('kKembalian', kemb < 0 ? `-${rupiah(Math.abs(kemb))}` : rupiah(Math.max(0, kemb)));
}

function prosesTransaksi() {
  if (keranjang.length === 0) return toast('Keranjang masih kosong!', 'error');

  const subtotal = keranjang.reduce((s, k) => s + k.subtotal, 0);
  const diskon   = parseFloat(document.getElementById('kDiskon').value || 0);
  const total    = Math.round(subtotal - (subtotal * diskon / 100));
  const bayar    = parseFloat(document.getElementById('kBayar').value || 0);

  if (bayar < total) return toast('Nominal bayar kurang dari total!', 'error');

  for (const item of keranjang) {
    const p = DB.findProduk(item.produkId);
    if (!p || p.stok < item.qty) return toast(`Stok ${item.nama} tidak cukup!`, 'error');
    DB.updateProduk(item.produkId, { stok: p.stok - item.qty });
  }

  const n    = DB.nextId('storo_trx_ctr');
  const trxId = 'TRX' + new Date().getFullYear() + String(n).padStart(5,'0');

  DB.addTransaksi({
    id: trxId, tanggal: new Date().toISOString(),
    items: keranjang.map(k => ({ ...k })),
    subtotal, diskon, total, bayar,
    kembalian: bayar - total
  });

  toast(`✓ Transaksi ${trxId} berhasil! Kembalian: ${rupiah(bayar - total)}`, 'success');
  clearKeranjang();
  renderKasirProduk();
}

function clearKeranjang() {
  keranjang = [];
  const kd = document.getElementById('kDiskon');
  const kb = document.getElementById('kBayar');
  if (kd) kd.value = 0;
  if (kb) kb.value = '';
  renderKeranjang();
}

/* ════════════════════════════════
   RIWAYAT
════════════════════════════════ */
function renderRiwayat() {
  const cari = (document.getElementById('riwSrch')?.value || '').toLowerCase();
  const tgl  = document.getElementById('riwDate')?.value || '';
  let trx    = DB.getTransaksi();

  if (cari) trx = trx.filter(t => t.id.toLowerCase().includes(cari));
  if (tgl)  trx = trx.filter(t => t.tanggal.startsWith(tgl));

  const tbody = document.getElementById('riwayatBody');
  if (trx.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7"><div class="empty-state"><i class="fas fa-clock-rotate-left"></i><p>Belum ada transaksi</p></div></td></tr>`;
    return;
  }

  tbody.innerHTML = trx.map(t => `
    <tr>
      <td><strong style="color:var(--blue-700)">${esc(t.id)}</strong></td>
      <td style="font-size:.82rem">${fmtDt(t.tanggal)}</td>
      <td>${t.items.length} item</td>
      <td style="font-weight:700;color:var(--blue-700)">${rupiah(t.total)}</td>
      <td>${rupiah(t.bayar)}</td>
      <td>${rupiah(t.kembalian)}</td>
      <td><button class="act-btn view" onclick="lihatDetail('${t.id}')"><i class="fas fa-eye"></i></button></td>
    </tr>`).join('');
}

function lihatDetail(id) {
  const t = DB.getTransaksi().find(x => x.id === id);
  if (!t) return;
  document.getElementById('detailBody').innerHTML = `
    <div class="detail-trx">
      <div class="dr"><span>ID Transaksi</span><span>${esc(t.id)}</span></div>
      <div class="dr"><span>Tanggal</span><span>${fmtDt(t.tanggal)}</span></div>
      <div class="detail-items">
        <h4>Rincian Item</h4>
        ${t.items.map(it => `
          <div class="di-row"><span>${esc(it.nama)} × ${it.qty} ${esc(it.satuan||'')}</span><strong>${rupiah(it.subtotal)}</strong></div>`).join('')}
      </div>
      <div class="dr"><span>Subtotal</span><span>${rupiah(t.subtotal)}</span></div>
      <div class="dr"><span>Diskon</span><span>${t.diskon}%</span></div>
      <div class="dr" style="border-top:2px solid var(--blue-200);padding-top:10px"><span><strong>Total</strong></span><span style="font-size:1.1rem;color:var(--blue-700)"><strong>${rupiah(t.total)}</strong></span></div>
      <div class="dr"><span>Bayar</span><span>${rupiah(t.bayar)}</span></div>
      <div class="dr"><span>Kembalian</span><span>${rupiah(t.kembalian)}</span></div>
    </div>`;
  openModal('detailOverlay');
}

function exportCSV() {
  const trx = DB.getTransaksi();
  if (!trx.length) return toast('Belum ada data untuk diekspor!', 'warn');
  let csv = 'ID,Tanggal,Items,Subtotal,Diskon(%),Total,Bayar,Kembalian\n';
  trx.forEach(t => {
    const items = t.items.map(i => `${i.nama}(${i.qty})`).join('; ');
    csv += `${t.id},"${fmtDt(t.tanggal)}","${items}",${t.subtotal},${t.diskon},${t.total},${t.bayar},${t.kembalian}\n`;
  });
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = `transaksi_sutoro_${new Date().toISOString().slice(0,10)}.csv`;
  a.click(); URL.revokeObjectURL(url);
  toast('File CSV berhasil diunduh!', 'success');
}

/* ════════════════════════════════
   PROFIL TOKO — ADMIN
════════════════════════════════ */
function loadProfilForm() {
  const p = DB.getProfil();
  setValue('pNama',     p.nama);
  setValue('pTagline',  p.tagline);
  setValue('pDeskripsi',p.deskripsi);
  setValue('pTelepon',  p.telepon);
  setValue('pEmail',    p.email);
  setValue('pAlamat',   p.alamat);
  setValue('pMaps',     p.maps);
  setValue('jamSenJum', p.jamSenJum);
  setValue('jamSabtu',  p.jamSabtu);
  setValue('jamMinggu', p.jamMinggu);
  setValue('jamRaya',   p.jamRaya);
}

function simpanProfil() {
  const profil = {
    nama:      document.getElementById('pNama').value.trim(),
    tagline:   document.getElementById('pTagline').value.trim(),
    deskripsi: document.getElementById('pDeskripsi').value.trim(),
    telepon:   document.getElementById('pTelepon').value.trim(),
    email:     document.getElementById('pEmail').value.trim(),
    alamat:    document.getElementById('pAlamat').value.trim(),
    maps:      document.getElementById('pMaps').value.trim(),
    jamSenJum: document.getElementById('jamSenJum').value.trim(),
    jamSabtu:  document.getElementById('jamSabtu').value.trim(),
    jamMinggu: document.getElementById('jamMinggu').value.trim(),
    jamRaya:   document.getElementById('jamRaya').value.trim(),
  };

  if (!profil.nama)    return toast('Nama toko tidak boleh kosong!', 'error');
  if (!profil.telepon) return toast('Nomor telepon tidak boleh kosong!', 'error');
  if (!profil.alamat)  return toast('Alamat tidak boleh kosong!', 'error');

  DB.setProfil(profil);
  toast('Profil toko berhasil disimpan ✓', 'success');
}

/* ════════════════════════════════
   LAPORAN
════════════════════════════════ */
function renderLaporan() {
  const trx   = DB.getTransaksi();
  const total = trx.reduce((s, t) => s + t.total, 0);
  const rata  = trx.length ? total / trx.length : 0;

  setText('lapTotal', rupiah(total));
  setText('lapTrx',   trx.length);
  setText('lapRata',  rupiah(rata));

  const penjualan = {};
  trx.forEach(t => t.items.forEach(item => {
    if (!penjualan[item.nama]) penjualan[item.nama] = { qty:0, pen:0 };
    penjualan[item.nama].qty += item.qty;
    penjualan[item.nama].pen += item.subtotal;
  }));

  const sorted = Object.entries(penjualan).sort((a,b) => b[1].qty - a[1].qty);
  const tbody  = document.getElementById('lapProdukBody');
  tbody.innerHTML = sorted.length === 0
    ? `<tr><td colspan="3"><div class="empty-state"><i class="fas fa-chart-bar"></i><p>Belum ada data</p></div></td></tr>`
    : sorted.map(([nama, v]) => `
        <tr>
          <td><strong>${esc(nama)}</strong></td>
          <td>${v.qty} unit</td>
          <td style="font-weight:700;color:var(--blue-700)">${rupiah(v.pen)}</td>
        </tr>`).join('');
}

/* ════════════════════════════════
   MODAL UTILITIES
════════════════════════════════ */
function openModal(id)  { const m = document.getElementById(id); if (m) m.classList.add('open'); }
function closeModal(id) { const m = document.getElementById(id); if (m) m.classList.remove('open'); }

document.querySelectorAll('.overlay').forEach(ov => {
  ov.addEventListener('click', e => { if (e.target === ov) ov.classList.remove('open'); });
});

/* ════════════════════════════════
   TOAST (Golden Rule 3: Feedback)
════════════════════════════════ */
function toast(msg, type = 'info') {
  const icons = { success:'fa-circle-check', warn:'fa-triangle-exclamation', error:'fa-circle-xmark', info:'fa-circle-info' };
  const el    = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<i class="fas ${icons[type]||icons.info}"></i><span>${esc(msg)}</span>`;
  document.getElementById('toastWrap').appendChild(el);
  setTimeout(() => {
    el.style.opacity = '0'; el.style.transform = 'translateX(40px)'; el.style.transition = 'all .3s ease';
    setTimeout(() => el.remove(), 300);
  }, 3500);
}

/* ════════════════════════════════
   HELPERS
════════════════════════════════ */
function rupiah(n) { return 'Rp ' + Math.round(n||0).toLocaleString('id-ID'); }
function fmtDt(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('id-ID', { day:'2-digit', month:'short', year:'numeric' })
    + ' ' + d.toLocaleTimeString('id-ID', { hour:'2-digit', minute:'2-digit' });
}
function esc(s)       { return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function setText(id,v) { const el = document.getElementById(id); if (el) el.textContent = v; }
function setValue(id,v) { const el = document.getElementById(id); if (el) el.value = v; }

/* ════════════════════════════════
   SMOOTH SCROLL untuk NAV LINKS
════════════════════════════════ */
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) { window.scrollTo({ top: target.offsetTop - 68, behavior: 'smooth' }); }
      document.getElementById('navLinks').classList.remove('open');
    }
  });
});

/* ════════════════════════════════
   ADMIN NAV ITEMS
════════════════════════════════ */
document.querySelectorAll('.adm-nav-item').forEach(item => {
  item.addEventListener('click', () => admPage(item.dataset.adm));
});

/* ════════════════════════════════
   INIT
════════════════════════════════ */
seedData();
applyProfil();
renderProdukPublik();
updateAdmDate();
setInterval(updateAdmDate, 60000);

console.log('%c🏪 Toko Sutoro Ready ✓', 'color:#2563eb;font-weight:bold;font-size:16px');
console.log('Database: localStorage | Keys: storo_produk, storo_transaksi, storo_profil');
console.log('Admin password: admin123');

// logout
function handleLogout() {
    // Memunculkan pop-up konfirmasi bawaan browser
    const konfirmasi = confirm("Apakah anda yakin mau keluar?");

    if (konfirmasi) {
        // Jika klik OK (Yes)
        localStorage.removeItem('activeAdmPage');
        localStorage.removeItem('isAdmActive');
        // Hapus status login jika kamu pakai (opsional)
        // localStorage.removeItem('adminLoggedIn'); 

        // Balik ke beranda awal
        window.location.href = "index.html"; 
    } else {
        // Jika klik Cancel (No)
        console.log("Logout dibatalkan.");
    }
}

// Jalankan pengecekan status login & halaman saat refresh
document.addEventListener('DOMContentLoaded', () => {
    // 1. Cek apakah tadi sedang di mode admin
    const sedangAdmin = localStorage.getItem('isAdmActive'); 
    const lastPage    = localStorage.getItem('activeAdmPage');
    
    if (sedangAdmin === 'true') {
        // Tampilkan panel admin, sembunyikan site publik
        document.getElementById('publicSite').style.display  = 'none';
        document.getElementById('adminPanel').style.display  = 'flex';
        
        // Buka halaman terakhir (default ke dashboard jika kosong)
        admPage(lastPage || 'dashboard');
    } else {
        // Jika tidak sedang admin, pastikan site publik yang muncul
        document.getElementById('publicSite').style.display  = 'block';
        document.getElementById('adminPanel').style.display  = 'none';
    }
});
