// ── DATA ──────────────────────────────────────────────────────────
const OFFICES = [
  { id:'dc', name:'DC Office (District Collectorate)', loc:'MG Road, Chickballapur', icon:'🏛️', iconBg:'#E8EAF6', type:['aadhaar','land'], status:'busy', trust:91, trustVotes:142, freshMins:18, staffName:'Ravi Kumar (CBP-042)', hours:'9 AM – 5:30 PM', phone:'08156-272001', mapUrl:'https://maps.google.com/?q=DC+Office+Chickballapur', announcement:'Aadhaar counter rush — arrive before 10 AM or after 3 PM', rating:4.2, ratingCount:89, counters:[
    { name:'Aadhaar New/Update', status:'open', wait:55, people:32, docs:['Proof of address','Proof of identity','Mobile number linked to Aadhaar'] },
    { name:'Income Certificate', status:'open', wait:20, people:12, docs:['Ration card','Bank passbook','Application form'] },
    { name:'Caste Certificate', status:'busy', wait:40, people:24, docs:['Application form (prescribed)','Ration card','School transfer certificate'] },
    { name:'Grievance / RTI', status:'open', wait:8, people:4, docs:['Written application'] },
  ]},
  { id:'passport', name:'Passport Seva Kendra', loc:'KEB Circle, Chickballapur', icon:'🛂', iconBg:'#E3F2FD', type:['passport'], status:'open', trust:95, trustVotes:87, freshMins:65, staffName:'Sunita Rao (PSK-07)', hours:'9 AM – 5 PM (Mon–Sat)', phone:'1800-258-1800', mapUrl:'https://maps.google.com/?q=Passport+Seva+Kendra+Chickballapur', announcement:'Token required — collect from gate before 9:30 AM', rating:4.6, ratingCount:142, counters:[
    { name:'New Passport (Fresh)', status:'open', wait:35, people:18, docs:['Aadhaar card','Birth certificate','Photograph (2x2)','Application printout'] },
    { name:'Passport Renewal', status:'open', wait:15, people:8, docs:['Old passport','Aadhaar card','Passport size photograph'] },
    { name:'Tatkal Application', status:'open', wait:25, people:11, docs:['All standard docs','Extra fee DD/Pay order','Urgent need proof'] },
    { name:'Document Verification', status:'busy', wait:50, people:28, docs:['Original documents only — no photocopies for this counter'] },
  ]},
  { id:'ration', name:'Ration Card Office', loc:'Near Bus Stand, Chickballapur', icon:'🍚', iconBg:'#F3E5F5', type:['ration'], status:'open', trust:78, trustVotes:34, freshMins:132, staffName:'Anonymous Staff', hours:'10 AM – 5 PM', phone:'1967', mapUrl:'https://maps.google.com/?q=Ration+Office+Chickballapur', announcement:'', rating:3.8, ratingCount:41, counters:[
    { name:'New Ration Card', status:'open', wait:30, people:16, docs:['Aadhaar (all family members)','Bank account proof','Address proof','Passport photos'] },
    { name:'Card Correction', status:'open', wait:12, people:6, docs:['Current ration card','Supporting document for correction'] },
    { name:'Surrender / Transfer', status:'closed', wait:0, people:0, docs:[] },
  ]},
  { id:'land', name:'Land Records (Tahsildar)', loc:'Taluk Office Road, Chickballapur', icon:'🗺️', iconBg:'#E8F5E9', type:['land'], status:'busy', trust:83, trustVotes:61, freshMins:45, staffName:'Prakash M (TLK-11)', hours:'9 AM – 5 PM', phone:'08156-272050', mapUrl:'https://maps.google.com/?q=Tahsildar+Office+Chickballapur', announcement:'RTC extracts: only digital copies issued today', rating:3.9, ratingCount:63, counters:[
    { name:'RTC / Pahani Extract', status:'open', wait:10, people:5, docs:['Survey number','Aadhaar card'] },
    { name:'Mutation (Khata)', status:'busy', wait:60, people:35, docs:['Sale deed','Previous Khata','Aadhaar card','Property tax paid receipt'] },
    { name:'Encumbrance Cert.', status:'open', wait:25, people:14, docs:['Survey details','Application fee challan'] },
    { name:'Land Conversion', status:'open', wait:45, people:22, docs:['Many documents — expand for full list'] },
  ]},
  { id:'aadhaar', name:'Aadhaar Enrollment Centre', loc:'Post Office Building, Chickballapur', icon:'🪪', iconBg:'#FFF3E0', type:['aadhaar'], status:'open', trust:88, trustVotes:112, freshMins:10, staffName:'Kavitha S (AEC-03)', hours:'9 AM – 5 PM (Mon–Fri)', phone:'1947', mapUrl:'https://maps.google.com/?q=Aadhaar+Centre+Chickballapur', announcement:'Biometric update: special slot 2–4 PM for senior citizens', rating:4.3, ratingCount:98, counters:[
    { name:'New Enrollment', status:'open', wait:20, people:10, docs:['Any Govt issued photo ID','Any valid address proof'] },
    { name:'Biometric Update', status:'open', wait:15, people:8, docs:['Existing Aadhaar card','Appointment slip if booked'] },
    { name:'Address Change', status:'open', wait:8, people:4, docs:['Aadhaar card','New address proof (bank statement/utility bill)'] },
  ]},
  { id:'sdm', name:'SDM Office', loc:'Civil Lines, Chickballapur', icon:'📋', iconBg:'#FFEBEE', type:['land'], status:'partial', trust:62, trustVotes:18, freshMins:195, staffName:'Anonymous Staff', hours:'10 AM – 5 PM', phone:'08156-272100', mapUrl:'https://maps.google.com/?q=SDM+Office+Chickballapur', announcement:'', rating:3.4, ratingCount:22, counters:[
    { name:'Revenue Records', status:'open', wait:30, people:15, docs:['Application form','Aadhaar card'] },
    { name:'Arms Licence', status:'closed', wait:0, people:0, docs:[] },
    { name:'Marriage Certificate', status:'open', wait:22, people:11, docs:['Application form','Photos of both applicants','ID proof both parties'] },
  ]},
  { id:'birth', name:'Birth / Death Certificate', loc:'Municipal Office, Chickballapur', icon:'📜', iconBg:'#E0F7FA', type:['ration'], status:'open', trust:74, trustVotes:29, freshMins:100, staffName:'Meena R (MUN-05)', hours:'10 AM – 4 PM', phone:'08156-273000', mapUrl:'https://maps.google.com/?q=Municipal+Office+Chickballapur', announcement:'', rating:4.0, ratingCount:35, counters:[
    { name:'Birth Certificate', status:'open', wait:12, people:6, docs:['Hospital discharge record','Aadhaar of parents','Application form'] },
    { name:'Death Certificate', status:'open', wait:8, people:4, docs:['Hospital/Doctor death certificate','Aadhaar of deceased'] },
    { name:'Correction Request', status:'busy', wait:35, people:19, docs:['Affidavit (notarised)','Supporting documents for correction'] },
  ]},
  { id:'police', name:'Police Station (NOC/Verify)', loc:'Station Road, Chickballapur', icon:'🚔', iconBg:'#EDE7F6', type:['aadhaar'], status:'open', trust:55, trustVotes:12, freshMins:175, staffName:'Unknown', hours:'All day (24x7)', phone:'100 / 08156-272200', mapUrl:'https://maps.google.com/?q=Police+Station+Chickballapur', announcement:'Call ahead before visiting — 08156-272200', rating:3.1, ratingCount:18, counters:[
    { name:'Character Certificate', status:'open', wait:45, people:22, docs:['Aadhaar card','Application letter','2 passport photos'] },
    { name:'FIR Copy / NOC', status:'open', wait:20, people:10, docs:['FIR number','Aadhaar card','Application'] },
  ]}
];

// ── STATE ─────────────────────────────────────────────────────────
let activeFilter = 'all';
let currentSort = null;
let votes = {};
let ratings = {};
let isAdmin = false;
let currentUser = null;
let autoRefreshInterval = null;
const ADMIN_CREDS = { email: 'admin@gov.in', pass: 'admin999' };
const DEMO_USERS = [
  { email: 'citizen@demo.in', pass: 'demo123', name: 'Rajesh Kumar', phone: '9876543210', uid: 'IQ-100042' }
];

// ── AUTH ──────────────────────────────────────────────────────────
function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach((t,i) => t.classList.toggle('active', (i===0 && tab==='login') || (i===1 && tab==='register')));
  document.getElementById('auth-login').classList.toggle('active', tab==='login');
  document.getElementById('auth-register').classList.toggle('active', tab==='register');
}

function doLogin() {
  const id = document.getElementById('loginId').value.trim().toLowerCase();
  const pass = document.getElementById('loginPass').value;
  if (!id || !pass) { showToast('⚠️ Enter email/phone and password'); return; }
  
  if (id === ADMIN_CREDS.email && pass === ADMIN_CREDS.pass) {
    isAdmin = true;
    currentUser = { name: 'Admin', email: id, uid: 'ADMIN-001', role: 'admin' };
    loginSuccess();
  } else {
    const user = DEMO_USERS.find(u => u.email === id && u.pass === pass);
    if (user) {
      isAdmin = false;
      currentUser = { ...user, role: 'citizen' };
      loginSuccess();
    } else {
      showToast('❌ Invalid credentials. Try citizen@demo.in / demo123');
    }
  }
}

function loginSuccess() {
  closeAuthModal();
  document.getElementById('userPill').textContent = '👤 ' + currentUser.name.split(' ')[0];
  document.getElementById('userPill').style.display = '';
  document.getElementById('navLoginBtn').style.display = 'none';
  document.getElementById('navRegisterBtn').style.display = 'none';
  document.getElementById('navLogoutBtn').style.display = '';
  document.getElementById('profileNavBtn').style.display = '';
  if (isAdmin) {
    document.getElementById('adminNavBtn').style.display = 'inline-block';
    document.getElementById('adminLockScreen').style.display = 'none';
    document.getElementById('adminPanelContent').style.display = 'block';
  }
  updateProfileTab();
  updateBookingAccess();
  updateRatingsAccess();
  startAutoRefresh();
  showToast('✅ Welcome, ' + currentUser.name + '!');
  filterCards();
  loadStaffCounters();
}

function doRegister() {
  const name = document.getElementById('regName').value.trim();
  const phone = document.getElementById('regPhone').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const pass = document.getElementById('regPass').value;
  const state = document.getElementById('regState').value;
  const district = document.getElementById('regDistrict').value;
  const taluk = document.getElementById('regTaluk').value;
  const pincode = document.getElementById('regPincode').value.trim();
  if (!name || !phone || !email || !pass) { showToast('⚠️ Fill all required fields'); return; }
  if (pass.length < 6) { showToast('⚠️ Password must be at least 6 characters'); return; }
  if (phone.length < 10) { showToast('⚠️ Enter valid 10-digit phone number'); return; }
  if (!state || !district || !taluk) { showToast('⚠️ Please select your State, District and Taluk'); return; }
  if (pincode && !/^\d{6}$/.test(pincode)) { showToast('⚠️ Pincode must be 6 digits'); return; }
  const uid = 'SL-' + Math.floor(100000 + Math.random()*900000);
  currentUser = { name, phone, email, uid, role: 'citizen', state, district, taluk, pincode };
  isAdmin = false;
  loginSuccess();
}

function doLogout() {
  if (!confirm('Logout?')) return;
  currentUser = null;
  isAdmin = false;
  document.getElementById('userPill').style.display = 'none';
  document.getElementById('navLoginBtn').style.display = '';
  document.getElementById('navRegisterBtn').style.display = '';
  document.getElementById('navLogoutBtn').style.display = 'none';
  document.getElementById('profileNavBtn').style.display = 'none';
  document.getElementById('adminNavBtn').style.display = 'none';
  document.getElementById('loginId').value = '';
  document.getElementById('loginPass').value = '';
  if (autoRefreshInterval) clearInterval(autoRefreshInterval);
  updateBookingAccess();
  updateRatingsAccess();
  switchTab('citizen');
  showToast('✅ Logged out successfully.');
}

// ── PROFILE ───────────────────────────────────────────────────────
function updateProfileTab() {
  if (!currentUser) return;
  document.getElementById('profileName').textContent = currentUser.name;
  document.getElementById('profileUID').textContent = currentUser.uid;
  document.getElementById('profileAvatar').textContent = isAdmin ? '👨‍💼' : '👤';
  const details = document.getElementById('profileDetails');
  details.innerHTML = `
    <div style="background:#F9FAFB;border-radius:10px;padding:12px;border:1.5px solid var(--border)">
      <div style="font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:4px">Email</div>
      <div style="font-size:14px;color:var(--text)">${currentUser.email || '—'}</div>
    </div>
    <div style="background:#F9FAFB;border-radius:10px;padding:12px;border:1.5px solid var(--border)">
      <div style="font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:4px">Phone</div>
      <div style="font-size:14px;color:var(--text)">${currentUser.phone || '—'}</div>
    </div>
    <div style="background:#F9FAFB;border-radius:10px;padding:12px;border:1.5px solid var(--border)">
      <div style="font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:4px">Role</div>
      <div style="font-size:14px;color:var(--text);text-transform:capitalize">${currentUser.role}</div>
    </div>
    <div style="background:#F9FAFB;border-radius:10px;padding:12px;border:1.5px solid var(--border)">
      <div style="font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:4px">Citizen ID</div>
      <div style="font-size:14px;color:var(--navy);font-family:monospace;font-weight:600">${currentUser.uid}</div>
    </div>
  `;
}

// ── HELPERS ───────────────────────────────────────────────────────
function getWaitClass(m) { return m<=20?'wait-low':m<=40?'wait-mid':'wait-high'; }
function getWaitPct(m) { return Math.min(100,Math.round(m/60*100)); }
function getFillClass(m) { return m<=20?'fill-low':m<=40?'fill-mid':'fill-high'; }
function getDotColor(s) { return s==='open'?'#4CAF50':s==='busy'?'#FF9800':s==='closed'?'#F44336':'#9E9E9E'; }
function getTrustColor(s) { return s>=80?'var(--green)':s>=60?'var(--amber)':'var(--red)'; }
function getTrustStars(s) { const n=Math.round(s/20); return Array.from({length:5},(_,i)=>i<n?'⭐':'☆').join(''); }
function getFreshnessLabel(m) {
  if(m<30) return `<span class="fresh">🟢 Updated ${m} min ago</span>`;
  if(m<90) return `<span class="stale">🟡 Updated ${m} min ago</span>`;
  return `<span class="stale" style="color:var(--red)">🔴 Updated ${Math.round(m/60)}h ago — may be stale</span>`;
}
function getStatusBadge(s) {
  const map = { open:'status-open dot-open Open', busy:'status-busy dot-busy Busy', closed:'status-closed dot-closed Closed', partial:'status-busy dot-busy Partial' };
  const [cls,dotCls,label] = (map[s]||map.open).split(' ');
  return `<span class="status-badge ${cls}"><span class="status-dot ${dotCls}"></span>${label}</span>`;
}
function getRatingStars(avg, id) {
  const filled = Math.round(avg);
  return Array.from({length:5},(_,i)=>`<span class="r-star ${i<filled?'filled':''}" onclick="rateOffice('${id}',${i+1})" title="${i+1} star">★</span>`).join('');
}

// ── RENDER OFFICES ────────────────────────────────────────────────
function renderOffices(list) {
  const grid = document.getElementById('officesGrid');
  document.getElementById('card-count').textContent = `${list.length} offices`;
  grid.innerHTML = list.map(o => {
    const v = votes[o.id] || { acc:0, inac:0, voted:null };
    const r = ratings[o.id] || { avg: o.rating, count: o.ratingCount };
    const openCounters = o.counters.filter(c => c.status !== 'closed');
    return `
    <div class="office-card" id="card-${o.id}" onclick="selectCard('${o.id}')">
      <div class="card-header">
        <div class="office-icon" style="background:${o.iconBg}">${o.icon}</div>
        <div class="office-info">
          <div class="office-name">${o.name}</div>
          <div class="office-loc">📍 ${o.loc}</div>
          <div class="office-hours">🕐 ${o.hours}</div>
        </div>
        ${getStatusBadge(o.status)}
      </div>
      ${o.announcement?`<div class="card-announce">📢 ${o.announcement}</div>`:''}
      <div class="counters-section">
        <div class="counters-label">Counters (${openCounters.length}/${o.counters.length} open)</div>
        <div class="counters-list">
          ${o.counters.map(c=>`
          <div class="counter-row" onclick="event.stopPropagation();toggleDocs('${o.id}-${c.name.replace(/\s+/g,'-')}')">
            <div class="counter-dot" style="background:${getDotColor(c.status)}"></div>
            <div class="counter-name">${c.name}</div>
            <span class="counter-status-badge cs-${c.status==='closed'?'closed':c.status==='busy'?'busy':'open'}">${c.status==='closed'?'Closed':c.status==='busy'?'Busy':'Open'}</span>
            ${c.status!=='closed'?`<span class="counter-wait ${getWaitClass(c.wait)}">${c.wait}m</span><span class="counter-people">👥${c.people}</span>`:''}
          </div>
          <div id="${o.id}-${c.name.replace(/\s+/g,'-')}" class="counter-expand">
            ${c.status!=='closed'?`<div class="wait-bar"><div class="wait-bar-fill ${getFillClass(c.wait)}" style="width:${getWaitPct(c.wait)}%"></div></div>`:''}
            ${c.docs.length>0?`<div style="margin-top:8px;font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px">📋 Documents needed:</div>${c.docs.map((d,i)=>`<label style="display:flex;align-items:center;gap:7px;margin:4px 0;cursor:pointer;font-size:12px;color:var(--navy)"><input type="checkbox" style="accent-color:var(--navy)"> ${d}</label>`).join('')}`:''}
            ${c.status!=='closed'?`<button class="btn btn-navy btn-sm" style="margin-top:8px" onclick="event.stopPropagation();alertMe('${o.name}','${c.name}')">🔔 Alert when &lt;15 min</button>`:''}
          </div>
          `).join('')}
        </div>
      </div>
      <div class="updated-tag">🕐 ${getFreshnessLabel(o.freshMins)} &nbsp;·&nbsp; 👤 ${o.staffName}</div>
      <div style="padding:0 18px 8px;display:flex;align-items:center;gap:6px">
        <div class="rating-stars-input">${getRatingStars(r.avg, o.id)}</div>
        <span class="rating-avg">${r.avg.toFixed(1)} (${r.count} reviews)</span>
      </div>
      <div class="trust-row">
        <div class="trust-block">
          <span class="trust-label">Trust:</span>
          <div class="trust-stars">${getTrustStars(o.trust)}</div>
          <span class="trust-score-num">${o.trust}</span>
        </div>
        <div style="text-align:right">
          <div class="trust-score-label" style="color:${getTrustColor(o.trust)}">${o.trust>=80?'High Confidence':o.trust>=60?'Moderate':'Low — verify first'}</div>
          <div style="font-size:11px;color:var(--muted)">${o.trustVotes} citizens verified</div>
        </div>
      </div>
      <div class="vote-row">
        <span class="vote-label">Accurate?</span>
        <button class="vote-btn accurate ${v.voted==='acc'?'voted':''}" onclick="event.stopPropagation();castVote('${o.id}','acc')">👍 Yes (${v.acc})</button>
        <button class="vote-btn inaccurate ${v.voted==='inac'?'voted':''}" onclick="event.stopPropagation();castVote('${o.id}','inac')">👎 No (${v.inac})</button>
      </div>
      <div class="card-actions">
        <button class="card-btn" onclick="event.stopPropagation();showShareModal('${o.id}')">🔗 Share</button>
        <button class="card-btn" onclick="event.stopPropagation();window.open('tel:${o.phone}')">📞 Call</button>
        <button class="card-btn" onclick="event.stopPropagation();window.open('${o.mapUrl}','_blank')">🗺️ Map</button>
        <button class="card-btn primary" onclick="event.stopPropagation();quickBook('${o.id}')">🎫 Book</button>
      </div>
    </div>`;
  }).join('');
  updateStats(list);
}

function updateStats(list) {
  const open = list.filter(o=>o.status!=='closed').length;
  const counters = list.reduce((s,o)=>s+o.counters.filter(c=>c.status!=='closed').length,0);
  const waitVals = list.flatMap(o=>o.counters.filter(c=>c.status!=='closed').map(c=>c.wait));
  const avg = waitVals.length ? Math.round(waitVals.reduce((a,b)=>a+b,0)/waitVals.length) : 0;
  document.getElementById('statOfficesOpen').textContent = open;
  document.getElementById('statCountersOpen').textContent = counters;
  document.getElementById('statAvgWait').textContent = '~'+avg;
}

function filterCards() {
  const q = document.getElementById('searchInput').value.toLowerCase();
  let list = OFFICES.filter(o=>{
    const matchSearch = !q || o.name.toLowerCase().includes(q)||o.loc.toLowerCase().includes(q)||o.counters.some(c=>c.name.toLowerCase().includes(q));
    let matchFilter = true;
    if(activeFilter==='open') matchFilter=o.status!=='closed';
    else if(activeFilter==='short') matchFilter=o.counters.some(c=>c.status!=='closed'&&c.wait<=15);
    else if(['passport','ration','land','aadhaar'].includes(activeFilter)) matchFilter=o.type.includes(activeFilter);
    return matchSearch&&matchFilter;
  });
  if(currentSort==='wait') list.sort((a,b)=>Math.min(...(a.counters.filter(c=>c.status!=='closed').map(c=>c.wait)||[999]))-Math.min(...(b.counters.filter(c=>c.status!=='closed').map(c=>c.wait)||[999])));
  if(currentSort==='trust') list.sort((a,b)=>b.trust-a.trust);
  if(currentSort==='rating') list.sort((a,b)=>(ratings[b.id]?.avg||b.rating)-(ratings[a.id]?.avg||a.rating));
  renderOffices(list);
}

function setFilter(el, filter) {
  activeFilter=filter;
  document.querySelectorAll('.filter-chip').forEach(c=>c.classList.remove('active'));
  el.classList.add('active');
  filterCards();
}
function sortByWait() { currentSort='wait'; filterCards(); showToast('⬆ Sorted by shortest wait first'); }
function sortByTrust() { currentSort='trust'; filterCards(); showToast('⭐ Sorted by highest trust score'); }
function sortByRating() { currentSort='rating'; filterCards(); showToast('🏆 Sorted by citizen ratings'); }
function selectCard(id) { document.querySelectorAll('.office-card').forEach(c=>c.classList.remove('selected')); document.getElementById('card-'+id)?.classList.add('selected'); }
function toggleDocs(id) { const el=document.getElementById(id); if(el) el.style.display=el.style.display==='none'||el.style.display===''?'block':'none'; }

function rateOffice(officeId, stars) {
  if(!currentUser){ showToast('🔐 Please login to rate offices'); openAuthModal('login'); return; }
  ratings[officeId] = ratings[officeId] || { avg: OFFICES.find(o=>o.id===officeId).rating, count: OFFICES.find(o=>o.id===officeId).ratingCount };
  const r = ratings[officeId];
  r.avg = ((r.avg * r.count) + stars) / (r.count + 1);
  r.count++;
  filterCards();
  showToast(`⭐ You rated ${stars} star${stars>1?'s':''}! Thank you.`);
}

function castVote(id, type) {
  if(!votes[id]) votes[id]={acc:0,inac:0,voted:null};
  if(votes[id].voted){showToast('You already voted for this office');return;}
  votes[id][type]++;
  votes[id].voted=type;
  filterCards();
  showToast(type==='acc'?'👍 Accuracy confirmed, thank you!':'👎 Flagged for staff review, thank you!');
}

// ── REFRESH ───────────────────────────────────────────────────────
function refreshAll() {
  const btn = document.getElementById('refreshBtn');
  btn.innerHTML = '<span class="spinning">🔄</span> Refreshing…';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = '🔄 Refresh Now';
    btn.disabled = false;
    document.getElementById('lastRefreshTime').textContent = 'just now';
    filterCards();
    showToast('✅ Data refreshed successfully!');
  }, 1200);
}

let refreshCountdown = 30;
function startAutoRefresh() {
  if(autoRefreshInterval) clearInterval(autoRefreshInterval);
  autoRefreshInterval = setInterval(() => {
    if(!document.getElementById('autoRefreshToggle').checked) return;
    refreshCountdown--;
    document.getElementById('lastRefreshTime').textContent = refreshCountdown + 's ago';
    if(refreshCountdown <= 0) {
      refreshCountdown = 30;
      document.getElementById('lastRefreshTime').textContent = 'just now';
    }
  }, 1000);
}

function toggleAutoRefresh() {
  const on = document.getElementById('autoRefreshToggle').checked;
  showToast(on ? '✅ Auto-refresh ON (every 30s)' : '⏸️ Auto-refresh paused');
}

// ── TOKEN BOOKING ─────────────────────────────────────────────────
function loadBookCounters() {
  const offId = document.getElementById('bookOffice').value;
  const sel = document.getElementById('bookCounter');
  const office = OFFICES.find(o=>o.id===offId);
  if(!office){sel.innerHTML='<option>-- Select Office First --</option>';return;}
  sel.innerHTML = office.counters.filter(c=>c.status!=='closed').map(c=>`<option value="${c.name}">${c.name} (~${c.wait} min wait)</option>`).join('');
}

function bookToken() {
  if(!currentUser){ showToast('🔐 Sign up required to book a token'); openAuthModal('register'); return; }
  const office = document.getElementById('bookOffice').value;
  const counter = document.getElementById('bookCounter').value;
  const slot = document.getElementById('bookSlot').value;
  const type = document.getElementById('bookType').value;
  const phone = document.getElementById('bookPhone').value;
  if(!office||!counter){showToast('⚠️ Select office and counter first');return;}
  if(!phone||phone.length<10){showToast('⚠️ Enter valid 10-digit mobile number');return;}
  const offName = OFFICES.find(o=>o.id===office)?.name;
  const prefix = type==='senior'?'SR':type==='disabled'?'DA':type==='pregnant'?'PW':'T';
  const tokenNum = prefix + '-' + String(Math.floor(100+Math.random()*900));
  const box = document.getElementById('tokenConfirmBox');
  box.style.display = 'block';
  box.innerHTML = `
    <div class="token-confirm" style="margin-top:16px">
      <div style="font-size:12px;opacity:0.7;margin-bottom:4px">YOUR TOKEN NUMBER</div>
      <div class="token-number">${tokenNum}</div>
      <div style="font-size:13px;opacity:0.8;margin-top:8px">${offName} · ${counter}</div>
      <div style="font-size:12px;opacity:0.7;margin-top:4px">Slot: ${slot}</div>
      ${type!=='general'?`<div style="display:inline-flex;align-items:center;gap:5px;background:rgba(255,255,255,0.15);border-radius:10px;padding:4px 12px;margin-top:8px;font-size:12px">🌟 Priority Queue</div>`:''}
      <div style="background:rgba(255,255,255,0.1);border-radius:10px;padding:10px;margin-top:12px;font-size:12px">
        ✅ SMS confirmation sent to ${phone}<br>
        📋 Carry required documents<br>
        ⏰ Arrive 10 min before your slot
      </div>
    </div>
  `;
  showToast('🎫 Token booked! SMS sent to ' + phone);
}

function quickBook(officeId) {
  if(!currentUser){ showToast('🔐 Sign up required to book a token'); openAuthModal('register'); return; }
  document.getElementById('bookOffice').value = officeId;
  loadBookCounters();
  switchTab('book');
}

// ── STAFF PANEL ───────────────────────────────────────────────────
function loadStaffCounters() {
  const office = OFFICES.find(o=>o.id===document.getElementById('staffOffice').value);
  const container = document.getElementById('counterEditorRows');
  if(!office){container.innerHTML='';return;}
  container.innerHTML = office.counters.map((c,i)=>`
    <div class="counter-edit-row" id="crow-${i}">
      <input value="${c.name}" placeholder="Counter name">
      <select>
        <option ${c.status==='open'?'selected':''} value="open">🟢 Open</option>
        <option ${c.status==='busy'?'selected':''} value="busy">🟡 Busy</option>
        <option ${c.status==='closed'?'selected':''} value="closed">🔴 Closed</option>
      </select>
      <input type="number" value="${c.wait}" min="0" max="180">
      <input type="number" value="${c.people}" min="0" max="200">
      <button class="del-counter" onclick="document.getElementById('crow-${i}').remove()">✕</button>
    </div>
  `).join('');
}

function addCounterRow() {
  const container = document.getElementById('counterEditorRows');
  const idx = container.children.length;
  const div = document.createElement('div');
  div.className='counter-edit-row';
  div.id='crow-'+idx;
  div.innerHTML=`<input placeholder="Counter name"><select><option value="open">🟢 Open</option><option value="busy">🟡 Busy</option><option value="closed">🔴 Closed</option></select><input type="number" value="15" min="0" max="180"><input type="number" value="5" min="0" max="200"><button class="del-counter" onclick="this.closest('.counter-edit-row').remove()">✕</button>`;
  container.appendChild(div);
}

function submitStaffUpdate() {
  const pin = document.getElementById('staffPin').value;
  const office = document.getElementById('staffOffice').value;
  const sid = document.getElementById('staffId').value;
  if(!office){showToast('⚠️ Select an office');return;}
  if(!sid){showToast('⚠️ Enter your Staff ID');return;}
  if(pin.length!==6){showToast('⚠️ Enter valid 6-digit PIN');return;}
  if(pin!=='123456'){showToast('❌ Incorrect PIN. Demo PIN: 123456');return;}
  showToast(`✅ Update published for ${office} by ${sid}. Live now.`);
}

function publishNotice() {
  const text = document.getElementById('adminNoticeText').value.trim();
  if(!text){showToast('⚠️ Notice text is empty');return;}
  document.getElementById('noticeText').textContent = text;
  document.getElementById('noticeBar').classList.remove('hidden');
  document.getElementById('noticeTime').textContent = 'Updated: just now';
  document.getElementById('alertText').innerHTML = '🔴 ' + text;
  showToast('✅ Notice published successfully!');
}

function clearNotice() {
  document.getElementById('noticeBar').classList.add('hidden');
  showToast('✅ Notice hidden from public view.');
}

function publishTicker() {
  const text = document.getElementById('adminTickerText').value.trim();
  if(!text){showToast('⚠️ Ticker text is empty');return;}
  document.getElementById('tickerText').textContent = text.replace(/·/g,'&nbsp;•&nbsp;');
  showToast('✅ Ticker updated!');
}

function scheduleAlert() { showToast('🔔 Alert scheduler — feature coming soon!'); }
function markEmergencyClosed() {
  const office = document.getElementById('staffOffice').value;
  if(!office){showToast('⚠️ Select an office first');return;}
  if(confirm('Mark "' + office + '" as EMERGENCY CLOSED? This immediately updates the live page.')) {
    showToast('🚨 Emergency closed status published for ' + office + '!');
  }
}

// Trust table removed

// ── MODALS ────────────────────────────────────────────────────────
function showShareModal(officeId) {
  const office = officeId ? OFFICES.find(o=>o.id===officeId) : null;
  document.getElementById('shareLink').textContent = `sarkariline.gov.in/cbp/${officeId||'all'}`;
  document.getElementById('shareModalDesc').textContent = office ? `Share live status for "${office.name}"` : 'Share Sarkari Line for Chickballapur district';
  document.getElementById('shareModal').classList.add('show');
}
function closeModal(id) { document.getElementById(id).classList.remove('show'); }
function copyLink() { showToast('✅ Link copied to clipboard!'); }
function shareWhatsApp() { showToast('💬 Opening WhatsApp…'); }
function shareSMS() { showToast('📱 Opening SMS app…'); }

function alertMe(office, counter) {
  event.stopPropagation();
  const num = prompt(`Enter your mobile number to get SMS when "${counter}" wait drops below 15 min:`);
  if(num && num.length===10) showToast(`✅ Alert set! SMS will be sent to ${num} when wait drops below 15 min.`);
  else if(num) showToast('⚠️ Enter a valid 10-digit mobile number.');
}

// ── MISC ──────────────────────────────────────────────────────────
function gpsLocate() { showToast('📍 Finding offices near your location…'); }
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.style.display = 'block';
  clearTimeout(window._tt);
  window._tt = setTimeout(() => { t.style.display='none'; }, 3000);
}

function switchTab(name) {
  document.querySelectorAll('.tab-content').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t=>t.classList.remove('active'));
  const el = document.getElementById('tab-'+name);
  if(el) el.classList.add('active');
  // Mark active nav tab
  document.querySelectorAll('.nav-tab').forEach(t=>{
    if(t.getAttribute('onclick') && t.getAttribute('onclick').includes("'"+name+"'")) t.classList.add('active');
  });
  if(name==='ratings') renderCommunityRatings();
  if(name==='docs') {} // handled by onchange
}

// ── LANGUAGE ──────────────────────────────────────────────────────
let currentLang = 'en';
const TRANSLATIONS = {
  en: {
    liveQueue:'👤 Live Queue', bookToken:'🎫 Book Token', smsTab:'📱 SMS / WhatsApp',
    ratingsTab:'⭐ Ratings', docTab:'📋 Doc Checklist', helpTab:'📖 Help', adminTab:'🔒 Admin', profileTab:'👤 My Profile',
    heroTitle:'🏛️ Sarkari Line — Live Queue Status', heroSub:'Know before you go. Check counter status, wait times & documents needed.',
    searchPlaceholder:'Search office, service or location…', nearMe:'📍 Near Me',
    allOffices:'All Offices', openNow:'🟢 Open Now', shortWait:'⚡ Wait <15 min',
    officesOpen:'Offices Open Now', countersActive:'Counters Active', avgWait:'Avg Wait (min)', infoAccuracy:'Info Accuracy',
    liveData:'Live data · Last refreshed:', autoRefresh:'Auto-refresh (30s)',
    govOffices:'Government Offices', sortWait:'⬆ Sort by Wait', sortTrust:'⭐ Sort by Trust', sortRating:'🏆 Sort by Rating',
    mapTitle:'Office Map', mapSub:'Tap to open map · Tap any card below for directions',
    login:'Login', register:'Register', logout:'Logout', langLabel:'🌐 English',
    countersLabel:'Counters', trust:'Trust:', accurate:'👍 Yes', inaccurate:'👎 No',
    share:'🔗 Share', call:'📞 Call', map:'🗺️ Map', book:'🎫 Book',
    selectState:'-- Select State --', selectDistrict:'-- Select District --', selectTaluk:'-- Select Taluk --'
  },
  kn: {
    liveQueue:'👤 ಲೈವ್ ಕ್ಯೂ', bookToken:'🎫 ಟೋಕನ್ ಬುಕ್', smsTab:'📱 SMS / WhatsApp',
    ratingsTab:'⭐ ರೇಟಿಂಗ್', docTab:'📋 ದಾಖಲೆ ಪಟ್ಟಿ', helpTab:'📖 ಸಹಾಯ', adminTab:'🔒 ನಿರ್ವಾಹಕ', profileTab:'👤 ನನ್ನ ಪ್ರೊಫೈಲ್',
    heroTitle:'🏛️ ಸರ್ಕಾರಿ ಲೈನ್ — ಲೈವ್ ಕ್ಯೂ ಸ್ಥಿತಿ', heroSub:'ಹೋಗುವ ಮೊದಲು ತಿಳಿಯಿರಿ. ಕೌಂಟರ್ ಸ್ಥಿತಿ, ಕಾಯುವ ಸಮಯ ಮತ್ತು ದಾಖಲೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.',
    searchPlaceholder:'ಕಚೇರಿ, ಸೇವೆ ಅಥವಾ ಸ್ಥಳ ಹುಡುಕಿ…', nearMe:'📍 ಹತ್ತಿರದಲ್ಲಿ',
    allOffices:'ಎಲ್ಲ ಕಚೇರಿಗಳು', openNow:'🟢 ಈಗ ತೆರೆದಿದೆ', shortWait:'⚡ 15 ನಿಮಿಷಕ್ಕಿಂತ ಕಡಿಮೆ ಕಾಯುವಿಕೆ',
    officesOpen:'ಕಚೇರಿಗಳು ತೆರೆದಿವೆ', countersActive:'ಕೌಂಟರ್‌ಗಳು ಸಕ್ರಿಯ', avgWait:'ಸರಾಸರಿ ಕಾಯುವ ಸಮಯ (ನಿಮಿ)', infoAccuracy:'ಮಾಹಿತಿ ನಿಖರತೆ',
    liveData:'ಲೈವ್ ಡೇಟಾ · ಕೊನೆಯ ರಿಫ್ರೆಶ್:', autoRefresh:'ಸ್ವಯಂ-ರಿಫ್ರೆಶ್ (30ಸೆ)',
    govOffices:'ಸರ್ಕಾರಿ ಕಚೇರಿಗಳು', sortWait:'⬆ ಕಾಯುವಿಕೆ ಪ್ರಕಾರ', sortTrust:'⭐ ವಿಶ್ವಾಸ ಪ್ರಕಾರ', sortRating:'🏆 ರೇಟಿಂಗ್ ಪ್ರಕಾರ',
    mapTitle:'ಕಚೇರಿ ನಕ್ಷೆ', mapSub:'ನಕ್ಷೆ ತೆರೆಯಲು ಟ್ಯಾಪ್ ಮಾಡಿ · ದಿಕ್ಕುಗಳಿಗಾಗಿ ಕಾರ್ಡ್ ಟ್ಯಾಪ್ ಮಾಡಿ',
    login:'ಲಾಗಿನ್', register:'ನೋಂದಾಯಿಸಿ', logout:'ಲಾಗ್ ಔಟ್', langLabel:'🌐 ಕನ್ನಡ',
    countersLabel:'ಕೌಂಟರ್‌ಗಳು', trust:'ವಿಶ್ವಾಸ:', accurate:'👍 ಹೌದು', inaccurate:'👎 ಇಲ್ಲ',
    share:'🔗 ಹಂಚು', call:'📞 ಕರೆ', map:'🗺️ ನಕ್ಷೆ', book:'🎫 ಬುಕ್',
    selectState:'-- ರಾಜ್ಯ ಆಯ್ಕೆ ಮಾಡಿ --', selectDistrict:'-- ಜಿಲ್ಲೆ ಆಯ್ಕೆ ಮಾಡಿ --', selectTaluk:'-- ತಾಲೂಕು ಆಯ್ಕೆ ಮಾಡಿ --'
  },
  hi: {
    liveQueue:'👤 लाइव कतार', bookToken:'🎫 टोकन बुक करें', smsTab:'📱 SMS / WhatsApp',
    ratingsTab:'⭐ रेटिंग', docTab:'📋 दस्तावेज़ सूची', helpTab:'📖 सहायता', adminTab:'🔒 प्रशासक', profileTab:'👤 मेरी प्रोफ़ाइल',
    heroTitle:'🏛️ सरकारी लाइन — लाइव कतार स्थिति', heroSub:'जाने से पहले जानें। काउंटर स्थिति, प्रतीक्षा समय और दस्तावेज़ देखें।',
    searchPlaceholder:'कार्यालय, सेवा या स्थान खोजें…', nearMe:'📍 नजदीक',
    allOffices:'सभी कार्यालय', openNow:'🟢 अभी खुला', shortWait:'⚡ 15 मिनट से कम प्रतीक्षा',
    officesOpen:'कार्यालय खुले हैं', countersActive:'काउंटर सक्रिय', avgWait:'औसत प्रतीक्षा (मिनट)', infoAccuracy:'जानकारी सटीकता',
    liveData:'लाइव डेटा · अंतिम रिफ्रेश:', autoRefresh:'स्वतः-रिफ्रेश (30सेकंड)',
    govOffices:'सरकारी कार्यालय', sortWait:'⬆ प्रतीक्षा के अनुसार', sortTrust:'⭐ विश्वास के अनुसार', sortRating:'🏆 रेटिंग के अनुसार',
    mapTitle:'कार्यालय मानचित्र', mapSub:'मानचित्र खोलने के लिए टैप करें · दिशाओं के लिए कार्ड टैप करें',
    login:'लॉगिन', register:'पंजीकरण', logout:'लॉग आउट', langLabel:'🌐 हिन्दी',
    countersLabel:'काउंटर', trust:'विश्वास:', accurate:'👍 हाँ', inaccurate:'👎 नहीं',
    share:'🔗 शेयर', call:'📞 कॉल', map:'🗺️ नक्शा', book:'🎫 बुक',
    selectState:'-- राज्य चुनें --', selectDistrict:'-- जिला चुनें --', selectTaluk:'-- तहसील चुनें --'
  },
  ta: {
    liveQueue:'👤 நேரடி வரிசை', bookToken:'🎫 டோக்கன் முன்பதிவு', smsTab:'📱 SMS / WhatsApp',
    ratingsTab:'⭐ மதிப்பீடு', docTab:'📋 ஆவண பட்டியல்', helpTab:'📖 உதவி', adminTab:'🔒 நிர்வாகி', profileTab:'👤 என் சுயவிவரம்',
    heroTitle:'🏛️ சர்க்காரி லைன் — நேரடி வரிசை நிலை', heroSub:'போவதற்கு முன் தெரிந்துகொள்ளுங்கள். கவுண்டர் நிலை, காத்திருப்பு நேரம் மற்றும் ஆவணங்களை சரிபார்க்கவும்.',
    searchPlaceholder:'அலுவலகம், சேவை அல்லது இடத்தை தேடுங்கள்…', nearMe:'📍 அருகில்',
    allOffices:'அனைத்து அலுவலகங்கள்', openNow:'🟢 இப்போது திறந்தது', shortWait:'⚡ 15 நிமிடத்திற்கும் குறைவான காத்திருப்பு',
    officesOpen:'அலுவலகங்கள் திறந்துள்ளன', countersActive:'கவுண்டர்கள் செயலில்', avgWait:'சராசரி காத்திருப்பு (நிமிடம்)', infoAccuracy:'தகவல் துல்லியம்',
    liveData:'நேரடி தரவு · கடைசி புதுப்பிப்பு:', autoRefresh:'தானியங்கி புதுப்பிப்பு (30வி)',
    govOffices:'அரசு அலுவலகங்கள்', sortWait:'⬆ காத்திருப்பு வரிசை', sortTrust:'⭐ நம்பகத்தன்மை வரிசை', sortRating:'🏆 மதிப்பீடு வரிசை',
    mapTitle:'அலுவலக வரைபடம்', mapSub:'வரைபடம் திறக்க தட்டவும் · திசைகளுக்கு கார்டை தட்டவும்',
    login:'உள்நுழைய', register:'பதிவு செய்க', logout:'வெளியேறு', langLabel:'🌐 தமிழ்',
    countersLabel:'கவுண்டர்கள்', trust:'நம்பகத்தன்மை:', accurate:'👍 ஆம்', inaccurate:'👎 இல்லை',
    share:'🔗 பகிர்', call:'📞 அழைக்க', map:'🗺️ வரைபடம்', book:'🎫 முன்பதிவு',
    selectState:'-- மாநிலம் தேர்ந்தெடு --', selectDistrict:'-- மாவட்டம் தேர்ந்தெடு --', selectTaluk:'-- தாலுக் தேர்ந்தெடு --'
  },
  te: {
    liveQueue:'👤 లైవ్ క్యూ', bookToken:'🎫 టోకెన్ బుక్', smsTab:'📱 SMS / WhatsApp',
    ratingsTab:'⭐ రేటింగ్', docTab:'📋 పత్రాల జాబితా', helpTab:'📖 సహాయం', adminTab:'🔒 నిర్వాహకుడు', profileTab:'👤 నా ప్రొఫైల్',
    heroTitle:'🏛️ సర్కారీ లైన్ — లైవ్ క్యూ స్థితి', heroSub:'వెళ్ళే ముందు తెలుసుకోండి. కౌంటర్ స్థితి, వేచి ఉండే సమయాలు మరియు పత్రాలు తనిఖీ చేయండి.',
    searchPlaceholder:'కార్యాలయం, సేవ లేదా స్థానం శోధించండి…', nearMe:'📍 సమీపంలో',
    allOffices:'అన్ని కార్యాలయాలు', openNow:'🟢 ఇప్పుడు తెరిచి', shortWait:'⚡ 15 నిమిషాల కంటే తక్కువ వేచి',
    officesOpen:'కార్యాలయాలు తెరిచి ఉన్నాయి', countersActive:'కౌంటర్లు సక్రియంగా', avgWait:'సగటు వేచి (నిమిషాలు)', infoAccuracy:'సమాచారం ఖచ్చితత్వం',
    liveData:'లైవ్ డేటా · చివరి రిఫ్రెష్:', autoRefresh:'స్వయంచాలక రిఫ్రెష్ (30సె)',
    govOffices:'ప్రభుత్వ కార్యాలయాలు', sortWait:'⬆ వేచి ఉండే సమయం వరుస', sortTrust:'⭐ విశ్వాసం వరుస', sortRating:'🏆 రేటింగ్ వరుస',
    mapTitle:'కార్యాలయాల మ్యాప్', mapSub:'మ్యాప్ తెరవడానికి టాప్ చేయండి · దిశలకు కార్డ్ టాప్ చేయండి',
    login:'లాగిన్', register:'నమోదు', logout:'లాగ్ అవుట్', langLabel:'🌐 తెలుగు',
    countersLabel:'కౌంటర్లు', trust:'విశ్వాసం:', accurate:'👍 అవును', inaccurate:'👎 కాదు',
    share:'🔗 పంచు', call:'📞 కాల్', map:'🗺️ మ్యాప్', book:'🎫 బుక్',
    selectState:'-- రాష్ట్రం ఎంచుకోండి --', selectDistrict:'-- జిల్లా ఎంచుకోండి --', selectTaluk:'-- తాలూకా ఎంచుకోండి --'
  }
};

function applyTranslation(code) {
  const t = TRANSLATIONS[code] || TRANSLATIONS.en;
  // Nav tabs
  const navTabs = document.querySelectorAll('.nav-tab');
  const navKeys = ['liveQueue','bookToken','smsTab','ratingsTab','docTab','helpTab'];
  navTabs.forEach((tab, i) => {
    if(navKeys[i]) tab.textContent = t[navKeys[i]];
  });
  // Hero
  const h1 = document.querySelector('.hero-left h1');
  if(h1) h1.textContent = t.heroTitle;
  const heroP = document.querySelector('.hero-left p');
  if(heroP) heroP.textContent = t.heroSub;
  // Search
  const si = document.getElementById('searchInput');
  if(si) si.placeholder = t.searchPlaceholder;
  const nmBtn = document.querySelector('.search-bar .btn');
  if(nmBtn) nmBtn.textContent = t.nearMe;
  // Filter chips
  const chips = document.querySelectorAll('.filter-chip');
  if(chips[0]) chips[0].textContent = t.allOffices;
  if(chips[1]) chips[1].textContent = t.openNow;
  if(chips[6]) chips[6].innerHTML = t.shortWait;
  // Stats labels
  const statLabels = document.querySelectorAll('.stat-label');
  if(statLabels[0]) statLabels[0].textContent = t.officesOpen;
  if(statLabels[1]) statLabels[1].textContent = t.countersActive;
  if(statLabels[2]) statLabels[2].textContent = t.avgWait;
  if(statLabels[3]) statLabels[3].textContent = t.infoAccuracy;
  // Refresh bar
  const refreshSpan = document.querySelector('.refresh-status span');
  if(refreshSpan) {
    const lastTime = document.getElementById('lastRefreshTime');
    const lastVal = lastTime ? lastTime.textContent : 'just now';
    refreshSpan.innerHTML = t.liveData + ' <strong id="lastRefreshTime">' + lastVal + '</strong>';
  }
  const arToggle = document.querySelector('.auto-refresh-toggle');
  if(arToggle) {
    const inp = arToggle.querySelector('input');
    arToggle.innerHTML = '';
    if(inp) arToggle.appendChild(inp);
    const lbl = document.createElement('label');
    lbl.className = 'toggle-switch';
    lbl.innerHTML = '<input type="checkbox" id="autoRefreshToggle" onchange="toggleAutoRefresh()" checked><span class="slider"></span>';
    arToggle.insertBefore(lbl, arToggle.firstChild);
    arToggle.append(' ' + t.autoRefresh);
  }
  // Section title
  const sectionTitle = document.querySelector('#tab-citizen .section-title');
  if(sectionTitle) sectionTitle.innerHTML = t.govOffices + ' <span class="badge" id="card-count">' + (document.getElementById('card-count')?.textContent||'8 offices') + '</span>';
  // Sort buttons
  const sortBtns = document.querySelectorAll('#tab-citizen .section-row .btn');
  if(sortBtns[0]) sortBtns[0].textContent = t.sortWait;
  if(sortBtns[1]) sortBtns[1].textContent = t.sortTrust;
  if(sortBtns[2]) sortBtns[2].textContent = t.sortRating;
  // Map
  const mapStrong = document.querySelector('.map-section strong');
  if(mapStrong) mapStrong.textContent = t.mapTitle;
  const mapSpan = document.querySelector('.map-section span');
  if(mapSpan) mapSpan.textContent = t.mapSub;
  // Login/register
  document.getElementById('langBtn').textContent = t.langLabel;
  const navLoginBtn = document.getElementById('navLoginBtn');
  if(navLoginBtn) navLoginBtn.textContent = t.login;
  const navRegBtn = document.getElementById('navRegisterBtn');
  if(navRegBtn) navRegBtn.textContent = t.register;
  const navLogoutBtn = document.getElementById('navLogoutBtn');
  if(navLogoutBtn) navLogoutBtn.textContent = t.logout;
}

function toggleLangMenu() {
  document.getElementById('langMenu').classList.toggle('open');
}
document.addEventListener('click', function(e) {
  const dd = document.querySelector('.lang-dropdown');
  if(dd && !dd.contains(e.target)) document.getElementById('langMenu').classList.remove('open');
});
function setLang(code, label, el) {
  currentLang = code;
  document.querySelectorAll('.lang-option').forEach(o=>o.classList.remove('active-lang'));
  el.classList.add('active-lang');
  document.getElementById('langMenu').classList.remove('open');
  applyTranslation(code);
  const msgs = {
    en:'English selected.', kn:'ಕನ್ನಡ ಭಾಷೆ ಆಯ್ಕೆ ಆಗಿದೆ.', hi:'हिन्दी भाषा चुनी गई।',
    ta:'தமிழ் மொழி தேர்ந்தெடுக்கப்பட்டது.', te:'తెలుగు భాష ఎంపిక చేయబడింది.'
  };
  showToast('🌐 ' + (msgs[code]||label+' selected'));
}

// ── AUTH MODAL ─────────────────────────────────────────────────────
function openAuthModal(tab) {
  document.getElementById('authModal').classList.add('show');
  switchAuthTab(tab||'login');
}
function closeAuthModal() {
  document.getElementById('authModal').classList.remove('show');
}

// ── BOOKING ACCESS ─────────────────────────────────────────────────
function updateBookingAccess() {
  const loggedIn = !!currentUser;
  const wall = document.getElementById('bookLoginWall');
  const form = document.getElementById('bookFormContent');
  if(wall) wall.style.display = loggedIn ? 'none' : 'block';
  if(form) form.style.display = loggedIn ? 'block' : 'none';
}

// ── RATINGS ACCESS ─────────────────────────────────────────────────
let selectedRating = 0;
let clientRatings = [];

function updateRatingsAccess() {
  const loggedIn = !!currentUser;
  const wall = document.getElementById('ratingsLoginWall');
  const content = document.getElementById('ratingsContent');
  if(wall) wall.style.display = loggedIn ? 'none' : 'block';
  if(content) content.style.display = loggedIn ? 'block' : 'none';
}
function hoverRating(val) {
  document.querySelectorAll('.r-star-big').forEach((s,i)=>s.classList.toggle('hovered', i<val));
}
function unhoverRating() {
  document.querySelectorAll('.r-star-big').forEach((s,i)=>{ s.classList.remove('hovered'); s.classList.toggle('filled', i<selectedRating); });
}
function selectRating(val) {
  selectedRating = val;
  const labels = ['','Poor 😞','Below Average 😕','Average 😐','Good 😊','Excellent 😄'];
  document.getElementById('ratingLabel').textContent = labels[val] + ' (' + val + '/5)';
  document.querySelectorAll('.r-star-big').forEach((s,i)=>s.classList.toggle('filled', i<val));
}
function submitRating() {
  if(!currentUser){ showToast('⚠️ Please login to rate'); return; }
  const officeId = document.getElementById('ratingOfficeSelect').value;
  if(!officeId){ showToast('⚠️ Select an office'); return; }
  if(!selectedRating){ showToast('⚠️ Please select a star rating'); return; }
  const office = OFFICES.find(o=>o.id===officeId);
  const comment = document.getElementById('ratingComment').value.trim();
  clientRatings.unshift({
    officeName: office.name,
    officeId,
    stars: selectedRating,
    comment,
    user: currentUser.name,
    uid: currentUser.uid,
    time: 'Just now'
  });
  // Update office rating in memory
  if(!ratings[officeId]) ratings[officeId] = { avg: office.rating, count: office.ratingCount };
  const r = ratings[officeId];
  r.avg = ((r.avg * r.count) + selectedRating) / (r.count + 1);
  r.count++;
  selectedRating = 0;
  document.getElementById('ratingOfficeSelect').value = '';
  document.getElementById('ratingComment').value = '';
  document.getElementById('ratingLabel').textContent = 'Click a star to rate';
  document.querySelectorAll('.r-star-big').forEach(s=>s.classList.remove('filled','hovered'));
  renderCommunityRatings();
  filterCards();
  showToast('⭐ Thank you! Your rating has been submitted.');
}
function renderCommunityRatings() {
  const el = document.getElementById('communityRatingsList');
  if(!el) return;
  if(clientRatings.length === 0) {
    el.innerHTML = '<div style="text-align:center;padding:24px;color:var(--muted);font-size:13px">No ratings yet. Be the first to rate!</div>';
    return;
  }
  el.innerHTML = clientRatings.map(r=>`
    <div class="rating-entry">
      <div style="font-family:'Baloo 2',cursive;font-size:14px;font-weight:700;color:var(--navy)">${r.officeName}</div>
      <div class="rating-entry-stars">${'★'.repeat(r.stars)}${'☆'.repeat(5-r.stars)}</div>
      <div class="rating-entry-user">👤 ${r.user} · ${r.uid} · ${r.time}</div>
      ${r.comment?`<div class="rating-entry-comment">"${r.comment}"</div>`:''}
    </div>
  `).join('');
}

// ── DOC CHECKLIST ──────────────────────────────────────────────────
let docCheckState = {};
function renderDocChecklist() {
  const officeId = document.getElementById('docOfficeSelect').value;
  const container = document.getElementById('docChecklistContainer');
  if(!officeId){ container.innerHTML='<div style="text-align:center;padding:32px;color:var(--muted);font-size:14px">👆 Select an office above to see the document checklist</div>'; return; }
  const office = OFFICES.find(o=>o.id===officeId);
  if(!office){ container.innerHTML=''; return; }
  if(!docCheckState[officeId]) docCheckState[officeId] = {};
  const allCounters = office.counters.filter(c=>c.docs.length>0);
  let totalDocs = 0, checkedDocs = 0;
  allCounters.forEach(c=>{ c.docs.forEach((_,i)=>{ totalDocs++; if(docCheckState[officeId][c.name+i]) checkedDocs++; }); });
  const pct = totalDocs>0 ? Math.round(checkedDocs/totalDocs*100) : 0;
  container.innerHTML = `
    <div style="margin-bottom:16px">
      <div style="font-size:12px;color:var(--muted);margin-bottom:4px">Overall Readiness: <strong style="color:var(--navy)">${pct}% (${checkedDocs}/${totalDocs} documents ready)</strong></div>
      <div class="doc-progress-bar"><div class="doc-progress-fill" style="width:${pct}%"></div></div>
      ${pct===100?'<div style="background:#E8F5E9;border-radius:8px;padding:10px;font-size:13px;color:#2e7d32;font-weight:600">✅ You are fully prepared! Safe to visit the office.</div>':''}
    </div>
    ${allCounters.map(c=>`
      <div class="doc-counter-block">
        <div class="doc-counter-name">📂 ${c.name} <span style="font-size:11px;color:var(--muted);font-weight:400">(${c.status==='closed'?'Closed today':'Open'})</span></div>
        ${c.docs.map((d,i)=>`
          <label class="doc-item-check ${docCheckState[officeId][c.name+i]?'done':''}" id="dci-${officeId}-${c.name.replace(/\s/g,'_')}-${i}">
            <input type="checkbox" ${docCheckState[officeId][c.name+i]?'checked':''} onchange="toggleDocCheck('${officeId}','${c.name}',${i})">
            <span>${d}</span>
          </label>
        `).join('')}
      </div>
    `).join('')}
  `;
}
function toggleDocCheck(officeId, counterName, idx) {
  if(!docCheckState[officeId]) docCheckState[officeId] = {};
  docCheckState[officeId][counterName+idx] = !docCheckState[officeId][counterName+idx];
  renderDocChecklist();
}

// ── TRUST TABLE (kept for backward compat, not shown) ─────────────
function renderTrustTable() {}

// ── ALL INDIA STATE → DISTRICTS DATA ─────────────────────────────
const STATE_DATA = {
  AN: { name:'Andaman & Nicobar Islands', lat:11.7401, lng:92.6586, districts:{ 'Nicobar':['Car Nicobar','Nancowry'], 'North & Middle Andaman':['Diglipur','Mayabunder','Rangat'], 'South Andaman':['Port Blair','Ferrargunj'] } },
  AP: { name:'Andhra Pradesh', lat:15.9129, lng:79.7400, districts:{ 'Alluri Sitharama Raju':['Paderu','Rampachodavaram'], 'Anakapalli':['Anakapalli','Chodavaram'], 'Anantapur':['Anantapur','Dharmavaram','Guntakal','Hindupur','Kadiri','Tadipatri'], 'Bapatla':['Bapatla','Chirala'], 'Chittoor':['Chittoor','Madanapalle','Palamaner','Tirupati'], 'East Godavari':['Kakinada','Rajamahendravaram','Ramachandrapuram'], 'Eluru':['Eluru','Narsapur'], 'Guntur':['Guntur','Narasaraopet','Tenali'], 'Kadapa':['Kadapa','Proddatur','Rajampet'], 'Kakinada':['Kakinada','Peddapuram'], 'Krishna':['Machilipatnam','Vijayawada'], 'Kurnool':['Adoni','Kurnool','Nandyal'], 'Nandyal':['Nandyal','Allagadda'], 'NTR':['Vijayawada','Nuzvid'], 'Palnadu':['Narasaraopet','Macherla'], 'Prakasam':['Markapur','Ongole'], 'Sri Potti Sriramulu Nellore':['Kavali','Nellore','Gudur'], 'Srikakulam':['Palasa','Srikakulam'], 'Tirupati':['Tirupati','Srikalahasti'], 'Visakhapatnam':['Bheemunipatnam','Visakhapatnam'], 'Vizianagaram':['Bobbili','Vizianagaram'], 'West Godavari':['Bhimavaram','Tadepalligudem'] } },
  AR: { name:'Arunachal Pradesh', lat:28.2180, lng:94.7278, districts:{ 'Anjaw':['Hawai'], 'Capital Complex Itanagar':['Itanagar','Naharlagun'], 'Changlang':['Changlang','Miao'], 'East Kameng':['Seppa'], 'East Siang':['Pasighat'], 'Kamle':['Raga'], 'Kra Daadi':['Palin'], 'Kurung Kumey':['Koloriang'], 'Lepa Rada':['Basar'], 'Lohit':['Tezu'], 'Longding':['Longding'], 'Lower Dibang Valley':['Roing'], 'Lower Siang':['Likabali'], 'Lower Subansiri':['Ziro'], 'Namsai':['Namsai'], 'Pakke Kessang':['Yazali'], 'Papum Pare':['Yupia'], 'Shi Yomi':['Tato'], 'Siang':['Boleng'], 'Tawang':['Tawang'], 'Tirap':['Khonsa'], 'Upper Dibang Valley':['Anini'], 'Upper Siang':['Yingkiong'], 'Upper Subansiri':['Daporijo'], 'West Kameng':['Bomdila'], 'West Siang':['Aalo'] } },
  AS: { name:'Assam', lat:26.2006, lng:92.9376, districts:{ 'Bajali':['Pathsala'], 'Baksa':['Mushalpur'], 'Barpeta':['Barpeta','Sarthebari'], 'Biswanath':['Biswanath Chariali'], 'Bongaigaon':['Bongaigaon'], 'Cachar':['Silchar','Lakhipur'], 'Charaideo':['Sonari'], 'Chirang':['Kajalgaon'], 'Darrang':['Mangaldoi'], 'Dhemaji':['Dhemaji'], 'Dhubri':['Dhubri','Bilasipara'], 'Dibrugarh':['Dibrugarh','Naharkatia'], 'Dima Hasao':['Haflong'], 'Goalpara':['Goalpara'], 'Golaghat':['Golaghat'], 'Hailakandi':['Hailakandi'], 'Hojai':['Hojai'], 'Jorhat':['Jorhat'], 'Kamrup':['Rangia'], 'Kamrup Metropolitan':['Guwahati','Dispur'], 'Karbi Anglong':['Diphu'], 'Karimganj':['Karimganj'], 'Kokrajhar':['Kokrajhar'], 'Lakhimpur':['North Lakhimpur'], 'Majuli':['Garamur'], 'Morigaon':['Morigaon'], 'Nagaon':['Nagaon','Hojai'], 'Nalbari':['Nalbari'], 'Sivasagar':['Sivasagar'], 'Sonitpur':['Tezpur'], 'South Salmara Mankachar':['Hatsingimari'], 'Tinsukia':['Tinsukia','Digboi'], 'Udalguri':['Udalguri'], 'West Karbi Anglong':['Hamren'] } },
  BR: { name:'Bihar', lat:25.0961, lng:85.3131, districts:{ 'Araria':['Araria','Forbesganj'], 'Arwal':['Arwal'], 'Aurangabad':['Aurangabad','Daudnagar'], 'Banka':['Banka'], 'Begusarai':['Begusarai'], 'Bhagalpur':['Bhagalpur','Kahalgaon'], 'Bhojpur':['Ara'], 'Buxar':['Buxar'], 'Darbhanga':['Darbhanga','Benipur'], 'East Champaran':['Motihari','Raxaul'], 'Gaya':['Gaya','Bodh Gaya'], 'Gopalganj':['Gopalganj'], 'Jamui':['Jamui'], 'Jehanabad':['Jehanabad'], 'Kaimur':['Bhabua'], 'Katihar':['Katihar','Manihari'], 'Khagaria':['Khagaria'], 'Kishanganj':['Kishanganj'], 'Lakhisarai':['Lakhisarai'], 'Madhepura':['Madhepura'], 'Madhubani':['Madhubani','Jhanjharpur'], 'Munger':['Munger'], 'Muzaffarpur':['Muzaffarpur','Sitamarhi'], 'Nalanda':['Bihar Sharif'], 'Nawada':['Nawada'], 'Patna':['Patna','Danapur'], 'Purnia':['Purnia'], 'Rohtas':['Sasaram','Dehri'], 'Saharsa':['Saharsa'], 'Samastipur':['Samastipur','Rosera'], 'Saran':['Chhapra'], 'Sheikhpura':['Sheikhpura'], 'Sheohar':['Sheohar'], 'Sitamarhi':['Sitamarhi'], 'Siwan':['Siwan'], 'Supaul':['Supaul'], 'Vaishali':['Hajipur'], 'West Champaran':['Bettiah'] } },
  CH: { name:'Chandigarh', lat:30.7333, lng:76.7794, districts:{ 'Chandigarh':['Sector 1-17','Sector 18-35','Sector 36-56'] } },
  CG: { name:'Chhattisgarh', lat:21.2787, lng:81.8661, districts:{ 'Balod':['Balod'], 'Baloda Bazar':['Baloda Bazar'], 'Balrampur':['Balrampur'], 'Bastar':['Jagdalpur'], 'Bemetara':['Bemetara'], 'Bijapur':['Bijapur'], 'Bilaspur':['Bilaspur'], 'Dantewada':['Dantewada'], 'Dhamtari':['Dhamtari'], 'Durg':['Durg','Bhilai'], 'Gariaband':['Gariaband'], 'Gaurela Pendra Marwahi':['Gaurela'], 'Janjgir Champa':['Janjgir'], 'Jashpur':['Jashpur Nagar'], 'Kabirdham':['Kawardha'], 'Kanker':['Kanker'], 'Kondagaon':['Kondagaon'], 'Korba':['Korba'], 'Koriya':['Baikunthpur'], 'Mahasamund':['Mahasamund'], 'Mohla Manpur':['Mohla'], 'Mungeli':['Mungeli'], 'Narayanpur':['Narayanpur'], 'Raigarh':['Raigarh'], 'Raipur':['Raipur'], 'Rajnandgaon':['Rajnandgaon'], 'Sarangarh Bilaigarh':['Sarangarh'], 'Sukma':['Sukma'], 'Surajpur':['Surajpur'], 'Surguja':['Ambikapur'] } },
  DH: { name:'Dadra & Nagar Haveli and Daman & Diu', lat:20.1809, lng:73.0169, districts:{ 'Dadra & Nagar Haveli':['Silvassa'], 'Daman':['Daman','Nani Daman'], 'Diu':['Diu'] } },
  DL: { name:'Delhi', lat:28.7041, lng:77.1025, districts:{ 'Central Delhi':['Daryaganj','Paharganj'], 'East Delhi':['Gandhi Nagar','Preet Vihar'], 'New Delhi':['Connaught Place','Karol Bagh'], 'North Delhi':['Civil Lines','Model Town'], 'North East Delhi':['Seelampur','Mustafabad'], 'North West Delhi':['Pitampura','Rohini'], 'Shahdara':['Dilshad Garden','Shahdara'], 'South Delhi':['Hauz Khas','Saket'], 'South East Delhi':['Lajpat Nagar','Okhla'], 'South West Delhi':['Dwarka','Janakpuri'], 'West Delhi':['Rajouri Garden','Tilak Nagar'] } },
  GA: { name:'Goa', lat:15.2993, lng:74.1240, districts:{ 'North Goa':['Panaji','Mapusa','Calangute','Bicholim','Pernem'], 'South Goa':['Margao','Vasco da Gama','Ponda','Quepem','Sanguem'] } },
  GJ: { name:'Gujarat', lat:22.2587, lng:71.1924, districts:{ 'Ahmedabad':['Ahmedabad City','Dholka','Sanand'], 'Amreli':['Amreli','Rajula'], 'Anand':['Anand','Khambhat'], 'Arvalli':['Modasa','Malpur'], 'Banaskantha':['Deesa','Palanpur'], 'Bharuch':['Bharuch','Ankleshwar'], 'Bhavnagar':['Bhavnagar','Sihor'], 'Botad':['Botad'], 'Chhota Udaipur':['Chhota Udaipur'], 'Dahod':['Dahod'], 'Dang':['Ahwa'], 'Devbhoomi Dwarka':['Dwarka','Khambhalia'], 'Gandhinagar':['Gandhinagar','Mansa'], 'Gir Somnath':['Veraval','Sasan Gir'], 'Jamnagar':['Jamnagar'], 'Junagadh':['Junagadh','Keshod'], 'Kheda':['Nadiad','Kheda'], 'Kutch':['Bhuj','Anjar','Gandhidham'], 'Mahisagar':['Lunawada'], 'Mehsana':['Mehsana','Unjha'], 'Morbi':['Morbi'], 'Narmada':['Rajpipla'], 'Navsari':['Navsari'], 'Panchmahal':['Godhra'], 'Patan':['Patan','Radhanpur'], 'Porbandar':['Porbandar'], 'Rajkot':['Rajkot','Gondal'], 'Sabarkantha':['Himmatnagar'], 'Surat':['Surat City','Bardoli'], 'Surendranagar':['Surendranagar','Wadhwan'], 'Tapi':['Vyara'], 'Vadodara':['Vadodara','Karjan'], 'Valsad':['Valsad','Vapi'] } },
  HR: { name:'Haryana', lat:29.0588, lng:76.0856, districts:{ 'Ambala':['Ambala City','Ambala Cantonment','Naraingarh'], 'Bhiwani':['Bhiwani','Loharu'], 'Charkhi Dadri':['Charkhi Dadri'], 'Faridabad':['Faridabad','Ballabhgarh'], 'Fatehabad':['Fatehabad','Tohana'], 'Gurugram':['Gurugram','Sohna'], 'Hisar':['Hisar','Hansi'], 'Jhajjar':['Jhajjar','Bahadurgarh'], 'Jind':['Jind','Narwana'], 'Kaithal':['Kaithal','Pundri'], 'Karnal':['Karnal','Panipat'], 'Kurukshetra':['Kurukshetra','Thanesar'], 'Mahendragarh':['Mahendragarh','Narnaul'], 'Mewat / Nuh':['Nuh','Punhana'], 'Palwal':['Palwal','Hathin'], 'Panchkula':['Panchkula','Kalka'], 'Panipat':['Panipat','Samalkha'], 'Rewari':['Rewari','Bawal'], 'Rohtak':['Rohtak','Kalanaur'], 'Sirsa':['Sirsa','Ellenabad'], 'Sonipat':['Sonipat','Gohana'], 'Yamunanagar':['Yamunanagar','Jagadhri'] } },
  HP: { name:'Himachal Pradesh', lat:31.1048, lng:77.1734, districts:{ 'Bilaspur':['Bilaspur','Ghumarwin'], 'Chamba':['Chamba','Dalhousie'], 'Hamirpur':['Hamirpur','Barsar'], 'Kangra':['Dharamshala','Palampur','Kangra'], 'Kinnaur':['Reckong Peo'], 'Kullu':['Kullu','Manali'], 'Lahaul & Spiti':['Keylong','Kaza'], 'Mandi':['Mandi','Sundernagar'], 'Shimla':['Shimla','Rampur'], 'Sirmaur':['Nahan'], 'Solan':['Solan','Baddi'], 'Una':['Una','Amb'] } },
  JK: { name:'Jammu & Kashmir', lat:33.7782, lng:76.5762, districts:{ 'Anantnag':['Anantnag','Pahalgam'], 'Bandipora':['Bandipora'], 'Baramulla':['Baramulla','Sopore'], 'Budgam':['Budgam','Beerwah'], 'Doda':['Doda','Bhaderwah'], 'Ganderbal':['Ganderbal'], 'Jammu':['Jammu','Akhnoor'], 'Kathua':['Kathua'], 'Kishtwar':['Kishtwar'], 'Kulgam':['Kulgam'], 'Kupwara':['Kupwara','Handwara'], 'Poonch':['Poonch'], 'Pulwama':['Pulwama'], 'Rajouri':['Rajouri'], 'Ramban':['Ramban'], 'Reasi':['Reasi'], 'Samba':['Samba'], 'Shopian':['Shopian'], 'Srinagar':['Srinagar','Ganpatyar'], 'Udhampur':['Udhampur','Ramnagar'] } },
  JH: { name:'Jharkhand', lat:23.6102, lng:85.2799, districts:{ 'Bokaro':['Bokaro','Chas'], 'Chatra':['Chatra'], 'Deoghar':['Deoghar'], 'Dhanbad':['Dhanbad','Jharia'], 'Dumka':['Dumka'], 'East Singhbhum':['Jamshedpur','Dhalbhum'], 'Garhwa':['Garhwa'], 'Giridih':['Giridih'], 'Godda':['Godda'], 'Gumla':['Gumla'], 'Hazaribagh':['Hazaribagh'], 'Jamtara':['Jamtara'], 'Khunti':['Khunti'], 'Koderma':['Koderma'], 'Latehar':['Latehar'], 'Lohardaga':['Lohardaga'], 'Pakur':['Pakur'], 'Palamu':['Daltonganj'], 'Ramgarh':['Ramgarh'], 'Ranchi':['Ranchi'], 'Sahebganj':['Sahebganj'], 'Seraikela Kharsawan':['Seraikela'], 'Simdega':['Simdega'], 'West Singhbhum':['Chaibasa'] } },
  KA: { name:'Karnataka', lat:15.3173, lng:75.7139, districts:{ 'Bagalkot':['Bagalkot','Ilkal','Mudhol'], 'Ballari':['Ballari','Hospet','Sandur'], 'Belagavi':['Belagavi','Gokak','Hubli'], 'Bengaluru Rural':['Devanahalli','Doddaballapur','Hosakote','Nelamangala'], 'Bengaluru Urban':['Bengaluru East','Bengaluru North','Bengaluru South','Yelahanka'], 'Bidar':['Bidar','Basavakalyan','Bhalki'], 'Chamarajanagara':['Chamarajanagara','Gundlupet','Kollegal'], 'Chikkaballapura':['Chikkaballapura','Chintamani','Gauribidanur','Gudibanda','Bagepalli','Sidlaghatta'], 'Chikkamagaluru':['Chikkamagaluru','Kadur','Mudigere','Sringeri'], 'Chitradurga':['Chitradurga','Challakere','Holalkere'], 'Dakshina Kannada':['Mangaluru','Bantwal','Belthangady','Puttur'], 'Davanagere':['Davanagere','Harihar','Jagaluru'], 'Dharwad':['Dharwad','Hubli','Kalghatgi'], 'Gadag':['Gadag','Mundargi','Nargund'], 'Hassan':['Hassan','Arsikere','Belur','Sakleshpur'], 'Haveri':['Haveri','Byadagi','Ranebennur'], 'Kalaburagi':['Kalaburagi','Afzalpur','Aland','Sedam'], 'Kodagu':['Madikeri','Virajpet','Somwarpet'], 'Kolar':['Kolar','Bangarpet','Malur','Mulbagal'], 'Koppal':['Koppal','Gangavathi','Yelburga'], 'Mandya':['Mandya','Krishnarajapet','Maddur','Nagamangala'], 'Mysuru':['Mysuru','Hunsur','K.R.Nagar','Nanjangud'], 'Raichur':['Raichur','Manvi','Sindhnur'], 'Ramanagara':['Ramanagara','Channapatna','Kanakapura','Magadi'], 'Shivamogga':['Shivamogga','Bhadravati','Sagar','Soraba'], 'Tumakuru':['Tumakuru','Gubbi','Madhugiri','Pavagada','Tiptur'], 'Udupi':['Udupi','Kundapur','Karkala'], 'Uttara Kannada':['Karwar','Kumta','Sirsi','Supa'], 'Vijayanagara':['Hosapete','Hagaribommanahalli','Kudligi'], 'Vijayapura':['Vijayapura','Indi','Muddebihal','Sindagi'], 'Yadgir':['Yadgir','Gurmatkal','Shorapur'] } },
  KL: { name:'Kerala', lat:10.8505, lng:76.2711, districts:{ 'Alappuzha':['Alappuzha','Chengannur','Haripad','Kuttanad'], 'Ernakulam':['Ernakulam','Aluva','Kothamangalam','Muvattupuzha'], 'Idukki':['Thodupuzha','Munnar','Devikulam'], 'Kannur':['Kannur','Thalassery','Mattannur'], 'Kasaragod':['Kasaragod','Hosdurg'], 'Kollam':['Kollam','Punalur','Kundara'], 'Kottayam':['Kottayam','Changanacherry','Vaikom'], 'Kozhikode':['Kozhikode','Vadakara','Koyilandy'], 'Malappuram':['Malappuram','Manjeri','Tirur'], 'Palakkad':['Palakkad','Ottappalam','Alathur'], 'Pathanamthitta':['Pathanamthitta','Adoor','Ranni'], 'Thiruvananthapuram':['Thiruvananthapuram','Attingal','Neyyattinkara'], 'Thrissur':['Thrissur','Chalakudy','Kodungallur'], 'Wayanad':['Kalpetta','Mananthavady','Sulthan Bathery'] } },
  LA: { name:'Ladakh', lat:34.2996, lng:78.2932, districts:{ 'Kargil':['Kargil','Zanskar'], 'Leh':['Leh','Nubra','Nyoma'] } },
  LD: { name:'Lakshadweep', lat:10.5667, lng:72.6417, districts:{ 'Lakshadweep':['Kavaratti','Agatti','Minicoy','Amini'] } },
  MP: { name:'Madhya Pradesh', lat:22.9734, lng:78.6569, districts:{ 'Agar Malwa':['Agar','Susner'], 'Alirajpur':['Alirajpur'], 'Anuppur':['Anuppur'], 'Ashoknagar':['Ashoknagar'], 'Balaghat':['Balaghat'], 'Barwani':['Barwani','Sendhwa'], 'Betul':['Betul','Multai'], 'Bhind':['Bhind'], 'Bhopal':['Bhopal','Berasia','Huzur'], 'Burhanpur':['Burhanpur'], 'Chhatarpur':['Chhatarpur','Khajuraho'], 'Chhindwara':['Chhindwara','Sausar'], 'Damoh':['Damoh'], 'Datia':['Datia'], 'Dewas':['Dewas'], 'Dhar':['Dhar','Manawar'], 'Dindori':['Dindori'], 'Guna':['Guna'], 'Gwalior':['Gwalior','Bhitarwar'], 'Harda':['Harda'], 'Hoshangabad':['Hoshangabad','Itarsi','Pipariya'], 'Indore':['Indore','Depalpur','Mhow'], 'Jabalpur':['Jabalpur','Patan','Sihora'], 'Jhabua':['Jhabua'], 'Katni':['Katni'], 'Khandwa':['Khandwa'], 'Khargone':['Khargone','Maheshwar'], 'Mandla':['Mandla'], 'Mandsaur':['Mandsaur'], 'Morena':['Morena'], 'Narsinghpur':['Narsinghpur'], 'Neemuch':['Neemuch'], 'Niwari':['Niwari'], 'Panna':['Panna'], 'Raisen':['Raisen'], 'Rajgarh':['Rajgarh'], 'Ratlam':['Ratlam'], 'Rewa':['Rewa'], 'Sagar':['Sagar','Rahatgarh'], 'Satna':['Satna','Maihar'], 'Sehore':['Sehore'], 'Seoni':['Seoni'], 'Shahdol':['Shahdol'], 'Shajapur':['Shajapur'], 'Sheopur':['Sheopur'], 'Shivpuri':['Shivpuri'], 'Sidhi':['Sidhi'], 'Singrauli':['Singrauli','Waidhan'], 'Tikamgarh':['Tikamgarh'], 'Ujjain':['Ujjain'], 'Umaria':['Umaria'], 'Vidisha':['Vidisha'] } },
  MH: { name:'Maharashtra', lat:19.7515, lng:75.7139, districts:{ 'Ahmednagar':['Ahmednagar','Rahuri','Kopargaon'], 'Akola':['Akola','Akot'], 'Amravati':['Amravati','Achalpur'], 'Aurangabad':['Aurangabad','Gangapur','Kannad'], 'Beed':['Beed','Ambejogai'], 'Bhandara':['Bhandara','Tumsar'], 'Buldhana':['Buldhana','Khamgaon'], 'Chandrapur':['Chandrapur','Warora'], 'Dhule':['Dhule','Shirpur'], 'Gadchiroli':['Gadchiroli'], 'Gondia':['Gondia','Tirora'], 'Hingoli':['Hingoli','Sengaon'], 'Jalgaon':['Jalgaon','Bhusawal'], 'Jalna':['Jalna'], 'Kolhapur':['Kolhapur','Ichalkaranji'], 'Latur':['Latur','Udgir'], 'Mumbai City':['Churchgate','Colaba','Kurla'], 'Mumbai Suburban':['Andheri','Borivali','Thane'], 'Nagpur':['Nagpur','Kamthi','Ramtek'], 'Nanded':['Nanded','Kinwat'], 'Nandurbar':['Nandurbar','Shahada'], 'Nashik':['Nashik','Malegaon','Niphad'], 'Osmanabad':['Osmanabad'], 'Palghar':['Palghar','Vasai'], 'Parbhani':['Parbhani'], 'Pune':['Pune','Haveli','Maval'], 'Raigad':['Alibag','Panvel'], 'Ratnagiri':['Ratnagiri','Chiplun'], 'Sangli':['Sangli','Miraj'], 'Satara':['Satara','Wai'], 'Sindhudurg':['Sindhudurg','Sawantwadi'], 'Solapur':['Solapur','Pandharpur'], 'Thane':['Thane','Kalyan','Bhiwandi'], 'Wardha':['Wardha','Hinganghat'], 'Washim':['Washim','Risod'], 'Yavatmal':['Yavatmal','Wani'] } },
  MN: { name:'Manipur', lat:24.6637, lng:93.9063, districts:{ 'Bishnupur':['Bishnupur','Moirang'], 'Chandel':['Chandel'], 'Churachandpur':['Churachandpur'], 'Imphal East':['Imphal East','Porompat'], 'Imphal West':['Imphal West','Lamphelpat'], 'Jiribam':['Jiribam'], 'Kakching':['Kakching'], 'Kamjong':['Kamjong'], 'Kangpokpi':['Kangpokpi'], 'Noney':['Noney'], 'Pherzawl':['Pherzawl'], 'Senapati':['Senapati'], 'Tamenglong':['Tamenglong'], 'Tengnoupal':['Moreh'], 'Thoubal':['Thoubal'], 'Ukhrul':['Ukhrul'] } },
  ML: { name:'Meghalaya', lat:25.4670, lng:91.3662, districts:{ 'East Garo Hills':['Williamnagar'], 'East Jaintia Hills':['Khliehriat'], 'East Khasi Hills':['Shillong','Cherrapunji'], 'Eastern West Khasi Hills':['Mawkyrwat'], 'North Garo Hills':['Resubelpara'], 'Ri Bhoi':['Nongpoh'], 'South Garo Hills':['Baghmara'], 'South West Garo Hills':['Ampati'], 'South West Khasi Hills':['Mawkyrwat'], 'West Garo Hills':['Tura'], 'West Jaintia Hills':['Jowai'], 'West Khasi Hills':['Nongstoin'] } },
  MZ: { name:'Mizoram', lat:23.1645, lng:92.9376, districts:{ 'Aizawl':['Aizawl','Darlawn'], 'Champhai':['Champhai'], 'Hnahthial':['Hnahthial'], 'Khawzawl':['Khawzawl'], 'Kolasib':['Kolasib'], 'Lawngtlai':['Lawngtlai'], 'Lunglei':['Lunglei'], 'Mamit':['Mamit'], 'Saiha':['Saiha'], 'Saitual':['Saitual'], 'Serchhip':['Serchhip'] } },
  NL: { name:'Nagaland', lat:26.1584, lng:94.5624, districts:{ 'Chumoukedima':['Chumoukedima'], 'Dimapur':['Dimapur'], 'Kiphire':['Kiphire'], 'Kohima':['Kohima'], 'Longleng':['Longleng'], 'Mokokchung':['Mokokchung'], 'Mon':['Mon'], 'Niuland':['Niuland'], 'Noklak':['Noklak'], 'Peren':['Peren'], 'Phek':['Phek'], 'Shamator':['Shamator'], 'Tseminyü':['Tseminyü'], 'Tuensang':['Tuensang'], 'Wokha':['Wokha'], 'Zunheboto':['Zunheboto'] } },
  OD: { name:'Odisha', lat:20.9517, lng:85.0985, districts:{ 'Angul':['Angul','Talcher'], 'Balangir':['Balangir','Titilagarh'], 'Balasore':['Balasore','Jaleswar'], 'Bargarh':['Bargarh','Padampur'], 'Bhadrak':['Bhadrak'], 'Boudh':['Boudh'], 'Cuttack':['Cuttack','Athagarh'], 'Deogarh':['Deogarh'], 'Dhenkanal':['Dhenkanal'], 'Gajapati':['Paralakhemundi'], 'Ganjam':['Berhampur','Chhatrapur'], 'Jagatsinghpur':['Jagatsinghpur'], 'Jajpur':['Jajpur'], 'Jharsuguda':['Jharsuguda'], 'Kalahandi':['Bhawanipatna'], 'Kandhamal':['Phulbani'], 'Kendrapara':['Kendrapara'], 'Kendujhar':['Keonjhar','Barbil'], 'Khordha':['Bhubaneswar','Puri'], 'Koraput':['Koraput','Jeypore'], 'Malkangiri':['Malkangiri'], 'Mayurbhanj':['Baripada','Rairangpur'], 'Nabarangpur':['Nabarangpur'], 'Nayagarh':['Nayagarh'], 'Nuapada':['Nuapada'], 'Puri':['Puri'], 'Rayagada':['Rayagada'], 'Sambalpur':['Sambalpur','Rairakhol'], 'Subarnapur':['Sonepur'], 'Sundargarh':['Sundargarh','Rourkela'] } },
  PY: { name:'Puducherry', lat:11.9416, lng:79.8083, districts:{ 'Karaikal':['Karaikal','Tirunallar'], 'Mahe':['Mahe'], 'Puducherry':['Puducherry','Oulgaret','Villianur'], 'Yanam':['Yanam'] } },
  PB: { name:'Punjab', lat:31.1471, lng:75.3412, districts:{ 'Amritsar':['Amritsar','Attari'], 'Barnala':['Barnala'], 'Bathinda':['Bathinda','Talwandi Sabo'], 'Faridkot':['Faridkot'], 'Fatehgarh Sahib':['Fatehgarh Sahib'], 'Fazilka':['Fazilka','Abohar'], 'Ferozepur':['Ferozepur','Zira'], 'Gurdaspur':['Gurdaspur','Batala'], 'Hoshiarpur':['Hoshiarpur','Dasuya'], 'Jalandhar':['Jalandhar','Nakodar','Phagwara'], 'Kapurthala':['Kapurthala'], 'Ludhiana':['Ludhiana','Khanna','Raikot'], 'Malerkotla':['Malerkotla'], 'Mansa':['Mansa','Sardulgarh'], 'Moga':['Moga','Dharamkot'], 'Mohali':['Mohali','Dera Bassi'], 'Muktsar':['Muktsar'], 'Pathankot':['Pathankot'], 'Patiala':['Patiala','Nabha','Rajpura'], 'Rupnagar':['Rupnagar','Anandpur Sahib'], 'Sangrur':['Sangrur','Sunam'], 'Shaheed Bhagat Singh Nagar':['Nawanshahr'], 'Tarn Taran':['Tarn Taran','Patti'] } },
  RJ: { name:'Rajasthan', lat:27.0238, lng:74.2179, districts:{ 'Ajmer':['Ajmer','Beawar','Kishangarh'], 'Alwar':['Alwar','Behror','Rajgarh'], 'Banswara':['Banswara'], 'Baran':['Baran','Kelwara'], 'Barmer':['Barmer','Balotra'], 'Bharatpur':['Bharatpur','Deeg'], 'Bhilwara':['Bhilwara','Shahpura'], 'Bikaner':['Bikaner','Nokha'], 'Bundi':['Bundi'], 'Chittorgarh':['Chittorgarh','Nimbahera'], 'Churu':['Churu','Sujangarh'], 'Dausa':['Dausa'], 'Dholpur':['Dholpur'], 'Dungarpur':['Dungarpur'], 'Hanumangarh':['Hanumangarh','Sangaria'], 'Jaipur':['Jaipur','Amber','Sanganer'], 'Jaisalmer':['Jaisalmer'], 'Jalore':['Jalore','Sanchore'], 'Jhalawar':['Jhalawar','Jhalarapatan'], 'Jhunjhunu':['Jhunjhunu','Nawalgarh'], 'Jodhpur':['Jodhpur','Barmer','Phalodi'], 'Karauli':['Karauli'], 'Kota':['Kota','Sangod'], 'Nagaur':['Nagaur','Didwana','Merta'], 'Pali':['Pali','Sumerpur'], 'Pratapgarh':['Pratapgarh'], 'Rajsamand':['Rajsamand','Nathdwara'], 'Sawai Madhopur':['Sawai Madhopur'], 'Sikar':['Sikar','Fatehpur','Neem ka Thana'], 'Sirohi':['Sirohi','Abu Road'], 'Sri Ganganagar':['Sri Ganganagar','Anupgarh'], 'Tonk':['Tonk'], 'Udaipur':['Udaipur','Salumber','Sarada'] } },
  SK: { name:'Sikkim', lat:27.5330, lng:88.5122, districts:{ 'East Sikkim':['Gangtok','Rangpo'], 'North Sikkim':['Mangan'], 'Pakyong':['Pakyong'], 'Soreng':['Soreng'], 'South Sikkim':['Namchi','Jorethang'], 'West Sikkim':['Gyalshing','Pelling'] } },
  TN: { name:'Tamil Nadu', lat:11.1271, lng:78.6569, districts:{ 'Ariyalur':['Ariyalur','Sendurai'], 'Chengalpattu':['Chengalpattu','Kancheepuram'], 'Chennai':['Ambattur','Kodambakkam','Mylapore','T.Nagar'], 'Coimbatore':['Coimbatore','Pollachi','Mettupalayam'], 'Cuddalore':['Cuddalore','Chidambaram','Panruti'], 'Dharmapuri':['Dharmapuri','Harur'], 'Dindigul':['Dindigul','Palani','Oddanchatram'], 'Erode':['Erode','Gobichettipalayam','Bhavani'], 'Kallakurichi':['Kallakurichi'], 'Kancheepuram':['Kancheepuram','Sriperumbudur'], 'Karur':['Karur','Kulithalai'], 'Krishnagiri':['Krishnagiri','Hosur'], 'Madurai':['Madurai','Usilampatti','Melur'], 'Mayiladuthurai':['Mayiladuthurai','Sirkazhi'], 'Nagapattinam':['Nagapattinam','Vedaranyam'], 'Namakkal':['Namakkal','Tiruchengode'], 'Nilgiris':['Ooty','Gudalur','Coonoor'], 'Perambalur':['Perambalur'], 'Pudukkottai':['Pudukkottai','Thirumayam'], 'Ramanathapuram':['Ramanathapuram','Paramakudi'], 'Ranipet':['Ranipet','Walajapet'], 'Salem':['Salem','Mettur','Omalur'], 'Sivaganga':['Sivaganga','Karaikudi'], 'Tenkasi':['Tenkasi','Sankarankovil'], 'Thanjavur':['Thanjavur','Kumbakonam','Papanasam'], 'Theni':['Theni','Uthamapalayam'], 'Thoothukudi':['Thoothukudi','Kovilpatti'], 'Tiruchirappalli':['Tiruchirappalli','Srirangam','Lalgudi'], 'Tirunelveli':['Tirunelveli','Ambasamudram'], 'Tirupathur':['Tirupathur','Ambur'], 'Tiruppur':['Tiruppur','Avinashi','Dharapuram'], 'Tiruvallur':['Tiruvallur','Ponneri','Avadi'], 'Tiruvannamalai':['Tiruvannamalai','Polur','Cheyyar'], 'Tiruvarur':['Tiruvarur','Mannargudi'], 'Vellore':['Vellore','Vaniyambadi'], 'Viluppuram':['Viluppuram','Tindivanam'], 'Virudhunagar':['Virudhunagar','Srivilliputhur','Rajapalayam'] } },
  TS: { name:'Telangana', lat:18.1124, lng:79.0193, districts:{ 'Adilabad':['Adilabad','Mancherial'], 'Bhadradri Kothagudem':['Kothagudem','Bhadrachalam'], 'Hanamkonda':['Warangal'], 'Hyderabad':['Hyderabad','Secunderabad','Kukatpally'], 'Jagtial':['Jagtial'], 'Jangaon':['Jangaon'], 'Jayashankar Bhupalpally':['Bhupalpally'], 'Jogulamba Gadwal':['Gadwal'], 'Kamareddy':['Kamareddy'], 'Karimnagar':['Karimnagar','Huzurabad'], 'Khammam':['Khammam','Kothagudem'], 'Komaram Bheem Asifabad':['Asifabad'], 'Mahabubabad':['Mahabubabad'], 'Mahabubnagar':['Mahabubnagar'], 'Mancherial':['Mancherial'], 'Medak':['Medak','Siddipet'], 'Medchal Malkajgiri':['Medchal','Malkajgiri'], 'Mulugu':['Mulugu'], 'Nagarkurnool':['Nagarkurnool'], 'Nalgonda':['Nalgonda','Miryalaguda'], 'Narayanpet':['Narayanpet'], 'Nirmal':['Nirmal'], 'Nizamabad':['Nizamabad','Bodhan'], 'Peddapalli':['Peddapalli','Ramagundam'], 'Rajanna Sircilla':['Sircilla'], 'Rangareddy':['Rangareddy','LB Nagar','Shadnagar'], 'Sangareddy':['Sangareddy','Zaheerabad'], 'Siddipet':['Siddipet','Gajwel'], 'Suryapet':['Suryapet','Kodad'], 'Vikarabad':['Vikarabad'], 'Wanaparthy':['Wanaparthy'], 'Warangal':['Warangal','Hanamkonda'], 'Yadadri Bhuvanagiri':['Bhongir','Yadagirigutta'] } },
  TR: { name:'Tripura', lat:23.9408, lng:91.9882, districts:{ 'Dhalai':['Ambassa'], 'Gomati':['Udaipur'], 'Khowai':['Khowai'], 'North Tripura':['Dharmanagar'], 'Sepahijala':['Bishalgarh'], 'Sipahijala':['Bishalgarh'], 'South Tripura':['Belonia'], 'Unokoti':['Kailashahar'], 'West Tripura':['Agartala','Mohanpur'] } },
  UP: { name:'Uttar Pradesh', lat:26.8467, lng:80.9462, districts:{ 'Agra':['Agra','Fatehpur Sikri'], 'Aligarh':['Aligarh','Khair'], 'Ambedkar Nagar':['Akbarpur'], 'Amethi':['Amethi'], 'Amroha':['Amroha'], 'Auraiya':['Auraiya'], 'Ayodhya':['Ayodhya','Milkipur'], 'Azamgarh':['Azamgarh','Lalganj'], 'Baghpat':['Baghpat'], 'Bahraich':['Bahraich','Nanpara'], 'Ballia':['Ballia'], 'Balrampur':['Balrampur'], 'Banda':['Banda'], 'Barabanki':['Barabanki'], 'Bareilly':['Bareilly','Aonla'], 'Basti':['Basti'], 'Bijnor':['Bijnor','Nagina'], 'Budaun':['Budaun'], 'Bulandshahr':['Bulandshahr','Khurja'], 'Chandauli':['Chandauli'], 'Chitrakoot':['Chitrakoot'], 'Deoria':['Deoria'], 'Etah':['Etah'], 'Etawah':['Etawah'], 'Farrukhabad':['Fatehgarh'], 'Fatehpur':['Fatehpur'], 'Firozabad':['Firozabad','Shikohabad'], 'Gautam Buddha Nagar':['Noida','Greater Noida'], 'Ghaziabad':['Ghaziabad','Modinagar'], 'Ghazipur':['Ghazipur'], 'Gonda':['Gonda'], 'Gorakhpur':['Gorakhpur'], 'Hamirpur':['Hamirpur'], 'Hapur':['Hapur'], 'Hardoi':['Hardoi'], 'Hathras':['Hathras'], 'Jalaun':['Orai'], 'Jaunpur':['Jaunpur'], 'Jhansi':['Jhansi','Moth'], 'Kannauj':['Kannauj'], 'Kanpur Dehat':['Akbarpur'], 'Kanpur Nagar':['Kanpur'], 'Kasganj':['Kasganj'], 'Kaushambi':['Manjhanpur'], 'Kushinagar':['Kushinagar','Padrauna'], 'Lakhimpur Kheri':['Lakhimpur'], 'Lalitpur':['Lalitpur'], 'Lucknow':['Lucknow','Mohol','Bakshi Ka Talab'], 'Maharajganj':['Maharajganj'], 'Mahoba':['Mahoba'], 'Mainpuri':['Mainpuri'], 'Mathura':['Mathura','Vrindavan'], 'Mau':['Mau'], 'Meerut':['Meerut','Hapur','Sardhana'], 'Mirzapur':['Mirzapur'], 'Moradabad':['Moradabad','Amroha'], 'Muzaffarnagar':['Muzaffarnagar'], 'Pilibhit':['Pilibhit','Bisalpur'], 'Pratapgarh':['Pratapgarh'], 'Prayagraj':['Prayagraj','Phulpur'], 'Raebareli':['Raebareli'], 'Rampur':['Rampur'], 'Saharanpur':['Saharanpur','Deoband'], 'Sambhal':['Sambhal'], 'Sant Kabir Nagar':['Khalilabad'], 'Shahjahanpur':['Shahjahanpur'], 'Shamli':['Shamli'], 'Shravasti':['Bhinga'], 'Siddharthnagar':['Navgarh'], 'Sitapur':['Sitapur','Mahmudabad'], 'Sonbhadra':['Robertsganj'], 'Sultanpur':['Sultanpur'], 'Unnao':['Unnao'], 'Varanasi':['Varanasi','Ramnagar'] } },
  UK: { name:'Uttarakhand', lat:30.0668, lng:79.0193, districts:{ 'Almora':['Almora','Ranikhet'], 'Bageshwar':['Bageshwar'], 'Chamoli':['Gopeshwar','Badrinath'], 'Champawat':['Champawat','Lohaghat'], 'Dehradun':['Dehradun','Mussoorie','Rishikesh'], 'Haridwar':['Haridwar','Roorkee'], 'Nainital':['Nainital','Haldwani','Ramnagar'], 'Pauri Garhwal':['Pauri','Kotdwar'], 'Pithoragarh':['Pithoragarh','Munsiari'], 'Rudraprayag':['Rudraprayag','Kedarnath'], 'Tehri Garhwal':['Tehri','New Tehri'], 'Udham Singh Nagar':['Rudrapur','Kashipur','Haldwani'], 'Uttarkashi':['Uttarkashi','Barkot'] } },
  WB: { name:'West Bengal', lat:22.9868, lng:87.8550, districts:{ 'Alipurduar':['Alipurduar','Falakata'], 'Bankura':['Bankura','Bishnupur'], 'Birbhum':['Suri','Bolpur'], 'Cooch Behar':['Cooch Behar','Tufanganj'], 'Dakshin Dinajpur':['Balurghat'], 'Darjeeling':['Darjeeling','Siliguri'], 'Hooghly':['Chinsurah','Serampore'], 'Howrah':['Howrah','Uluberia'], 'Jalpaiguri':['Jalpaiguri','Mal'], 'Jhargram':['Jhargram'], 'Kalimpong':['Kalimpong'], 'Kolkata':['Behala','North Kolkata','South Kolkata','Central Kolkata'], 'Malda':['Malda','English Bazar'], 'Murshidabad':['Berhampore','Baharampur','Lalbagh'], 'Nadia':['Krishnanagar','Kalyani','Ranaghat'], 'North 24 Parganas':['Barasat','Barrackpore','Basirhat'], 'Paschim Bardhaman':['Asansol','Durgapur'], 'Paschim Medinipur':['Medinipur','Kharagpur'], 'Purba Bardhaman':['Bardhaman','Katwa'], 'Purba Medinipur':['Haldia','Contai','Tamluk'], 'Purulia':['Purulia'], 'South 24 Parganas':['Alipore','Diamond Harbour','Baruipur'], 'Uttar Dinajpur':['Raiganj','Islampur'] } }
};

// ── STATE / DISTRICT / TALUK COORDS (for map centering) ─────────────
const DISTRICT_COORDS = {
  // Karnataka sample — extend as needed
  'Bengaluru Urban':{lat:12.9716,lng:77.5946}, 'Bengaluru Rural':{lat:13.1986,lng:77.7066},
  'Chikkaballapura':{lat:13.4355,lng:77.7315}, 'Mysuru':{lat:12.2958,lng:76.6394},
  'Mangaluru':{lat:12.9141,lng:74.8560}, 'Hubballi':{lat:15.3647,lng:75.1240}
};

function updateDistricts() {
  const stateCode = document.getElementById('regState').value;
  const distSel = document.getElementById('regDistrict');
  const talukSel = document.getElementById('regTaluk');
  distSel.innerHTML = '<option value="">-- Select District --</option>';
  talukSel.innerHTML = '<option value="">-- Select District First --</option>';
  if (!stateCode || !STATE_DATA[stateCode]) return;
  const districts = Object.keys(STATE_DATA[stateCode].districts).sort();
  districts.forEach(d => {
    const opt = document.createElement('option');
    opt.value = d; opt.textContent = d;
    distSel.appendChild(opt);
  });
  // Update map to state center
  const sd = STATE_DATA[stateCode];
  if (window.sarkariMap) {
    window.sarkariMap.setView([sd.lat, sd.lng], 7);
    if (window.stateMarker) window.sarkariMap.removeLayer(window.stateMarker);
    window.stateMarker = L.marker([sd.lat, sd.lng]).addTo(window.sarkariMap)
      .bindPopup('<b>'+sd.name+'</b><br>Select a district to zoom in').openPopup();
  }
  // Also update hero text
  document.querySelector('.hero-left h1').textContent = '🏛️ Sarkari Line — ' + sd.name;
  filterCards();
}

function updateTaluks() {
  const stateCode = document.getElementById('regState').value;
  const distName = document.getElementById('regDistrict').value;
  const talukSel = document.getElementById('regTaluk');
  talukSel.innerHTML = '<option value="">-- Select Taluk --</option>';
  if (!stateCode || !distName || !STATE_DATA[stateCode]) return;
  const taluks = STATE_DATA[stateCode].districts[distName] || [];
  taluks.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t.toLowerCase().replace(/\s+/g,'_'); opt.textContent = t;
    talukSel.appendChild(opt);
  });
  // Zoom map to district if coords known
  const dc = DISTRICT_COORDS[distName];
  if (dc && window.sarkariMap) {
    window.sarkariMap.setView([dc.lat, dc.lng], 11);
  } else if (stateCode && STATE_DATA[stateCode] && window.sarkariMap) {
    const sd = STATE_DATA[stateCode];
    window.sarkariMap.setView([sd.lat, sd.lng], 9);
  }
}

// ── MAP INITIALIZATION ────────────────────────────────────────────
function initMap() {
  const mapEl = document.getElementById('liveMap');
  if (!mapEl || window.sarkariMap) return;
  // Default: Karnataka (Chickballapur)
  window.sarkariMap = L.map('liveMap').setView([13.4355, 77.7315], 12);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    maxZoom: 18
  }).addTo(window.sarkariMap);

  // Office markers for Chickballapur (initial state)
  const officeMarkers = [
    { name:'DC Office (District Collectorate)', lat:13.4370, lng:77.7310, status:'busy', wait:55 },
    { name:'Passport Seva Kendra', lat:13.4340, lng:77.7350, status:'open', wait:35 },
    { name:'Ration Card Office', lat:13.4350, lng:77.7290, status:'open', wait:30 },
    { name:'Land Records (Tahsildar)', lat:13.4360, lng:77.7330, status:'busy', wait:60 },
    { name:'Aadhaar Enrollment Centre', lat:13.4380, lng:77.7300, status:'open', wait:20 },
    { name:'SDM Office', lat:13.4345, lng:77.7320, status:'partial', wait:30 },
    { name:'Birth / Death Certificate', lat:13.4365, lng:77.7295, status:'open', wait:12 },
    { name:'Police Station (NOC/Verify)', lat:13.4330, lng:77.7340, status:'open', wait:45 }
  ];

  const colorMap = { open:'#138808', busy:'#FF9933', partial:'#F57C00', closed:'#D32F2F' };
  window.officeMapMarkers = [];

  officeMarkers.forEach(o => {
    const color = colorMap[o.status] || '#138808';
    const icon = L.divIcon({
      className: '',
      html: `<div style="background:${color};width:14px;height:14px;border-radius:50%;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.4)"></div>`,
      iconSize: [14,14], iconAnchor: [7,7]
    });
    const m = L.marker([o.lat, o.lng], { icon })
      .addTo(window.sarkariMap)
      .bindPopup(`<b>${o.name}</b><br>Status: <b style="color:${color}">${o.status.toUpperCase()}</b><br>Wait: ~${o.wait} min<br><a href="https://maps.google.com/?q=${o.lat},${o.lng}" target="_blank">Open in Google Maps →</a>`);
    window.officeMapMarkers.push(m);
  });

  // Legend
  const legend = L.control({ position: 'bottomright' });
  legend.onAdd = function() {
    const d = L.DomUtil.create('div');
    d.style.cssText = 'background:#fff;padding:8px 12px;border-radius:8px;font-size:12px;box-shadow:0 2px 8px rgba(0,0,0,0.2);font-family:Noto Sans,sans-serif;line-height:1.8';
    d.innerHTML = '<b style="color:#000080">Office Status</b><br>'+
      '<span style="color:#138808">●</span> Open &nbsp; '+
      '<span style="color:#FF9933">●</span> Busy &nbsp; '+
      '<span style="color:#D32F2F">●</span> Closed';
    return d;
  };
  legend.addTo(window.sarkariMap);
}

// ── GPS LOCATE (updated to recenter map) ─────────────────────────
function gpsLocate() {
  if (!navigator.geolocation) { showToast('⚠️ Geolocation not supported'); return; }
  showToast('📍 Detecting your location…');
  navigator.geolocation.getCurrentPosition(pos => {
    const { latitude: lat, longitude: lng } = pos.coords;
    if (window.sarkariMap) {
      window.sarkariMap.setView([lat, lng], 13);
      L.marker([lat, lng], { icon: L.divIcon({ html: '<div style="background:#000080;width:16px;height:16px;border-radius:50%;border:3px solid #FF9933;box-shadow:0 2px 6px rgba(0,0,0,0.4)"></div>', className:'', iconSize:[16,16], iconAnchor:[8,8] }) })
        .addTo(window.sarkariMap).bindPopup('📍 You are here').openPopup();
    }
    showToast('✅ Location found! Showing nearby offices.');
  }, () => showToast('⚠️ Could not get location. Please enable GPS.'));
}

// ── INIT ──────────────────────────────────────────────────────────
window.addEventListener('load', function() {
  initMap();
  // Pre-populate Karnataka districts on load
  updateDistricts();
  // Set default district to Chikkaballapura
  setTimeout(()=>{
    const distSel = document.getElementById('regDistrict');
    if (distSel) { distSel.value = 'Chikkaballapura'; updateTaluks(); }
  }, 100);
});
// Homepage is open — no forced login