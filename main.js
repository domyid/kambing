import {getValueRadio, setInner, onClick, getValue} from "https://cdn.jsdelivr.net/gh/jscroot/element@0.1.5/croot.js";
import {getHash} from "https://cdn.jsdelivr.net/gh/jscroot/url@0.0.9/croot.js";
import {get, postWithToken} from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.6/croot.js";
import {getCookie} from "https://cdn.jsdelivr.net/gh/jscroot/cookie@0.0.1/croot.js";

// Ambil data dan jalankan 2 fungsi callback sekaligus
const API_URL = "https://asia-southeast2-awangga.cloudfunctions.net/domyid/data/proyek/bimbingan/" + getHash()

get(API_URL, handleActivityScoreResponse, runafterGet);

// Cek input dan atur status tombol
function checkInput() {
    const rating = getValueRadio("rating");
    const komentar = getValue("komentar").trim();
    const tombol = document.getElementById("tombol");

    tombol.disabled = !(rating && komentar !== "");
}

// Event listener untuk komentar dan radio rating
document.getElementById("komentar").addEventListener("input", checkInput);
document.querySelectorAll('input[name="rating"]').forEach(radio => {
    radio.addEventListener("change", checkInput);
});

onClick("tombol", runOnRating);

function runafterGet(result) {
    console.log("🔍 Raw data:", result);
    setInner("petugas", result.phonenumber);
    if (result.solusi) {
        let solusiDenganBarisBaru = result.solusi.replace(/\n/g, "<br>");
        setInner("solusi", solusiDenganBarisBaru);
    }
}

function handleActivityScoreResponse(result) {
    if (result.status && result.status.includes("Error : Data bimbingan tidak di temukan")) {
        window.location.href = "./404.html";
        return;
    }
    if (result.approved) {
        window.location.href = './approved.html';
        return;
    }
    console.log("📋 Response masuk:", result);

    const name = document.querySelector('.name');
    name.textContent = result.name;

    updateTableRow(0, result.sponsordata, result.sponsor);
    updateTableRow(1, result.stravakm, result.strava);
    updateTableRow(2, result.iqresult, result.iq);
    updateTableRow(3, result.pomokitsesi, result.pomokit);
    updateTableRow(4, result.mbc, result.mbcPoints || result.blockchain); 
    updateTableRow(5, result.rupiah, result.qrisPoints || result.qris);   
    updateTableRow(6, result.trackerdata, result.tracker);
    updateTableRow(9, result.gtmetrixresult, result.gtmetrix);
    updateTableRow(10, result.webhookpush, result.webhook);
    updateTableRow(11, result.presensihari, result.presensi);
    updateTableRow(12, result.rvn, result.ravencoinPoints || 0);
}

function updateTableRow(rowIndex, quantity, points) {
    const tableRows = document.querySelectorAll('table.table tbody tr');
    const row = tableRows[rowIndex];
    if (row) {
        const quantityCell = row.querySelector('td:nth-child(3)');
        const pointsCell = row.querySelector('td:nth-child(4)');

        if (quantityCell && pointsCell) {
            quantityCell.textContent = quantity || 0;
            
      // Ubah jadi 2 digit desimal kalau poin angka desimal
      if (!isNaN(points) && typeof points === "number") {
        pointsCell.textContent = points.toFixed(2);
      } else {
        pointsCell.textContent = points || 0;
      }
    }
  }
}

function runOnRating() {
    const tombol = document.getElementById('tombol');
    tombol.disabled = true;

    let datarating = {
        id: getHash(),
        validasi: Number(getValueRadio("rating")),
        komentar: getValue("komentar").trim(),
        approved: true,
    };
    setInner("feedback", "Mohon tunggu sebentar data sedang dikirim...");
    postWithToken(API_URL, "login", getCookie("login"), datarating, responseFunction);
}

function responseFunction(result) {
    console.log("✅ Rating response:", result);
    setInner("feedback", "Feedback telah berhasil dikirim. Terima kasih! " + result.phonenumber);
}