import {getValueRadio, setInner, onClick, hide, show, getValue} from "https://cdn.jsdelivr.net/gh/jscroot/element@0.1.5/croot.js";
import {getHash} from "https://cdn.jsdelivr.net/gh/jscroot/url@0.0.9/croot.js";
import {get, postWithToken} from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.6/croot.js";
import {getCookie} from "https://cdn.jsdelivr.net/gh/jscroot/cookie@0.0.1/croot.js";

// Ambil data dan jalankan 2 fungsi callback sekaligus
const API_URL = "https://asia-southeast2-awangga.cloudfunctions.net/domyid/data/proyek/bimbingan/" + getHash()

get(API_URL, handleActivityScoreResponse, runafterGet);
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
    console.log("📋 Response masuk:", result);
    updateTableRow(0, result.sponsordata, result.sponsor);
    updateTableRow(1, result.stravakm, result.strava);
    updateTableRow(2, result.iqresult, result.iq);
    updateTableRow(3, result.pomokitsesi, result.pomokit);
    updateTableRow(6, result.trackerdata, result.tracker);
    updateTableRow(9, result.gtmetrixresult, result.gtmetrix);
    updateTableRow(10, result.webhookpush, result.webhook);
    updateTableRow(11, result.presensihari, result.presensi);
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
    let datarating = {
        id: getHash(),
        validasi: Number(getValueRadio("rating")),
        komentar: getValue("komentar"),
        approved: getChecked("checkbox-approved"),
    };
    setInner("feedback", "Mohon tunggu sebentar data sedang dikirim...");
    postWithToken(API_URL, "login", getCookie("login"), datarating, responseFunction);
}

function responseFunction(result) {
    console.log("✅ Rating response:", result);
    setInner("feedback", "Feedback telah berhasil dikirim. Terima kasih! " + result.phonenumber);
}

function getChecked(id) {
    const checkbox = document.getElementById(id);
    return checkbox && checkbox.checked;
}