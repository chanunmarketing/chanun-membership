/* โหมดทดลอง (?demo=1) — ข้อมูลสมมติ ไม่เชื่อมต่อระบบจริง ใช้ดูหน้าตาและฝึกพนักงาน */
(function () {
  var params = new URLSearchParams(location.search);
  if (!params.has('demo')) return;
  var B = 5000;
  var TIERS = [
    { level: 0, name: 'CLASSIC', minStars: 0, discount: 0, welcome: 'Hydrating Mask 1 ครั้ง', birthday: 'บัตรกำนัล 300 บาท', access: ['สะสมดาวทุก 5,000 บาท', 'แลกของรางวัลได้ทันทีที่มีดาว', 'วัคซีนไข้หวัดใหญ่ราคาสมาชิก 490 บาท'], desc: 'จุดเริ่มต้นของผิวที่ได้รับการดูแลอย่างใส่ใจ', color: '#F5F2EC' },
    { level: 1, name: 'SIGNATURE', minStars: 5, discount: 0.03, welcome: 'IV Drip 1 ครั้ง', birthday: 'บัตรกำนัล 1,000 บาท', access: ['รู้ Edition ใหม่ก่อนใคร 24 ชั่วโมง', 'จองคิวล่วงหน้าก่อนสมาชิกทั่วไป', 'แลกวัคซีนไข้หวัดใหญ่ด้วย 2 ดาว (Seasonal Wellness)'], desc: 'ความงามที่เป็นเอกลักษณ์ในแบบของคุณ', color: '#9B918D' },
    { level: 2, name: 'PRESTIGE', minStars: 10, discount: 0.05, welcome: 'Vera Skin 1 ครั้ง', birthday: 'บัตรกำนัล 2,000 บาท', access: ['Priority booking', 'วางแผนผิวรายปีกับแพทย์ ปีละ 2 ครั้ง', 'เชิญร่วม Member Workshop ปีละ 2 ครั้ง'], desc: 'การดูแลที่ออกแบบมาเพื่อคุณโดยเฉพาะ', color: '#182E56', annual: ['Seasonal Wellness: วัคซีนไข้หวัดใหญ่ 1 เข็ม', 'Wellness Check: ตรวจระดับวิตามินดี (ฉีดวิตามินดีราคาสมาชิก 1,900 บาท เมื่อผลต่ำ)'] },
    { level: 3, name: 'PRIVATE', minStars: 20, discount: 0.07, welcome: 'Program Skin Trio 1 ครั้ง', birthday: 'บัตรกำนัล 3,000 บาท', access: ['Priority consult กับหมอปิงปอง', 'Personal concierge ทาง LINE', 'นัดนอกเวลาทำการได้', 'ทดลองหัตถการใหม่ก่อนใคร', 'ของขวัญปีใหม่ และ Private event'], desc: 'ความใส่ใจระดับส่วนตัว จากแพทย์ถึงคุณ', color: '#141414', annual: ['Seasonal Wellness: วัคซีนไข้หวัดใหญ่ 1 เข็ม + ครอบครัว 1 ท่านในราคาทุน', 'Wellness Check: ตรวจระดับวิตามินดี + ฉีดวิตามินดี 1 เข็ม เมื่อผลต่ำ'] }
  ];
  var REWARDS = [
    ['R01', 'บัตรกำนัลสินค้า Skincare 500 บาท', 'บัตรกำนัล', 1, 0], ['R02', 'บัตรกำนัลบริการ 1,000 บาท', 'บัตรกำนัล', 2, 0],
    ['R03', 'Hydrating Mask / LED 1 ครั้ง', 'บริการ', 3, 0], ['R04', 'IV Drip 1 ครั้ง', 'บริการ', 5, 0],
    ['R05', 'Vera Skin 1 ครั้ง', 'บริการ', 10, 0], ['R06', 'Elite Face Laser 1 ครั้ง', 'บริการ', 13, 0],
    ['R07', 'บัตรกำนัลบริการ 5,000 บาท', 'บัตรกำนัล', 10, 1], ['R08', 'Program Skin Trio 1 ครั้ง', 'บริการ', 20, 2],
    ['R09', 'Private Skin Planning กับหมอปิงปอง 60 นาที', 'บริการ', 6, 2], ['R10', 'Seasonal Wellness 1 ครั้ง', 'บริการ', 2, 1]
  ];
  var TERMS = 'สมาชิกภาพเป็นสิทธิ์เฉพาะบุคคล โอนไม่ได้\nดาวคิดจากยอดชำระจริงหลังหักส่วนลด ทุก 5,000 บาท ได้ 1 ดาว เศษยอดสะสมต่อรอบถัดไป\nดาวมีอายุ 24 เดือนนับจากวันที่ได้รับ\nระดับสมาชิกคิดจากยอดชำระ 12 เดือนล่าสุด และคงระดับอย่างน้อย 12 เดือน\nส่วนลดสมาชิกใช้ได้ครั้งละ 1 สิทธิ์ ไม่รวมกับโปรโมชันอื่น\nการแลกของรางวัลทำที่เคาน์เตอร์คลินิก ไม่สามารถแลกเป็นเงินสด';

  function ymd(offsetDays) { var d = new Date(Date.now() + offsetDays * 864e5); return d.toISOString().slice(0, 10); }
  var tierParam = parseInt(params.get('tier') || '1', 10);
  var spendByTier = [14500, 36000, 68000, 124000];
  var state = {
    registered: params.get('demoState') !== 'new',
    member: { code: 'CH0007', name: 'ชนิดา ศรีสวัสดิ์', nickname: 'มิ้นท์', joinDate: ymd(-210), birthMonth: new Date().getMonth() + 1, phone: '0891234567', hn: 'HN002201', status: 'ใช้งาน', note: '' },
    txs: [], rds: [], adjust: 0
  };
  // สร้างประวัติตัวอย่าง
  var total = spendByTier[Math.min(3, Math.max(0, tierParam))], parts = [0.18, 0.27, 0.12, 0.25, 0.18];
  parts.forEach(function (p, i) { state.txs.push({ date: ymd(-200 + i * 45), amount: Math.round(total * p / 100) * 100, receipt: 'INV-' + (2401 + i) }); });
  if (total >= 25000) state.rds.push({ date: ymd(-40), code: 'R04', name: 'IV Drip 1 ครั้ง', stars: 5 });

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
              if (code.indexOf('WELCOME-') === 0 || code === 'BIRTHDAY' || code.indexOf('ANNUAL-') === 0) { state.rds.push({ date: ymd(0), code: code, name: code === 'BIRTHDAY' ? 'ของขวัญวันเกิด' : code.indexOf('ANNUAL-') === 0 ? 'สิทธิ์ประจำปี ' + code.slice(7) : 'Welcome', stars: 0 }); }
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
