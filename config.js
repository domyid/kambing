export const backend = {
    user: {
        data: 'https://asia-southeast2-awangga.cloudfunctions.net/domyid/data/user',
        todo: 'https://asia-southeast2-awangga.cloudfunctions.net/domyid/data/user/task/todo',
        doing: 'https://asia-southeast2-awangga.cloudfunctions.net/domyid/data/user/task/doing',
        done: 'https://asia-southeast2-awangga.cloudfunctions.net/domyid/data/user/task/done',
        pomokit:
            'https://asia-southeast2-awangga.cloudfunctions.net/domyid/report/pomokit/user',
    },
    wa: {
        text: 'https://api.wa.my.id/api/v2/send/message/text',
        device: 'https://api.wa.my.id/api/device/',
    },
    project: {
        data: 'https://asia-southeast2-awangga.cloudfunctions.net/domyid/data/proyek',
        anggota:
            'https://asia-southeast2-awangga.cloudfunctions.net/domyid/data/proyek/anggota',
        assessment:
            'https://asia-southeast2-awangga.cloudfunctions.net/domyid/data/proyek/bimbingan',
    },
    ux: {
        feedback:
            'https://asia-southeast2-awangga.cloudfunctions.net/domyid/notif/ux/postfeedback',
        laporan:
            'https://asia-southeast2-awangga.cloudfunctions.net/domyid/notif/ux/postlaporan',
        rating: 'https://asia-southeast2-awangga.cloudfunctions.net/domyid/notif/ux/rating',
        meeting:
            'https://asia-southeast2-awangga.cloudfunctions.net/domyid/notif/ux/postmeeting',
    },
    activityscore: {
        all: 'https://asia-southeast2-awangga.cloudfunctions.net/domyid/api/activityscore',
        weekly: 'https://asia-southeast2-awangga.cloudfunctions.net/domyid/api/activityscoreweekly',
    },
};