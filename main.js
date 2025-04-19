import {getValueRadio,setInner,onClick,hide,show,getValue} from "https://cdn.jsdelivr.net/gh/jscroot/element@0.1.5/croot.js";
import {getHash} from "https://cdn.jsdelivr.net/gh/jscroot/url@0.0.9/croot.js";
import {get,postWithToken} from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.6/croot.js";
import {getCookie} from "https://cdn.jsdelivr.net/gh/jscroot/cookie@0.0.1/croot.js";

get("https://asia-southeast2-awangga.cloudfunctions.net/domyid/data/proyek/bimbingan/"+getHash(), handleActivityScoreResponse, runafterGet)

onClick("tombol",runOnRating);

// export async function main(){
//     fetchActivityScore();
// }

function runafterGet(result){
    console.log(result);
    setInner("petugas",result.phonenumber);
    // Mengganti \n dengan <br> untuk menampilkan baris baru
    let solusiDenganBarisBaru = result.solusi.replace(/\n/g, "<br>");
    setInner("solusi", solusiDenganBarisBaru);
}

// function fetchActivityScore() {
//     const url = "https://asia-southeast2-awangga.cloudfunctions.net/domyid/data/proyek/bimbingan/" + getHash();
//     get(url, handleActivityScoreResponse);
// }

function handleActivityScoreResponse(result) {
    if (result.status === 200) {
        updateTableRow(1, result.data.stravakm, result.data.strava);
        updateTableRow(2, result.data.iqresult, result.data.iq);
        // updateTableRow(3, result.data.pomokitsesi, result.data.pomokit);
        updateTableRow(6, result.data.trackerdata, result.data.tracker);
        // updateTableRow(9, result.data.gtmetrixresult, result.data.gtmetrix);
        updateTableRow(10, result.data.webhookpush, result.data.webhook);
        updateTableRow(11, result.data.presensihari, result.data.presensi);
    } else {
        console.log(result.data.message);
    }
}

function updateTableRow(rowIndex, quantity, points) {
    const tableRows = document.querySelectorAll('table.table tbody tr');
    const row = tableRows[rowIndex]; // Ambil baris berdasarkan indeks
    if (row) {
        const quantityCell = row.querySelector('td:nth-child(3)');
        const pointsCell = row.querySelector('td:nth-child(4)');

        if (quantityCell && pointsCell) {
            quantityCell.textContent = quantity || 0;
            pointsCell.textContent = points || 0;
        }
    }
}

function runOnRating(){
    let datarating={
        id:getHash(),
        rating:Number(getValueRadio("rating")),
        komentar:getValue("komentar")
    }
    setInner("feedback","Mohon tunggu sebentar data sedang dikirim");
    postWithToken("https://api.do.my.id/notif/ux/postrating","login",getCookie("login"),datarating,responseFunction);
}

function responseFunction(result){
    console.log(result);
    setInner("feedback","Feedback berhasil dikirim terima kasih. "+result.info);

}
