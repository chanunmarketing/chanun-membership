/* โหมดทดลอง (?demo=1) — ข้อมูลสมมติ ไม่เชื่อมต่อระบบจริง ใช้ดูหน้าตาและฝึกพนักงาน */
(function () {
  var params = new URLSearchParams(location.search);
  if (!params.has('demo')) return;
  var B = 5000;
  var TIERS = [
    { level: 0, name: 'CLASSIC', minStars: 0, discount: 0, discount2: 0, promoPass: 0, welcome: 'IV The Restorative 1 ครั้ง', birthday: 'IV The Restorative หรือเลเซอร์รักแร้ 1 ครั้ง', access: ['สะสมดาวทุก 5,000 บาท', 'แลกของรางวัลได้ทันทีที่มีดาว', 'วัคซีนไข้หวัดใหญ่ราคาสมาชิก 490 บาท'], desc: 'จุดเริ่มต้นของผิวที่ได้รับการดูแลอย่างใส่ใจ', color: '#F5F2EC', annual: [] },
    { level: 1, name: 'SIGNATURE', minStars: 10, maintStars: 8, discount: 0.10, discount2: 0.05, promoPass: 0, welcome: 'Mono-RF 1 ส่วนของหน้า', birthday: 'IV The Clarity หรือ The Fortitude 1 ครั้ง', access: ['ราคาสมาชิก: เครื่อง / IV / เลเซอร์ / พลาสม่า ลด 10% · ยาฉีด / สินค้า ลด 5%', 'รู้โปรใหม่ก่อน 24 ชั่วโมง และจองคิวก่อนสมาชิกทั่วไป', 'แลกวัคซีนไข้หวัดใหญ่ด้วย 2 ดาว (Seasonal Wellness)'], desc: 'ความงามที่เป็นเอกลักษณ์ในแบบของคุณ', color: '#9B918D', annual: [] },
    { level: 2, name: 'PRESTIGE', minStars: 20, maintStars: 16, discount: 0.20, discount2: 0.10, promoPass: 2, welcome: 'The Duo — RF + HIFU 100 shots', birthday: 'Plasma Acne Clear หรือ HIFU 100 shots 1 ครั้ง', access: ['ราคาสมาชิก: เครื่อง / IV / เลเซอร์ / พลาสม่า ลด 20% · ยาฉีด / สินค้า ลด 10%', 'คอร์สเครื่อง / IV ลดเพิ่ม 5% · เดือนเกิดลดคอร์ส 10% 1 ครั้ง', 'Promo Pass ปีละ 2 ครั้ง · รู้โปรใหม่ก่อน 24 ชั่วโมง', 'Priority booking · วางแผนผิวรายปีกับแพทย์ ปีละ 2 ครั้ง'], desc: 'การดูแลที่ออกแบบมาเพื่อคุณโดยเฉพาะ', color: '#182E56', annual: ['Seasonal Wellness: วัคซีนไข้หวัดใหญ่ 1 เข็ม', 'Wellness Check: ตรวจระดับวิตามินดี (ฉีดวิตามินดีราคาสมาชิก 1,900 บาท เมื่อผลต่ำ)'] },
    { level: 3, name: 'PRIVATE', minStars: 30, maintStars: 24, discount: 0.30, discount2: 0.15, promoPass: 4, welcome: 'The Duo + IV The Formulary Signature', birthday: 'Mono-RF ทั่วหน้า + คอ 1 ครั้ง', access: ['ราคาสมาชิก: เครื่อง / IV / เลเซอร์ / พลาสม่า ลด 30% · ยาฉีด / สินค้า ลด 15%', 'คอร์สเครื่อง / IV ลดเพิ่ม 10% · เดือนเกิดลดคอร์ส 15% 1 ครั้ง', 'Promo Pass ปีละ 4 ครั้ง · รู้โปรใหม่ก่อน 48 ชั่วโมงและกันโควตาโปรไลฟ์', 'Price Protection 14 วัน (คืนส่วนต่างเป็นดาว)', 'Priority consult กับหมอปิงปอง · Personal concierge ทาง LINE · นัดนอกเวลาทำการได้'], desc: 'ความใส่ใจระดับส่วนตัว จากแพทย์ถึงคุณ', color: '#141414', annual: ['Seasonal Wellness: วัคซีนไข้หวัดใหญ่ 1 เข็ม + ครอบครัว 1 ท่านในราคาทุน', 'Wellness Check: ตรวจระดับวิตามินดี + ฉีดวิตามินดี 1 เข็ม เมื่อผลต่ำ'] }
  ];
  var REWARDS = [
    ['R01', 'Booster Top-Up สูตรใดก็ได้ (เพิ่มใน IV ที่ซื้อ)', 'บริการ', 1, 0], ['R02', 'เลเซอร์ขน รักแร้ / แก้ม / หนวด 1 ครั้ง', 'บริการ', 1, 0],
    ['R03', 'IV The Restorative 1 ครั้ง', 'บริการ', 2, 0], ['R04', 'IV The Clarity หรือ The Fortitude 1 ครั้ง', 'บริการ', 2, 0],
    ['R06', 'Plasma Bright หรือ Plasma Armpit 1 ครั้ง', 'บริการ', 2, 0], ['R10', 'Seasonal Wellness 1 ครั้ง', 'บริการ', 2, 1],
    ['R08', 'Plasma Acne Clear 1 ครั้ง', 'บริการ', 4, 0], ['R09', 'HIFU U-One 100 shots', 'บริการ', 4, 0],
    ['R12', 'Mono-RF 1 ส่วนของหน้า', 'บริการ', 6, 0], ['R14', 'IV The Formulary Signature 1 ครั้ง', 'บริการ', 8, 0],
    ['R15', 'Exilis Elite Mono-RF ทั่วหน้า + คอ', 'บริการ', 10, 0], ['R16', 'The Duo — RF + HIFU 100 shots', 'บริการ', 12, 0],
    ['V01', 'บัตรกำนัลบริการ 1,000 บาท (บิลราคาปกติขั้นต่ำ 3,000)', 'บัตรกำนัล', 4, 0], ['V02', 'บัตรกำนัลบริการ 2,000 บาท (บิลราคาปกติขั้นต่ำ 6,000)', 'บัตรกำนัล', 8, 1],
    ['V03', 'บัตรกำนัลบริการ 5,000 บาท (บิลราคาปกติขั้นต่ำ 15,000)', 'บัตรกำนัล', 20, 2]
  ];
  var TERMS = 'สมาชิกภาพเป็นสิทธิ์เฉพาะบุคคล โอนไม่ได้\nดาวคิดจากยอดชำระจริงหลังหักส่วนลด ทุก 5,000 บาท ได้ 1 ดาว เศษยอดสะสมต่อรอบถัดไป\nดาวมีอายุ 24 เดือนนับจากวันที่ได้รับ\nระดับสมาชิกคิดจากยอดชำระ 12 เดือนล่าสุด ได้แล้วคงระดับอย่างน้อย 12 เดือน และต่ออายุเมื่อยอด 12 เดือนถึง 80% ของเกณฑ์\nราคาสมาชิกใช้กับราคาปกติรายครั้ง เลือกราคาสมาชิกหรือราคาโปรอย่างใดอย่างหนึ่ง ไม่ซ้อนกัน ใช้ได้เฉพาะเจ้าของบัตร\nการแลกของรางวัลทำที่เคาน์เตอร์คลินิก ไม่สามารถแลกเป็นเงินสด';

  function ymd(offsetDays) { var d = new Date(Date.now() + offsetDays * 864e5); return d.toISOString().slice(0, 10); }
  var tierParam = parseInt(params.get('tier') || '1', 10);
  var spendByTier = [18500, 62000, 118000, 168000];
  var state = {
    registered: params.get('demoState') !== 'new',
    member: { code: 'CH0007', name: 'ชนิดา ศรีสวัสดิ์', nickname: 'มิ้นท์', joinDate: ymd(-210), birthMonth: new Date().getMonth() + 1, phone: '0891234567', hn: 'HN002201', status: 'ใช้งาน', note: '' },
    txs: [], rds: [], adjust: 0
  };
  // สร้างประวัติตัวอย่าง
  var total = spendByTier[Math.min(3, Math.max(0, tierParam))], parts = [0.18, 0.27, 0.12, 0.25, 0.18];
  parts.forEach(function (p, i) { state.txs.push({ date: ymd(-200 + i * 45), amount: Math.round(total * p / 100) * 100, receipt: 'INV-' + (2401 + i) }); });
  if (total >= 50000) state.rds.push({ date: ymd(-40), code: 'R12', name: 'Mono-RF 1 ส่วนของหน้า', stars: 6 });

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
    var welcome = claimed.indexOf('WELCOME-' + t.name) < 0 && level > 0 ? [{ code: 'WELCOME-' + t.name, tierName: t.name, gift: t.welcome, until: ymd(60) }] : [];
    var history = [];
    state.txs.forEach(function (x) { history.push({ date: x.date, kind: x.amount > 0 ? 'purchase' : 'refund', label: x.amount > 0 ? 'ใช้บริการ' : 'คืนเงิน', amount: x.amount, stars: x.earned }); });
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
      birthday: { month: state.member.birthMonth, gift: t.birthday, available: claimed.indexOf('BIRTHDAY') < 0, usedThisYear: claimed.indexOf('BIRTHDAY') >= 0 },
      promoPass: t.promoPass ? { quota: t.promoPass, used: claimed.filter(function (c) { return c === 'PROMOPASS'; }).length, remaining: Math.max(0, t.promoPass - claimed.filter(function (c) { return c === 'PROMOPASS'; }).length), available: claimed.filter(function (c) { return c === 'PROMOPASS'; }).length < t.promoPass } : null,
      annual: (t.annual || []).map(function (g, i) { var c = 'ANNUAL-' + (i + 1); return { code: c, slot: i + 1, gift: g, available: claimed.indexOf(c) < 0, usedThisYear: claimed.indexOf(c) >= 0 }; }),
      rewards: REWARDS.map(function (r) { return { code: r[0], name: r[1], type: r[2], stars: r[3], minTier: r[4] ? TIERS[r[4]].name : null, tierOk: r[4] <= level, canRedeem: r[4] <= level && balance >= r[3] }; }),
      tiers: TIERS, history: history.slice(0, 15), terms: TERMS
    };
    if (forStaff) { v.member.phone = state.member.phone; v.member.hn = state.member.hn; v.member.status = 'ใช้งาน'; v.member.note = ''; }
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
              if (!b.receipt) fail('VALIDATION', 'กรุณากรอกเลขใบเสร็จ');
              state.txs.push({ date: ymd(0), amount: amt, receipt: b.receipt });
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
          }
          fail('BAD_ACTION', 'unknown');
        } catch (e) { reject(e); }
      }, 350);
    });
  };
})();
