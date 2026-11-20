/* โหมดทดลอง (?demo=1) — ข้อมูลสมมติ ไม่เชื่อมต่อระบบจริง ใช้ดูหน้าตาและฝึกพนักงาน */
(function () {
  var params = new URLSearchParams(location.search);
  if (!params.has('demo')) return;
  var B = 5000;
  var TIERS = [
    { level: 0, name: 'CLASSIC', minStars: 0, discount: 0, discount2: 0, promoPass: 0, welcome: 'IV The Restorative 1 ครั้ง', birthday: 'IV The Restorative หรือเลเซอร์รักแร้ 1 ครั้ง', access: ['สะสมดาวทุก 5,000 บาท', 'แลกของรางวัลได้ทันทีที่มีดาว', 'วัคซีนไข้หวัดใหญ่ราคาสมาชิก 490 บาท'], desc: 'จุดเริ่มต้นของผิวที่ได้รับการดูแลอย่างใส่ใจ', color: '#F5F2EC', annual: [], welcomeCond: 'สำหรับสมาชิกที่มียอดใช้บริการภายใน 3 เดือน', birthdayCond: 'ใช้กับราคาปกติ ยอดขั้นต่ำ [__] บาท' },
    { level: 1, name: 'SIGNATURE', minStars: 10, maintStars: 8, discount: 0.10, discount2: 0.05, promoPass: 0, welcome: 'Mono-RF 1 ส่วนของหน้า', birthday: 'IV The Clarity หรือ The Fortitude 1 ครั้ง', access: ['ราคาสมาชิก: เครื่อง / IV / เลเซอร์ / พลาสม่า ลด 10% · ยาฉีด / สินค้า ลด 5%', 'รู้โปรใหม่ก่อน 24 ชั่วโมง และจองคิวก่อนสมาชิกทั่วไป', 'แลกวัคซีนไข้หวัดใหญ่ด้วย 2 ดาว (Seasonal Wellness)'], desc: 'ความงามที่เป็นเอกลักษณ์ในแบบของคุณ', color: '#9B918D', annual: [], birthdayCond: 'ใช้กับราคาปกติ ยอดขั้นต่ำ [__] บาท' },
    { level: 2, name: 'PRESTIGE', minStars: 20, maintStars: 16, discount: 0.20, discount2: 0.10, promoPass: 2, welcome: 'The Duo — RF + HIFU 100 shots', birthday: 'Plasma Acne Clear หรือ HIFU 100 shots 1 ครั้ง', access: ['ราคาสมาชิก: เครื่อง / IV / เลเซอร์ / พลาสม่า ลด 20% · ยาฉีด / สินค้า ลด 10%', 'คอร์สเครื่อง / IV ลดเพิ่ม 5% · เดือนเกิดลดคอร์ส 10% 1 ครั้ง', 'Promo Pass ปีละ 2 ครั้ง · รู้โปรใหม่ก่อน 24 ชั่วโมง', 'Priority booking · วางแผนผิวรายปีกับแพทย์ ปีละ 2 ครั้ง'], desc: 'การดูแลที่ออกแบบมาเพื่อคุณโดยเฉพาะ', color: '#182E56', annual: ['Seasonal Wellness: วัคซีนไข้หวัดใหญ่ 1 เข็ม', 'Wellness Check: ตรวจระดับวิตามินดี (ฉีดวิตามินดีราคาสมาชิก 1,900 บาท เมื่อผลต่ำ)'], birthdayCond: 'ใช้กับราคาปกติ ยอดขั้นต่ำ [__] บาท' },
    { level: 3, name: 'PRIVATE', minStars: 30, maintStars: 24, discount: 0.30, discount2: 0.15, promoPass: 4, welcome: 'The Duo + IV The Formulary Signature', birthday: 'Mono-RF ทั่วหน้า + คอ 1 ครั้ง', access: ['ราคาสมาชิก: เครื่อง / IV / เลเซอร์ / พลาสม่า ลด 30% · ยาฉีด / สินค้า ลด 15%', 'คอร์สเครื่อง / IV ลดเพิ่ม 10% · เดือนเกิดลดคอร์ส 15% 1 ครั้ง', 'Promo Pass ปีละ 4 ครั้ง · รู้โปรใหม่ก่อน 48 ชั่วโมงและกันโควตาโปรไลฟ์', 'Price Protection 14 วัน (คืนส่วนต่างเป็นดาว)', 'Priority consult กับหมอปิงปอง · Personal concierge ทาง LINE · นัดนอกเวลาทำการได้'], desc: 'ความใส่ใจระดับส่วนตัว จากแพทย์ถึงคุณ', color: '#141414', annual: ['Seasonal Wellness: วัคซีนไข้หวัดใหญ่ 1 เข็ม + ครอบครัว 1 ท่านในราคาทุน', 'Wellness Check: ตรวจระดับวิตามินดี + ฉีดวิตามินดี 1 เข็ม เมื่อผลต่ำ'], birthdayCond: 'ใช้กับราคาปกติ ยอดขั้นต่ำ [__] บาท' }
  ];
  var REWARDS = [
    ['R01', 'Booster Top-Up สูตรใดก็ได้ (เพิ่มใน IV ที่ซื้อ)', 'บริการ', 1, 0], ['R02', 'เลเซอร์ขน รักแร้ / แก้ม / หนวด 1 ครั้ง', 'บริการ', 2, 0],
    ['R03', 'IV The Restorative 1 ครั้ง', 'บริการ', 3, 0], ['R04', 'IV The Clarity หรือ The Fortitude 1 ครั้ง', 'บริการ', 4, 0],
    ['R06', 'Plasma Bright หรือ Plasma Armpit 1 ครั้ง', 'บริการ', 4, 0], ['R10', 'Seasonal Wellness 1 ครั้ง', 'บริการ', 3, 1],
    ['R08', 'Plasma Acne Clear 1 ครั้ง', 'บริการ', 8, 0], ['R09', 'HIFU U-One 100 shots', 'บริการ', 8, 0],
    ['R12', 'Mono-RF 1 ส่วนของหน้า', 'บริการ', 12, 0], ['R14', 'IV The Formulary Signature 1 ครั้ง', 'บริการ', 16, 0],
    ['R15', 'Exilis Elite Mono-RF ทั่วหน้า + คอ', 'บริการ', 20, 0], ['R16', 'The Duo — RF + HIFU 100 shots', 'บริการ', 24, 0],
    ['V01', 'บัตรกำนัลบริการ 1,000 บาท (บิลราคาปกติขั้นต่ำ 3,000)', 'บัตรกำนัล', 4, 0], ['V02', 'บัตรกำนัลบริการ 2,000 บาท (บิลราคาปกติขั้นต่ำ 6,000)', 'บัตรกำนัล', 8, 1],
    ['V03', 'บัตรกำนัลบริการ 5,000 บาท (บิลราคาปกติขั้นต่ำ 15,000)', 'บัตรกำนัล', 20, 2]
  ];
  var TERMS = 'สมาชิกภาพเป็นสิทธิ์เฉพาะบุคคล โอนไม่ได้\nดาวคิดจากยอดชำระจริงหลังหักส่วนลด ทุก 5,000 บาท ได้ 1 ดาว เศษยอดสะสมต่อรอบถัดไป\nดาวมีอายุ 24 เดือนนับจากวันที่ได้รับ\nระดับสมาชิกคิดจากยอดชำระ 12 เดือนล่าสุด ได้แล้วคงระดับอย่างน้อย 12 เดือน และต่ออายุเมื่อยอด 12 เดือนถึง 80% ของเกณฑ์\nราคาสมาชิกใช้กับราคาปกติรายครั้ง เลือกราคาสมาชิกหรือราคาโปรอย่างใดอย่างหนึ่ง ไม่ซ้อนกัน ใช้ได้เฉพาะเจ้าของบัตร\nการแลกของรางวัลทำที่เคาน์เตอร์คลินิก ไม่สามารถแลกเป็นเงินสด';

  function ymd(offsetDays) { var d = new Date(Date.now() + offsetDays * 864e5); return d.toISOString().slice(0, 10); }
  function addD(s, n) { var p = s.split('-'); return new Date(Date.UTC(+p[0], +p[1] - 1, +p[2]) + n * 864e5).toISOString().slice(0, 10); }

  // โปรแกรมดูแล (ตัวอย่าง) — ตรงกับแท็บ "โปรแกรมดูแล" ตั้งต้น
  var PROGS = [
    { code: 'BOTOX', name: 'Program Botulinum Toxin', isPackage: false, days: 0, intervals: [], items: [{ name: 'Botulinum Toxin', unit: 'ครั้ง', qty: null, recall: [90, 120] }] },
    { code: 'FILLER', name: 'Program Definisse Italy Filler', isPackage: false, days: 0, intervals: [], items: [{ name: 'Filler', unit: 'ครั้ง', qty: null, recall: [330, 420] }] },
    { code: 'SKINTRIO', name: 'Program Skin Trio', isPackage: false, days: 0, intervals: [], items: [{ name: 'Skin Trio', unit: 'ครั้ง', qty: null, recall: [28, 42] }] },
    { code: 'HIFU', name: 'Program U-One HIFU', isPackage: false, days: 0, intervals: [], items: [{ name: 'HIFU', unit: 'ครั้ง', qty: null, recall: [90, 120] }] },
    { code: 'YEAREDIT', name: 'The Year Edit (12 เดือน)', isPackage: true, days: 365, intervals: [7, 14, 28], items: [{ name: 'Mono-RF', unit: 'ครั้ง', qty: null, recall: [], byInt: true }, { name: 'HIFU', unit: 'shots', qty: 500, recall: [90, 120] }] },
    { code: 'EJAL40-3', name: 'Course Ejal40 3 กล่อง', isPackage: true, days: 365, intervals: [], items: [{ name: 'Ejal40', unit: 'กล่อง', qty: 3, recall: [30, 45] }] },
    { code: 'PLASMA-4', name: 'Course Plasma 3+1', isPackage: true, days: 365, intervals: [7], items: [{ name: 'Plasma', unit: 'ครั้ง', qty: 4, recall: [], byInt: true }] }
  ];
  var care = {
    consent: params.get('care') !== 'new',
    plans: [{ id: 'CP00001', start: ymd(-60), program: 'YEAREDIT', exp: addD(ymd(-60), 364), interval: 14, booked: null, status: 'ใช้งาน', receipt: 'RE' + ymd(-60).replace(/-/g, '') + '2101' },
            { id: 'CP00002', start: ymd(-85), program: 'BOTOX', status: 'ใช้งาน', receipt: '' }],
    logs: [{ date: ymd(-60), plan: 'CP00001', item: 'HIFU', use: 300 }, { date: ymd(-58), plan: 'CP00001', item: 'HIFU', add: 100 },
           { date: ymd(-60), plan: 'CP00001', item: 'Mono-RF', use: 1 }, { date: ymd(-45), plan: 'CP00001', item: 'Mono-RF', use: 1 },
           { date: ymd(-30), plan: 'CP00001', item: 'Mono-RF', use: 1 }, { date: ymd(-85), plan: 'CP00002', item: 'Botulinum Toxin', use: 1 }]
  };
  function progBy(c) { return PROGS.filter(function (p) { return p.code === c; })[0]; }
  function planState(pl) {
    var pr = progBy(pl.program), today = ymd(0), year = today.slice(0, 4), days = {}, yd = {};
    var items = pr.items.map(function (it) {
      var mine = care.logs.filter(function (l) { return l.plan === pl.id && l.item === it.name; });
      var uses = mine.filter(function (l) { return l.use > 0; }).map(function (l) { return l.date; }).sort();
      var used = mine.reduce(function (a, l) { return a + (l.use || 0); }, 0), added = mine.reduce(function (a, l) { return a + (l.add || 0); }, 0);
      var quota = pr.isPackage && it.qty !== null ? it.qty + added : null, last = uses[uses.length - 1] || null;
      uses.forEach(function (x) { days[x] = 1; if (x.slice(0, 4) === year) yd[x] = 1; });
      var due = it.byInt ? addD(last || pl.start, pl.interval) : (it.recall.length && (last || pr.isPackage) ? addD(last || pl.start, it.recall[0]) : null);
      var done = quota !== null && quota - used <= 0;
      return { name: it.name, unit: it.unit, quota: quota, used: used, remaining: quota === null ? null : quota - used, unlimited: pr.isPackage && it.qty === null, last: last, visits: uses.length, nextDue: done ? null : due, done: done };
    });
    var cancelled = pl.status === 'ยกเลิก', expired = pl.exp && today > pl.exp, active = !cancelled && !expired;
    var ks = Object.keys(days).sort();
    return { id: pl.id, name: pr.name, isPackage: pr.isPackage, start: pl.start, exp: pl.exp || null, status: cancelled ? 'ยกเลิก' : expired ? 'หมดอายุ' : 'ใช้งาน', active: active,
      booked: pl.booked, interval: pr.isPackage ? pl.interval : null, intervals: pr.intervals, visitsYear: Object.keys(yd).length, lastVisit: ks[ks.length - 1] || null,
      nextDue: active ? items.reduce(function (a, i) { return i.nextDue && (!a || i.nextDue < a) ? i.nextDue : a; }, null) : null, items: items, receipt: pl.receipt || '' };
  }
  function careView(forStaff) {
    var plans = care.plans.map(planState);
    if (!forStaff) return care.consent ? { plans: plans.filter(function (p) { return p.status !== 'ยกเลิก'; }) } : { consentNeeded: true, consentText: 'คลินิกปรับข้อตกลงการใช้ข้อมูลสมาชิก เพื่อดูแลคุณได้ต่อเนื่องขึ้น\nคลินิกจะบันทึกโปรแกรมดูแลที่คุณรับบริการ (ชื่อโปรแกรม วันที่ใช้ จำนวนคงเหลือ และวันนัด) เพื่อแสดงในบัตรสมาชิก และแจ้งเตือนทาง LINE โดยไม่ระบุชื่อหัตถการ' };
    return { consent: care.consent, plans: plans, programs: PROGS.map(function (p) { return { code: p.code, name: p.name, isPackage: p.isPackage, days: p.days, intervals: p.intervals, items: p.items }; }) };
  }
  function enroll(code, receipt, interval) {
    var pr = progBy(code); if (!pr) fail('VALIDATION', 'ไม่พบโปรแกรม ' + code);
    var pl = !pr.isPackage && care.plans.filter(function (x) { return x.program === code && x.status !== 'ยกเลิก'; })[0];
    if (!pl) { pl = { id: 'CP' + ('0000' + (care.plans.length + 1)).slice(-5), start: ymd(0), program: code, exp: pr.isPackage ? addD(ymd(0), pr.days - 1) : null, interval: pr.isPackage ? (interval || pr.intervals[0]) : null, booked: null, status: 'ใช้งาน', receipt: receipt || '' }; care.plans.push(pl); }
    if (!pr.isPackage) pr.items.forEach(function (it) { care.logs.push({ date: ymd(0), plan: pl.id, item: it.name, use: 1 }); });
  }
  // ปฏิทินนัด (ตัวอย่าง)
  var APROV = [{ code: 'DR1', name: 'หมอปิงปอง', kind: 'แพทย์', start: '13:00', end: '19:30', startWe: '12:00', endWe: '19:30' }, { code: 'TH1', name: 'ผู้ช่วย 1', kind: 'ผู้ช่วย', start: '11:00', end: '20:00' }, { code: 'TH2', name: 'ผู้ช่วย 2', kind: 'ผู้ช่วย', start: '11:00', end: '20:00' }];
  var ATYPES = [{ code: 'CONSULT', name: 'ปรึกษาแพทย์', minutes: 60, kind: 'แพทย์' }, { code: 'FOLLOWUP', name: 'ติดตามผล', minutes: 30, kind: 'แพทย์' },
    { code: 'INJECT', name: 'หัตถการฉีด (Botox / Skin booster / PN)', minutes: 60, kind: 'แพทย์' }, { code: 'FILLER', name: 'Filler', minutes: 90, kind: 'แพทย์', group: 'Filler', max: 3, gap: 60 },
    { code: 'HIFU', name: 'HIFU', minutes: 90, kind: 'แพทย์' }, { code: 'RF', name: 'Exilis Elite Mono-RF', minutes: 60, kind: 'ผู้ช่วย', group: 'Elite', max: 3, gap: 60 },
    { code: 'IV', name: 'IV Drip', minutes: 90, kind: 'ผู้ช่วย' }, { code: 'OTHER', name: 'อื่นๆ', minutes: 60, kind: '' }];
  var appts = [
    { id: 'AP000001', date: ymd(0), time: '14:00', minutes: 60, provider: 'DR1', type: 'CONSULT', code: '', hn: '', name: 'เอวิกา ใจดี', phone: '0812345678', note: 'นัดผ่าน LINE', status: 'นัดแล้ว' },
    { id: 'AP000002', date: ymd(0), time: '15:30', minutes: 90, provider: 'DR1', type: 'HIFU', code: 'CH0007', hn: '', name: '', phone: '', note: 'คอร์สเดิม hifu 150', status: 'นัดแล้ว' },
    { id: 'AP000003', date: ymd(0), time: '12:00', minutes: 60, provider: 'TH1', type: 'RF', code: '', hn: 'HN002199', name: 'บุษบา แสงทอง', phone: '0899999999', note: '', status: 'มาแล้ว' },
    { id: 'AP000004', date: ymd(1), time: '17:00', minutes: 60, provider: 'DR1', type: 'INJECT', code: '', hn: 'HN002050', name: 'ชลิตา มีสุข', phone: '0811111111', note: 'PN 1 กล่อง', status: 'นัดแล้ว' }
  ];
  function hm(s) { var p = s.split(':'); return (+p[0]) * 60 + (+p[1]); }
  function mhm(n) { return ('0' + Math.floor(n / 60)).slice(-2) + ':' + ('0' + (n % 60)).slice(-2); }
  function closedDemo(day) { var p = day.split('-'), dt = new Date(Date.UTC(+p[0], +p[1] - 1, +p[2])), w = dt.getUTCDay(); if (w === 2) return 'คลินิกปิดทุกวันอังคาร'; return ''; }
  function weDemo(day) { var p = day.split('-'), w = new Date(Date.UTC(+p[0], +p[1] - 1, +p[2])).getUTCDay(); return w === 0 || w === 6; }
  function apPub(a, forStaff) {
    var v = { id: a.id, date: a.date, time: a.time, minutes: a.minutes, end: mhm(hm(a.time) + a.minutes), status: a.status };
    if (!forStaff) return v;
    var pv = APROV.filter(function (x) { return x.code === a.provider; })[0], ty = ATYPES.filter(function (x) { return x.code === a.type; })[0], mem = a.code === 'CH0007';
    v.provider = a.provider; v.providerName = pv ? pv.name : a.provider; v.type = a.type; v.typeName = ty ? ty.name : a.type; v.code = a.code;
    v.who = mem ? state.member.nickname : a.name; v.fullName = mem ? state.member.name : a.name; v.nick = mem ? state.member.nickname : ''; v.phone = mem ? state.member.phone : a.phone; v.note = a.note; v.member = mem; v.notified = false;
    v.hn = mem ? state.member.hn : (a.hn || ''); v.tier = mem ? TIERS[Math.min(3, Math.max(0, tierParam))].name : ''; v.cat = mem ? 'member' : (a.hn ? 'hn' : 'new');
    return v;
  }
  function planOf(id) { var pl = care.plans.filter(function (x) { return x.id === id; })[0]; if (!pl) fail('NOT_FOUND', 'ไม่พบแผนดูแลนี้'); return pl; }
  var tierParam = parseInt(params.get('tier') || '1', 10);
  var spendByTier = [18500, 62000, 118000, 168000];
  var state = {
    registered: params.get('demoState') !== 'new',
    member: { code: 'CH0007', name: 'ชนิดา ศรีสวัสดิ์', nickname: 'มิ้นท์', joinDate: ymd(-210), birthMonth: new Date().getMonth() + 1, phone: '0891234567', hn: 'HN002201', status: 'ใช้งาน', note: '' },
    txs: [], rds: [], adjust: 0
  };
  // สร้างประวัติตัวอย่าง
  var total = spendByTier[Math.min(3, Math.max(0, tierParam))], parts = [0.18, 0.27, 0.12, 0.25, 0.18];
  parts.forEach(function (p, i) { var dt = ymd(-200 + i * 45); state.txs.push({ date: dt, amount: Math.round(total * p / 100) * 100, receipt: 'RE' + dt.replace(/-/g, '') + (2401 + i) }); });
  if (total >= 50000) state.rds.push({ date: ymd(-40), code: 'R09', name: 'HIFU U-One 100 shots', stars: 8 });

  function view(forStaff) {
    var cum = 0, earnedList = [];
    state.txs.forEach(function (t) { var b = Math.floor(cum / B); cum += t.amount; t.earned = Math.floor(cum / B) - b; });
    var used = state.rds.reduce(function (a, r) { return a + r.stars; }, 0);
    var balance = Math.floor(cum / B) + state.adjust - used;
    var rolling = state.txs.reduce(function (a, t) { return t.date > ymd(-365) ? a + t.amount : a; }, 0);
    var s12 = Math.floor(rolling / B), level = 0;
    TIERS.forEach(function (t, i) { if (s12 >= t.minStars) level = i; });
    var t = TIERS[level], next = TIERS[level + 1];
    var claimed = state.rds.map(function (r) { return r.code; });
    var welcome = claimed.indexOf('WELCOME-' + t.name) < 0 && level > 0 ? [{ code: 'WELCOME-' + t.name, tierName: t.name, gift: t.welcome, until: ymd(60), cond: t.welcomeCond || '', locked: false }] : [];
    var history = [];
    state.txs.forEach(function (x) { history.push({ date: x.date, kind: x.amount > 0 ? 'purchase' : 'refund', label: x.amount > 0 ? 'ใช้บริการ' : 'คืนเงิน', amount: x.amount, stars: x.earned, receipt: x.receipt }); });
    state.rds.forEach(function (r) { history.push({ date: r.date, kind: 'redeem', label: r.name, amount: null, stars: -r.stars }); });
    if (state.adjust) history.push({ date: ymd(0), kind: 'adjust', label: 'ดาวพิเศษ', amount: null, stars: state.adjust });
    history.sort(function (a, b) { return a.date < b.date ? 1 : -1; });
    var v = {
      today: ymd(0), clinic: 'CHANUN Aesthetic Wellness & Surgery', bahtPerStar: B,
      member: { code: state.member.code, name: state.member.name, nickname: state.member.nickname, joinDate: state.member.joinDate, birthMonth: state.member.birthMonth },
      tier: t, tierUntil: ymd(250), overridden: false,
      next: next ? { name: next.name, minStars: next.minStars, starsNeeded: Math.max(0, next.minStars - s12), bahtNeeded: Math.max(0, next.minStars * B - rolling) } : null,
      maintain: null,
      stars: { balance: balance, toNextStarBaht: B - (cum % B), expiring: balance > 2 ? { stars: 2, lastDay: ymd(41) } : null },
      rolling: { baht: rolling, stars: s12 },
      welcome: welcome,
      birthday: { month: state.member.birthMonth, gift: t.birthday, cond: t.birthdayCond || '', available: claimed.indexOf('BIRTHDAY') < 0, usedThisYear: claimed.indexOf('BIRTHDAY') >= 0 },
      promoPass: t.promoPass ? { quota: t.promoPass, used: claimed.filter(function (c) { return c === 'PROMOPASS'; }).length, remaining: Math.max(0, t.promoPass - claimed.filter(function (c) { return c === 'PROMOPASS'; }).length), available: claimed.filter(function (c) { return c === 'PROMOPASS'; }).length < t.promoPass } : null,
      annual: (t.annual || []).map(function (g, i) { var c = 'ANNUAL-' + (i + 1); return { code: c, slot: i + 1, gift: g, available: claimed.indexOf(c) < 0, usedThisYear: claimed.indexOf(c) >= 0 }; }),
      rewards: REWARDS.map(function (r) { return { code: r[0], name: r[1], type: r[2], stars: r[3], minTier: r[4] ? TIERS[r[4]].name : null, tierOk: r[4] <= level, canRedeem: r[4] <= level && balance >= r[3] }; }),
      tiers: TIERS, history: history.slice(0, 40), terms: TERMS
    };
    if (forStaff) { v.member.phone = state.member.phone; v.member.hn = state.member.hn; v.member.status = 'ใช้งาน'; v.member.note = ''; }
    v.care = careView(forStaff);
    v.appointments = appts.filter(function (a) { return a.code === 'CH0007' && (forStaff || (a.date >= ymd(0) && a.status === 'นัดแล้ว')); }).map(function (a) { return apPub(a, forStaff); });
    return v;
  }
  function fail(code, msg) { var e = new Error(msg); e.code = code; throw e; }

  window.CHANUN_DEMO = true;
  window.CHANUN_DEMO_API = function (b) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        try {
          var before;
          switch (b.action) {
            case 'me': return resolve(state.registered ? { registered: true, view: view() } : { registered: false, profileName: 'Mint', publicInfo: { tiers: TIERS, bahtPerStar: B, terms: TERMS } });
            case 'register': state.registered = true; state.member.name = b.fullName; state.member.nickname = b.nickname; state.txs = []; state.rds = []; return resolve({ registered: true, view: view(), justRegistered: true });
            case 'staff.login': if (b.pin !== '123456') fail('BAD_PIN', 'PIN ไม่ถูกต้อง (โหมดทดลองใช้ 123456)'); return resolve({ ok: true });
            case 'staff.find': return resolve({ results: [{ code: 'CH0007', name: state.member.name, nickname: state.member.nickname, phoneLast4: '4567', status: 'ใช้งาน' }] });
            case 'staff.member': return resolve({ view: view(true) });
            case 'staff.purchase':
              before = view(true);
              var amt = Number(String(b.amount).replace(/,/g, '')); if (!amt) fail('VALIDATION', 'กรุณากรอกยอดชำระ');
              var rc = String(b.receipt || '').toUpperCase().replace(/\s+/g, '');
              if (!rc) fail('VALIDATION', 'กรุณากรอกเลขใบเสร็จ');
              if (amt > 0) {
                var rm = /^RE(\d{4})(\d{2})(\d{2})\d{4}(-\d{1,2})?$/.exec(rc);
                if (!rm) fail('VALIDATION', 'เลขใบเสร็จไม่ตรงรูปแบบ APSX (RE ตามด้วยตัวเลข 12 หลัก เช่น RE202611190001) กรุณาตรวจสอบ');
                if (rm[1] + '-' + rm[2] + '-' + rm[3] > ymd(1)) fail('VALIDATION', 'เลขใบเสร็จเป็นวันที่ในอนาคต กรุณาตรวจสอบ');
                if (state.txs.some(function (t) { return t.amount > 0 && t.receipt === rc; })) fail('DUPLICATE', 'เลขใบเสร็จ ' + rc + ' ถูกบันทึกไปแล้ว');
                var near = state.txs.filter(function (t) { return t.amount === amt && t.date >= ymd(-7); })[0];
                if (near && b.confirmDup !== true) fail('CONFIRM_DUPLICATE', 'สมาชิกนี้มียอด ' + amt.toLocaleString('en-US') + ' บาท เมื่อ ' + near.date + ' (ใบเสร็จ ' + near.receipt + ') บันทึกไว้แล้ว ถ้าเป็นบิลใหม่จริงให้กดยืนยัน');
              }
              state.txs.push({ date: ymd(0), amount: amt, receipt: rc });
              (b.programs || []).forEach(function (x) { enroll(String(x.program).toUpperCase(), rc, x.interval); });
              var after = view(true); return resolve({ view: after, tierUp: after.tier.level > before.tier.level, starsBefore: before.stars.balance });
            case 'staff.redeem':
              before = view(true);
              var code = b.rewardCode;
              if (code === 'PROMOPASS') { var vp = before.promoPass; if (!vp || !vp.available) fail('NOT_AVAILABLE', 'ใช้ Promo Pass ครบแล้ว'); state.rds.push({ date: ymd(0), code: code, name: 'Promo Pass', stars: 0 }); }
              else if (code.indexOf('WELCOME-') === 0 || code === 'BIRTHDAY' || code.indexOf('ANNUAL-') === 0) { state.rds.push({ date: ymd(0), code: code, name: code === 'BIRTHDAY' ? 'ของขวัญวันเกิด' : code.indexOf('ANNUAL-') === 0 ? 'สิทธิ์ประจำปี ' + code.slice(7) : 'Welcome', stars: 0 }); }
              else { var rw = before.rewards.filter(function (r) { return r.code === code; })[0]; if (!rw || !rw.canRedeem) fail('NOT_ENOUGH', 'ดาวไม่พอ'); state.rds.push({ date: ymd(0), code: code, name: rw.name, stars: rw.stars }); }
              return resolve({ view: view(true), tierUp: false, starsBefore: before.stars.balance });
            case 'staff.adjust':
              if (!b.note) fail('VALIDATION', 'กรุณาระบุเหตุผลการปรับดาว');
              before = view(true); state.adjust += parseInt(b.stars, 10) || 0;
              return resolve({ view: view(true), tierUp: false, starsBefore: before.stars.balance });
            case 'careConsent': care.consent = true; return resolve({ registered: true, view: view() });
            case 'staff.careEnroll': enroll(String(b.program || '').toUpperCase(), b.receipt, b.interval); return resolve({ view: view(true) });
            case 'staff.careUse': {
              var pl = planOf(b.plan), st = planState(pl), it = st.items.filter(function (i) { return i.name === b.item; })[0];
              if (!st.active) fail('NOT_AVAILABLE', 'แผนนี้ใช้ไม่ได้แล้ว');
              if (it.remaining !== null && b.qty > it.remaining) fail('NOT_ENOUGH', it.name + ' เหลือ ' + it.remaining + ' ' + it.unit + ' (ถ้าแถมเพิ่ม ให้กด ปรับจำนวน ก่อน)');
              care.logs.push({ date: ymd(0), plan: pl.id, item: b.item, use: +b.qty }); return resolve({ view: view(true) });
            }
            case 'staff.careAdjust':
              if (!+b.qty) fail('VALIDATION', 'กรุณาใส่จำนวนเต็ม (ติดลบได้)'); if (!b.note) fail('VALIDATION', 'กรุณาระบุเหตุผล เช่น แถมเพิ่ม หรือแก้ไขลงผิด');
              care.logs.push({ date: ymd(0), plan: planOf(b.plan).id, item: b.item, add: +b.qty }); return resolve({ view: view(true) });
            case 'staff.carePlan': {
              var p2 = planOf(b.plan);
              if (b.op === 'booked') { if (!b.date || b.date < ymd(0)) fail('VALIDATION', 'กรุณาเลือกวันนัดตั้งแต่วันนี้เป็นต้นไป'); p2.booked = b.date; }
              else if (b.op === 'clearBooked') p2.booked = null; else if (b.op === 'interval') p2.interval = +b.interval; else if (b.op === 'cancel') p2.status = 'ยกเลิก';
              return resolve({ view: view(true) });
            }
            case 'staff.appts': {
              var from = b.from || ymd(0), to = b.to || from, closed = [], dd = from;
              var wel = [];
              while (dd <= to) { var c = closedDemo(dd); if (c) closed.push({ date: dd, closed: c }); if (weDemo(dd)) wel.push(dd); var q = dd.split('-'); dd = new Date(Date.UTC(+q[0], +q[1] - 1, +q[2] + 1)).toISOString().slice(0, 10); }
              return resolve({ installed: true, today: ymd(0), hours: { open: '11:00', close: '20:00', slot: 15 }, closed: closed, weekendLike: wel, providers: APROV, types: ATYPES,
                list: appts.filter(function (a) { return a.date >= from && a.date <= to; }).sort(function (x, y) { return (x.date + x.time) < (y.date + y.time) ? -1 : 1; }).map(function (a) { return apPub(a, true); }) });
            }
            case 'staff.apptSave': {
              if (!b.date || !b.time) fail('VALIDATION', 'กรุณาเลือกวันและเวลา');
              var hn0 = String(b.hn || '').replace(/\s+/g, '').toUpperCase(); if (/^\d+$/.test(hn0)) hn0 = 'HN' + hn0;
              if (!b.code && hn0 && !/^HN\d+$/.test(hn0)) fail('VALIDATION', 'HN ไม่ถูกต้อง (เช่น HN002345)');
              if (!b.code && (!b.name || (String(b.phone || '').replace(/\D/g, '').length < 9 && !hn0))) fail('VALIDATION', 'คนไข้ที่ไม่ใช่สมาชิก กรุณาใส่ชื่อ และเบอร์โทรหรือ HN');
              var w = [], s0 = hm(b.time), e0 = s0 + (+b.minutes), pv = APROV.filter(function (x) { return x.code === b.provider; })[0];
              var cl = closedDemo(b.date); if (cl) w.push(cl);
              if (s0 < 660 || e0 > 1200) w.push('นอกเวลาคลินิก (11:00–20:00)');
              var we0 = weDemo(b.date), ps = (we0 && pv && pv.startWe) || (pv && pv.start), pe = (we0 && pv && pv.endWe) || (pv && pv.end);
              if (pv && (s0 < hm(ps) || e0 > hm(pe))) w.push('นอกเวลาของ' + pv.name + ' (' + ps + '–' + pe + ')');
              var ty = ATYPES.filter(function (x) { return x.code === b.type; })[0];
              if (ty && ty.group) {
                var same = appts.filter(function (o) { var ot = ATYPES.filter(function (x) { return x.code === o.type; })[0]; return o.id !== b.id && o.status !== 'ยกเลิก' && o.date === b.date && ot && ot.group === ty.group; });
                if (same.length >= ty.max) w.push('เคส ' + ty.group + ' วันนี้ครบ ' + ty.max + ' เคสแล้ว');
                same.forEach(function (o) { if (Math.abs(hm(o.time) - s0) < ty.gap) w.push('ห่างจากเคส ' + ty.group + ' เวลา ' + o.time + ' ไม่ถึง ' + ty.gap + ' นาที'); });
              }
              appts.forEach(function (o) { if (o.id === b.id || o.status === 'ยกเลิก' || o.date !== b.date || o.provider !== b.provider) return; var os = hm(o.time), oe = os + o.minutes; if (s0 < oe && os < e0) w.push('ชนกับนัด ' + o.time + '–' + mhm(oe) + ' ' + (apPub(o, true).who || '') + ' ของ' + (pv ? pv.name : '')); });
              if (w.length && b.confirm !== true) fail('CONFIRM_APPT', w.join('\n'));
              var rec = b.id ? appts.filter(function (x) { return x.id === b.id; })[0] : null;
              if (!rec) { rec = { id: 'AP' + ('00000' + (appts.length + 1)).slice(-6), status: 'นัดแล้ว' }; appts.push(rec); }
              rec.date = b.date; rec.time = b.time; rec.minutes = +b.minutes; rec.provider = b.provider; rec.type = b.type; rec.code = b.code || ''; rec.name = b.code ? '' : b.name; rec.phone = b.code ? '' : b.phone; rec.hn = b.code ? '' : hn0; rec.note = b.note || '';
              return resolve({ id: rec.id });
            }
            case 'staff.apptStatus': { var x = appts.filter(function (a) { return a.id === b.id; })[0]; if (!x) fail('NOT_FOUND', 'ไม่พบนัดนี้'); x.status = b.status; return resolve({ id: x.id, status: x.status }); }
            case 'staff.careDue': {
              var list = care.plans.map(planState).filter(function (s) { return s.active && s.nextDue && s.nextDue <= ymd(7) && s.nextDue >= ymd(-30); }).map(function (s) {
                var it = s.items.filter(function (i) { return i.nextDue === s.nextDue; })[0];
                return { code: 'CH0007', name: state.member.nickname, phoneLast4: '4567', plan: s.id, program: s.name, item: it ? it.name : '', due: s.nextDue, overdue: s.nextDue < ymd(0), booked: s.booked };
              });
              return resolve({ list: list, installed: true });
            }
          }
          fail('BAD_ACTION', 'unknown');
        } catch (e) { reject(e); }
      }, 350);
    });
  };
})();
