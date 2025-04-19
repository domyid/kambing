import {getValueRadio, setInner, onClick, hide, show, getValue} from "https://cdn.jsdelivr.net/gh/jscroot/element@0.1.5/croot.js";
import {getHash} from "https://cdn.jsdelivr.net/gh/jscroot/url@0.0.9/croot.js";
import {get, postWithToken} from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.6/croot.js";
import {getCookie} from "https://cdn.jsdelivr.net/gh/jscroot/cookie@0.0.1/croot.js";

// Ambil data dan jalankan 2 fungsi callback sekaligus
get("https://asia-southeast2-awangga.cloudfunctions.net/domyid/data/proyek/bimbingan/" + getHash(), handleActivityScoreResponse, runafterGet);

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
    updateTableRow(1, result.stravakm, result.strava);
    updateTableRow(2, result.iqresult, result.iq);
    // updateTableRow(3, result.pomokitsesi, result.pomokit);
    updateTableRow(6, result.trackerdata, result.tracker);
    // updateTableRow(9, result.gtmetrixresult, result.gtmetrix);
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
            pointsCell.textContent = points || 0;
        }
    }
}

function runOnRating() {
    let datarating = {
        id: getHash(),
        rating: Number(getValueRadio("rating")),
        komentar: getValue("komentar")
    };
    setInner("feedback", "Mohon tunggu sebentar data sedang dikirim...");
    postWithToken("https://api.do.my.id/notif/ux/postrating", "login", getCookie("login"), datarating, responseFunction);
}

function responseFunction(result) {
    console.log("✅ Rating response:", result);
    setInner("feedback", "Feedback berhasil dikirim. Terima kasih! " + result.info);
}
