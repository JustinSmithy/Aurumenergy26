// ════════════════════════════════════════════
// LOCALSTORAGE PERSISTENCE
// ════════════════════════════════════════════
const LS_KEYS={
  accounts:'ae_accounts',pendingResets:'ae_pendingResets',applications:'ae_applications',
  deliveryLogs:'ae_deliveryLogs',fieldReports:'ae_fieldReports',incidentReports:'ae_incidentReports',
  clients:'ae_clients',fleet:'ae_fleet',orders:'ae_orders',shiftHistory:'ae_shiftHistory',
  assignedShifts:'ae_assignedShifts',customRoles:'ae_customRoles',
  maintenanceServiceLogs:'ae_maintenanceLogs',roleLogs:'ae_roleLogs',session:'ae_session',
  icMessages:'ae_icMessages',icSession:'ae_icSession',reimbursementRequests:'ae_reimbursements'
};
function lsLoad(key,fallback){try{const v=localStorage.getItem(key);return v?JSON.parse(v):fallback;}catch(e){return fallback;}}
function lsSave(key,val){try{localStorage.setItem(key,JSON.stringify(val));}catch(e){}}
function persist(key){
  const _dataMap={
    accounts:()=>accounts,pendingResets:()=>pendingResets,applications:()=>applications,
    deliveryLogs:()=>deliveryLogs,fieldReports:()=>fieldReports,incidentReports:()=>incidentReports,
    clients:()=>clients,fleet:()=>fleet,orders:()=>orders,shiftHistory:()=>shiftHistory,
    assignedShifts:()=>assignedShifts,customRoles:()=>customRoles,
    maintenanceServiceLogs:()=>maintenanceServiceLogs,icMessages:()=>icMessages,roleLogs:()=>roleLogs,
    reimbursementRequests:()=>reimbursementRequests
  };
  if(_dataMap[key])lsSave(LS_KEYS[key],_dataMap[key]());
}

// ════════════════════════════════════════════
// DATA
// ════════════════════════════════════════════
const DEFAULT_ACCOUNTS=[{username:'justin',password:'logistics',name:'Justin Driver',badge:'4721',role:'Manager',status:'verified',initials:'JD'}];
const DEFAULT_FLEET=[
  {plate:'ESK285',category:'Trucking',type:'Benefactor Imperial EV',status:'Operational',condition:'Good',maint:'Green — No Issues',fuel:'>75% — Full'},
  {plate:'JXK611',category:'Trucking',type:'Benefactor Imperial EV',status:'Operational',condition:'Good',maint:'Green — No Issues',fuel:'>75% — Full'},
  {plate:'CLC114',category:'Trucking',type:'Benefactor Imperial EV',status:'Operational',condition:'Good',maint:'Green — No Issues',fuel:'>75% — Full'},
  {plate:'JNK611',category:'Trucking',type:'Benefactor Imperial EV',status:'Operational',condition:'Good',maint:'Green — No Issues',fuel:'>75% — Full'},
  {plate:'WYB026',category:'Trucking',type:'MTL Tanker',status:'Operational',condition:'Good',maint:'Green — No Issues',fuel:'>75% — Full'},
  {plate:'KPC715',category:'Trucking',type:'MTL Tanker',status:'Operational',condition:'Good',maint:'Green — No Issues',fuel:'>75% — Full'},
  {plate:'LHH435',category:'Trucking',type:'MTL Tanker',status:'Operational',condition:'Good',maint:'Green — No Issues',fuel:'>75% — Full'},
  {plate:'ARD503',category:'Trucking',type:'MTL Tanker',status:'Operational',condition:'Good',maint:'Green — No Issues',fuel:'>75% — Full'},
  {plate:'PHE178',category:'Trucking',type:'MTL Tanker',status:'Operational',condition:'Good',maint:'Green — No Issues',fuel:'>75% — Full'},
  {plate:'ITOW4U',category:'Trucking',type:'MTL Flatbed',status:'Operational',condition:'Good',maint:'Green — No Issues',fuel:'>75% — Full'},
  {plate:'NK888',category:'Utility',type:'MTL Pounder',status:'Operational',condition:'Good',maint:'Green — No Issues',fuel:'>75% — Full'},
  {plate:'NKB888',category:'Utility',type:'MTL Pounder',status:'Operational',condition:'Good',maint:'Green — No Issues',fuel:'>75% — Full'},
  {plate:'RJT901',category:'Utility',type:'Utilitruck',status:'Operational',condition:'Good',maint:'Green — No Issues',fuel:'>75% — Full'},
  {plate:'RTJ901',category:'Utility',type:'Utilitruck',status:'Operational',condition:'Good',maint:'Green — No Issues',fuel:'>75% — Full'},
  {plate:'EOV552',category:'Utility',type:'TipTruck2',status:'Operational',condition:'Good',maint:'Green — No Issues',fuel:'>75% — Full'},
  {plate:'EOW552',category:'Utility',type:'TipTruck2',status:'Operational',condition:'Good',maint:'Green — No Issues',fuel:'>75% — Full'},
  {plate:'LS599',category:'Utility',type:'Forklift',status:'Operational',condition:'Good',maint:'Green — No Issues',fuel:'>75% — Full'},
  {plate:'LS799',category:'Utility',type:'Bulldozer',status:'Operational',condition:'Good',maint:'Green — No Issues',fuel:'>75% — Full'},
  {plate:'WAX158',category:'Utility',type:'Caddy3',status:'Operational',condition:'Good',maint:'Green — No Issues',fuel:'>75% — Full'},
  {plate:'AURUM',category:'Utility',type:'Savesta',status:'Operational',condition:'Good',maint:'Green — No Issues',fuel:'>75% — Full'},
  {plate:'EXEC4',category:'Trucking',type:'Vapid Sandstorm Spark',status:'Operational',condition:'Good',maint:'Green — No Issues',fuel:'>75% — Full'},
  {plate:'ED0432',category:'Trucking',type:'Vapid Sandstorm Spark',status:'Operational',condition:'Good',maint:'Green — No Issues',fuel:'>75% — Full'},
  {plate:'EXEC2',category:'Trucking',type:'Coil Raiden Z',status:'Operational',condition:'Good',maint:'Green — No Issues',fuel:'>75% — Full'},
  {plate:'EXEC1',category:'Trucking',type:'Coil Raiden Z',status:'Operational',condition:'Good',maint:'Green — No Issues',fuel:'>75% — Full'},
  {plate:'EXEC3',category:'Trucking',type:'Coil Raiden Z',status:'Operational',condition:'Good',maint:'Green — No Issues',fuel:'>75% — Full'},
  {plate:'AURUM1',category:'Utility',type:'Semperado',status:'Operational',condition:'Good',maint:'Green — No Issues',fuel:'>75% — Full'},
  {plate:'AURUM2',category:'Utility',type:'Semperado',status:'Operational',condition:'Good',maint:'Green — No Issues',fuel:'>75% — Full'},
  {plate:'AURUM3',category:'Utility',type:'Semperado',status:'Operational',condition:'Good',maint:'Green — No Issues',fuel:'>75% — Full'},
  {plate:'AURUM4',category:'Utility',type:'Semperado',status:'Operational',condition:'Good',maint:'Green — No Issues',fuel:'>75% — Full'},
  {plate:'AURUME3',category:'Utility',type:'Seaspeedo',status:'Operational',condition:'Good',maint:'Green — No Issues',fuel:'>75% — Full'},
  {plate:'AURUME4',category:'Utility',type:'Seaspeedo',status:'Operational',condition:'Good',maint:'Green — No Issues',fuel:'>75% — Full'},
  {plate:'AURUME1',category:'Utility',type:'Seaspeedo',status:'Operational',condition:'Good',maint:'Green — No Issues',fuel:'>75% — Full'},
  {plate:'AURUME2',category:'Utility',type:'Seaspeedo',status:'Operational',condition:'Good',maint:'Green — No Issues',fuel:'>75% — Full'},
  {plate:'IPM108',category:'Utility',type:'Limevick',status:'Operational',condition:'Good',maint:'Green — No Issues',fuel:'>75% — Full'},
  {plate:'AURUM2',category:'Utility',type:'Seabufx',status:'Operational',condition:'Good',maint:'Green — No Issues',fuel:'>75% — Full'},
  {plate:'AURUM1',category:'Utility',type:'Seabufx',status:'Operational',condition:'Good',maint:'Green — No Issues',fuel:'>75% — Full'},
  {plate:'DCV865',category:'Utility',type:'Nagasaki Dinghy (2 Seater)',status:'Operational',condition:'Good',maint:'Green — No Issues',fuel:'>75% — Full'},
  {plate:'MZ258',category:'Utility',type:'Nagasaki Dinghy (4 Seater)',status:'Operational',condition:'Good',maint:'Green — No Issues',fuel:'>75% — Full'},
  {plate:'RUP813',category:'Utility',type:'Tug',status:'Operational',condition:'Good',maint:'Green — No Issues',fuel:'>75% — Full'},
  {plate:'AURUM3',category:'Utility',type:'Seaclamo',status:'Operational',condition:'Good',maint:'Green — No Issues',fuel:'>75% — Full'},
  {plate:'N108BA',category:'Air',type:'Cargobob',status:'Operational',condition:'Good',maint:'Green — No Issues',fuel:'>75% — Full'},
];
const accounts=lsLoad(LS_KEYS.accounts,DEFAULT_ACCOUNTS);
const pendingResets=lsLoad(LS_KEYS.pendingResets,[]);
const applications=lsLoad(LS_KEYS.applications,[]);
const deliveryLogs=lsLoad(LS_KEYS.deliveryLogs,[]);
const fieldReports=lsLoad(LS_KEYS.fieldReports,[]);
const incidentReports=lsLoad(LS_KEYS.incidentReports,[]);
const clients=lsLoad(LS_KEYS.clients,[]);
const FLEET_VERSION='v3';
const fleet=(()=>{
  // Version stamp — if localStorage was written by an older broken build, nuke it
  const storedVer=localStorage.getItem('ae_fleet_version');
  if(storedVer!==FLEET_VERSION){
    localStorage.removeItem('ae_fleet');
    localStorage.setItem('ae_fleet_version',FLEET_VERSION);
  }
  const raw=localStorage.getItem('ae_fleet');
  let _f=null;
  try{_f=raw?JSON.parse(raw):null;}catch(e){_f=null;}
  if(!Array.isArray(_f)||!_f.length){
    lsSave(LS_KEYS.fleet,DEFAULT_FLEET);
    return DEFAULT_FLEET.slice();
  }
  // Merge in any DEFAULT_FLEET vehicles not already stored (by plate+type)
  const _merged=[..._f];
  DEFAULT_FLEET.forEach(def=>{
    if(!_merged.find(v=>v.plate===def.plate&&v.type===def.type))_merged.push(def);
  });
  if(_merged.length!==_f.length)lsSave(LS_KEYS.fleet,_merged);
  return _merged;
})();
const orders=lsLoad(LS_KEYS.orders,[]);
const shiftHistory=lsLoad(LS_KEYS.shiftHistory,[]);
const assignedShifts=lsLoad(LS_KEYS.assignedShifts,[]);
const customRoles=lsLoad(LS_KEYS.customRoles,[]);
const maintenanceServiceLogs=lsLoad(LS_KEYS.maintenanceServiceLogs,[]);
const roleLogs=lsLoad(LS_KEYS.roleLogs,[]);

const BUILTIN_ROLES=[
  {name:'Manager',code:'',access:'manager',desc:'Full portal access. Approves hires, sets policy, and oversees all departments.',builtin:true},
  {name:'Supervisor',code:'',access:'supervisor',desc:'Manages day-to-day operations. Assigns shifts, reviews logs, and supports employees.',builtin:true},
  {name:'Human Resources Representative',code:'AC-HR1',access:'employee',desc:'Aurum Corporation — Specialist that deals with hiring personnel and supporting them throughout their employment.',builtin:true},
  {name:'Marketing Specialist',code:'AC-MA1',access:'employee',desc:'Aurum Corporation — Arranges campaigns, designs posters, organises events and manages the public image of Aurum.',builtin:true},
  {name:'Environmental Researcher',code:'AC-ER1',access:'employee',desc:'Aurum Corporation — Educated professional with a degree in geography or a relevant field. Keeps check on the environment Aurum Energy operates in, researches anomalies and reports issues.',builtin:true},
  {name:'Scientist',code:'AC-SC1',access:'employee',desc:'Aurum Corporation — Educated professional with a degree in physics or chemistry. Researches energy technology in the broadest sense.',builtin:true},
  {name:'Corporation Intern',code:'AC-I1',access:'employee',desc:'Aurum Corporation — Work experience position within the corporate office.',builtin:true},
  {name:'Field Operator',code:'AE-FO1',access:'employee',desc:'Aurum Energy — Technician responsible for maintaining energy infrastructure, from oil well to wind turbine. Part-time possible.',builtin:true},
  {name:'Trucker',code:'AE-T1',access:'employee',desc:'Aurum Energy — Responsible for transporting equipment and fuel. Also supplies gas stations with commercial fuels.',builtin:true},
  {name:'Foreman',code:'AE-FO2',access:'supervisor',desc:'Aurum Energy — Experienced technician that leads others in the field. Sets up work schedules, writes work manuals and liaises with other entities when needed.',builtin:true},
  {name:'OFFSHORE — Entry Level Rig Worker',code:'AEO-W1',access:'employee',desc:'Aurum Energy Offshore — Starting position on an oil rig. Handles general rig operations and learns core offshore procedures.',builtin:true},
  {name:'OFFSHORE — Senior Rig Worker',code:'AEO-W2',access:'employee',desc:'Aurum Energy Offshore — Experienced rig worker with advanced knowledge of offshore operations.',builtin:true},
  {name:'OFFSHORE — Supervisor',code:'AEO-S1',access:'supervisor',desc:'Aurum Energy Offshore — Supervising position on the rig. Responsible for crew safety and operational standards.',builtin:true},
  {name:'Energy Intern',code:'AE-I1',access:'employee',desc:'Aurum Energy — Work experience programme. Learn what Aurum Energy does across all operational departments.',builtin:true},
];
let currentUser=null,activeShift=null,totalBreakMs=0,breakStart=null;

// ════════════════════════════════════════════
// HELPERS
// ════════════════════════════════════════════
const nowDate=()=>new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
const nowTime=()=>new Date().toTimeString().slice(0,8);
const V=id=>{const el=document.getElementById(id);return el?el.value.trim():'';}
const fc=p=>p>50?'hi':p>25?'mid':'lo';
const repL={none:'No Damage',slight:'Slight Damage',heavy:'Heavy Damage'};
const repC={none:'green',slight:'orange',heavy:'red'};
const typeC={'Tow Job':'blue','Vehicle Assist':'amber','Incident / Accident':'red','Mechanical Failure':'orange','Refinery Operation':'purple','Refinery Incident':'red','Road Obstruction':'orange'};
const sevCol={'Minor':'var(--text-2)','Moderate':'var(--orange)','Severe':'var(--red)','Critical':'#ff1744'};
const condCol={'Excellent':'var(--green)','Good':'var(--green)','Fair':'var(--orange)','Poor':'var(--orange)','Damaged':'var(--red)'};
const fuelPctMap={'<25% — Critical':12,'25–50% — Low':37,'50–75% — Adequate':62,'>75% — Full':87};
const mK=m=>(m||'').startsWith('Green')?'green':(m||'').startsWith('Orange')?'orange':'red';
const mS=m=>(m||'').split(' — ')[0]||m||'—';
const fS=f=>(f||'').split(' — ')[0]||f||'—';
const fmtDur=ms=>{const s=Math.floor(ms/1000),h=Math.floor(s/3600),m=Math.floor((s%3600)/60),sc=s%60;return`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(sc).padStart(2,'0')}`;};
const fmtShort=ms=>{const h=Math.floor(ms/3600000),m=Math.floor((ms%3600000)/60000);return h>0?`${h}h ${m}m`:`${m}m`;};
const _BG_DL="https://i.ibb.co/W4nVykr6/faq-image-3.webp";
const _BG_STATS="https://i.ibb.co/bgVsX8gs/faq-image-4.webp";
const _BG_MYSTATS="https://i.ibb.co/4Z6trBtQ/faq-image-5.webp";
const _BG_FIELDREPORTS="https://i.ibb.co/zhLyF9rf/faq-image-6.webp";
const _BG_INCIDENT="https://i.ibb.co/hxzxrC3v/faq-image-7.webp";

const _BG_CLIENTS="https://i.ibb.co/sdDSTzB6/faq-image-8.webp";
const _BG_SHIFTS="https://i.ibb.co/23Mq3MsC/faq-image-9.webp";
const _BG_MAINT="https://i.ibb.co/0j1rnFK9/faq-image-10.webp";
const _BG_ORDERS="https://i.ibb.co/Y73VvJm5/faq-image-11.webp";
const _BG_FLEET="https://i.ibb.co/RGmWwDTy/faq-image-12.webp";
const isAdmin=()=>currentUser&&['Manager','Supervisor'].includes(currentUser.role);
function pRow(l,v){return`<div style="background:var(--surface2);border:1px solid var(--border);border-radius:var(--r);padding:9px 12px"><div style="font-size:9px;color:var(--amber);font-family:JetBrains Mono,monospace;letter-spacing:2px;margin-bottom:3px">${l}</div><div style="font-size:13px;color:var(--text)">${v||'—'}</div></div>`;}
function pGrid(...rows){return`<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px">${rows.join('')}</div>`;}
function allRoles(){return[...BUILTIN_ROLES,...customRoles];}

// ════════════════════════════════════════════
// AUTH
// ════════════════════════════════════════════
function showInfoPanel(key){
  const map={about:'infoAbout',services:'infoServices',safety:'infoSafety',contact:'infoContact'};
  const labelMap={about:'About Us',services:'Services',safety:'Safety',contact:'Contact'};
  const id=map[key];if(!id)return;
  // Close any open ones
  document.querySelectorAll('.info-overlay').forEach(el=>el.classList.remove('open'));
  document.getElementById(id).classList.add('open');
  // Highlight the matching nav link
  document.querySelectorAll('.auth-nav-link').forEach(el=>{
    el.classList.toggle('active', el.textContent.trim()===labelMap[key]);
  });
}
function closeInfoPanel(id){
  const el=document.getElementById(id);if(el)el.classList.remove('open');
  // Restore Operations as active
  document.querySelectorAll('.auth-nav-link').forEach(el=>el.classList.remove('active'));
  const opEl=document.getElementById('navOperations');
  if(opEl)opEl.classList.add('active');
}
// Close on backdrop click + scroll panel body to top on open
document.querySelectorAll('.info-overlay').forEach(el=>{
  el.addEventListener('click',function(e){if(e.target===this)closeInfoPanel(this.id);});
  // Scroll body to top each time panel opens
  const observer=new MutationObserver(()=>{
    if(el.classList.contains('open')){
      const body=el.querySelector('.info-panel-body');
      if(body)body.scrollTop=0;
    }
  });
  observer.observe(el,{attributes:true,attributeFilter:['class']});
});
// Close on Escape key
document.addEventListener('keydown',function(e){
  if(e.key==='Escape'){
    document.querySelectorAll('.info-overlay.open').forEach(el=>closeInfoPanel(el.id));
  }
});
function togglePw(id,btn){
  const el=document.getElementById(id);
  if(!el)return;
  el.type=el.type==='password'?'text':'password';
  btn.textContent=el.type==='password'?'👁':'🙈';
}
function authTab(tab){
  ['login','register','apply','recover'].forEach(t=>{
    const el=document.getElementById('form'+t.charAt(0).toUpperCase()+t.slice(1));
    if(el)el.style.display=t===tab?'block':'none';
  });
  // Only highlight tabs for login/register (apply is now a button under login)
  const tabMap={'login':0,'register':1};
  document.querySelectorAll('.atab').forEach((a,i)=>{
    a.classList.toggle('on', tabMap[tab]===i || (tab==='recover'&&i===0));
  });
  ['lErr','rErr','rOk','recErr','recOk','apErr','apOk'].forEach(id=>{const el=document.getElementById(id);if(el)el.style.display='none';});
}
function doLogin(){
  const u=document.getElementById('lUser').value.trim().toLowerCase();
  const p=document.getElementById('lPass').value;
  const btn=document.querySelector('.af-btn[onclick="doLogin()"]');
  if(btn){btn.textContent='Signing in…';btn.disabled=true;btn.style.opacity='.7';}
  setTimeout(()=>{
  // Check for interview applicant login (phone as username, name as password)
  const uNorm=u.replace(/[^a-z0-9]/g,'');
  const appl=applications.find(a=>{
    const phoneNorm=(a.phone||'').toLowerCase().replace(/[^a-z0-9]/g,'');
    const nameNorm=(a.name||'').toLowerCase().trim();
    return a.status==='interview'&&(phoneNorm===uNorm||a.phone.toLowerCase().trim()===u)&&(p.toLowerCase().trim()===nameNorm);
  });
  if(appl){if(btn){btn.textContent='Sign In';btn.disabled=false;btn.style.opacity='';}icpEnter(appl);return;}
  const acc=accounts.find(a=>a.username===u&&a.password===p&&a.status==='verified');
  if(!acc){if(btn){btn.textContent='Sign In';btn.disabled=false;btn.style.opacity='';}document.getElementById('lErr').style.display='block';return;}
  document.getElementById('lErr').style.display='none';
  document.getElementById('authWrap').style.display='none';
  document.getElementById('app').classList.add('on');
  currentUser=acc;
  lsSave(LS_KEYS.session,acc.username);
  document.getElementById('sbAv').textContent=acc.initials;
  document.getElementById('sbName').textContent=acc.name;
  document.getElementById('sbRole').textContent=acc.role+' · #'+acc.badge;
  document.getElementById('adminNav').style.display=isAdmin()?'block':'none';
  updateChips();populateRoleSelects();refreshAll();try{localStorage.removeItem('ae_last_page');}catch(e){}showPage('stats');
  ['dl-badge','fr-badge','ir-badge','sf-badge','rr-badge'].forEach(id=>{const el=document.getElementById(id);if(el)el.value=acc.badge;});
  ['dl-name','fr-name','ir-name','sf-name','rr-name'].forEach(id=>{const el=document.getElementById(id);if(el)el.value=acc.name;});
  ['dl-rank','fr-rank','ir-rank','sf-role','rr-rank'].forEach(id=>{const el=document.getElementById(id);if(el)el.value=acc.role;});
  },400);
}
['lPass','lUser'].forEach(id=>{const el=document.getElementById(id);if(el)el.addEventListener('keydown',e=>{if(e.key==='Enter')doLogin();});});

function doRegister(){
  const name=V('rName'),user=V('rUser').toLowerCase(),pass=V('rPass'),badge=V('rBadge'),role=V('rRole');
  const err=document.getElementById('rErr');
  if(!name||!user||!pass||!badge||!role){err.textContent='⚠ Please fill in all fields.';err.style.display='block';return;}
  if(accounts.find(a=>a.username===user)){err.textContent='⚠ Username already taken.';err.style.display='block';return;}
  const initials=(name.split(' ').map(w=>w[0]).join('')).toUpperCase().slice(0,2);
  const phone=V('rPhone')||'';const routing=V('rRouting')||'';
  accounts.push({username:user,password:pass,name,badge,role,status:'pending',initials,phone,routing});
  persist('accounts');
  err.style.display='none';document.getElementById('rOk').style.display='block';
  ['rName','rUser','rPass','rBadge','rPhone','rRouting'].forEach(id=>document.getElementById(id).value='');
  document.getElementById('rRole').selectedIndex=0;
  updateChips();
}

function doRecoverRequest(){
  const user=V('recUser').toLowerCase();const badge=V('recBadge');
  const acc=accounts.find(a=>a.username===user&&a.badge===badge);
  const err=document.getElementById('recErr');const ok=document.getElementById('recOk');
  if(!acc){err.style.display='block';ok.style.display='none';return;}
  if(!pendingResets.find(r=>r.username===user))pendingResets.push({username:user,name:acc.name,badge,requestedAt:nowDate()});
  persist('pendingResets');
  err.style.display='none';ok.style.display='block';
}

function doLogout(){
  currentUser=null;activeShift=null;totalBreakMs=0;
  lsSave(LS_KEYS.session,null);
  document.getElementById('app').classList.remove('on');
  document.getElementById('authWrap').style.display='flex';
  document.getElementById('lUser').value='';document.getElementById('lPass').value='';
  authTab('login');
}
function icpLogout(){
  lsSave(LS_KEYS.icSession,null);
  document.getElementById('icPortal').classList.remove('on');
  document.getElementById('authWrap').style.display='flex';
  document.getElementById('lUser').value='';document.getElementById('lPass').value='';
  authTab('login');
}

function updateChips(){
  const pending=accounts.filter(a=>a.status==='pending').length;
  const ap=applications.filter(a=>a.status==='pending').length;
  const c=document.getElementById('accChip');if(c){c.style.display=pending>0?'inline':'none';c.textContent=pending;}
  const ac=document.getElementById('appChip');if(ac){ac.style.display=ap>0?'inline':'none';ac.textContent=ap;}
  // My Shifts notification — show if current user has an upcoming assigned shift
  const sc=document.getElementById('myShiftChip');
  if(sc&&currentUser){
    const hasShift=assignedShifts.some(s=>s.employeeName===currentUser.name&&(s.status==='assigned'||s.status==='accepted'));
    sc.style.display=hasShift?'inline':'none';
  }
}

// ════════════════════════════════════════════
// ROLES
// ════════════════════════════════════════════
function populateRoleSelects(){
  const all=allRoles();
  ['dl-rank','fr-rank','ir-rank','sf-role','rr-rank'].forEach(id=>{
    const el=document.getElementById(id);if(!el)return;
    const cur=el.value;
    el.innerHTML='<option value="">Select</option>'+all.map(r=>`<option value="${r.name}"${r.name===cur?' selected':''}>${r.name}${r.code?' ('+r.code+')':''}</option>`).join('');
  });
}
function renderRoles(){
  const w=document.getElementById('rolesWrap');if(!w)return;
  const all=allRoles();
  // Group by division for display
  const mgmt=all.filter(r=>r.name==='Manager'||r.name==='Supervisor');
  const corp=all.filter(r=>r.code&&r.code.startsWith('AC'));
  const energy=all.filter(r=>r.code&&r.code.startsWith('AE'));
  const custom=all.filter(r=>!r.builtin);
  function sectionRows(rows){return rows.map((r,i)=>`
  <tr style="animation:rowIn .3s ease ${i*.03}s both">
    <td>
      <div class="dn">${r.name}</div>
      ${r.code?`<div class="dc" style="color:var(--amber)">${r.code}</div>`:''}
    </td>
    <td><span class="tag ${r.access==='manager'?'amber':r.access==='supervisor'?'purple':'blue'}">${r.access.charAt(0).toUpperCase()+r.access.slice(1)}</span></td>
    <td style="font-size:12px;color:var(--text-2);max-width:260px;white-space:normal;line-height:1.5">${r.desc||'—'}</td>
    <td><span class="tag ${r.builtin?'dim':'green'}">${r.builtin?'Built-in':'Custom'}</span></td>
    <td>${!r.builtin?`<button class="btn-sm danger" onclick="deleteRole(${customRoles.indexOf(r)})">Delete</button>`:'<span style="font-size:11px;color:var(--text-3)">Protected</span>'}</td>
  </tr>`).join('');}
  function sectionHeader(label,color){return`<tr><td colspan="5" style="background:${color};padding:7px 13px;font-family:JetBrains Mono,monospace;font-size:9px;letter-spacing:2px;color:#fff;text-transform:uppercase;font-weight:600">${label}</td></tr>`;}
  w.innerHTML=`<table><thead><tr><th>Role / Code</th><th>Access Level</th><th>Description</th><th>Type</th><th>Actions</th></tr></thead><tbody>
    ${sectionHeader('Management','rgba(232,160,32,.25)')}${sectionRows(mgmt)}
    ${sectionHeader('Aurum Corporation','rgba(168,85,247,.2)')}${sectionRows(corp)}
    ${sectionHeader('Aurum Energy — Operations','rgba(232,160,32,.18)')}${sectionRows(energy)}
    ${custom.length?sectionHeader('Custom Roles','rgba(34,197,94,.15)')+sectionRows(custom):''}
  </tbody></table>`;
  // Update info page roles list
  const ir=document.getElementById('infoRoles');
  if(ir){
    function infoSection(label,rows,color){
      return`<div style="margin-bottom:14px"><div style="font-family:JetBrains Mono,monospace;font-size:9px;color:${color};letter-spacing:2px;text-transform:uppercase;margin-bottom:8px;padding-bottom:6px;border-bottom:1px solid var(--border)">${label}</div>${rows.map(r=>`<div class="rank-row"><div><div style="font-family:Space Grotesk,sans-serif;font-size:12px;font-weight:600;color:${r.access==='manager'?'var(--amber)':r.access==='supervisor'?'#94a3b8':'var(--text-2)'}">${r.name}</div>${r.code?`<div style="font-family:JetBrains Mono,monospace;font-size:9px;color:var(--amber);margin-top:1px">${r.code}</div>`:''}</div><div style="font-size:11px;color:var(--text-2);line-height:1.5">${r.desc||'—'}</div></div>`).join('')}</div>`;
    }
    ir.innerHTML=infoSection('Management',mgmt,'var(--amber)')+infoSection('Aurum Corporation',corp,'var(--purple)')+infoSection('Aurum Energy — Operations',energy,'var(--amber)')+(custom.length?infoSection('Custom Roles',custom,'var(--green)'):'');
  }
}
function addRole(){
  if(!V('role-name')){toast('⚠️','Enter a role name.','var(--orange)');return;}
  customRoles.push({name:V('role-name'),access:V('role-access')||'employee',desc:V('role-desc'),builtin:false});
  persist('customRoles');
  logRoleEvent('Role Created',V('role-name'),'—',V('role-name'),currentUser?.name||'System');
  document.getElementById('role-name').value='';document.getElementById('role-desc').value='';
  closeModal('addRoleModal');renderRoles();populateRoleSelects();toast('✅','Role created!');
}
function deleteRole(i){
  const name=customRoles[i]?.name||'—';
  logRoleEvent('Role Deleted',name,name,'—',currentUser?.name||'System');
  customRoles.splice(i,1);persist('customRoles');renderRoles();populateRoleSelects();toast('🗑','Role deleted.','var(--text-3)');
}

// ════════════════════════════════════════════
// PAGE ROUTER
// ════════════════════════════════════════════
function showPage(id){
  if(currentUser)try{localStorage.setItem('ae_last_page',id);}catch(e){}
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('on'));
  const pg=document.getElementById('page-'+id);if(pg)pg.classList.add('on');
  const _m=document.querySelector('.main');
  if(_m){if(id==='stats'){_m.style.backgroundImage='url('+_BG_STATS+')';_m.style.backgroundSize='cover';_m.style.backgroundPosition='center';}
  else if(id==='delivery-logs'){_m.style.backgroundImage='url('+_BG_DL+')';_m.style.backgroundSize='cover';_m.style.backgroundPosition='center';}
  else if(id==='my-stats'){_m.style.backgroundImage='url('+_BG_MYSTATS+')';_m.style.backgroundSize='cover';_m.style.backgroundPosition='center';}
  else if(id==='field-reports'||id==='field-report-form'){_m.style.backgroundImage='url('+_BG_FIELDREPORTS+')';_m.style.backgroundSize='cover';_m.style.backgroundPosition='center';}
  else if(id==='incident-reports'||id==='incident-form'){_m.style.backgroundImage='url('+_BG_INCIDENT+')';_m.style.backgroundSize='cover';_m.style.backgroundPosition='center';}
  else if(id==='clients'){_m.style.backgroundImage='url('+_BG_CLIENTS+')';_m.style.backgroundSize='cover';_m.style.backgroundPosition='center';}
  else if(id==='shift'){_m.style.backgroundImage='url('+_BG_SHIFTS+')';_m.style.backgroundSize='cover';_m.style.backgroundPosition='center';}
  else if(id==='my-shifts'){_m.style.backgroundImage='url('+_BG_SHIFTS+')';_m.style.backgroundSize='cover';_m.style.backgroundPosition='center';}
  else if(id==='orders'){_m.style.backgroundImage='url('+_BG_ORDERS+')';_m.style.backgroundSize='cover';_m.style.backgroundPosition='center';}
  else if(id==='fleet'){_m.style.backgroundImage='url('+_BG_FLEET+')';_m.style.backgroundSize='cover';_m.style.backgroundPosition='center';}
  else if(id==='maintenance'){_m.style.backgroundImage='url('+_BG_MAINT+')';_m.style.backgroundSize='cover';_m.style.backgroundPosition='center';}
  else{_m.style.backgroundImage='none';}}
  document.querySelectorAll('.si').forEach(n=>n.classList.toggle('on',n.dataset.page===id));
  if(id==='map')setTimeout(initMap,100);
  if(id==='delivery-logs'||id==='delivery-form'){
    populateVehicleSelect();populateOrderRefSelects();
    if(id==='delivery-form'&&currentUser){
      var db=document.getElementById('dl-badge');if(db)db.value=currentUser.badge;
      var dn=document.getElementById('dl-name');if(dn)dn.value=currentUser.name;
      var dr=document.getElementById('dl-rank');if(dr)dr.value=currentUser.role;
      initCrewPicker();
    }
  }
  if(id==='field-report-form')populateOrderRefSelects();
  if(id==='stats')renderCompanyOverview();
  if(id==='leaderboard')renderLeaderboard();
  if(id==='my-stats')renderMyStats();
  if(id==='my-shifts')renderMyShifts();
  if(id==='shift'){populateShiftVehicle();renderShiftHistory(shiftHistory);checkAssignedShift();}
  if(id==='admin-accounts'){renderAccounts();}
  if(id==='admin-applications'){renderApplications();}
  if(id==='admin-shifts'){populateAssignForm();renderAssignedShifts();}
  if(id==='admin-roles')renderRoles();
  if(id==='admin-role-logs')renderRoleLogs();
  if(id==='fleet'){
    renderFleet(fleet);updateFleetStats();
  }
  if(id==='maintenance'){renderMaintDamage();renderMaintService();populateMaintVehicleSelect();}
  if(id==='orders'){populateOrderDriverSelect();renderOrders(orders);}
  if(id==='reimbursement'){renderRR();updateRRStats();populateOrderRefSelects();}
  if(id==='reimbursement-form'){populateOrderRefSelects();if(currentUser){const rb=document.getElementById('rr-badge');if(rb&&!rb.value)rb.value=currentUser.badge;const rn=document.getElementById('rr-name');if(rn&&!rn.value)rn.value=currentUser.name;const rr=document.getElementById('rr-rank');if(rr)rr.value=currentUser.role;}}
  if(id==='information')renderRoles();
}
document.querySelectorAll('.si[data-page]').forEach(n=>n.addEventListener('click',()=>showPage(n.dataset.page)));
document.querySelectorAll('.ftabs').forEach(tabs=>tabs.querySelectorAll('.ftab').forEach(tab=>tab.addEventListener('click',()=>{tabs.querySelectorAll('.ftab').forEach(t=>t.classList.remove('on'));tab.classList.add('on');})));
function openModal(id){
  document.getElementById(id).classList.add('open');
  if(id==='maintServiceModal'){
    populateMaintVehicleSelect();
    const techEl=document.getElementById('ms-tech');
    if(techEl&&currentUser&&!techEl.value)techEl.value=currentUser.name;
  }
}
function closeModal(id){document.getElementById(id).classList.remove('open');}
document.querySelectorAll('.modal-overlay').forEach(m=>m.addEventListener('click',e=>{if(e.target===m)m.classList.remove('open');}));
function toast(ico,msg,color='var(--green)'){
  const t=document.getElementById('toast');
  document.getElementById('toastIco').textContent=ico;
  document.getElementById('toastMsg').textContent=msg;
  document.getElementById('toastMsg').style.color=color;
  t.style.borderColor=color;t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),3000);
}

// ════════════════════════════════════════════
// FORM PREVIEW
// ════════════════════════════════════════════
function previewFormData(type){
  let title='',body='';
  if(type==='delivery'){
    title='Delivery Log Preview';
    var rMp={'No Damage':'none','Slight Damage':'slight','Heavy Damage':'heavy'};
    var repP=rMp[V('dl-repair')]||'none';
    var fuelTypeVal=V('dl-fuel-type')==='Other — Please Specify'?V('dl-fuel-type-other'):V('dl-fuel-type');
    var usageVal=V('dl-usage')==='Other — Please Specify'?V('dl-usage-other'):V('dl-usage');
    body='<div style="padding-bottom:12px;margin-bottom:14px;border-bottom:1px solid var(--border)">'
      +'<div style="font-family:Space Grotesk,sans-serif;font-size:16px;font-weight:600;margin-bottom:3px">'+(V('dl-name')||'—')+'</div>'
      +'<div class="mono" style="font-size:11px;color:var(--text-3)">Badge #'+V('dl-badge')+' · '+V('dl-rank')+' · '+nowDate()+' at '+nowTime()+'</div>'
      +(V('dl-crew')?'<div style="font-size:11px;color:var(--text-2);margin-top:2px">Crew: '+V('dl-crew')+'</div>':'')
      +'</div>'
      +'<div style="background:var(--amber-pale);border:1px solid var(--border-hi);border-radius:var(--r);padding:10px 14px;margin-bottom:12px;display:grid;grid-template-columns:1fr 1fr;gap:8px">'
      +'<div><div style="font-size:9px;color:var(--amber);font-family:JetBrains Mono,monospace;letter-spacing:2px;margin-bottom:3px">DELIVERED</div><div style="font-size:15px;font-weight:700;color:var(--text)">'+(fuelTypeVal||'Not selected')+'</div></div>'
      +'<div><div style="font-size:9px;color:var(--amber);font-family:JetBrains Mono,monospace;letter-spacing:2px;margin-bottom:3px">ORDER #</div><div style="font-size:15px;font-weight:700;color:var(--amber)">'+(V('dl-order-ref')||'None')+'</div></div>'
      +'</div>'
      +pGrid(pRow('VEHICLE','🚛 '+(V('dl-vehicle')||'—')),pRow('USAGE',usageVal||'—'),pRow('FUEL LEVEL',V('dl-fuel')||'—'),pRow('DASHCAM',V('dl-dashcam')==='Yes'?'✓ Installed':'Not specified'),pRow('DAMAGE',repL[repP]||'—'),pRow('MAINTENANCE',(V('dl-maint')||'—').toUpperCase()))
      +(V('dl-notes')?pRow('GENERAL NOTES',V('dl-notes')):'')
      +(V('dl-fleet-notes')?'<div style="margin-top:8px">'+pRow('OPERATIONS NOTES',V('dl-fleet-notes'))+'</div>':'');
  } else if(type==='field'){
    title='Field Report Preview';
    body=`<div style="padding-bottom:12px;margin-bottom:14px;border-bottom:1px solid var(--border)">
      <div style="font-family:Space Grotesk,sans-serif;font-size:16px;font-weight:600;margin-bottom:3px">${V('fr-name')||'—'}</div>
      <div class="mono" style="font-size:11px;color:var(--text-3)">Badge #${V('fr-badge')} · ${nowDate()} at ${nowTime()}</div>
    </div>
    ${pGrid(pRow('TYPE',V('fr-type')),pRow('LOCATION',V('fr-location')),pRow('VEHICLE',V('fr-vehicle')),pRow('OUTCOME',V('fr-outcome')),pRow('OTHER PARTIES',V('fr-parties')||'None'),pRow('DAMAGE',V('fr-damage')||'—'))}
    ${V('fr-desc')?pRow('DESCRIPTION',V('fr-desc')):''}`;
  } else if(type==='incident'){
    title='Incident Report Preview';
    body=`<div style="padding-bottom:12px;margin-bottom:14px;border-bottom:1px solid var(--border);display:flex;align-items:flex-start;justify-content:space-between">
      <div><div style="font-family:Space Grotesk,sans-serif;font-size:16px;font-weight:600;margin-bottom:3px">${V('ir-name')||'—'}</div><div class="mono" style="font-size:11px;color:var(--text-3)">Badge #${V('ir-badge')} · ${V('ir-rank')}</div></div>
      <span style="font-size:11px;font-weight:700;color:${sevCol[V('ir-severity')]||'var(--text-2)'};border:1px solid currentColor;border-radius:5px;padding:2px 8px">${V('ir-severity')||'—'}</span>
    </div>
    ${pGrid(pRow('TYPE',V('ir-type')),pRow('LOCATION',V('ir-location')),pRow('VEHICLE',V('ir-vehicle')),pRow('EMERGENCY SVC',V('ir-police')||'—'),pRow('OTHER PARTIES',V('ir-parties')||'None'),pRow('DAMAGE',V('ir-damage')||'—'))}
    ${V('ir-desc')?pRow('DESCRIPTION',V('ir-desc')):''}`;
  }
  document.getElementById('prevTitle').textContent=title;
  document.getElementById('prevBody').innerHTML=body;
  openModal('prevModal');
}

// ════════════════════════════════════════════
// DELIVERY LOGS
// ════════════════════════════════════════════
function populateVehicleSelect(){
  const sel=document.getElementById('dl-vehicle');if(!sel)return;
  const cur=sel.value;sel.innerHTML='<option value="">Select vehicle</option>';
  if(!fleet.length){sel.innerHTML+='<option value="" disabled>— No fleet vehicles registered —</option>';return;}
  fleet.forEach(f=>sel.innerHTML+=`<option value="${f.plate}"${f.plate===cur?' selected':''}>${f.plate} — ${f.type} (${f.category})</option>`);
}
function renderDL(data){
  var w=document.getElementById('dlWrap');if(!w)return;
  if(!data||!data.length){w.innerHTML=`<div class="empty"><div class="empty-ico">📋</div><div class="empty-t">No Delivery Logs</div><div class="empty-s">Submitted logs appear here.</div><button class="empty-btn" onclick="showPage('delivery-form')">+ New Log</button></div>`;return;}
  var rows='';
  for(var i=0;i<data.length;i++){
    var r=data[i];var ri=deliveryLogs.indexOf(r);
    var fuelBar='<div class="fbar-w"><div class="fbar"><div class="fbar-f '+fc(r.fp)+'" style="width:'+r.fp+'%"></div></div><span class="mono" style="font-size:10px;color:var(--text-3)">'+r.fuel+'</span></div>';
    rows+='<tr style="animation:rowIn .3s ease '+(i*.05)+'s both;cursor:pointer" onclick="viewDL('+ri+')" title="Click to view">'
      +'<td><span class="mono" style="display:block;color:var(--text)">'+r.date+'</span><span class="mono" style="font-size:10px;color:var(--text-3)">'+r.time+'</span></td>'
      +'<td><span class="mono" style="color:var(--amber)">'+r.badge+'</span></td>'
      +'<td><div class="dn">'+r.name+'</div><div class="dc">'+r.rank+'</div></td>'
      +'<td><span class="veh">🚛 '+r.vehicle+'</span></td>'
      +'<td>'+fuelBar+'</td>'
      +'<td><span class="mono" style="font-size:10px;color:var(--text-2)">'+(r.fuelType||'—')+'</span></td>'
      +'<td><span class="mono" style="font-size:11px;color:var(--amber)">'+(r.orderRef||'—')+'</span></td>'
      +'<td><span class="dot '+(r.cam?'on':'off')+'"></span></td>'
      +'<td><span class="tag '+repC[r.rep]+'">'+repL[r.rep]+'</span></td>'
      +'<td><span class="tag '+(r.maint||'dim')+'">'+(r.maint||'').charAt(0).toUpperCase()+(r.maint||'').slice(1)+'</span></td>'
      +'<td><button class="btn-sm" onclick="event.stopPropagation();viewDL('+ri+')">View</button></td>'
      +'</tr>';
  }
  w.innerHTML='<table><thead><tr><th>Time</th><th>Badge</th><th>Driver</th><th>Vehicle</th><th>Fuel Lvl</th><th>Delivered</th><th>Order #</th><th>Cam</th><th>Damage</th><th>Maint.</th><th></th></tr></thead><tbody>'+rows+'</tbody></table>';
}

function updateDLStats(){
  const now=new Date(),mon=now.getMonth(),wa=new Date(now-7*24*60*60*1000);
  const total=deliveryLogs.length;
  const thisMonth=deliveryLogs.filter(r=>new Date(r.date).getMonth()===mon).length;
  const lastMonth=deliveryLogs.filter(r=>new Date(r.date).getMonth()===((mon-1+12)%12)).length;
  const dmg=deliveryLogs.filter(r=>r.rep!=='none').length;
  const fleet_op=fleet.filter(f=>f.status==='Operational').length;
  setStatWithTrend('dlST',total,total>0?'up':'neutral');
  setStatWithTrend('dlSM',thisMonth,thisMonth>lastMonth?'up':thisMonth<lastMonth?'down':'neutral');
  setStatWithTrend('dlSD',dmg,dmg>0?'down':'up');
  setStatWithTrend('dlSF',fleet_op,fleet_op>0?'up':'neutral');
  document.getElementById('dlWC').textContent=deliveryLogs.filter(r=>new Date(r.date)>=wa).length;
  document.getElementById('dlMC').textContent=thisMonth;
}
function setStatWithTrend(id,val,direction){
  const el=document.getElementById(id);
  if(!el)return;
  const arrow=direction==='up'?'▲':direction==='down'?'▼':'—';
  const cls=direction==='up'?'up':direction==='down'?'down':'neutral';
  el.innerHTML=`<div class="sc-v-row"><span>${val}</span><span class="sc-trend ${cls}">${arrow}</span></div>`;
}
function submitDelivery(){
  // Auto-fill badge/name if empty (catches edge cases where boot didn't fire)
  if(currentUser){
    const db=document.getElementById('dl-badge');if(db&&!db.value)db.value=currentUser.badge;
    const dn=document.getElementById('dl-name');if(dn&&!dn.value)dn.value=currentUser.name;
    const dr=document.getElementById('dl-rank');if(dr&&!dr.value)dr.value=currentUser.role;
  }
  if(currentUser&&(V('dl-name').trim().toLowerCase()!==currentUser.name.trim().toLowerCase()||V('dl-badge').trim()!==currentUser.badge.trim())){toast('🚫','You can only submit on behalf of yourself.','var(--red)');return;}
  if(!V('dl-badge')||!V('dl-name')||!V('dl-rank')||!V('dl-vehicle')||!V('dl-fuel-type')||!V('dl-order-ref')||!V('dl-usage')||!V('dl-fuel')||!V('dl-dashcam')||!V('dl-repair')||!V('dl-maint')){toast('⚠️','Fill in all required fields — including What Was Delivered and Order #.','var(--orange)');return;}
  const rM={'No Damage':'none','Slight Damage':'slight','Heavy Damage':'heavy'};
  const fP={'<25%':15,'25–50%':38,'50–75%':62,'>75%':82};
  const dlUsage=V('dl-usage')==='Other — Please Specify'?(V('dl-usage-other')||V('dl-usage')):V('dl-usage');
  const dlFuelType=V('dl-fuel-type')==='Other — Please Specify'?(V('dl-fuel-type-other')||V('dl-fuel-type')):V('dl-fuel-type');
  const orderNum=V('dl-order-ref');
  deliveryLogs.unshift({date:nowDate(),time:nowTime(),badge:V('dl-badge'),name:V('dl-name'),rank:V('dl-rank'),vehicle:V('dl-vehicle'),usage:dlUsage,fuelType:dlFuelType,orderRef:orderNum,crew:V('dl-crew'),fuel:V('dl-fuel'),fp:fP[V('dl-fuel')]||62,cam:V('dl-dashcam')==='Yes',rep:rM[V('dl-repair')]||'none',maint:V('dl-maint').toLowerCase(),notes:V('dl-notes'),fleetNotes:V('dl-fleet-notes')});
  persist('deliveryLogs');
  // Auto-complete the linked order
  if(orderNum){
    const linkedOrder=orders.find(function(o){return o.number===orderNum;});
    if(linkedOrder&&linkedOrder.status!=='Completed'){
      linkedOrder.status='Completed';
      linkedOrder.completedAt=nowDate()+' '+nowTime();
      linkedOrder.completedBy=currentUser?currentUser.name:'—';
      persist('orders');
      updateOrderStats();
      toast('✅','Delivery logged & Order '+orderNum+' marked Completed!','var(--green)');
    } else {
      toast('✅','Delivery log submitted!','var(--green)');
    }
  } else {
    toast('✅','Delivery log submitted!','var(--green)');
  }
  ['dl-notes','dl-fleet-notes','dl-usage-other','dl-fuel-type-other'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
  initCrewPicker();;
  ['dl-usage','dl-fuel','dl-dashcam','dl-repair','dl-maint','dl-fuel-type','dl-order-ref'].forEach(id=>{const el=document.getElementById(id);if(el)el.selectedIndex=0;});
  if(activeShift){activeShift.deliveries++;document.getElementById('shDelC').textContent=activeShift.deliveries;}
  updateDLStats();renderDL(deliveryLogs);showPage('delivery-logs');
}
document.getElementById('dlSrch').addEventListener('input',e=>{const q=e.target.value.toLowerCase();renderDL(deliveryLogs.filter(r=>r.name.toLowerCase().includes(q)||r.badge.includes(q)||r.vehicle.toLowerCase().includes(q)));});
function viewDL(idx){
  var r=deliveryLogs[idx];if(!r)return;
  document.getElementById('prevTitle').textContent='Delivery Log — '+(r.orderRef||'No Order Linked');
  var linkedOrder=r.orderRef?orders.find(function(o){return o.number===r.orderRef;}):null;
  var orderInfo=linkedOrder?('<span style="color:var(--green);font-weight:600">'+linkedOrder.status+'</span> · '+linkedOrder.title):'Not linked to an order';
  document.getElementById('prevBody').innerHTML=
    '<div style="padding-bottom:12px;margin-bottom:14px;border-bottom:1px solid var(--border)">'
    +'<div style="font-family:Space Grotesk,sans-serif;font-size:16px;font-weight:600;margin-bottom:3px">'+r.name+'</div>'
    +'<div class="mono" style="font-size:11px;color:var(--text-3)">Badge #'+r.badge+' · '+r.rank+' · '+r.date+' at '+r.time+'</div>'
    +(r.crew?'<div style="font-size:11px;color:var(--text-2);margin-top:2px">Crew: '+r.crew+'</div>':'')
    +'</div>'
    +'<div style="background:var(--amber-pale);border:1px solid var(--border-hi);border-radius:var(--r);padding:10px 14px;margin-bottom:12px;display:grid;grid-template-columns:1fr 1fr;gap:8px">'
    +'<div><div style="font-size:9px;color:var(--amber);font-family:JetBrains Mono,monospace;letter-spacing:2px;margin-bottom:3px">DELIVERED</div><div style="font-size:15px;font-weight:700;color:var(--text)">'+(r.fuelType||'—')+'</div></div>'
    +'<div><div style="font-size:9px;color:var(--amber);font-family:JetBrains Mono,monospace;letter-spacing:2px;margin-bottom:3px">ORDER #</div><div style="font-size:15px;font-weight:700;color:var(--amber)">'+(r.orderRef||'—')+'</div><div style="font-size:10px;color:var(--text-3);margin-top:2px">'+orderInfo+'</div></div>'
    +'</div>'
    +pGrid(pRow('VEHICLE','🚛 '+r.vehicle),pRow('USAGE',r.usage||'—'),pRow('FUEL LEVEL',r.fuel),pRow('DASHCAM',r.cam?'✓ Installed':'✕ Not Installed'),pRow('DAMAGE',repL[r.rep]),pRow('MAINTENANCE',(r.maint||'').toUpperCase()))
    +(r.notes&&r.notes!=='N/A'?'<div style="margin-top:8px">'+pRow('NOTES',r.notes)+'</div>':'')
    +(r.fleetNotes&&r.fleetNotes!=='N/A'?'<div style="margin-top:8px">'+pRow('OPERATIONS NOTES',r.fleetNotes)+'</div>':'');
  openModal('prevModal');
}

// ════════════════════════════════════════════
// FIELD REPORTS
// ════════════════════════════════════════════
function renderFR(data){
  var w=document.getElementById('frWrap');if(!w)return;
  if(!data||!data.length){w.innerHTML=`<div class="empty"><div class="empty-ico">🛑</div><div class="empty-t">No Field Reports</div><div class="empty-s">Submitted reports appear here.</div><button class="empty-btn" onclick="showPage('field-report-form')">+ New Report</button></div>`;return;}
  var rows='';
  for(var i=0;i<data.length;i++){
    var r=data[i];var ri=fieldReports.indexOf(r);
    var divCell=r.division==='Logistics Orders'?'<span class="tag blue" style="font-size:9px">LOGISTICS</span>':r.division==='Field Operations Orders'?'<span class="tag purple" style="font-size:9px">FIELD OPS</span>':'<span style="color:var(--text-3);font-size:10px">—</span>';
    var stCell='<span class="tag '+(r.status==='Completed'?'green':r.status==='In Progress'?'blue':'orange')+'">'+(r.status||'Open')+'</span>';
    var actBtn=(isAdmin()&&r.status!=='Completed')?'<button class="btn-sm ok" onclick="event.stopPropagation();markFRComplete('+ri+')" title="Mark Complete">✓</button>':'';
    rows+='<tr style="animation:rowIn .3s ease '+(i*.05)+'s both;cursor:pointer" onclick="viewFR('+ri+')" title="Click to view">'
      +'<td><span class="mono" style="display:block;color:var(--text)">'+r.date+'</span><span class="mono" style="font-size:10px;color:var(--text-3)">'+r.time+'</span></td>'
      +'<td><span class="mono" style="color:var(--amber)">'+r.badge+'</span></td>'
      +'<td><div class="dn">'+r.name+'</div></td>'
      +'<td>'+divCell+'</td>'
      +'<td><span class="tag '+(typeC[r.type]||'dim')+'">'+r.type+'</span></td>'
      +'<td style="font-size:12px;color:var(--text-2)">'+r.location+'</td>'
      +'<td><span class="veh">🚛 '+r.vehicle+'</span></td>'
      +'<td>'+stCell+'</td>'
      +'<td style="font-size:11px;color:var(--text-2);max-width:130px;overflow:hidden;text-overflow:ellipsis">'+r.outcome+'</td>'
      +'<td><div style="display:flex;gap:5px">'+actBtn+'<button class="btn-sm" onclick="event.stopPropagation();viewFR('+ri+')">View</button></div></td>'
      +'</tr>';
  }
  w.innerHTML='<table><thead><tr><th>Time</th><th>Badge</th><th>Name</th><th>Division</th><th>Type</th><th>Location</th><th>Vehicle</th><th>Status</th><th>Outcome</th><th></th></tr></thead><tbody>'+rows+'</tbody></table>';
}

function updateFRStats(){
  document.getElementById('frST').textContent=fieldReports.length;
  document.getElementById('frSTow').textContent=fieldReports.filter(r=>r.type==='Refinery Operation'||r.type==='Refinery Incident').length;
  document.getElementById('frSInc').textContent=fieldReports.filter(r=>r.type==='Incident / Accident').length;
  document.getElementById('frSAss').textContent=fieldReports.filter(r=>r.type==='Mechanical Failure').length;
}
function markFRComplete(i){if(!isAdmin())return;fieldReports[i].status='Completed';fieldReports[i].completedAt=nowDate()+' at '+nowTime();fieldReports[i].completedBy=currentUser?.name||'—';persist('fieldReports');renderFR(fieldReports);updateFRStats();toast('✅','Field report marked as complete!','var(--green)');}
function submitFieldReport(){
  if(currentUser&&(V('fr-name').trim().toLowerCase()!==currentUser.name.trim().toLowerCase()||V('fr-badge').trim()!==currentUser.badge.trim())){toast('🚫','You can only submit on behalf of yourself.','var(--red)');return;}
  if(!V('fr-badge')||!V('fr-name')||!V('fr-type')||!V('fr-location')||!V('fr-vehicle')||!V('fr-outcome')||!V('fr-division')||!V('fr-desc')){toast('⚠️','Fill in all required fields.','var(--orange)');return;}
  const frTypeVal=V('fr-type')==='Other — Please Specify'?(V('fr-type-other')||V('fr-type')):V('fr-type');fieldReports.unshift({date:nowDate(),time:nowTime(),badge:V('fr-badge'),name:V('fr-name'),rank:V('fr-rank'),type:frTypeVal,location:V('fr-location'),vehicle:V('fr-vehicle'),outcome:V('fr-outcome'),parties:V('fr-parties'),division:V('fr-division'),orderRef:V('fr-order-ref'),status:V('fr-status')||'Open',crew:V('fr-crew'),fullDesc:V('fr-desc'),notes:V('fr-notes')});
  persist('fieldReports');
  ['fr-location','fr-vehicle','fr-parties','fr-desc','fr-notes','fr-type-other','fr-crew'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
  ['fr-type','fr-outcome','fr-damage','fr-division','fr-order-ref','fr-status'].forEach(id=>{const el=document.getElementById(id);if(el)el.selectedIndex=0;});
  if(activeShift){activeShift.fieldReports++;document.getElementById('shFRC').textContent=activeShift.fieldReports;}
  updateFRStats();renderFR(fieldReports);toast('✅','Field report submitted!');showPage('field-reports');
}
document.getElementById('frSrch').addEventListener('input',e=>{const q=e.target.value.toLowerCase();renderFR(fieldReports.filter(r=>r.name.toLowerCase().includes(q)||r.type.toLowerCase().includes(q)||r.location.toLowerCase().includes(q)));});
function viewFR(idx){
  const r=fieldReports[idx];if(!r)return;
  document.getElementById('prevTitle').textContent='Field Report';
  const frStC={'Open':'orange','In Progress':'blue','Completed':'green'};document.getElementById('prevBody').innerHTML=`<div style="padding-bottom:12px;margin-bottom:14px;border-bottom:1px solid var(--border)"><div style="font-family:Space Grotesk,sans-serif;font-size:16px;font-weight:600;margin-bottom:3px">${r.name}</div><div class="mono" style="font-size:11px;color:var(--amber)">${r.division||'—'}</div><div class="mono" style="font-size:11px;color:var(--text-3)">Badge #${r.badge} · ${r.date} at ${r.time}</div></div>${pGrid(pRow('TYPE',r.type),pRow('LOCATION',r.location),pRow('VEHICLE',r.vehicle),pRow('OUTCOME',r.outcome),pRow('DIVISION',r.division||'—'),pRow('ORDER #',r.orderRef||'—'),pRow('STATUS',`<span style="color:var(--${frStC[r.status]||'orange'})">${r.status||'Open'}</span>`),pRow('CREW',r.crew||'—'),pRow('OTHER PARTIES',r.parties||'None'),'')}`+`${pRow('DESCRIPTION',r.fullDesc)}${r.notes?`<div style="margin-top:8px">`+pRow('NOTES',r.notes)+`</div>`:''}`;
  openModal('prevModal');
}

// ════════════════════════════════════════════
// INCIDENT REPORTS
// ════════════════════════════════════════════
function renderIR(data){
  var w=document.getElementById('irWrap');if(!w)return;
  if(!data||!data.length){w.innerHTML=`<div class="empty"><div class="empty-ico">🚨</div><div class="empty-t">No Incident Reports</div><div class="empty-s">Filed reports appear here.</div><button class="empty-btn" onclick="showPage('incident-form')">+ New Incident</button></div>`;return;}
  var stC={'Open — Under Review':'orange','Resolved':'green','Escalated':'red'};
  var rows='';
  for(var i=0;i<data.length;i++){
    var r=data[i];var ri=incidentReports.indexOf(r);
    rows+='<tr style="animation:rowIn .3s ease '+(i*.05)+'s both;cursor:pointer" onclick="viewIR('+ri+')" title="Click to view">'
      +'<td><span class="mono" style="display:block;color:var(--text)">'+r.date+'</span><span class="mono" style="font-size:10px;color:var(--text-3)">'+r.time+'</span></td>'
      +'<td><span class="mono" style="color:var(--amber)">'+r.badge+'</span></td>'
      +'<td><div class="dn">'+r.name+'</div></td>'
      +'<td><span class="tag red" style="font-size:10px">'+r.type+'</span></td>'
      +'<td><span style="font-size:11px;font-weight:700;color:'+(sevCol[r.severity]||'var(--text-2)')+'">'+r.severity+'</span></td>'
      +'<td style="font-size:12px;color:var(--text-2)">'+r.location+'</td>'
      +'<td><span class="tag '+(stC[r.status]||'orange')+'" style="font-size:10px">'+r.status+'</span></td>'
      +'<td><button class="btn-sm" onclick="event.stopPropagation();viewIR('+ri+')">View</button></td>'
      +'</tr>';
  }
  w.innerHTML='<table><thead><tr><th>Time</th><th>Badge</th><th>Reporter</th><th>Type</th><th>Severity</th><th>Location</th><th>Status</th><th></th></tr></thead><tbody>'+rows+'</tbody></table>';
}

function updateIRStats(){
  document.getElementById('irST').textContent=incidentReports.length;
  document.getElementById('irSO').textContent=incidentReports.filter(r=>r.status==='Open — Under Review').length;
  document.getElementById('irSR').textContent=incidentReports.filter(r=>r.status==='Resolved').length;
  document.getElementById('irSP').textContent=incidentReports.filter(r=>r.police&&r.police!=='No'&&r.police!=='').length;
}
function submitIR(){
  if(currentUser&&(V('ir-name').trim().toLowerCase()!==currentUser.name.trim().toLowerCase()||V('ir-badge').trim()!==currentUser.badge.trim())){toast('🚫','You can only submit on behalf of yourself.','var(--red)');return;}
  if(!V('ir-badge')||!V('ir-name')||!V('ir-rank')||!V('ir-type')||!V('ir-severity')||!V('ir-location')||!V('ir-vehicle')||!V('ir-desc')){toast('⚠️','Fill in all required fields.','var(--orange)');return;}
  incidentReports.unshift({date:nowDate(),time:nowTime(),badge:V('ir-badge'),name:V('ir-name'),rank:V('ir-rank'),type:V('ir-type'),severity:V('ir-severity'),location:V('ir-location'),vehicle:V('ir-vehicle'),police:V('ir-police'),parties:V('ir-parties'),damage:V('ir-damage'),status:V('ir-status')||'Open — Under Review',fullDesc:V('ir-desc'),notes:V('ir-notes')});
  persist('incidentReports');
  ['ir-location','ir-vehicle','ir-parties','ir-desc','ir-notes'].forEach(id=>document.getElementById(id).value='');
  ['ir-type','ir-severity','ir-police','ir-damage','ir-status'].forEach(id=>document.getElementById(id).selectedIndex=0);
  updateIRStats();renderIR(incidentReports);toast('🚨','Incident report filed!','var(--red)');showPage('incident-reports');
}
document.getElementById('irSrch').addEventListener('input',e=>{const q=e.target.value.toLowerCase();renderIR(incidentReports.filter(r=>r.name.toLowerCase().includes(q)||r.type.toLowerCase().includes(q)||r.location.toLowerCase().includes(q)));});
function viewIR(idx){
  const r=incidentReports[idx];if(!r)return;
  document.getElementById('prevTitle').textContent='Incident Report';
  document.getElementById('prevBody').innerHTML=`<div style="padding-bottom:12px;margin-bottom:14px;border-bottom:1px solid var(--border);display:flex;align-items:flex-start;justify-content:space-between"><div><div style="font-family:Space Grotesk,sans-serif;font-size:16px;font-weight:600;margin-bottom:3px">${r.name}</div><div class="mono" style="font-size:11px;color:var(--text-3)">Badge #${r.badge} · ${r.rank} · ${r.date} at ${r.time}</div></div><span style="font-size:11px;font-weight:700;color:${sevCol[r.severity]};border:1px solid currentColor;border-radius:5px;padding:2px 8px;white-space:nowrap">${r.severity}</span></div>${pGrid(pRow('TYPE',r.type),pRow('LOCATION',r.location),pRow('VEHICLE',r.vehicle),pRow('EMERGENCY SVC',r.police||'None'),pRow('OTHER PARTIES',r.parties||'None'),pRow('DAMAGE',r.damage||'N/A'))}${pRow('DESCRIPTION',r.fullDesc)}${r.notes?`<div style="margin-top:8px">`+pRow('NOTES',r.notes)+`</div>`:''}`;
  openModal('prevModal');
}

// ════════════════════════════════════════════
// SHIFT
// ════════════════════════════════════════════
setInterval(()=>{
  const now=new Date();
  const ce=document.getElementById('shClock');
  if(ce)ce.textContent=`${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;
  if(activeShift&&!activeShift.onBreak){const de=document.getElementById('shDur');if(de)de.textContent=fmtDur(Date.now()-activeShift.startMs-totalBreakMs);}
},1000);
function populateShiftVehicle(){
  const sel=document.getElementById('sf-vehicle');if(!sel)return;
  sel.innerHTML='<option value="">None assigned</option>';
  fleet.forEach(f=>sel.innerHTML+=`<option value="${f.plate}">${f.plate} — ${f.type}</option>`);
}
function checkAssignedShift(){
  if(!currentUser)return;
  const s=assignedShifts.find(a=>a.employeeName===currentUser.name&&(a.status==='assigned'||a.status==='accepted'));
  const banner=document.getElementById('assignedBanner');
  if(s&&banner){
    banner.style.display='block';
    document.getElementById('assignedInfo').textContent=`${s.date} · ${s.startTime} — ${s.endTime}${s.vehicle?' · 🚛 '+s.vehicle:''}`;
    document.getElementById('assignedTask').textContent=s.orderTitle?`Task: ${s.orderTitle}`:(s.notes||'No specific task');
  } else if(banner)banner.style.display='none';
}
function showStartForm(){
  document.getElementById('shStartForm').style.display='block';
  if(currentUser){
    const sf=document.getElementById('sf-name');if(sf&&!sf.value)sf.value=currentUser.name;
    const sb=document.getElementById('sf-badge');if(sb&&!sb.value)sb.value=currentUser.badge;
    const sr=document.getElementById('sf-role');if(sr)sr.value=currentUser.role;
    const s=assignedShifts.find(a=>a.employeeName===currentUser.name&&a.status==='assigned');
    if(s&&s.vehicle){const sv=document.getElementById('sf-vehicle');if(sv)sv.value=s.vehicle;}
  }
}
function confirmShiftStart(){
  if(!V('sf-name')||!V('sf-badge')||!V('sf-role')){toast('⚠️','Fill in name, badge and role.','var(--orange)');return;}
  if(currentUser&&(V('sf-name').trim().toLowerCase()!==currentUser.name.trim().toLowerCase()||V('sf-badge').trim()!==currentUser.badge.trim())){
    toast('🚫','You can only start a shift under your own name and badge number.','var(--red)');return;
  }
  const assigned=assignedShifts.find(s=>s.employeeName===V('sf-name')&&(s.status==='assigned'||s.status==='accepted'));
  activeShift={name:V('sf-name'),badge:V('sf-badge'),role:V('sf-role'),vehicle:V('sf-vehicle'),startMs:Date.now(),deliveries:0,fieldReports:0,onBreak:false,assignedShift:assigned||null};
  totalBreakMs=0;if(assigned)assigned.status='in-progress';
  document.getElementById('shStartForm').style.display='none';
  document.getElementById('shInactive').style.display='none';
  document.getElementById('shActive').style.display='block';
  document.getElementById('shActName').textContent=activeShift.name+' ('+activeShift.role+')';
  document.getElementById('shActBadge').textContent=activeShift.badge;
  document.getElementById('shActStart').textContent=nowTime();
  document.getElementById('shDelC').textContent='0';
  document.getElementById('shFRC').textContent='0';
  document.getElementById('shBrkT').textContent='0m';
  document.getElementById('shTotC').textContent=shiftHistory.length;
  if(assigned&&assigned.orderTitle){document.getElementById('shTaskMeta').style.display='block';document.getElementById('shTaskLbl').textContent=assigned.orderTitle;}
  toast('▶','Shift started!','var(--green)');
}
function toggleBreak(){
  if(!activeShift)return;
  if(!activeShift.onBreak){
    activeShift.onBreak=true;breakStart=Date.now();
    document.getElementById('shBrkBtn').textContent='▶ Resume';
    document.getElementById('shStatusTag').className='tag orange';document.getElementById('shStatusTag').textContent='On Break';
    document.getElementById('shDur').style.color='var(--orange)';toast('⏸','Break started.','var(--orange)');
  } else {
    const bms=Date.now()-breakStart;totalBreakMs+=bms;activeShift.onBreak=false;activeShift.breakMs=(activeShift.breakMs||0)+bms;
    document.getElementById('shBrkBtn').textContent='⏸ Break';
    document.getElementById('shStatusTag').className='tag green';document.getElementById('shStatusTag').textContent='On Duty';
    document.getElementById('shDur').style.color='var(--amber)';
    document.getElementById('shBrkT').textContent=fmtShort(totalBreakMs);toast('▶','Break ended.','var(--green)');
  }
}
function endShift(){
  if(!activeShift)return;
  if(activeShift.onBreak)toggleBreak();
  const dur=Date.now()-activeShift.startMs-totalBreakMs;
  const entry={name:activeShift.name,badge:activeShift.badge,role:activeShift.role,vehicle:activeShift.vehicle||'—',date:nowDate(),startTime:document.getElementById('shActStart').textContent,endTime:nowTime(),durationMs:dur,duration:fmtDur(dur),durationShort:fmtShort(dur),deliveries:activeShift.deliveries,fieldReports:activeShift.fieldReports,breakMs:totalBreakMs,breakShort:fmtShort(totalBreakMs),status:'Completed'};
  shiftHistory.unshift(entry);
  if(activeShift.assignedShift)activeShift.assignedShift.status='completed';
  persist('shiftHistory');persist('assignedShifts');
  activeShift=null;totalBreakMs=0;
  document.getElementById('shActive').style.display='none';
  document.getElementById('shInactive').style.display='block';
  document.getElementById('shTaskMeta').style.display='none';
  document.getElementById('shDur').textContent='00:00:00';
  document.getElementById('shDur').style.color='var(--amber)';
  document.getElementById('shTotC').textContent=shiftHistory.length;
  renderShiftHistory(shiftHistory);renderAssignedShifts();renderMyShifts();
  toast('⏹',`Shift ended — ${entry.durationShort}`,'var(--amber)');
}
function renderShiftHistory(data){
  var w=document.getElementById('shHistWrap');if(!w)return;
  if(!data||!data.length){w.innerHTML='<div class="empty" style="padding:28px"><div class="empty-ico" style="font-size:30px">📂</div><div class="empty-t" style="font-size:13px">No Shifts Yet</div></div>';return;}
  var rows='';
  for(var i=0;i<data.length;i++){
    var s=data[i];var si=shiftHistory.indexOf(s);
    var vehCell=s.vehicle!=='—'?'<span class="veh">🚛 '+s.vehicle+'</span>':'<span style="color:var(--text-3);font-size:11px">—</span>';
    rows+='<tr style="animation:rowIn .3s ease '+(i*.04)+'s both;cursor:pointer" onclick="viewShift('+si+')" title="Click to view">'
      +'<td class="mono" style="font-size:12px">'+s.date+'</td>'
      +'<td><div class="dn">'+s.name+'</div><div class="dc">'+s.role+'</div></td>'
      +'<td><span class="mono" style="color:var(--amber)">'+s.badge+'</span></td>'
      +'<td>'+vehCell+'</td>'
      +'<td class="mono" style="font-size:11px;color:var(--text-2)">'+s.startTime+'</td>'
      +'<td class="mono" style="font-size:11px;color:var(--text-2)">'+s.endTime+'</td>'
      +'<td><span class="mono" style="color:var(--amber);font-weight:600">'+s.duration+'</span></td>'
      +'<td class="mono" style="font-size:11px;color:var(--orange)">'+s.breakShort+'</td>'
      +'<td style="font-size:13px;font-weight:600;color:var(--amber)">'+s.deliveries+'</td>'
      +'<td style="font-size:13px;font-weight:600;color:var(--blue)">'+(s.fieldReports||0)+'</td>'
      +'</tr>';
  }
  w.innerHTML='<table><thead><tr><th>Date</th><th>Name</th><th>Badge</th><th>Vehicle</th><th>Start</th><th>End</th><th>Duration</th><th>Break</th><th>Deliveries</th><th>Reports</th></tr></thead><tbody>'+rows+'</tbody></table>';
}

function viewShift(i){
  const s=shiftHistory[i];if(!s)return;
  document.getElementById('prevTitle').textContent='Shift — '+s.name;
  document.getElementById('prevBody').innerHTML=`<div style="padding-bottom:12px;margin-bottom:14px;border-bottom:1px solid var(--border)"><div style="font-family:Space Grotesk,sans-serif;font-size:16px;font-weight:600;margin-bottom:3px">${s.name}</div><div class="mono" style="font-size:11px;color:var(--text-3)">Badge #${s.badge} · ${s.role}</div></div>${pGrid(pRow('DATE',s.date),pRow('VEHICLE',s.vehicle!=='—'?'🚛 '+s.vehicle:'—'),pRow('START TIME',s.startTime),pRow('END TIME',s.endTime),pRow('DURATION',s.duration),pRow('BREAK TIME',s.breakShort),pRow('DELIVERIES',String(s.deliveries)),pRow('FIELD REPORTS',String(s.fieldReports||0)))}`;
  openModal('prevModal');
}

// ════════════════════════════════════════════
// MY SHIFTS
// ════════════════════════════════════════════
function acceptShift(i){
  const s=assignedShifts[i];if(!s)return;
  s.status='accepted';persist('assignedShifts');updateChips();renderMyShifts();
  toast('✅','Shift accepted! You will be reminded when it is time.','var(--green)');
}
function declineShift(i){
  const s=assignedShifts[i];if(!s)return;
  s.status='declined';persist('assignedShifts');updateChips();renderMyShifts();
  toast('✕','Shift declined.','var(--red)');
}
function renderMyShifts(){
  if(!currentUser)return;
  const aw=document.getElementById('myAssignedWrap');
  const myA=assignedShifts.filter(s=>s.employeeName===currentUser.name);
  if(!myA.length){
    aw.innerHTML='<div class="empty" style="padding:24px"><div class="empty-ico" style="font-size:28px">📅</div><div class="empty-t" style="font-size:13px">No Assigned Shifts</div><div class="empty-s">Your supervisor will assign shifts here.</div></div>';
  } else {
    let rows='';
    myA.forEach(function(s){
      const idx=assignedShifts.indexOf(s);
      let statusTag='';
      if(s.status==='completed')statusTag='<span class="tag green">Completed</span>';
      else if(s.status==='in-progress')statusTag='<span class="tag amber">Active</span>';
      else if(s.status==='declined')statusTag='<span class="tag red">Declined</span>';
      else if(s.status==='accepted')statusTag='<span class="tag green">Accepted</span>';
      else statusTag='<span class="tag blue">Pending Response</span>';
      let actions='—';
      if(s.status==='assigned'){
        actions='<div style="display:flex;gap:6px"><button class="btn-sm ok" onclick="acceptShift('+idx+')">✓ Accept</button><button class="btn-sm danger" onclick="declineShift('+idx+')">✕ Decline</button></div>';
      } else if(s.status==='accepted'){
        actions='<span style="font-size:11px;color:var(--text-3)">Awaiting shift time</span>';
      }
      const veh=s.vehicle?'<span class="veh">🚛 '+s.vehicle+'</span>':'<span style="color:var(--text-3);font-size:11px">—</span>';
      rows+='<tr><td class="mono" style="font-size:12px">'+s.date+'</td><td class="mono" style="font-size:11px;color:var(--amber)">'+s.startTime+'</td><td class="mono" style="font-size:11px;color:var(--text-2)">'+s.endTime+'</td><td>'+veh+'</td><td style="font-size:12px;max-width:120px;overflow:hidden;text-overflow:ellipsis">'+(s.orderTitle||'—')+'</td><td style="font-size:11px;color:var(--text-2);max-width:160px;overflow:hidden;text-overflow:ellipsis">'+(s.notes||'—')+'</td><td>'+statusTag+'</td><td>'+actions+'</td></tr>';
    });
    aw.innerHTML='<table><thead><tr><th>Date</th><th>Start</th><th>End</th><th>Vehicle</th><th>Task</th><th>Instructions</th><th>Status</th><th>Actions</th></tr></thead><tbody>'+rows+'</tbody></table>';
  }
  const hw=document.getElementById('myHistWrap');
  const myH=shiftHistory.filter(s=>s.badge===currentUser.badge||s.name===currentUser.name);
  if(!myH.length){
    hw.innerHTML='<div class="empty" style="padding:24px"><div class="empty-ico" style="font-size:28px">📂</div><div class="empty-t" style="font-size:13px">No Past Shifts</div><div class="empty-s">Your completed shifts appear here.</div></div>';
  } else {
    let hrows='';
    myH.forEach(function(s){
      const veh=s.vehicle!=='—'?'<span class="veh">🚛 '+s.vehicle+'</span>':'<span style="color:var(--text-3);font-size:11px">—</span>';
      hrows+='<tr><td class="mono" style="font-size:12px">'+s.date+'</td><td>'+veh+'</td><td class="mono" style="font-size:11px;color:var(--text-2)">'+s.startTime+'</td><td class="mono" style="font-size:11px;color:var(--text-2)">'+s.endTime+'</td><td><span class="mono" style="color:var(--amber);font-weight:600">'+s.duration+'</span></td><td class="mono" style="font-size:11px;color:var(--orange)">'+s.breakShort+'</td><td style="font-size:13px;font-weight:600;color:var(--amber)">'+s.deliveries+'</td><td style="font-size:13px;font-weight:600;color:var(--blue)">'+(s.fieldReports||0)+'</td></tr>';
    });
    hw.innerHTML='<table><thead><tr><th>Date</th><th>Vehicle</th><th>Start</th><th>End</th><th>Duration</th><th>Break</th><th>Deliveries</th><th>Reports</th></tr></thead><tbody>'+hrows+'</tbody></table>';
  }
}

// ════════════════════════════════════════════
// MY STATS
// ════════════════════════════════════════════
function renderMyStats(){
  if(!currentUser)return;
  document.getElementById('msAv').textContent=currentUser.initials;
  document.getElementById('msName').textContent=currentUser.name;
  document.getElementById('msRole').textContent=currentUser.role;
  document.getElementById('msBadge').textContent='Badge #'+currentUser.badge;
  var accRec=accounts.find(function(a){return a.username===currentUser.username;})||currentUser;
  var appRec=applications.find(function(a){return a.name===currentUser.name;});
  var empPhone=accRec.phone||(appRec&&appRec.phone)||'—';
  var empRouting=accRec.routing||(appRec&&appRec.routing)||'—';
  document.getElementById('msEmpName').textContent=currentUser.name||'—';
  document.getElementById('msEmpPhone').textContent=empPhone;
  document.getElementById('msEmpRouting').textContent=empRouting;
  const myDL=deliveryLogs.filter(r=>r.badge===currentUser.badge||r.name===currentUser.name);
  const myFR=fieldReports.filter(r=>r.badge===currentUser.badge||r.name===currentUser.name);
  const myIR=incidentReports.filter(r=>r.badge===currentUser.badge||r.name===currentUser.name);
  const myS=shiftHistory.filter(s=>s.badge===currentUser.badge||s.name===currentUser.name);
  const myMaint=maintenanceServiceLogs.filter(s=>
    s.techUser===currentUser.name ||
    s.tech===currentUser.name ||
    s.tech===currentUser.badge
  );
  const totalMs=myS.reduce((a,s)=>a+s.durationMs,0);
  document.getElementById('msD').textContent=myDL.length;
  document.getElementById('msS').textContent=myS.length;
  document.getElementById('msH').textContent=fmtShort(totalMs)||'0m';
  document.getElementById('msR').textContent=myFR.length+myIR.length;
  document.getElementById('msMaint').textContent=myMaint.length;
  const recent=[
    ...myDL.map(r=>({ts:r.date+' '+r.time,type:'📦 Delivery Log',detail:`Vehicle: ${r.vehicle} · ${repL[r.rep]}`})),
    ...myFR.map(r=>({ts:r.date+' '+r.time,type:'🛑 Field Report',detail:`${r.type} · ${r.location}`})),
    ...myIR.map(r=>({ts:r.date+' '+r.time,type:'🚨 Incident',detail:`${r.type} · ${r.severity}`})),
    ...myS.map(s=>({ts:s.date+' '+s.startTime,type:'⏱️ Shift',detail:`${s.durationShort} · ${s.deliveries} deliveries`})),
    ...myMaint.map(s=>({ts:s.date+' '+s.time,type:'🔧 Maintenance',detail:`${s.type} · ${s.plate} · ${s.statusAfter}`}))
  ].sort((a,b)=>b.ts.localeCompare(a.ts)).slice(0,10);
  const aw=document.getElementById('msActivity');
  if(!recent.length){aw.innerHTML=`<div style="font-size:12px;color:var(--text-3);text-align:center;padding:20px">No activity yet. Start a shift and submit logs.</div>`;return;}
  var awH='<div style="display:flex;flex-direction:column;gap:8px">';
  recent.forEach(function(a){
    var ico=a.type.split(' ')[0];
    awH+='<div style="display:flex;align-items:center;gap:12px;background:var(--surface2);border:1px solid var(--border);border-radius:var(--r);padding:9px 12px"><span style="font-size:14px">'+ico+'</span><div><div style="font-family:&quot;Space Grotesk&quot;,sans-serif;font-size:12px;font-weight:500">'+a.type+'</div><div style="font-size:11px;color:var(--text-3);font-family:&quot;JetBrains Mono&quot;,monospace">'+a.detail+'</div><div style="font-size:10px;color:var(--text-3);margin-top:1px">'+a.ts+'</div></div></div>';
  });
  awH+='</div>';
  aw.innerHTML=awH;
  document.getElementById('ovFR').textContent=fieldReports.length;
  document.getElementById('ovIR').textContent=incidentReports.length;
  document.getElementById('ovSH').textContent=shiftHistory.length;
  var verified=accounts.filter(function(a){return a.status==='verified';});
  var ee=document.getElementById('ovEmp');
  if(ee){
    if(!verified.length){ee.innerHTML='<div style="padding:14px;text-align:center;font-size:12px;color:var(--text-3)">No verified accounts</div>';}
    else{
      var empH='';
      verified.forEach(function(a){
        var ini=(a.initials||a.name.charAt(0)).toUpperCase();
        empH+='<div class="lb-row"><div style="width:28px;height:28px;background:linear-gradient(135deg,var(--amber),var(--amber-dim));border-radius:5px;display:flex;align-items:center;justify-content:center;font-family:Space Grotesk,sans-serif;font-size:10px;font-weight:700;color:#000;flex-shrink:0">'+ini+'</div><div style="flex:1;margin-left:9px"><div style="font-size:12px;font-weight:500">'+a.name+'</div><div style="font-size:10px;color:var(--text-3)">'+a.role+'</div></div></div>';
      });
      ee.innerHTML=empH;
    }
  }
  var fe=document.getElementById('ovFleet');
  if(fe){
    if(!fleet.length){fe.innerHTML='<div style="padding:14px;text-align:center;font-size:12px;color:var(--text-3)">No vehicles registered</div>';}
    else{
      var flH='';
      fleet.slice(0,5).forEach(function(f){
        var stCol=f.status==='Operational'?'green':f.status==='Maintenance'?'orange':'dim';
        flH+='<div class="lb-row"><span class="veh" style="font-size:10px">🚛 '+f.plate+'</span><span style="font-size:11px;color:var(--text-2);flex:1;margin-left:8px">'+f.type+'</span><span class="tag '+stCol+'" style="font-size:9px">'+f.status+'</span></div>';
      });
      fe.innerHTML=flH;
    }
  }
  var oe=document.getElementById('ovOrders');
  if(oe){
    var ao=orders.filter(function(o){return o.status!=='Completed';});
    if(!ao.length){oe.innerHTML='<div style="padding:14px;text-align:center;font-size:12px;color:var(--text-3)">No active orders</div>';}
    else{
      var orH='';
      ao.slice(0,5).forEach(function(o){
        var stCol=o.status==='In Transit'?'var(--blue)':'var(--orange)';
        var divBadge=o.division==='Logistics Orders'?'<span class="tag blue" style="font-size:8px;margin-left:4px">LOG</span>':o.division==='Field Operations Orders'?'<span class="tag purple" style="font-size:8px;margin-left:4px">FOP</span>':'';
        orH+='<div class="lb-row"><div style="flex:1"><div style="font-size:12px;font-weight:500;max-width:170px;overflow:hidden;text-overflow:ellipsis">'+o.title+divBadge+'</div><div style="font-size:10px;color:var(--text-3)">'+(o.number||'')+(o.client?' · '+o.client:'')+'</div></div><span style="font-size:11px;font-weight:600;color:'+stCol+'">'+o.status+'</span></div>';
      });
      oe.innerHTML=orH;
    }
  }
  var wa=new Date(Date.now()-7*24*60*60*1000);
  var ws=shiftHistory.filter(function(s){return new Date(s.date)>=wa;});
  var we=document.getElementById('ovWeek');
  if(we){
    if(!ws.length){we.innerHTML='<div style="padding:14px;text-align:center;font-size:12px;color:var(--text-3)">No shifts this week</div>';}
    else{
      var wsH='';
      ws.slice(0,5).forEach(function(s){
        wsH+='<div class="lb-row"><div style="flex:1"><div style="font-size:12px;font-weight:500">'+s.name+'</div><div style="font-size:10px;color:var(--text-3)">'+s.date+'</div></div><span class="mono" style="font-size:11px;color:var(--amber)">'+s.durationShort+'</span></div>';
      });
      we.innerHTML=wsH;
    }
  }
}

function renderCompanyOverview(){
  document.getElementById('ovDL').textContent=deliveryLogs.length;
  document.getElementById('ovFR').textContent=fieldReports.length;
  document.getElementById('ovIR').textContent=incidentReports.length;
  document.getElementById('ovSH').textContent=shiftHistory.length;
  renderOnShiftWidget();
  var verified=accounts.filter(function(a){return a.status==='verified';});
  var ee=document.getElementById('ovEmp');
  if(ee){
    if(!verified.length){ee.innerHTML='<div style="padding:14px;text-align:center;font-size:12px;color:var(--text-3)">No verified accounts</div>';}
    else{
      var empH='';
      verified.forEach(function(a){
        var ini=(a.initials||a.name.charAt(0)).toUpperCase();
        empH+='<div class="lb-row"><div style="width:28px;height:28px;background:linear-gradient(135deg,var(--amber),var(--amber-dim));border-radius:5px;display:flex;align-items:center;justify-content:center;font-family:Space Grotesk,sans-serif;font-size:10px;font-weight:700;color:#000;flex-shrink:0">'+ini+'</div><div style="flex:1;margin-left:9px"><div style="font-size:12px;font-weight:500">'+a.name+'</div><div style="font-size:10px;color:var(--text-3)">'+a.role+'</div></div></div>';
      });
      ee.innerHTML=empH;
    }
  }
  var fe=document.getElementById('ovFleet');
  if(fe){
    if(!fleet.length){fe.innerHTML='<div style="padding:14px;text-align:center;font-size:12px;color:var(--text-3)">No vehicles registered</div>';}
    else{
      var flH='';
      fleet.slice(0,5).forEach(function(f){
        var stCol=f.status==='Operational'?'green':f.status==='Maintenance'?'orange':'dim';
        flH+='<div class="lb-row"><span class="veh" style="font-size:10px">🚛 '+f.plate+'</span><span style="font-size:11px;color:var(--text-2);flex:1;margin-left:8px">'+f.type+'</span><span class="tag '+stCol+'" style="font-size:9px">'+f.status+'</span></div>';
      });
      fe.innerHTML=flH;
    }
  }
  var oe=document.getElementById('ovOrders');
  if(oe){
    var ao=orders.filter(function(o){return o.status!=='Completed';});
    if(!ao.length){oe.innerHTML='<div style="padding:14px;text-align:center;font-size:12px;color:var(--text-3)">No active orders</div>';}
    else{
      var orH='';
      ao.slice(0,5).forEach(function(o){
        var stCol=o.status==='In Transit'?'var(--blue)':'var(--orange)';
        var divBadge=o.division==='Logistics Orders'?'<span class="tag blue" style="font-size:8px;margin-left:4px">LOG</span>':o.division==='Field Operations Orders'?'<span class="tag purple" style="font-size:8px;margin-left:4px">FOP</span>':'';
        orH+='<div class="lb-row"><div style="flex:1"><div style="font-size:12px;font-weight:500;max-width:170px;overflow:hidden;text-overflow:ellipsis">'+o.title+divBadge+'</div><div style="font-size:10px;color:var(--text-3)">'+(o.number||'')+(o.client?' · '+o.client:'')+'</div></div><span style="font-size:11px;font-weight:600;color:'+stCol+'">'+o.status+'</span></div>';
      });
      oe.innerHTML=orH;
    }
  }
  var wa=new Date(Date.now()-7*24*60*60*1000);
  var ws=shiftHistory.filter(function(s){return new Date(s.date)>=wa;});
  var we=document.getElementById('ovWeek');
  if(we){
    if(!ws.length){we.innerHTML='<div style="padding:14px;text-align:center;font-size:12px;color:var(--text-3)">No shifts this week</div>';}
    else{
      var wsH='';
      ws.slice(0,5).forEach(function(s){
        wsH+='<div class="lb-row"><div style="flex:1"><div style="font-size:12px;font-weight:500">'+s.name+'</div><div style="font-size:10px;color:var(--text-3)">'+s.date+'</div></div><span class="mono" style="font-size:11px;color:var(--amber)">'+s.durationShort+'</span></div>';
      });
      we.innerHTML=wsH;
    }
  }
}
function renderLeaderboard(){
  var dlM={},hrM={},rpM={},shM={};
  deliveryLogs.forEach(function(r){dlM[r.name]=(dlM[r.name]||0)+1;});
  fieldReports.forEach(function(r){rpM[r.name]=(rpM[r.name]||0)+1;});
  incidentReports.forEach(function(r){rpM[r.name]=(rpM[r.name]||0)+1;});
  shiftHistory.forEach(function(s){shM[s.name]=(shM[s.name]||0)+1;hrM[s.name]=(hrM[s.name]||0)+s.durationMs;});
  function buildLB(map,unit,id){
    var sorted=Object.entries(map).sort(function(a,b){return b[1]-a[1];}).slice(0,5);
    var max=sorted[0]?sorted[0][1]:1;
    var rc=['g','s','b','',''];
    var el=document.getElementById(id);if(!el)return;
    if(!sorted.length){el.innerHTML='<div style="padding:14px;text-align:center;font-size:12px;color:var(--text-3)">No data yet</div>';return;}
    var h='';
    sorted.forEach(function(entry,i){
      var n=entry[0],v=entry[1];
      var pct=Math.round((v/max)*100);
      var val=unit==='time'?fmtShort(v):v;
      h+='<div class="lb-row"><span class="lb-rank '+(rc[i]||'')+'">'+( i+1)+'</span><span class="lb-name">'+n+'</span><div class="lb-bg"><div class="lb-fill" style="width:'+pct+'%"></div></div><span class="lb-val">'+val+'</span></div>';
    });
    el.innerHTML=h;
  }
  buildLB(dlM,'','lbDel');buildLB(hrM,'time','lbHrs');buildLB(rpM,'','lbRep');buildLB(shM,'','lbSh');
}

// ════════════════════════════════════════════
// ADMIN: ACCOUNTS
// ════════════════════════════════════════════
function renderAccounts(){
  var w=document.getElementById('accWrap');if(!w)return;
  document.getElementById('acST').textContent=accounts.length;
  document.getElementById('acSV').textContent=accounts.filter(function(a){return a.status==='verified';}).length;
  document.getElementById('acSP').textContent=accounts.filter(function(a){return a.status==='pending';}).length;
  var resets=pendingResets.filter(function(r){return accounts.find(function(a){return a.username===r.username;});});
  var resetsHtml='';
  if(resets.length){
    var resetItems='';
    resets.forEach(function(r){resetItems+='<span style="font-family:JetBrains Mono,monospace">'+r.name+' (#'+r.badge+')</span> — ';});
    resetsHtml='<div style="background:rgba(249,115,22,.07);border:1px solid rgba(249,115,22,.25);border-radius:var(--r);padding:10px 14px;margin:12px;font-size:12px;color:var(--orange)"><strong style="font-family:JetBrains Mono,monospace;font-size:10px;letter-spacing:1px">⚠ PASSWORD RESET REQUESTS</strong><div style="margin-top:4px">'+resetItems+'— Reset via the password column below.</div></div>';
  }
  var rows='';
  accounts.forEach(function(a,i){
    var isAdmin2=['Manager','Supervisor'].includes(a.role);
    var stTag='<span class="tag '+(a.status==='verified'?'green':a.status==='pending'?'orange':'red')+'">'+a.status.charAt(0).toUpperCase()+a.status.slice(1)+'</span>';
    var acts='';
    if(a.status==='pending') acts+='<button class="btn-sm ok" onclick="event.stopPropagation();verifyAcc('+i+')">✓ Verify</button><button class="btn-sm danger" onclick="event.stopPropagation();rejectAcc('+i+')">✕ Reject</button>';
    if(a.status==='verified'&&a.username!=='justin') acts+='<button class="btn-sm danger" onclick="event.stopPropagation();removeAcc('+i+')">Remove</button>';
    if(a.status==='verified') acts+='<button class="btn-sm" onclick="event.stopPropagation();openResetPw('+i+')">🔑 Reset PW</button>';
    if(a.status==='verified') acts+='<button class="btn-sm" onclick="event.stopPropagation();openChangeRole('+i+')" style="border-color:rgba(168,85,247,.3);color:var(--purple)">🎖️ Role</button>';
    acts+='<button class="btn-sm" onclick="event.stopPropagation();openChangeBadge('+i+')" style="border-color:rgba(232,160,32,.3);color:var(--amber)">🔢 Badge</button>';
    acts+='<button class="btn-sm" onclick="event.stopPropagation();openChangeName('+i+')" style="border-color:rgba(59,130,246,.3);color:var(--blue)">✏️ Name</button>';
    rows+='<tr style="animation:rowIn .3s ease '+(i*.04)+'s both;cursor:pointer" onclick="viewAccount('+i+')" title="Click to view">'
      +'<td><div class="dn">'+a.name+'</div></td>'
      +'<td><span class="mono" style="color:var(--text-2)">'+a.username+'</span></td>'
      +'<td><span class="mono" style="color:var(--amber)">'+a.badge+'</span></td>'
      +'<td><span class="tag '+(isAdmin2?'amber':'blue')+'">'+a.role+'</span></td>'
      +'<td>'+stTag+'</td>'
      +'<td><div style="display:flex;gap:6px;flex-wrap:wrap">'+acts+'</div></td>'
      +'</tr>';
  });
  w.innerHTML=resetsHtml+'<table><thead><tr><th>Name</th><th>Username</th><th>Badge</th><th>Role</th><th>Status</th><th>Actions</th></tr></thead><tbody>'+rows+'</tbody></table>';
  updateChips();
}

function verifyAcc(i){accounts[i].status='verified';persist('accounts');logRoleEvent('Account Verified',accounts[i].name,'—','Verified',currentUser?.name||'System');renderAccounts();toast('✅',accounts[i].name+' verified!');updateChips();}
function rejectAcc(i){accounts[i].status='rejected';persist('accounts');logRoleEvent('Account Rejected',accounts[i].name,'—','Rejected',currentUser?.name||'System');renderAccounts();toast('✕','Account rejected.','var(--red)');updateChips();}
function removeAcc(i){const n=accounts[i].name;logRoleEvent('Account Removed',n,accounts[i].role,'—',currentUser?.name||'System');accounts.splice(i,1);persist('accounts');renderAccounts();toast('🗑','Account removed.','var(--text-3)');}
function openChangeBadge(i){
  const a=accounts[i];
  document.getElementById('cbIdx').value=i;
  document.getElementById('cbName').textContent=a.name;
  document.getElementById('cbCurrent').textContent=a.badge;
  document.getElementById('cbNew').value='';
  openModal('changeBadgeModal');
}
function confirmChangeBadge(){
  const i=parseInt(document.getElementById('cbIdx').value);
  const nb=document.getElementById('cbNew').value.trim();
  if(!nb){toast('⚠️','Enter a badge number.','var(--orange)');return;}
  const old=accounts[i].badge;
  accounts[i].badge=nb;
  persist('accounts');
  logRoleEvent('Badge Changed',accounts[i].name,old,nb,currentUser?.name||'System');
  closeModal('changeBadgeModal');
  renderAccounts();
  toast('🔢',`Badge updated to #${nb}`,'var(--amber)');
}
function openChangeName(i){
  const a=accounts[i];
  document.getElementById('cnIdx').value=i;
  document.getElementById('cnCurrent').textContent=a.name;
  document.getElementById('cnUsername').textContent=a.username;
  document.getElementById('cnNew').value='';
  openModal('changeNameModal');
}
function confirmChangeName(){
  const i=parseInt(document.getElementById('cnIdx').value);
  const nn=document.getElementById('cnNew').value.trim();
  if(!nn){toast('⚠️','Enter a new name.','var(--orange)');return;}
  const old=accounts[i].name;
  accounts[i].name=nn;
  accounts[i].initials=nn.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2);
  persist('accounts');
  logRoleEvent('Name Changed',nn,old,nn,currentUser?.name||'System');
  if(currentUser&&currentUser.username===accounts[i].username){
    currentUser.name=nn;currentUser.initials=accounts[i].initials;
    document.getElementById('sbName').textContent=nn;
  }
  closeModal('changeNameModal');
  renderAccounts();
  toast('✏️',`Name updated to ${nn}`,'var(--blue)');
}
function openChangeRole(i){
  const a=accounts[i];
  document.getElementById('crIdx').value=i;
  document.getElementById('crName').textContent=a.name;
  document.getElementById('crCurrent').textContent=a.role;
  document.getElementById('crReason').value='';
  const sel=document.getElementById('crRole');
  sel.innerHTML='<option value="">Select role...</option>';
  const mgmt=allRoles().filter(r=>r.name==='Manager'||r.name==='Supervisor');
  const corp=allRoles().filter(r=>r.code&&r.code.startsWith('AC'));
  const energy=allRoles().filter(r=>r.code&&r.code.startsWith('AE'));
  const custom=allRoles().filter(r=>!r.builtin);
  function addGroup(label,roles){
    if(!roles.length)return;
    const g=document.createElement('optgroup');g.label=label;
    roles.forEach(r=>{const o=document.createElement('option');o.value=r.name;o.textContent=r.code?`${r.name} (${r.code})`:r.name;sel.appendChild(g);g.appendChild(o);});
    sel.appendChild(g);
  }
  addGroup('Management',mgmt);
  addGroup('Aurum Corporation',corp);
  addGroup('Aurum Energy — Operations',energy);
  addGroup('Custom Roles',custom);
  openModal('changeRoleModal');
}
function confirmChangeRole(){
  const i=parseInt(document.getElementById('crIdx').value);
  const newRole=V('crRole');
  if(!newRole){toast('⚠️','Please select a role.','var(--orange)');return;}
  const a=accounts[i];
  const prev=a.role;
  a.role=newRole;
  const adminLevels=['Manager','Supervisor'];
  const wasAdmin=adminLevels.includes(prev);
  const isAdmin=adminLevels.includes(newRole);
  const action=isAdmin&&!wasAdmin?'Promoted':!isAdmin&&wasAdmin?'Demoted':'Role Changed';
  logRoleEvent(action,a.name,prev,newRole,currentUser?.name||'System');
  persist('accounts');
  closeModal('changeRoleModal');
  renderAccounts();
  populateRoleSelects();
  toast(isAdmin&&!wasAdmin?'⬆️':!isAdmin&&wasAdmin?'⬇️':'🎖️',`${a.name} → ${newRole}`,'var(--purple)');
}
function openResetPw(i){document.getElementById('rpIdx').value=i;openModal('resetPwModal');}
function viewAccount(i){
  const a=accounts[i];if(!a)return;
  document.getElementById('prevTitle').textContent='Account — '+a.name;
  document.getElementById('prevBody').innerHTML=`<div style="padding-bottom:12px;margin-bottom:14px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:12px"><div style="width:44px;height:44px;background:linear-gradient(135deg,var(--amber),var(--amber-dim));border-radius:var(--rl);display:flex;align-items:center;justify-content:center;font-family:Space Grotesk,sans-serif;font-size:16px;font-weight:700;color:#000">${a.initials||a.name.slice(0,2).toUpperCase()}</div><div><div style="font-family:Space Grotesk,sans-serif;font-size:16px;font-weight:600">${a.name}</div><div style="font-size:11px;color:var(--text-3);font-family:JetBrains Mono,monospace">@${a.username}</div></div></div>${pGrid(pRow('BADGE',a.badge),pRow('ROLE',a.role),pRow('STATUS',a.status.charAt(0).toUpperCase()+a.status.slice(1)),'')}`; 
  openModal('prevModal');
}
function doResetPw(){
  const i=parseInt(V('rpIdx'));const pw=V('rpNew');
  if(!pw){toast('⚠️','Enter a new password.','var(--orange)');return;}
  accounts[i].password=pw;
  persist('accounts');
  const user=accounts[i].username;
  const ri=pendingResets.findIndex(r=>r.username===user);if(ri>=0)pendingResets.splice(ri,1);
  persist('pendingResets');
  closeModal('resetPwModal');document.getElementById('rpNew').value='';
  renderAccounts();toast('🔑','Password reset successfully!','var(--green)');
}

// ════════════════════════════════════════════
// ADMIN: APPLICATIONS
// ════════════════════════════════════════════
function switchApplyDiv(div){
  const isOps=div==='ops';
  document.getElementById('apDivision').value=div;
  document.querySelectorAll('#apDivTabs .atab').forEach((t,i)=>t.classList.toggle('on',i===(isOps?0:1)));
  document.getElementById('apDivOpsInfo').style.display=isOps?'block':'none';
  document.getElementById('apDivCorpInfo').style.display=isOps?'none':'block';
  document.getElementById('apCorpFields').style.display=isOps?'none':'block';
  // Swap role options
  const sel=document.getElementById('apRole');
  sel.innerHTML='<option value="">Select position</option>';
  if(isOps){
    const ops=[
      {v:'Field Operator (AE-FO1)',l:'Field Operator — AE-FO1'},
      {v:'Trucker (AE-T1)',l:'Trucker — AE-T1'},
      {v:'Foreman (AE-FO2)',l:'Foreman — AE-FO2'},
      {v:'OFFSHORE — Entry Level Rig Worker (AEO-W1)',l:'OFFSHORE — Entry Level Rig Worker — AEO-W1'},
      {v:'OFFSHORE — Senior Rig Worker (AEO-W2)',l:'OFFSHORE — Senior Rig Worker — AEO-W2'},
      {v:'OFFSHORE — Supervisor (AEO-S1)',l:'OFFSHORE — Supervisor — AEO-S1'},
      {v:'Energy Intern (AE-I1)',l:'Energy Intern — AE-I1'},
    ];
    sel.innerHTML+='<optgroup label="— Aurum Energy Operations —">'+ops.map(r=>`<option value="${r.v}">${r.l}</option>`).join('')+'</optgroup>';
  } else {
    const corp=[
      {v:'Human Resources Representative (AC-HR1)',l:'Human Resources Representative — AC-HR1'},
      {v:'Marketing Specialist (AC-MA1)',l:'Marketing Specialist — AC-MA1'},
      {v:'Environmental Researcher (AC-ER1)',l:'Environmental Researcher — AC-ER1'},
      {v:'Scientist (AC-SC1)',l:'Scientist — AC-SC1'},
      {v:'Corporation Intern (AC-I1)',l:'Corporation Intern — AC-I1'},
    ];
    sel.innerHTML+='<optgroup label="— Aurum Corporation —">'+corp.map(r=>`<option value="${r.v}">${r.l}</option>`).join('')+'</optgroup>';
  }
}
function submitApplication(){
  const name=V('apName'),phone=V('apPhone'),age=V('apAge'),nat=V('apNat'),role=V('apRole'),exp=V('apExp'),why=V('apWhy'),notes=V('apNotes');
  const division=V('apDivision')||'ops';
  const err=document.getElementById('apErr');const ok=document.getElementById('apOk');
  if(!name||!phone||!role||!why){err.textContent='⚠ Please fill in all required fields.';err.style.display='block';ok.style.display='none';return;}
  if(division==='corp'){
    const bgCheck=V('apBgCheck');const nda=V('apNda');
    if(!bgCheck||!nda){err.textContent='⚠ Please complete the background check consent and NDA fields.';err.style.display='block';ok.style.display='none';return;}
    if(bgCheck==='no'||nda==='no'){err.textContent='⚠ Corporation applicants must consent to the background check and NDA to proceed.';err.style.display='block';ok.style.display='none';return;}
  }
  const bgCheck=division==='corp'?V('apBgCheck'):'n/a';
  const nda=division==='corp'?V('apNda'):'n/a';
  applications.push({name,phone,age,nationality:nat,role,division:division==='corp'?'Aurum Corporation':'Aurum Energy — Operations',experience:exp,reason:why,notes,bgCheck,nda,routing:V('apRouting'),submittedAt:nowDate(),status:'pending'});
  persist('applications');
  err.style.display='none';ok.style.display='block';
  ['apName','apPhone','apAge','apNat','apExp','apWhy','apNotes'].forEach(id=>document.getElementById(id).value='');
  document.getElementById('apRole').selectedIndex=0;
  if(document.getElementById('apBgCheck'))document.getElementById('apBgCheck').selectedIndex=0;
  if(document.getElementById('apNda'))document.getElementById('apNda').selectedIndex=0;
  updateChips();
}
function renderApplications(){
  var w=document.getElementById('applWrap');if(!w)return;
  document.getElementById('apST').textContent=applications.length;
  document.getElementById('apSP').textContent=applications.filter(function(a){return a.status==='pending';}).length;
  var apSOps=document.getElementById('apSOps');if(apSOps)apSOps.textContent=applications.filter(function(a){return !a.division||a.division.includes('Operations');}).length;
  var apSCorp=document.getElementById('apSCorp');if(apSCorp)apSCorp.textContent=applications.filter(function(a){return a.division&&a.division.includes('Corporation');}).length;
  var apSA=document.getElementById('apSA');if(apSA)apSA.textContent=applications.filter(function(a){return a.status==='accepted';}).length;
  if(!applications.length){w.innerHTML='<div class="empty"><div class="empty-ico">📝</div><div class="empty-t">No Applications</div><div class="empty-s">Applications from the login screen appear here.</div></div>';return;}
  var rows='';
  applications.forEach(function(a,i){
    var isCorpDiv=a.division&&a.division.includes('Corporation');
    var divTag='<span class="tag '+(isCorpDiv?'purple':'amber')+'" style="font-size:10px;white-space:nowrap">'+(isCorpDiv?'🏢 Corp':'⚡ Ops')+'</span>';
    var stTag='<span class="tag '+(a.status==='accepted'?'green':a.status==='rejected'?'red':a.status==='interview'?'blue':'orange')+'">'+a.status.charAt(0).toUpperCase()+a.status.slice(1)+'</span>';
    var acts='<button class="btn-sm" onclick="event.stopPropagation();viewApplication('+i+')">👁 View</button>';
    if(a.status==='pending') acts+='<button class="btn-sm" style="border-color:rgba(59,130,246,.4);color:var(--blue)" onclick="event.stopPropagation();moveToInterview('+i+')">📅 Interview</button><button class="btn-sm ok" onclick="event.stopPropagation();acceptApplication('+i+')">✓ Accept</button><button class="btn-sm danger" onclick="event.stopPropagation();rejectApplication('+i+')">✕ Reject</button>';
    if(a.status==='interview') acts+='<button class="btn-sm" style="border-color:rgba(59,130,246,.4);color:var(--blue)" onclick="event.stopPropagation();openHrMessages('+i+')">✉ Messages</button><button class="btn-sm ok" onclick="event.stopPropagation();acceptApplication('+i+')">✓ Accept</button><button class="btn-sm danger" onclick="event.stopPropagation();rejectApplication('+i+')">✕ Reject</button>';
    rows+='<tr style="animation:rowIn .3s ease '+(i*.04)+'s both;cursor:pointer" onclick="viewApplication('+i+')" title="Click to view">'
      +'<td><div class="dn">'+a.name+'</div></td>'
      +'<td class="mono" style="font-size:11px;color:var(--text-2)">'+a.phone+'</td>'
      +'<td>'+divTag+'</td>'
      +'<td><span class="tag blue" style="font-size:10px">'+a.role+'</span></td>'
      +'<td style="font-size:12px;color:var(--text-2)">'+(a.age||'—')+'</td>'
      +'<td class="mono" style="font-size:11px;color:var(--text-3)">'+a.submittedAt+'</td>'
      +'<td>'+stTag+'</td>'
      +'<td><div style="display:flex;gap:6px">'+acts+'</div></td>'
      +'</tr>';
  });
  w.innerHTML='<table><thead><tr><th>Name</th><th>Phone</th><th>Division</th><th>Position</th><th>Age</th><th>Submitted</th><th>Status</th><th>Actions</th></tr></thead><tbody>'+rows+'</tbody></table>';
}

function viewApplication(i){
  const a=applications[i];if(!a)return;
  const isCorp=a.division&&a.division.includes('Corporation');
  document.getElementById('applPrevBody').innerHTML=`
    <div style="padding-bottom:12px;margin-bottom:14px;border-bottom:1px solid var(--border);display:flex;align-items:flex-start;justify-content:space-between">
      <div>
        <div style="font-family:Space Grotesk,sans-serif;font-size:18px;font-weight:700">${a.name}</div>
        <div class="mono" style="font-size:11px;color:var(--text-3)">Applied: ${a.submittedAt}</div>
        <span class="tag ${isCorp?'purple':'amber'}" style="margin-top:6px;display:inline-flex">${a.division||'Aurum Energy — Operations'}</span>
      </div>
      <span class="tag ${a.status==='accepted'?'green':a.status==='rejected'?'red':a.status==='interview'?'blue':'orange'}">${a.status==='interview'?'📅 Interview':a.status.charAt(0).toUpperCase()+a.status.slice(1)}</span>
    </div>
    ${pGrid(pRow('POSITION APPLYING FOR',a.role),pRow('PHONE NUMBER',a.phone),pRow('AGE',a.age||'—'),pRow('NATIONALITY',a.nationality||'—'))}
    ${isCorp?pGrid(
      pRow('LSPD BACKGROUND CHECK',a.bgCheck==='yes'?'<span style="color:var(--green)">✓ Consented</span>':'<span style="color:var(--red)">✕ Declined</span>'),
      pRow('NDA AGREEMENT',a.nda==='yes'?'<span style="color:var(--green)">✓ Agreed</span>':'<span style="color:var(--red)">✕ Declined</span>')
    ):''}
    ${a.experience?`<div style="margin-bottom:8px">${pRow('PREVIOUS EXPERIENCE',a.experience)}</div>`:''}
    <div style="margin-top:8px">${pRow('WHY AURUM?',a.reason)}</div>
    ${a.notes?`<div style="margin-top:8px">${pRow('ADDITIONAL NOTES',a.notes)}</div>`:''}`;
  const foot=document.getElementById('applPrevFoot');
  if(a.status==='pending'){
    foot.innerHTML=`<button class="btn-can" onclick="closeModal('applPrevModal')">Close</button><button class="btn-save" style="background:var(--blue);color:#fff" onclick="moveToInterview(${i});closeModal('applPrevModal')">📅 Interview</button><button class="btn-save" style="background:var(--red);color:#fff" onclick="rejectApplication(${i});closeModal('applPrevModal')">✕ Reject</button><button class="btn-save" onclick="acceptApplication(${i});closeModal('applPrevModal')">✓ Accept</button>`;
  } else if(a.status==='interview'){
    foot.innerHTML=`<button class="btn-can" onclick="closeModal('applPrevModal')">Close</button><button class="btn-save" style="background:var(--blue);color:#fff" onclick="closeModal('applPrevModal');openHrMessages(${i})">✉ Messages</button><button class="btn-save" style="background:var(--red);color:#fff" onclick="rejectApplication(${i});closeModal('applPrevModal')">✕ Reject</button><button class="btn-save" onclick="acceptApplication(${i});closeModal('applPrevModal')">✓ Accept</button>`;
  } else {
    foot.innerHTML=`<button class="btn-save" onclick="closeModal('applPrevModal')">Close</button>`;
  }
  openModal('applPrevModal');
}
function acceptApplication(i){
  const a=applications[i];a.status='accepted';
  const uname=a.name.toLowerCase().replace(/\s+/g,'_').slice(0,12);
  const pw='aurum'+Math.floor(1000+Math.random()*9000);
  const initials=(a.name.split(' ').map(w=>w[0]).join('')).toUpperCase().slice(0,2);
  accounts.push({username:uname,password:pw,name:a.name,badge:'NEW',role:a.role,status:'pending',initials:(a.name.split(' ').map(w=>w[0]||'').join('')).toUpperCase().slice(0,2),phone:a.phone||'',routing:a.routing||''});
  persist('accounts');persist('applications');
  renderApplications();updateChips();
  // Show credentials modal
  document.getElementById('credName').textContent=a.name;
  document.getElementById('credUser').textContent=uname;
  document.getElementById('credPw').textContent=pw;
  document.getElementById('credRole').textContent=a.role;
  openModal('credentialsModal');
}
function rejectApplication(i){applications[i].status='rejected';persist('applications');renderApplications();updateChips();toast('✕','Application rejected.','var(--red)');}

// ════════════════════════════════════════════
// ADMIN: ASSIGN SHIFTS
// ════════════════════════════════════════════
function populateAssignForm(){
  const es=document.getElementById('as-emp');if(es){es.innerHTML='';accounts.filter(a=>a.status==='verified').forEach(a=>es.innerHTML+=`<option value="${a.name}">${a.name} (${a.role})</option>`);}
  const vs=document.getElementById('as-vehicle');if(vs){vs.innerHTML='<option value="">No vehicle</option>';fleet.forEach(f=>vs.innerHTML+=`<option value="${f.plate}">${f.plate} — ${f.type}</option>`);}
  const os=document.getElementById('as-order');if(os){os.innerHTML='<option value="">No specific task</option>';orders.filter(o=>o.status==='Pending').forEach(o=>os.innerHTML+=`<option value="${o.title}">${o.title}</option>`);}
}
function assignShift(){
  if(!isAdmin()){toast('🚫','Supervisors and Managers only.','var(--red)');return;}
  const empSel=document.getElementById('as-emp');
  const selected=Array.from(empSel.selectedOptions).map(o=>o.value);
  if(!selected.length||!V('as-date')||!V('as-start')||!V('as-end')){toast('⚠️','Select at least one employee, date and times.','var(--orange)');return;}
  selected.forEach(empName=>{
    assignedShifts.unshift({employeeName:empName,date:V('as-date'),startTime:V('as-start'),endTime:V('as-end'),vehicle:Array.from(document.getElementById('as-vehicle').selectedOptions).map(o=>o.value).filter(Boolean).join(', ')||'',orderTitle:V('as-order'),notes:V('as-notes'),assignedBy:currentUser?.name||'Admin',status:'assigned'});
  });
  persist('assignedShifts');
  document.getElementById('as-notes').value='';
  ['as-order'].forEach(id=>document.getElementById(id).selectedIndex=0);
  const asVeh=document.getElementById('as-vehicle');if(asVeh)Array.from(asVeh.options).forEach(o=>o.selected=false);
  Array.from(empSel.options).forEach(o=>o.selected=false);
  closeModal('assignShiftModal');renderAssignedShifts();updateChips();
  toast('📅',`Shift assigned to ${selected.length} employee${selected.length>1?'s':''}!`,'var(--blue)');
}
function renderAssignedShifts(){
  var w=document.getElementById('assignedWrap');if(!w)return;
  if(!assignedShifts.length){w.innerHTML='<div class="empty"><div class="empty-ico">📅</div><div class="empty-t">No Assigned Shifts</div><div class="empty-s">Assign shifts to employees to get started.</div></div>';return;}
  var rows='';
  assignedShifts.forEach(function(s,i){
    var stCol=s.status==='completed'?'green':s.status==='in-progress'?'amber':'blue';
    var stLabel=s.status==='assigned'?'Upcoming':s.status==='in-progress'?'Active':'Completed';
    var vehCell=s.vehicle?'<span class="veh">🚛 '+s.vehicle+'</span>':'<span style="color:var(--text-3);font-size:11px">—</span>';
    rows+='<tr style="animation:rowIn .3s ease '+(i*.04)+'s both">'
      +'<td><div class="dn">'+s.employeeName+'</div></td>'
      +'<td class="mono" style="font-size:12px">'+s.date+'</td>'
      +'<td class="mono" style="color:var(--amber);font-size:11px">'+s.startTime+'</td>'
      +'<td class="mono" style="color:var(--text-2);font-size:11px">'+s.endTime+'</td>'
      +'<td>'+vehCell+'</td>'
      +'<td style="font-size:11px;max-width:110px;overflow:hidden;text-overflow:ellipsis">'+(s.orderTitle||'—')+'</td>'
      +'<td style="font-size:11px;color:var(--text-2)">'+(s.assignedBy||'—')+'</td>'
      +'<td><span class="tag '+stCol+'">'+stLabel+'</span></td>'
      +'<td><button class="btn-sm danger" onclick="removeShift('+i+')">Remove</button></td>'
      +'</tr>';
  });
  w.innerHTML='<table><thead><tr><th>Employee</th><th>Date</th><th>Start</th><th>End</th><th>Vehicle</th><th>Task</th><th>By</th><th>Status</th><th>Actions</th></tr></thead><tbody>'+rows+'</tbody></table>';
}
function removeShift(i){assignedShifts.splice(i,1);persist('assignedShifts');renderAssignedShifts();toast('🗑','Shift removed.','var(--text-3)');}

// ════════════════════════════════════════════
// CLIENTS
// ════════════════════════════════════════════
function viewClient(i){
  const c=clients[i];if(!c)return;
  const initials=c.name.slice(0,2).toUpperCase();
  const statusCls=c.status==='Active'?'green':c.status==='Pending'?'orange':'dim';
  document.getElementById('prevTitle').textContent='Client — '+c.name;
  document.getElementById('prevBody').innerHTML=
    '<div style="padding-bottom:12px;margin-bottom:14px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:14px">'+
    '<div style="width:44px;height:44px;background:linear-gradient(135deg,var(--amber),var(--amber-dim));border-radius:var(--rl);display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;color:#000">'+initials+'</div>'+
    '<div><div style="font-size:16px;font-weight:600;color:var(--text)">'+c.name+'</div>'+
    '<div style="font-size:11px;color:var(--text-3)">'+(c.company||'Independent Client')+'</div></div></div>'+
    pGrid(pRow('CONTRACT TYPE',c.contract||'—'),pRow('STATUS','<span class="tag '+statusCls+'">'+c.status+'</span>'),'','')+
    (c.notes?pRow('NOTES / CONTACT DETAILS',c.notes):'');
  openModal('prevModal');
}
function renderClientsAddBtn(){if(isAdmin())openModal('clientModal');else toast('🚫','Supervisors and Managers only.','var(--red)');}
function renderClients(data){
  var g=document.getElementById('clientGrid');if(!g)return;
  if(!data||!data.length){g.innerHTML='<div class="empty" style="grid-column:1/-1"><div class="empty-ico">🤝</div><div class="empty-t">No Clients</div><div class="empty-s">Add your first client.</div><button class="empty-btn" onclick="renderClientsAddBtn()">+ Add Client</button></div>';return;}
  var out='';
  data.forEach(function(c,i){
    var ci=clients.indexOf(c);
    var stCol=c.status==='Active'?'green':c.status==='Pending'?'orange':'dim';
    out+='<div class="icard" style="animation:rowIn .3s ease '+(i*.05)+'s both;cursor:pointer" onclick="viewClient('+ci+')" title="Click to view">'
      +'<div class="icard-t">'+c.name+'</div>'
      +'<div class="icard-s">'+(c.company||'Independent Client')+'</div>'
      +'<div class="icard-row"><span class="k">Contract</span><span class="tag dim" style="font-size:10px">'+(c.contract||'—')+'</span></div>'
      +'<div class="icard-row"><span class="k">Status</span><span class="tag '+stCol+'" style="font-size:10px">'+c.status+'</span></div>'
      +(c.notes?'<div style="font-size:11px;color:var(--text-3);margin-top:7px;line-height:1.5;white-space:normal">'+c.notes.slice(0,80)+(c.notes.length>80?'…':'')+'</div>':'')
      +'<div class="icard-actions">'
      +(isAdmin()?'<button class="btn-sm" onclick="event.stopPropagation();editClient('+ci+')">✏️ Edit</button><button class="btn-sm danger" onclick="event.stopPropagation();delClient('+ci+')">🗑</button>':'')
      +'</div></div>';
  });
  g.innerHTML=out;
}

function updateClientStats(){document.getElementById('clST').textContent=clients.length;document.getElementById('clSA').textContent=clients.filter(c=>c.status==='Active').length;document.getElementById('clSP').textContent=clients.filter(c=>c.status==='Pending').length;}
function addClient(){if(!isAdmin()){toast('🚫','Supervisors and Managers only.','var(--red)');return;}if(!V('cl-name')||!V('cl-contract')||!V('cl-status')){toast('⚠️','Fill in required fields.','var(--orange)');return;}clients.unshift({name:V('cl-name'),company:V('cl-company'),contract:V('cl-contract'),status:V('cl-status'),notes:V('cl-notes')});persist('clients');['cl-name','cl-company','cl-notes'].forEach(id=>document.getElementById(id).value='');['cl-contract','cl-status'].forEach(id=>document.getElementById(id).selectedIndex=0);closeModal('clientModal');updateClientStats();renderClients(clients);toast('✅','Client added!');}
function editClient(i){const c=clients[i];document.getElementById('ecl-idx').value=i;document.getElementById('ecl-name').value=c.name;document.getElementById('ecl-company').value=c.company||'';document.getElementById('ecl-contract').value=c.contract||'';document.getElementById('ecl-status').value=c.status;document.getElementById('ecl-notes').value=c.notes||'';openModal('editClientModal');}
function saveClient(){if(!isAdmin()){toast('🚫','Supervisors and Managers only.','var(--red)');return;}const i=parseInt(V('ecl-idx'));clients[i]={name:V('ecl-name'),company:V('ecl-company'),contract:V('ecl-contract'),status:V('ecl-status'),notes:V('ecl-notes')};persist('clients');closeModal('editClientModal');updateClientStats();renderClients(clients);toast('✅','Client updated!');}
function delClient(i){if(!isAdmin()){toast('🚫','Supervisors and Managers only.','var(--red)');return;}clients.splice(i,1);persist('clients');updateClientStats();renderClients(clients);toast('🗑','Client removed.','var(--text-3)');}
document.getElementById('clSrch').addEventListener('input',e=>{const q=e.target.value.toLowerCase();renderClients(clients.filter(c=>c.name.toLowerCase().includes(q)||(c.company||'').toLowerCase().includes(q)));});

// ════════════════════════════════════════════
// FLEET
// ════════════════════════════════════════════
let fleetSort={col:null,dir:1};
let fleetSelection=new Set();
function sortFleet(col){
  if(fleetSort.col===col)fleetSort.dir*=-1;else{fleetSort.col=col;fleetSort.dir=1;}
  renderFleet(fleet);
}
function renderFleet(data){
  checkInsuranceExpiry();
  var w=document.getElementById('fleetWrap');if(!w)return;
  if(!data||!data.length){w.innerHTML=`<div class="empty"><div class="empty-ico">🚛</div><div class="empty-t">No Vehicles Registered</div><div class="empty-s">Add vehicles to the fleet registry to get started.</div><button class="empty-btn" onclick="if(isAdmin())openModal('fleetModal');else toast('🚫','Supervisors and Managers only.','var(--red)')">+ Add Vehicle</button></div>`;return;}
  // Apply sort
  var sorted=data.slice();
  if(fleetSort.col){
    sorted.sort(function(a,b){
      var av='',bv='';
      if(fleetSort.col==='plate'){av=a.plate||'';bv=b.plate||'';}
      else if(fleetSort.col==='category'){av=a.category||'';bv=b.category||'';}
      else if(fleetSort.col==='type'){av=a.type||'';bv=b.type||'';}
      else if(fleetSort.col==='status'){av=a.status||'';bv=b.status||'';}
      else if(fleetSort.col==='condition'){av=a.condition||'';bv=b.condition||'';}
      else if(fleetSort.col==='maint'){av=a.maint||'';bv=b.maint||'';}
      else if(fleetSort.col==='insurance'){
        var as=a.insuredOn?insExpiryStatus(a):null;
        var bs=b.insuredOn?insExpiryStatus(b):null;
        av=as?as.days:-9999;bv=bs?bs.days:-9999;
        return(av-bv)*fleetSort.dir;
      }
      return av.localeCompare(bv)*fleetSort.dir;
    });
  }
  var catCol={'Trucking':'blue','Utility':'amber','Air':'purple'};
  var allIndices=[];
  var rows='';
  function sortTh(col,label){
    var arr=fleetSort.col===col?(fleetSort.dir===1?' ↑':' ↓'):'';
    return '<th onclick="sortFleet(\''+col+'\')" style="cursor:pointer;user-select:none" title="Sort by '+label+'">'+label+'<span style="color:var(--amber)">'+arr+'</span></th>';
  }
  for(var i=0;i<sorted.length;i++){
    var f=sorted[i];
    var fi=fleet.indexOf(f);
    allIndices.push(fi);
    var fp=fuelPctMap[f.fuel]||50;
    var fc2=fp>50?'hi':fp>25?'mid':'lo';
    var latestLog=maintenanceServiceLogs.filter(function(s){return s.plate===f.plate&&s.mileage;}).sort(function(a,b){return b.date.localeCompare(a.date);})[0];
    var mileageDisplay=latestLog?('<span class="mono" style="font-size:11px;color:var(--text-2)">'+latestLog.mileage+'</span>'):'<span style="color:var(--text-3);font-size:11px">—</span>';
    var insCell;
    if(!f.insured||f.insured==='No'){
      insCell='<span class="tag red" style="font-size:9px">⚠ NOT INSURED</span>';
    } else if(f.insured==='Yes'&&(f.insuredOn||f.insExpiry)){
      var ins=f.insuredOn?insExpiryStatus(f):insExpiryStatus(f.insExpiry);
      if(!ins||ins.days<=0){insCell='<span class="tag red" style="font-size:9px">⚠ EXPIRED</span>';}
      else if(ins.cls==='red'){insCell='<span class="tag red" style="font-size:9px">⚠ '+ins.label+'</span>';}
      else if(ins.cls==='orange'){insCell='<span class="tag orange" style="font-size:9px">⚠ '+ins.label+'</span>';}
      else{insCell='<span class="tag green" style="font-size:9px">'+ins.label+'</span>';}
    } else if(f.insured==='Yes'){
      insCell='<span class="tag green" style="font-size:9px">Insured</span>';
    } else {
      insCell='<span class="tag dim" style="font-size:9px">Unknown</span>';
    }
    var chk=isAdmin()?('<td onclick="event.stopPropagation()"><input type="checkbox" class="fl-chk" '+(fleetSelection.has(fi)?'checked':'')+' onchange="toggleFleetRow('+fi+',this)"></td>'):'';
    var actionsCell=isAdmin()?('<div style="display:flex;gap:6px"><button class="btn-sm" onclick="event.stopPropagation();editVehicle('+fi+')">✏️</button><button class="btn-sm danger" onclick="event.stopPropagation();delVehicle('+fi+')">🗑</button></div>'):'';
    rows+='<tr style="animation:rowIn .3s ease '+(i*.03)+'s both;cursor:pointer'+(fleetSelection.has(fi)?';background:rgba(232,160,32,.06)':'')+'" onclick="viewVehicle('+fi+')" title="Click to view">'
      +chk
      +'<td><span class="veh">🚛 '+f.plate+'</span></td>'
      +'<td><span class="tag '+(catCol[f.category]||'dim')+'">'+(f.category||'—')+'</span></td>'
      +'<td style="font-size:12px;color:var(--text-2)">'+(f.type||'—')+'</td>'
      +'<td><span class="tag '+(f.status==='Operational'?'green':f.status==='Maintenance'?'orange':'dim')+'">'+f.status+'</span></td>'
      +'<td><span style="font-size:12px;font-weight:600;color:'+(condCol[f.condition]||'var(--text-2)')+'">'+( f.condition||'—')+'</span></td>'
      +'<td><span class="tag '+mK(f.maint)+'">'+mS(f.maint)+'</span></td>'
      +'<td><div class="fbar-w"><div class="fbar"><div class="fbar-f '+fc2+'" style="width:'+fp+'%"></div></div><span class="mono" style="font-size:10px;color:var(--text-3)">'+fS(f.fuel)+'</span></div></td>'
      +'<td>'+insCell+'</td>'
      +'<td>'+mileageDisplay+'</td>'
      +'<td>'+actionsCell+'</td>'
      +'</tr>';
  }
  var allChecked=allIndices.length>0&&allIndices.every(i=>fleetSelection.has(i));
  var selectAllTh=isAdmin()?('<th onclick="event.stopPropagation()"><input type="checkbox" class="fl-chk" '+(allChecked?'checked':'')+' onchange="toggleAllFleet(this,['+allIndices.join(',')+'])" title="Select all"></th>'):'';
  w.innerHTML='<table><thead><tr>'+selectAllTh+sortTh('plate','Plate')+sortTh('category','Category')+sortTh('type','Type')+sortTh('status','Status')+sortTh('condition','Condition')+sortTh('maint','Maintenance')+'<th>Fuel</th>'+sortTh('insurance','Insurance')+'<th>Mileage</th><th>Actions</th></tr></thead><tbody>'+rows+'</tbody></table>';
}
function updateBatchBar(){
  const bar=document.getElementById('flBatchBar');
  const cnt=document.getElementById('flSelCount');
  if(!bar)return;
  if(fleetSelection.size>0){bar.style.display='flex';if(cnt)cnt.textContent=fleetSelection.size+' selected';}
  else{bar.style.display='none';}
}
function clearFleetSelection(){fleetSelection.clear();updateBatchBar();renderFleet(fleet);}
function toggleFleetRow(fi,cb){if(cb.checked)fleetSelection.add(fi);else fleetSelection.delete(fi);updateBatchBar();}
function toggleAllFleet(cb,indices){if(cb.checked)indices.forEach(i=>fleetSelection.add(i));else indices.forEach(i=>fleetSelection.delete(i));updateBatchBar();renderFleet(fleet);}
function openBatchEdit(){
  if(!fleetSelection.size){toast('⚠️','Select at least one vehicle.','var(--orange)');return;}
  ['bf-insured','bf-status','bf-condition','bf-maint','bf-fuel'].forEach(id=>document.getElementById(id).selectedIndex=0);
  document.getElementById('bf-ins-days').value='';
  document.getElementById('bf-ins-expiry-wrap').style.display='none';
  openModal('batchFleetModal');
}
function applyBatchEdit(){
  if(!isAdmin()){toast('🚫','Supervisors and Managers only.','var(--red)');return;}
  const ins=V('bf-insured'),days=document.getElementById('bf-ins-days').value.trim(),
    st=V('bf-status'),cond=V('bf-condition'),maint=V('bf-maint'),fuel=V('bf-fuel');
  if(!ins&&!st&&!cond&&!maint&&!fuel){toast('⚠️','Choose at least one field to update.','var(--orange)');return;}
  fleetSelection.forEach(fi=>{
    if(fi<0||fi>=fleet.length)return;
    if(ins){fleet[fi].insured=ins;
      if(ins==='Yes'&&days){fleet[fi].insuredOn=new Date().toISOString().slice(0,10);fleet[fi].insDays=days;}
      if(ins==='No'){fleet[fi].insuredOn='';fleet[fi].insDays='';fleet[fi].insExpiry='';}
    }
    if(st)fleet[fi].status=st;
    if(cond)fleet[fi].condition=cond;
    if(maint)fleet[fi].maint=maint;
    if(fuel)fleet[fi].fuel=fuel;
  });
  persist('fleet');closeModal('batchFleetModal');
  const n=fleetSelection.size;clearFleetSelection();
  updateFleetStats();renderFleet(fleet);toast('✅','Updated '+n+' vehicle'+(n>1?'s':'')+'!');
}
function batchDelete(){
  if(!isAdmin()){toast('🚫','Supervisors and Managers only.','var(--red)');return;}
  if(!fleetSelection.size)return;
  if(!confirm('Delete '+fleetSelection.size+' selected vehicle'+(fleetSelection.size>1?'s':'')+' ?'))return;
  const indices=[...fleetSelection].sort((a,b)=>b-a);
  indices.forEach(i=>fleet.splice(i,1));
  persist('fleet');const n=indices.length;clearFleetSelection();
  updateFleetStats();populateVehicleSelect();populateShiftVehicle();
  toast('🗑','Deleted '+n+' vehicle'+(n>1?'s':'.')+'.','var(--text-3)');
}
function updateFleetStats(){
  document.getElementById('flST').textContent=fleet.length;
  document.getElementById('flSOp').textContent=fleet.filter(f=>f.status==='Operational').length;
  document.getElementById('flSMaint').textContent=fleet.filter(f=>f.status==='Maintenance').length;
  document.getElementById('flSOff').textContent=fleet.filter(f=>f.status==='Off Duty').length;
  document.getElementById('dlSF').textContent=fleet.filter(f=>f.status==='Operational').length;
  const insEl=document.getElementById('flSIns');const noInsEl=document.getElementById('flSNoIns');const expEl=document.getElementById('flSExp');
  if(insEl)insEl.textContent=fleet.filter(f=>f.insured==='Yes').length;
  if(noInsEl)noInsEl.textContent=fleet.filter(f=>!f.insured||f.insured==='No').length;
  if(expEl)expEl.textContent=fleet.filter(f=>{if(f.insured!=='Yes')return false;const s=f.insuredOn?insExpiryStatus(f):f.insExpiry?insExpiryStatus(f.insExpiry):null;return s&&s.days>=0&&s.days<=30;}).length;
}
function toggleCustomType(selId,inputId){const sel=document.getElementById(selId);const inp=document.getElementById(inputId);if(!sel||!inp)return;inp.style.display=sel.value==='__custom__'?'block':'none';if(sel.value!=='__custom__')inp.value='';}
function addVehicle(){if(!isAdmin()){toast('🚫','Supervisors and Managers only.','var(--red)');return;}const rawType=V('fl-type');const customType=document.getElementById('fl-type-custom').value.trim();const finalType=rawType==='__custom__'?customType:rawType;if(!V('fl-plate')||!finalType||!V('fl-status')||!V('fl-condition')||!V('fl-maint')||!V('fl-fuel')||!V('fl-category')){toast('⚠️','Fill in all fields.','var(--orange)');return;}const flIns=V('fl-insured');const flDays=document.getElementById('fl-ins-days').value.trim();fleet.unshift({plate:V('fl-plate').toUpperCase(),category:V('fl-category'),type:finalType,status:V('fl-status'),condition:V('fl-condition'),maint:V('fl-maint'),fuel:V('fl-fuel'),insured:flIns,insuredOn:flIns==='Yes'&&flDays?new Date().toISOString().slice(0,10):'',insDays:flIns==='Yes'&&flDays?flDays:''});persist('fleet');document.getElementById('fl-plate').value='';document.getElementById('fl-ins-days').value='';document.getElementById('fl-type-custom').value='';document.getElementById('fl-type-custom').style.display='none';['fl-category','fl-type','fl-status','fl-condition','fl-maint','fl-fuel','fl-insured'].forEach(id=>document.getElementById(id).selectedIndex=0);document.getElementById('fl-ins-expiry-wrap').style.display='none';closeModal('fleetModal');updateFleetStats();renderFleet(fleet);populateVehicleSelect();populateShiftVehicle();toast('✅','Vehicle added!');}
function editVehicle(i){const f=fleet[i];document.getElementById('efl-idx').value=i;document.getElementById('efl-plate').value=f.plate;document.getElementById('efl-category').value=f.category||'Trucking';const knownTypes=['Semi Truck','Box Truck','Flatbed','Van','Pickup','Helicopter','Plane'];const typeEl=document.getElementById('efl-type');const typeCustomEl=document.getElementById('efl-type-custom');if(knownTypes.includes(f.type)){typeEl.value=f.type;typeCustomEl.style.display='none';typeCustomEl.value='';}else{typeEl.value='__custom__';typeCustomEl.style.display='block';typeCustomEl.value=f.type||'';}document.getElementById('efl-status').value=f.status||'Operational';document.getElementById('efl-condition').value=f.condition||'Good';document.getElementById('efl-maint').value=f.maint||'Green — No Issues';document.getElementById('efl-fuel').value=f.fuel||'>75% — Full';const eInsEl=document.getElementById('efl-insured');const eInsDays=document.getElementById('efl-ins-days');const eInsWrap=document.getElementById('efl-ins-expiry-wrap');const eInsRem=document.getElementById('efl-ins-remaining');if(eInsEl)eInsEl.value=f.insured||'';if(eInsWrap)eInsWrap.style.display=f.insured==='Yes'?'block':'none';if(eInsDays)eInsDays.value=f.insDays||'';if(eInsRem){const s=f.insuredOn?insExpiryStatus(f):null;eInsRem.textContent=s&&s.days>0?s.days+'d remaining — enter new days to restart the clock':'Enter days to set new insurance period';}openModal('editFleetModal');}
function saveVehicle(){if(!isAdmin()){toast('🚫','Supervisors and Managers only.','var(--red)');return;}const i=parseInt(V('efl-idx'));const rawType=V('efl-type');const customType=document.getElementById('efl-type-custom').value.trim();const finalType=rawType==='__custom__'?customType:rawType;if(!finalType){toast('⚠️','Please specify the vehicle type.','var(--orange)');return;}const eIns=V('efl-insured');const eDays=document.getElementById('efl-ins-days').value.trim();const prev=fleet[i];fleet[i]={plate:V('efl-plate').toUpperCase(),category:V('efl-category'),type:finalType,status:V('efl-status'),condition:V('efl-condition'),maint:V('efl-maint'),fuel:V('efl-fuel'),insured:eIns,insuredOn:eIns==='Yes'&&eDays?new Date().toISOString().slice(0,10):(eIns==='Yes'?prev.insuredOn||'':''),insDays:eIns==='Yes'&&eDays?eDays:(eIns==='Yes'?prev.insDays||'':'')};persist('fleet');closeModal('editFleetModal');updateFleetStats();renderFleet(fleet);populateVehicleSelect();populateShiftVehicle();toast('✅','Vehicle updated!');}
function delVehicle(i){if(!isAdmin()){toast('🚫','Supervisors and Managers only.','var(--red)');return;}fleet.splice(i,1);persist('fleet');updateFleetStats();renderFleet(fleet);populateVehicleSelect();populateShiftVehicle();toast('🗑','Vehicle removed.','var(--text-3)');}
function viewVehicle(i){
  const f=fleet[i];if(!f)return;
  document.getElementById('prevTitle').textContent='Vehicle — '+f.plate;
  const vLatestLog=maintenanceServiceLogs.filter(s=>s.plate===f.plate&&s.mileage).sort((a,b)=>b.date.localeCompare(a.date))[0];
  const vMileage=vLatestLog?vLatestLog.mileage+' <span style="font-size:10px;color:var(--text-3)">(as of '+vLatestLog.date+')</span>':'Not recorded';
  document.getElementById('prevBody').innerHTML=`<div style="padding-bottom:12px;margin-bottom:14px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:12px"><span style="font-size:28px">🚛</span><div><div style="font-family:Space Grotesk,sans-serif;font-size:18px;font-weight:700">${f.plate}</div><div style="font-size:11px;color:var(--text-3);font-family:JetBrains Mono,monospace">${f.type||'—'} · ${f.category||'—'}</div></div></div>${pGrid(pRow('STATUS',f.status),pRow('CONDITION',f.condition),pRow('MAINTENANCE',mS(f.maint)),pRow('FUEL LEVEL',fS(f.fuel)),pRow('LAST MILEAGE',vMileage),'')}`;
  openModal('prevModal');
}document.getElementById('flSrch').addEventListener('input',e=>{const q=e.target.value.toLowerCase();renderFleet(fleet.filter(f=>f.plate.toLowerCase().includes(q)||f.type.toLowerCase().includes(q)||(f.category||'').toLowerCase().includes(q)));});

// ════════════════════════════════════════════
// ORDERS
// ════════════════════════════════════════════
function populateOrderDriverSelect(){const s=document.getElementById('ord-driver');if(!s)return;s.innerHTML='<option value="">Unassigned</option>';accounts.filter(a=>a.status==='verified').forEach(a=>s.innerHTML+=`<option value="${a.name}">${a.name} (${a.role})</option>`);}
function renderOrders(data){
  var w=document.getElementById('orderWrap');if(!w)return;
  if(!data||!data.length){w.innerHTML=`<div class="empty"><div class="empty-ico">📦</div><div class="empty-t">No Orders</div><div class="empty-s">Create your first order.</div><button class="empty-btn" onclick="if(isAdmin())openModal('orderModal');else toast('🚫','Supervisors and Managers only.','var(--red)')">+ New Order</button></div>`;return;}
  var pC={'Low':'var(--text-2)','Normal':'var(--blue)','High':'var(--orange)','Urgent':'var(--red)'};
  var rows='';
  for(var i=0;i<data.length;i++){
    var o=data[i];var oi=orders.indexOf(o);
    var divTag=o.division==='Logistics Orders'?'<span class="tag blue" style="font-size:9px">LOGISTICS</span>':o.division==='Field Operations Orders'?'<span class="tag purple" style="font-size:9px">FIELD OPS</span>':'<span style="color:var(--text-3);font-size:10px">—</span>';
    var stTag='<span class="tag '+(o.status==='Completed'?'green':o.status==='In Transit'?'blue':'orange')+'">'+o.status+'</span>';
    var acts=isAdmin()?'<div style="display:flex;gap:6px"><button class="btn-sm ok" onclick="event.stopPropagation();markOrderComplete('+oi+')" title="Mark Complete">✓</button><button class="btn-sm" onclick="event.stopPropagation();cycleOrder('+oi+')" title="Cycle Status">⟳</button><button class="btn-sm danger" onclick="event.stopPropagation();delOrder('+oi+')">🗑</button></div>':'';
    rows+='<tr style="animation:rowIn .3s ease '+(i*.05)+'s both;cursor:pointer" onclick="viewOrder('+oi+')" title="Click to view">'
      +'<td class="mono" style="font-size:12px">'+o.date+'</td>'
      +'<td><span class="mono" style="color:var(--amber);font-size:12px;font-weight:600">'+(o.number||'—')+'</span></td>'
      +'<td>'+divTag+'</td>'
      +'<td><div class="dn" style="max-width:120px;overflow:hidden;text-overflow:ellipsis">'+o.title+'</div></td>'
      +'<td style="font-size:12px;color:var(--text-2)">'+(o.client||'—')+'</td>'
      +'<td style="font-size:11px;color:var(--text-2)">'+(o.type||'—')+'</td>'
      +'<td><span style="font-size:11px;font-weight:600;color:'+(pC[o.priority]||'var(--text-2)')+'">'+( o.priority||'—')+'</span></td>'
      +'<td style="font-size:12px">'+(o.driver||'<span style="color:var(--text-3)">Unassigned</span>')+'</td>'
      +'<td>'+stTag+'</td>'
      +'<td>'+acts+'</td>'
      +'</tr>';
  }
  w.innerHTML='<table><thead><tr><th>Date</th><th>Order #</th><th>Division</th><th>Title</th><th>Client</th><th>Type</th><th>Priority</th><th>Assigned To</th><th>Status</th><th>Actions</th></tr></thead><tbody>'+rows+'</tbody></table>';
}

function updateOrderStats(){document.getElementById('orST').textContent=orders.length;document.getElementById('orSP').textContent=orders.filter(o=>o.status==='Pending').length;document.getElementById('orSI').textContent=orders.filter(o=>o.status==='In Transit').length;document.getElementById('orSD').textContent=orders.filter(o=>o.status==='Completed').length;}
function markOrderComplete(i){if(!isAdmin())return;orders[i].status='Completed';orders[i].completedAt=nowDate()+' '+nowTime();orders[i].completedBy=currentUser?.name||'—';persist('orders');updateOrderStats();renderOrders(orders);toast('✅','Order marked as complete!','var(--green)');}
function addOrder(){if(!isAdmin()){toast('🚫','Supervisors and Managers only.','var(--red)');return;}if(!V('ord-number')||!V('ord-title')||!V('ord-type')||!V('ord-division')){toast('⚠️','Fill in Order #, Division, Title and Type.','var(--orange)');return;}const ordTypeVal=V('ord-type')==='Other — Please Specify'?(V('ord-type-other')||V('ord-type')):V('ord-type');orders.unshift({date:nowDate(),time:nowTime(),number:V('ord-number'),division:V('ord-division'),title:V('ord-title'),client:V('ord-client'),type:ordTypeVal,priority:V('ord-priority')||'Normal',driver:V('ord-driver'),status:V('ord-status')||'Pending',notes:V('ord-notes'),locationImg:V('ord-location-img')});persist('orders');['ord-number','ord-title','ord-client','ord-notes','ord-type-other','ord-location-img'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});['ord-type','ord-division'].forEach(id=>{const el=document.getElementById(id);if(el)el.selectedIndex=0;});closeModal('orderModal');updateOrderStats();renderOrders(orders);populateOrderRefSelects();toast('✅','Order created!');}
function cycleOrder(i){if(!isAdmin()){toast('🚫','Supervisors and Managers only.','var(--red)');return;}const s=orders[i].status;orders[i].status=s==='Pending'?'In Transit':s==='In Transit'?'Completed':'Pending';persist('orders');updateOrderStats();renderOrders(orders);toast('🔄',`Status: ${orders[i].status}`,'var(--blue)');}
function delOrder(i){if(!isAdmin()){toast('🚫','Supervisors and Managers only.','var(--red)');return;}orders.splice(i,1);persist('orders');updateOrderStats();renderOrders(orders);toast('🗑','Order removed.','var(--text-3)');}
function viewOrder(i){
  const o=orders[i];if(!o)return;
  const pC={'Low':'var(--text-2)','Normal':'var(--blue)','High':'var(--orange)','Urgent':'var(--red)'};
  document.getElementById('prevTitle').textContent='Order — '+(o.number?o.number+' · ':'')+o.title;
  const imgBlock=o.locationImg?`<div style="margin-top:14px;border-top:1px solid var(--border);padding-top:14px"><div style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:2px;color:var(--amber);text-transform:uppercase;margin-bottom:8px">📍 LOCATION IMAGE</div><img src="${o.locationImg}" alt="Location" style="width:100%;max-height:320px;object-fit:cover;border-radius:var(--r);border:1px solid var(--border)" onerror="this.parentElement.innerHTML='<div style=\'font-size:11px;color:var(--red);font-family:JetBrains Mono,monospace\'>⚠ Could not load image — check the URL is a valid direct Imgur link.</div>'"></div>`:'';
  document.getElementById('prevBody').innerHTML=`<div style="padding-bottom:12px;margin-bottom:14px;border-bottom:1px solid var(--border)"><div style="font-family:Space Grotesk,sans-serif;font-size:16px;font-weight:600;margin-bottom:3px">${o.title}</div><div class="mono" style="font-size:11px;color:var(--amber)">${o.number||'No Order #'} · ${o.division||'—'}</div><div class="mono" style="font-size:11px;color:var(--text-3)">${o.date} at ${o.time}</div></div>${pGrid(pRow('ORDER #',o.number||'—'),pRow('DIVISION',o.division||'—'),pRow('CLIENT',o.client||'—'),pRow('TYPE',o.type||'—'),pRow('PRIORITY',`<span style="color:${pC[o.priority]||'var(--text-2)'};font-weight:700">${o.priority||'—'}</span>`),pRow('ASSIGNED TO',o.driver||'Unassigned'),pRow('STATUS',o.status),o.completedAt?pRow('COMPLETED',o.completedAt+' by '+o.completedBy):'')}`+`${o.notes?`<div style="margin-top:8px">${pRow('DETAILS',o.notes)}</div>`:''}${imgBlock}`;
  openModal('prevModal');
}document.getElementById('orSrch').addEventListener('input',e=>{const q=e.target.value.toLowerCase();renderOrders(orders.filter(o=>o.title.toLowerCase().includes(q)||o.client.toLowerCase().includes(q)));});

// ════════════════════════════════════════════
// MAP — iframe embed (gta-5-map.com)
// ════════════════════════════════════════════
function initMap(){/* Map is an iframe — no init needed */}
function togglePOI(){}
function resetMap(){}

// ════════════════════════════════════════════
// ROLE CHANGE LOGS
// ════════════════════════════════════════════
function logRoleEvent(action,subject,fromRole,toRole,actor){
  roleLogs.unshift({date:nowDate(),time:nowTime(),action,subject,fromRole,toRole,actor});
  persist('roleLogs');
}
function renderRoleLogs(){
  var w=document.getElementById('roleLogsWrap');if(!w)return;
  document.getElementById('rlST').textContent=roleLogs.length;
  document.getElementById('rlSP').textContent=roleLogs.filter(function(l){return l.action==='Promoted'||l.action==='Account Verified'||l.action==='Role Created';}).length;
  document.getElementById('rlSD').textContent=roleLogs.filter(function(l){return l.action==='Demoted'||l.action==='Account Rejected'||l.action==='Account Removed'||l.action==='Role Deleted';}).length;
  if(!roleLogs.length){w.innerHTML='<div class="empty"><div class="empty-ico">📜</div><div class="empty-t">No Role Events Yet</div><div class="empty-s">Role changes, promotions, and account updates are logged here automatically.</div></div>';return;}
  var aCol={'Promoted':'green','Account Verified':'green','Role Created':'blue','Demoted':'orange','Account Rejected':'red','Account Removed':'red','Role Deleted':'red'};
  var rows='';
  roleLogs.forEach(function(l,i){
    rows+='<tr style="animation:rowIn .3s ease '+(i*.03)+'s both">'
      +'<td class="mono" style="font-size:12px">'+l.date+'</td>'
      +'<td class="mono" style="font-size:11px;color:var(--text-3)">'+l.time+'</td>'
      +'<td><span class="tag '+(aCol[l.action]||'dim')+'" style="font-size:10px">'+l.action+'</span></td>'
      +'<td><div class="dn">'+l.subject+'</div></td>'
      +'<td style="font-size:12px;color:var(--text-3)">'+(l.fromRole||'—')+'</td>'
      +'<td style="font-size:12px;color:var(--amber);font-weight:600">'+(l.toRole||'—')+'</td>'
      +'<td style="font-size:12px;color:var(--text-2)">'+l.actor+'</td>'
      +'</tr>';
  });
  w.innerHTML='<table><thead><tr><th>Date</th><th>Time</th><th>Action</th><th>Subject</th><th>From</th><th>To</th><th>Performed By</th></tr></thead><tbody>'+rows+'</tbody></table>';
}
function clearRoleLogs(){roleLogs.length=0;persist('roleLogs');renderRoleLogs();toast('🗑','Role logs cleared.','var(--text-3)');}

// ════════════════════════════════════════════
// MAINTENANCE
// ════════════════════════════════════════════
let maintTab='damage';
function switchMaintTab(tab){
  maintTab=tab;
  document.querySelectorAll('#maintTabs .ftab').forEach((t,i)=>t.classList.toggle('on',i===(tab==='damage'?0:1)));
  document.getElementById('maintDamageView').style.display=tab==='damage'?'flex':'none';
  document.getElementById('maintDamageView').style.flexDirection='column';
  document.getElementById('maintServiceView').style.display=tab==='service'?'flex':'none';
  document.getElementById('maintServiceView').style.flexDirection='column';
  document.getElementById('maintAddBtn').textContent=tab==='service'?'+ Log Service':'+ Log Service';
  if(tab==='damage')renderMaintDamage();
  else renderMaintService();
}
function populateMaintVehicleSelect(){
  const sel=document.getElementById('ms-plate');if(!sel)return;
  sel.innerHTML='<option value="">Select vehicle</option>';
  fleet.forEach(f=>sel.innerHTML+=`<option value="${f.plate}">${f.plate} — ${f.type}</option>`);
  // Also add any plates from damage reports not in fleet
  const dmgPlates=getDamageReports().map(r=>r.vehicle).filter(v=>!fleet.find(f=>f.plate===v));
  dmgPlates.forEach(p=>{if(p&&p!=='—')sel.innerHTML+=`<option value="${p}">${p} (from damage report)</option>`;});
  // Auto-fill Performed By from logged-in user
  const techEl=document.getElementById('ms-tech');
  if(techEl&&currentUser&&!techEl.value)techEl.value=currentUser.name;
}
function getDamageReports(){
  // Pull damaged vehicle entries from delivery logs
  return deliveryLogs.filter(r=>r.rep&&r.rep!=='none');
}
function renderMaintDamage(){
  var allDmg=getDamageReports();
  var serviced=new Set(maintenanceServiceLogs.filter(function(s){return s.statusAfter==='Operational'||s.statusAfter==='Off Duty';}).map(function(s){return s.plate;}));
  var outstanding=allDmg.filter(function(r){return !serviced.has(r.vehicle);});
  document.getElementById('mdST').textContent=outstanding.length;
  document.getElementById('mdSH').textContent=outstanding.filter(function(r){return r.rep==='heavy';}).length;
  document.getElementById('mdSS').textContent=outstanding.filter(function(r){return r.rep==='slight';}).length;
  document.getElementById('mdSSvc').textContent=allDmg.filter(function(r){return serviced.has(r.vehicle);}).length;
  var w=document.getElementById('maintDmgWrap');if(!w)return;
  if(!allDmg.length){w.innerHTML='<div class="empty"><div class="empty-ico">🔩</div><div class="empty-t">No Damage Reports</div><div class="empty-s">Damage entries are pulled automatically from Delivery Logs when damage is reported.</div></div>';return;}
  var rows='';
  allDmg.forEach(function(r,i){
    var isSvc=serviced.has(r.vehicle);
    var di=deliveryLogs.indexOf(r);
    var svcTag=isSvc?'<span class="tag green">✓ Completed</span>':'<span class="tag dim">Pending</span>';
    var logBtn='<button class="btn-sm ok" onclick="event.stopPropagation();prefillMaintService(&quot;'+r.vehicle+'&quot;);switchMaintTab(&quot;service&quot;);openModal(&quot;maintServiceModal&quot;)">'+( isSvc?'🔧 Re-log':'🔧 Log')+'</button>';
    rows+='<tr style="animation:rowIn .3s ease '+(i*.04)+'s both;cursor:pointer'+(isSvc?';opacity:.55':'')+'" onclick="viewDL('+di+')" title="'+(isSvc?'Completed — vehicle serviced':'Click to view delivery log')+'">'
      +'<td class="mono" style="font-size:12px">'+r.date+'<span class="dc">'+r.time+'</span></td>'
      +'<td><div class="dn">'+r.name+'</div></td>'
      +'<td><span class="mono" style="color:var(--amber)">'+r.badge+'</span></td>'
      +'<td><span class="veh">🚛 '+r.vehicle+'</span></td>'
      +'<td><span class="tag '+repC[r.rep]+'">'+repL[r.rep]+'</span></td>'
      +'<td><span class="tag '+(r.maint==='green'?'green':r.maint==='orange'?'orange':'red')+'">'+( r.maint||'').charAt(0).toUpperCase()+(r.maint||'').slice(1)+'</span></td>'
      +'<td>'+svcTag+'</td>'
      +'<td>'+logBtn+'</td>'
      +'</tr>';
  });
  w.innerHTML='<table><thead><tr><th>Date</th><th>Reported By</th><th>Badge</th><th>Vehicle</th><th>Damage Level</th><th>Maint. Status</th><th>Serviced</th><th></th></tr></thead><tbody>'+rows+'</tbody></table>';
}
function prefillMaintService(plate){
  populateMaintVehicleSelect();
  setTimeout(()=>{const s=document.getElementById('ms-plate');if(s)s.value=plate;},50);
}
function renderMaintService(){
  var w=document.getElementById('maintSvcWrap');if(!w)return;
  document.getElementById('msST').textContent=maintenanceServiceLogs.length;
  document.getElementById('msSR').textContent=maintenanceServiceLogs.filter(function(s){return s.type==='Repair';}).length;
  document.getElementById('mssSvc').textContent=maintenanceServiceLogs.filter(function(s){return s.type==='Service / Maintenance'||s.type==='Inspection';}).length;
  document.getElementById('msSW').textContent=maintenanceServiceLogs.filter(function(s){return s.type==='Wash';}).length;
  if(!maintenanceServiceLogs.length){w.innerHTML='<div class="empty"><div class="empty-ico">🛠️</div><div class="empty-t">No Service Logs</div><div class="empty-s">Log repairs, services, and washes carried out on fleet vehicles.</div><button class="empty-btn" onclick="renderMaintSvcAddBtn()">+ Log Service</button></div>';return;}
  var rows='';
  maintenanceServiceLogs.forEach(function(s,i){
    var si2=maintenanceServiceLogs.indexOf(s);
    var typeCol=s.type==='Repair'?'red':s.type==='Wash'?'blue':s.type==='Inspection'?'purple':'orange';
    var stCol=s.statusAfter==='Operational'?'green':s.statusAfter==='Off Duty'?'dim':'orange';
    rows+='<tr style="animation:rowIn .3s ease '+(i*.04)+'s both;cursor:pointer" onclick="viewMaintService('+si2+')" title="Click to view">'
      +'<td class="mono" style="font-size:12px">'+s.date+'<span class="dc">'+s.time+'</span></td>'
      +'<td><span class="veh">🚛 '+s.plate+'</span></td>'
      +'<td><span class="tag '+typeCol+'">'+s.type+'</span></td>'
      +'<td style="font-size:12px;color:var(--text-2)">'+s.tech+'</td>'
      +'<td style="font-size:11px;color:var(--text-3)">'+(s.fuel?s.fuel.split(' — ')[0]:'—')+'</td>'
      +'<td class="mono" style="font-size:11px;color:var(--text-2)">'+(s.mileage||'—')+'</td>'
      +'<td class="mono" style="font-size:11px;color:var(--amber)">'+(s.cost||'—')+'</td>'
      +'<td><span class="tag '+stCol+'">'+s.statusAfter+'</span></td>'
      +'<td><button class="btn-sm" onclick="event.stopPropagation();viewMaintService('+si2+')">View</button></td>'
      +'</tr>';
  });
  w.innerHTML='<table><thead><tr><th>Date</th><th>Vehicle</th><th>Service Type</th><th>Performed By</th><th>Fuel</th><th>Mileage</th><th>Cost</th><th>Status After</th><th></th></tr></thead><tbody>'+rows+'</tbody></table>';
}
function submitMaintService(){
  if(currentUser&&V('ms-tech').trim().toLowerCase()!==currentUser.name.trim().toLowerCase()){toast('🚫','You can only log maintenance under your own name.','var(--red)');return;}
  if(!V('ms-plate')||!V('ms-type')||!V('ms-tech')||!V('ms-desc')||!V('ms-status')||!V('ms-fuel')){toast('⚠️','Fill in all required fields.','var(--orange)');return;}
  const techName=V('ms-tech');
  const techUser=currentUser?currentUser.name:null;
  maintenanceServiceLogs.unshift({
    date:nowDate(),time:nowTime(),
    plate:V('ms-plate'),type:V('ms-type'),
    tech:techName,techUser:techUser,
    cost:V('ms-cost'),parts:V('ms-parts'),
    fuel:V('ms-fuel'),mileage:V('ms-mileage'),
    statusAfter:V('ms-status'),desc:V('ms-desc'),notes:V('ms-notes')
  });
  persist('maintenanceServiceLogs');
  ['ms-cost','ms-parts','ms-desc','ms-notes','ms-mileage'].forEach(id=>document.getElementById(id).value='');
  const techEl=document.getElementById('ms-tech');if(techEl)techEl.value='';
  ['ms-plate','ms-type','ms-status','ms-fuel'].forEach(id=>document.getElementById(id).selectedIndex=0);
  closeModal('maintServiceModal');
  renderMaintDamage();
  renderMaintService();
  toast('✅','Service log recorded — damage stats updated!');
}
function viewMaintService(i){
  const s=maintenanceServiceLogs[i];if(!s)return;
  document.getElementById('prevTitle').textContent='Service Log — '+s.plate;
  document.getElementById('prevBody').innerHTML=`<div style="padding-bottom:12px;margin-bottom:14px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:12px"><span style="font-size:26px">🔧</span><div><div style="font-family:Space Grotesk,sans-serif;font-size:16px;font-weight:600">${s.plate}</div><div class="mono" style="font-size:11px;color:var(--text-3)">${s.date} at ${s.time}</div></div></div>${pGrid(pRow('SERVICE TYPE',s.type),pRow('PERFORMED BY',s.tech),pRow('FUEL STATUS',s.fuel||'—'),pRow('MILEAGE',s.mileage||'—'),pRow('COST',s.cost||'—'),pRow('STATUS AFTER',s.statusAfter),pRow('PARTS REPLACED',s.parts||'—'),'')}<div style="margin-top:8px">${pRow('WORK DESCRIPTION',s.desc)}</div>${s.notes?`<div style="margin-top:8px">${pRow('MANAGEMENT NOTES',s.notes)}</div>`:''}`;
  openModal('prevModal');
}


// ── Shift start reminder ──
setInterval(()=>{
  if(!currentUser)return;
  const now=new Date();
  const upcoming=assignedShifts.find(s=>s.employeeName===currentUser.name&&s.status==='accepted');
  if(!upcoming)return;
  // Parse shift date + time
  try{
    const shiftDt=new Date(upcoming.date+' '+upcoming.startTime);
    const diffMin=Math.round((shiftDt-now)/60000);
    if(diffMin===30)toast('⏰','Your shift starts in 30 minutes! Head to Shift System when ready.','var(--amber)');
    if(diffMin===10)toast('⏰','Your shift starts in 10 minutes! Get ready.','var(--orange)');
    if(diffMin===0)toast('▶','Your shift is starting now! Go to Shift System to begin.','var(--green)');
  }catch(e){}
},60000);

// ════════════════════════════════════════════
// PROCEDURES TABS
// ════════════════════════════════════════════
function showProcTab(tab){
  ['gas','cistern','large'].forEach(function(t){
    const el=document.getElementById('proc-'+t);
    const btn=document.getElementById('ptab-'+t);
    if(el)el.style.display=t===tab?'block':'none';
    if(btn){
      btn.style.background=t===tab?'var(--amber)':'var(--surface2)';
      btn.style.color=t===tab?'#000':'var(--text-3)';
    }
  });
}
function showFieldTab(tab){
  ['charger','turbine-op','turbine-stat','solar','substation','oilwell'].forEach(function(t){
    const el=document.getElementById('field-'+t);
    const btn=document.getElementById('ftab-'+t);
    if(el)el.style.display=t===tab?'block':'none';
    if(btn){
      btn.style.background=t===tab?'var(--amber)':'var(--surface2)';
      btn.style.color=t===tab?'#000':'var(--text-3)';
    }
  });
}


// ════════════════════════════════════════════
// REIMBURSEMENT REQUESTS
// ════════════════════════════════════════════
const reimbursementRequests=lsLoad(LS_KEYS.reimbursementRequests,[]);
function renderRR(){
  var w=document.getElementById('rrWrap');if(!w)return;
  if(!reimbursementRequests.length){w.innerHTML=`<div class="empty"><div class="empty-ico">💰</div><div class="empty-t">No Reimbursement Requests</div><div class="empty-s">Submitted requests appear here.</div><button class="empty-btn" onclick="showPage('reimbursement-form')">+ New Request</button></div>`;return;}
  var stC={'Pending':'orange','Approved':'green','Rejected':'red'};
  var rows='';
  for(var i=0;i<reimbursementRequests.length;i++){
    var r=reimbursementRequests[i];
    var acts=isAdmin()?'<button class="btn-sm ok" onclick="event.stopPropagation();approveRR('+i+')">✓</button> <button class="btn-sm danger" onclick="event.stopPropagation();rejectRR('+i+')">✕</button>':'<button class="btn-sm" onclick="event.stopPropagation();viewRR('+i+')">View</button>';
    rows+='<tr style="animation:rowIn .3s ease '+(i*.05)+'s both;cursor:pointer" onclick="viewRR('+i+')">'
      +'<td><span class="mono" style="font-size:12px">'+r.date+'</span></td>'
      +'<td><span class="mono" style="color:var(--amber)">'+r.badge+'</span></td>'
      +'<td><div class="dn">'+r.name+'</div><div class="dc">'+r.rank+'</div></td>'
      +'<td><span class="tag amber" style="font-size:10px">'+r.type+'</span></td>'
      +'<td><span style="font-family:JetBrains Mono,monospace;font-size:13px;font-weight:600;color:var(--green)">$'+r.amount+'</span></td>'
      +'<td><span class="mono" style="font-size:11px;color:var(--text-3)">'+(r.orderRef||'—')+'</span></td>'
      +'<td><span class="tag '+(stC[r.status]||'orange')+'">'+r.status+'</span></td>'
      +'<td>'+acts+'</td>'
      +'</tr>';
  }
  w.innerHTML='<table><thead><tr><th>Date</th><th>Badge</th><th>Employee</th><th>Type</th><th>Amount</th><th>Order #</th><th>Status</th><th></th></tr></thead><tbody>'+rows+'</tbody></table>';
}

function updateRRStats(){
  document.getElementById('rrST').textContent=reimbursementRequests.length;
  document.getElementById('rrSP').textContent=reimbursementRequests.filter(r=>r.status==='Pending').length;
  document.getElementById('rrSA').textContent=reimbursementRequests.filter(r=>r.status==='Approved').length;
  document.getElementById('rrSR').textContent=reimbursementRequests.filter(r=>r.status==='Rejected').length;
}
function submitReimbursement(){
  const badge=V('rr-badge'),name=V('rr-name'),rank=V('rr-rank'),type=V('rr-type'),typeOther=V('rr-type-other'),amount=V('rr-amount'),date=V('rr-date'),desc=V('rr-desc');
  if(!badge||!name||!type||!amount||!date||!desc){toast('⚠️','Fill in all required fields.','var(--orange)');return;}
  const finalType=type==='Other — Please Specify'?(typeOther||type):type;
  reimbursementRequests.unshift({date:nowDate(),time:nowTime(),badge,name,rank,type:finalType,amount,expenseDate:date,receipt:V('rr-receipt'),orderRef:V('rr-order-ref'),status:V('rr-status')||'Pending',desc,notes:V('rr-notes')});
  lsSave('ae_reimbursements',reimbursementRequests);
  ['rr-amount','rr-date','rr-receipt','rr-desc','rr-notes'].forEach(id=>document.getElementById(id).value='');
  ['rr-type','rr-status'].forEach(id=>{const el=document.getElementById(id);if(el)el.selectedIndex=0;});
  updateRRStats();renderRR();toast('✅','Reimbursement request submitted!','var(--green)');showPage('reimbursement');
}
function viewRR(i){
  const r=reimbursementRequests[i];if(!r)return;
  document.getElementById('prevTitle').textContent='Reimbursement Request';
  document.getElementById('prevBody').innerHTML=`<div style="padding-bottom:12px;margin-bottom:14px;border-bottom:1px solid var(--border)"><div style="font-family:Space Grotesk,sans-serif;font-size:16px;font-weight:600">${r.name}</div><div class="mono" style="font-size:11px;color:var(--text-3)">Badge #${r.badge} · ${r.rank} · ${r.date}</div></div>${pGrid(pRow('EXPENSE TYPE',r.type),pRow('AMOUNT','$'+r.amount),pRow('EXPENSE DATE',r.expenseDate||'—'),pRow('RECEIPT #',r.receipt||'—'),pRow('ORDER REF',r.orderRef||'—'),pRow('STATUS',r.status))}${pRow('DESCRIPTION',r.desc)}${r.notes?'<div style="margin-top:8px">'+pRow('MANAGEMENT NOTES',r.notes)+'</div>':''}`;
  openModal('prevModal');
}
function approveRR(i){if(!isAdmin())return;reimbursementRequests[i].status='Approved';lsSave('ae_reimbursements',reimbursementRequests);renderRR();updateRRStats();toast('✅','Request approved.','var(--green)');}
function rejectRR(i){if(!isAdmin())return;reimbursementRequests[i].status='Rejected';lsSave('ae_reimbursements',reimbursementRequests);renderRR();updateRRStats();toast('✕','Request rejected.','var(--red)');}

// ════════════════════════════════════════════
// TOGGLE CUSTOM INPUT (for "Other — Please Specify")
// ════════════════════════════════════════════
function toggleCustom(selId,inputId){
  const sel=document.getElementById(selId);
  const inp=document.getElementById(inputId);
  if(!sel||!inp)return;
  inp.style.display=sel.value.includes('Please Specify')?'block':'none';
  if(!sel.value.includes('Please Specify'))inp.value='';
}

// ════════════════════════════════════════════
// POPULATE ORDER REF SELECTS
// ════════════════════════════════════════════
function populateOrderRefSelects(){
  // dl-order-ref: show active (non-completed) orders with number, title, division
  // All employees can complete orders regardless of assignment
  var dlSel=document.getElementById('dl-order-ref');
  if(dlSel){
    var dlCur=dlSel.value;
    dlSel.innerHTML='<option value="">Select order</option>';
    orders.forEach(function(o){
      if(!o.number)return;
      var divShort=o.division==='Logistics Orders'?'[LOG]':o.division==='Field Operations Orders'?'[FOP]':'';
      var stNote=o.status==='Completed'?' ✓':'';
      dlSel.innerHTML+='<option value="'+o.number+'"'+(o.number===dlCur?' selected':'')+'>'
        +o.number+' '+divShort+' — '+o.title+stNote+'</option>';
    });
  }
  // fr-order-ref and rr-order-ref: show all orders
  ['fr-order-ref','rr-order-ref'].forEach(function(selId){
    var sel=document.getElementById(selId);if(!sel)return;
    var cur=sel.value;
    sel.innerHTML='<option value="">None / Not linked</option>';
    orders.forEach(function(o){
      if(!o.number)return;
      var divShort=o.division==='Logistics Orders'?'[LOG]':o.division==='Field Operations Orders'?'[FOP]':'';
      sel.innerHTML+='<option value="'+o.number+'"'+(o.number===cur?' selected':'')+'>'+o.number+' '+divShort+' — '+o.title+'</option>';
    });
  });
}

// ════════════════════════════════════════════
// INSURANCE EXPIRY HELPERS
// ════════════════════════════════════════════
function insExpiryStatus(v){
  // v can be a vehicle object {insuredOn, insDays} or legacy date string
  if(!v)return null;
  var insuredOn,insDays;
  if(typeof v==='object'&&v.insuredOn){insuredOn=v.insuredOn;insDays=parseInt(v.insDays)||30;}
  else if(typeof v==='string'){// legacy date string fallback
    const exp=new Date(v);const now=new Date();
    const diff=Math.ceil((exp-now)/(1000*60*60*24));
    if(diff<0)return{label:'EXPIRED',cls:'red',days:diff};
    if(diff<=7)return{label:'Expires in '+diff+'d',cls:'red',days:diff};
    if(diff<=30)return{label:'Expires in '+diff+'d',cls:'orange',days:diff};
    return{label:'Valid ('+diff+'d left)',cls:'green',days:diff};
  } else return null;
  const start=new Date(insuredOn);const now=new Date();
  const elapsed=Math.floor((now-start)/(1000*60*60*24));
  const remaining=insDays-elapsed;
  if(remaining<=0)return{label:'EXPIRED',cls:'red',days:remaining};
  if(remaining<=7)return{label:'Expires in '+remaining+'d',cls:'red',days:remaining};
  if(remaining<=30)return{label:'Expires in '+remaining+'d',cls:'orange',days:remaining};
  return{label:remaining+'d remaining',cls:'green',days:remaining};
}
// Auto-expire insurance: check all vehicles and set insured=No if expired
function checkInsuranceExpiry(){
  let changed=false;
  fleet.forEach(f=>{
    if(f.insured==='Yes'&&(f.insuredOn||f.insExpiry)){
      const s=f.insuredOn?insExpiryStatus(f):insExpiryStatus(f.insExpiry);
      if(s&&s.days<=0){f.insured='No';f.insuredOn='';f.insDays='';f.insExpiry='';changed=true;}
    }
  });
  if(changed){persist('fleet');updateFleetStats();}
}

// ════════════════════════════════════════════
// INIT
// ════════════════════════════════════════════
function refreshAll(){
  checkInsuranceExpiry();
  renderDL(deliveryLogs);renderFR(fieldReports);renderIR(incidentReports);
  renderClients(clients);renderFleet(fleet);renderOrders(orders);
  renderShiftHistory(shiftHistory);updateDLStats();updateFRStats();
  updateIRStats();updateClientStats();updateFleetStats();updateOrderStats();
  updateRRStats();
  populateVehicleSelect();populateShiftVehicle();populateOrderRefSelects();
}

// ════════════════════════════════════════════
// CREW PICKER
// ════════════════════════════════════════════
let crewSelected=[];
function initCrewPicker(){
  crewSelected=[];
  renderCrewTags();
  const s=document.getElementById('dl-crew-search');if(s)s.value='';
  const dd=document.getElementById('dl-crew-dropdown');if(dd)dd.style.display='none';
}
function filterCrewPicker(){
  const q=document.getElementById('dl-crew-search').value.toLowerCase().trim();
  const dd=document.getElementById('dl-crew-dropdown');
  const others=accounts.filter(a=>a.status==='verified'&&a.name!==currentUser?.name&&!crewSelected.includes(a.name));
  const filtered=q?others.filter(a=>a.name.toLowerCase().includes(q)):others;
  if(!filtered.length){dd.style.display='none';return;}
  dd.style.display='block';
  dd.innerHTML=filtered.map(a=>`<div onclick="addCrewMember('${a.name.replace(/'/g,"\\'")}')" style="padding:8px 12px;cursor:pointer;font-size:13px;display:flex;align-items:center;gap:9px" onmouseover="this.style.background='rgba(232,160,32,.08)'" onmouseout="this.style.background=''">`+
    `<div style="width:26px;height:26px;background:linear-gradient(135deg,var(--amber),var(--amber-dim));border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#000;flex-shrink:0">${(a.initials||a.name.slice(0,2)).toUpperCase()}</div>`+
    `<div><div style="font-weight:500">${a.name}</div><div style="font-size:10px;color:var(--text-3);font-family:'JetBrains Mono',monospace">${a.role}</div></div></div>`
  ).join('');
}
function addCrewMember(name){
  if(!crewSelected.includes(name))crewSelected.push(name);
  document.getElementById('dl-crew-search').value='';
  document.getElementById('dl-crew-dropdown').style.display='none';
  renderCrewTags();
  document.getElementById('dl-crew').value=crewSelected.join(', ');
}
function removeCrewMember(name){
  crewSelected=crewSelected.filter(n=>n!==name);
  renderCrewTags();
  document.getElementById('dl-crew').value=crewSelected.join(', ');
}
function renderCrewTags(){
  const picker=document.getElementById('dl-crew-picker');
  if(!picker)return;
  const search=document.getElementById('dl-crew-search');
  picker.querySelectorAll('.crew-tag').forEach(t=>t.remove());
  crewSelected.forEach(name=>{
    const tag=document.createElement('div');
    tag.className='crew-tag';
    tag.style.cssText='display:inline-flex;align-items:center;gap:5px;background:var(--amber-pale);border:1px solid var(--border-hi);border-radius:5px;padding:2px 8px;font-size:12px;color:var(--amber);white-space:nowrap;cursor:default';
    tag.innerHTML=`${name} <span onclick="removeCrewMember('${name.replace(/'/g,"\\'")}');event.stopPropagation()" style="cursor:pointer;font-size:15px;color:var(--text-3);line-height:1" title="Remove">×</span>`;
    picker.insertBefore(tag,search);
  });
}
document.addEventListener('click',function(e){
  const dd=document.getElementById('dl-crew-dropdown');
  const picker=document.getElementById('dl-crew-picker');
  if(dd&&picker&&!picker.contains(e.target)&&!dd.contains(e.target)){dd.style.display='none';}
});

// ════════════════════════════════════════════
// WHO'S ON SHIFT WIDGET
// ════════════════════════════════════════════
function renderOnShiftWidget(){
  const el=document.getElementById('ovOnShift');
  const sub=document.getElementById('ovOnShiftSub');
  if(!el)return;
  const today=nowDate();
  const todayShifts=shiftHistory.filter(s=>s.date===today);
  const allActive=[];
  if(activeShift){
    allActive.push({name:activeShift.name,role:activeShift.role,vehicle:activeShift.vehicle||'—',start:document.getElementById('shActStart')?.textContent||'—',deliveries:activeShift.deliveries,live:true});
  }
  if(sub)sub.textContent=allActive.length?allActive.length+' currently active':'No one currently clocked in';
  if(!allActive.length&&!todayShifts.length){
    el.innerHTML='<div style="padding:16px;text-align:center;font-size:12px;color:var(--text-3);font-family:\'JetBrains Mono\',monospace">No active shifts right now</div>';
    return;
  }
  var html='';
  if(allActive.length){
    html+='<div style="padding:8px 16px 4px;font-size:9px;color:var(--green);font-family:\'JetBrains Mono\',monospace;letter-spacing:2px;text-transform:uppercase">● Live Now</div>';
    allActive.forEach(function(s){
      var ini=(s.name.split(' ').map(function(w){return w[0]||'';}).join('')).toUpperCase().slice(0,2);
      html+='<div style="display:flex;align-items:center;gap:10px;padding:9px 16px;border-bottom:1px solid rgba(255,255,255,.03)">'
        +'<div style="width:32px;height:32px;background:linear-gradient(135deg,var(--green),#16a34a);border-radius:var(--r);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;flex-shrink:0;box-shadow:0 0 8px rgba(34,197,94,.3)">'+ini+'</div>'
        +'<div style="flex:1"><div style="font-size:13px;font-weight:600">'+s.name+'</div><div style="font-size:10px;color:var(--text-3);font-family:\'JetBrains Mono\',monospace">'+s.role+(s.vehicle&&s.vehicle!=='—'?' · 🚛 '+s.vehicle:'')+'</div></div>'
        +'<div style="text-align:right"><div style="font-size:10px;color:var(--green);font-family:\'JetBrains Mono\',monospace">Since '+s.start+'</div><div style="font-size:10px;color:var(--amber);margin-top:1px">'+s.deliveries+' deliveries</div></div>'
        +'</div>';
    });
  }
  if(todayShifts.length){
    html+='<div style="padding:8px 16px 4px;font-size:9px;color:var(--text-3);font-family:\'JetBrains Mono\',monospace;letter-spacing:2px;text-transform:uppercase">Completed Today</div>';
    todayShifts.slice(0,5).forEach(function(s){
      var ini=(s.name.split(' ').map(function(w){return w[0]||'';}).join('')).toUpperCase().slice(0,2);
      html+='<div style="display:flex;align-items:center;gap:10px;padding:8px 16px;border-bottom:1px solid rgba(255,255,255,.03);opacity:.7">'
        +'<div style="width:28px;height:28px;background:var(--surface2);border:1px solid var(--border);border-radius:var(--r);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:var(--text-2);flex-shrink:0">'+ini+'</div>'
        +'<div style="flex:1"><div style="font-size:12px;font-weight:500">'+s.name+'</div><div style="font-size:10px;color:var(--text-3);font-family:\'JetBrains Mono\',monospace">'+s.startTime+' — '+s.endTime+'</div></div>'
        +'<div style="font-size:11px;color:var(--text-2);font-family:\'JetBrains Mono\',monospace">'+s.durationShort+'</div>'
        +'</div>';
    });
  }
  el.innerHTML=html;
}

function copyCredentials(){
  const name=document.getElementById('credName').textContent;
  const user=document.getElementById('credUser').textContent;
  const pw=document.getElementById('credPw').textContent;
  const role=document.getElementById('credRole').textContent;
  const text=`Aurum Energy — Operations Portal\nNew Account Credentials\n\nName: ${name}\nRole: ${role}\nUsername: ${user}\nPassword: ${pw}\n\nLogin at: https://justinsmythy.github.io\nYou must be verified by a Manager before you can log in.\nPlease change your password after first login.`;
  navigator.clipboard.writeText(text).then(()=>toast('📋','Credentials copied to clipboard!','var(--green)')).catch(()=>toast('⚠️','Copy failed — please copy manually.','var(--orange)'));
}


// ════════════════════════════════════════════
// SESSION RESTORE + BOOT
// ════════════════════════════════════════════
(function bootApp(){
  const _bm=document.querySelector('.main');
  if(_bm){_bm.style.backgroundImage='url('+_BG_DL+')';_bm.style.backgroundSize='cover';_bm.style.backgroundPosition='center';}
  // Check for saved IC portal session (interview applicant)
  const savedIcPhone=lsLoad(LS_KEYS.icSession,null);
  if(savedIcPhone){
    const appl=applications.find(a=>a.status==='interview'&&a.phone===savedIcPhone);
    if(appl){icpEnter(appl,true);return;}
  }
  const savedUsername=lsLoad(LS_KEYS.session,null);
  if(savedUsername){
    const acc=accounts.find(a=>a.username===savedUsername&&a.status==='verified');
    if(acc){
      currentUser=acc;
      refreshAll();
      document.getElementById('authWrap').style.display='none';
      document.getElementById('app').classList.add('on');
      document.getElementById('sbAv').textContent=acc.initials;
      document.getElementById('sbName').textContent=acc.name;
      document.getElementById('sbRole').textContent=acc.role+' · #'+acc.badge;
      document.getElementById('adminNav').style.display=(['Manager','Supervisor'].includes(acc.role))?'block':'none';
      updateChips();populateRoleSelects();
      var _lp=localStorage.getItem('ae_last_page');showPage(_lp||'stats');
      ['dl-badge','fr-badge','ir-badge','sf-badge','rr-badge'].forEach(id=>{const el=document.getElementById(id);if(el)el.value=acc.badge;});
      ['dl-name','fr-name','ir-name','sf-name','rr-name'].forEach(id=>{const el=document.getElementById(id);if(el)el.value=acc.name;});
      ['dl-rank','fr-rank','ir-rank','sf-role','rr-rank'].forEach(id=>{const el=document.getElementById(id);if(el)el.value=acc.role;});
      return;
    }
  }
  refreshAll();
  document.getElementById('authWrap').style.display='flex';
  authTab('login');
})();

// ════════════════════════════════════════════
// IC EMAIL PORTAL — DATA
// ════════════════════════════════════════════
const icMessages=lsLoad(LS_KEYS.icMessages,[]);
let icCurrentApplicant=null;
let icSelectedMsgId=null;
let icCurrentFolder='inbox';
let icHrViewApplicantPhone=null;

function icpEnter(appl,fromRestore){
  icCurrentApplicant=appl;
  if(!fromRestore)lsSave(LS_KEYS.icSession,appl.phone);
  document.getElementById('authWrap').style.display='none';
  document.getElementById('app').classList.remove('on');
  document.getElementById('icPortal').classList.add('on');
  const initials=(appl.name.split(' ').map(w=>w[0]||'').join('')).toUpperCase().slice(0,2);
  document.getElementById('icpAv').textContent=initials;
  document.getElementById('icpName').textContent=appl.name;
  icpSwitchFolder('inbox');
  const existing=icMessages.filter(m=>m.applicantPhone===appl.phone);
  if(!existing.length){
    icMessages.unshift({id:'msg_'+Date.now(),applicantPhone:appl.phone,from:'hr',
      subject:'Welcome to the Aurum Energy Interview Process',
      body:'Dear '+appl.name+',\n\nThank you for your application to join Aurum Energy.\n\nWe are pleased to inform you that your application for the position of '+appl.role+' has progressed to the interview stage.\n\nThis inbox is your official communication channel with the Aurum Energy HR team during this process. Please check here regularly for updates, scheduling information, and any questions we may have for you.\n\nIf you have any questions in the meantime, please use the Compose button to reach us directly.\n\nWe look forward to speaking with you soon.\n\nKind regards,\nHR Department\nAurum Energy',
      date:nowDate(),time:nowTime(),read:false});
    persist('icMessages');
  }
  icpRenderFolder();
}
function icpSwitchFolder(folder){
  icCurrentFolder=folder;icSelectedMsgId=null;
  document.querySelectorAll('.icp-sb-item').forEach(el=>el.classList.remove('on'));
  const idx={'inbox':0,'sent':1,'status':2}[folder]||0;
  document.querySelectorAll('.icp-sb-item')[idx]?.classList.add('on');
  const listEl=document.getElementById('icpEmailList');
  const titleEl=document.getElementById('icpFolderTitle');
  const composeBtn=document.getElementById('icpComposeBtn');
  const viewerContent=document.getElementById('icpViewerContent');
  const viewerEmpty=document.getElementById('icpViewerEmpty');
  const statusView=document.getElementById('icpStatusView');
  if(viewerContent)viewerContent.style.display='none';
  if(statusView)statusView.style.display='none';
  if(viewerEmpty)viewerEmpty.style.display='flex';
  if(folder==='status'){
    titleEl.textContent='My Application';composeBtn.style.display='none';listEl.innerHTML='';
    if(statusView){statusView.style.display='flex';if(viewerEmpty)viewerEmpty.style.display='none';
      document.getElementById('icpStatusName').textContent=icCurrentApplicant?.name||'—';
      document.getElementById('icpStatusRole').textContent=(icCurrentApplicant?.role||'—')+' · '+(icCurrentApplicant?.division||'Aurum Energy — Operations');}
    return;
  }
  titleEl.textContent=folder==='inbox'?'Inbox':'Sent';
  composeBtn.style.display=folder==='sent'?'none':'block';
  icpRenderFolder();
}
function icpRenderFolder(){
  const listEl=document.getElementById('icpEmailList');
  if(!listEl||!icCurrentApplicant)return;
  const phone=icCurrentApplicant.phone;
  let msgs;
  if(icCurrentFolder==='inbox') msgs=icMessages.filter(m=>m.applicantPhone===phone&&m.from==='hr');
  else msgs=icMessages.filter(m=>m.applicantPhone===phone&&m.from==='applicant');
  msgs=msgs.slice().sort((a,b)=>(b.date+b.time).localeCompare(a.date+a.time));
  const unread=icMessages.filter(m=>m.applicantPhone===phone&&m.from==='hr'&&!m.read).length;
  const ub=document.getElementById('icpUnreadCount');
  if(ub){ub.style.display=unread>0?'inline':'none';ub.textContent=unread;}
  if(!msgs.length){listEl.innerHTML='<div style="padding:28px 16px;text-align:center;color:var(--text-3);font-size:12px;font-family:JetBrains Mono,monospace">'+(icCurrentFolder==='inbox'?'No messages yet':'Nothing sent yet')+'</div>';return;}
  listEl.innerHTML=msgs.map(m=>{
    const isUnread=!m.read&&m.from==='hr';
    const preview=m.body.replace(/\n/g,' ').slice(0,55)+'…';
    const fromLabel=m.from==='hr'?'HR Department — Aurum Energy':icCurrentApplicant.name;
    return `<div class="icp-email-row${isUnread?' unread':''}${icSelectedMsgId===m.id?' on':''}" onclick="icpOpenMsg('${m.id}')">
      <div class="icp-em-from">${fromLabel}</div>
      <div class="icp-em-subject">${m.subject}</div>
      <div class="icp-em-preview">${preview}</div>
      <div class="icp-em-time">${m.date}</div>
    </div>`;
  }).join('');
}
function icpOpenMsg(id){
  icSelectedMsgId=id;
  const msg=icMessages.find(m=>m.id===id);if(!msg)return;
  if(!msg.read){msg.read=true;persist('icMessages');}
  icpRenderFolder();
  document.getElementById('icpViewerEmpty').style.display='none';
  document.getElementById('icpStatusView').style.display='none';
  const vc=document.getElementById('icpViewerContent');
  vc.style.cssText='display:flex;flex:1;flex-direction:column;overflow:hidden;';
  document.getElementById('icpMsgSubject').textContent=msg.subject;
  document.getElementById('icpMsgFrom').textContent=msg.from==='hr'?'HR Department — Aurum Energy':icCurrentApplicant?.name||'You';
  document.getElementById('icpMsgDate').textContent=msg.date+' at '+msg.time;
  document.getElementById('icpMsgBody').textContent=msg.body;
  const replyArea=document.getElementById('icpReplyArea');
  if(replyArea){replyArea.style.display=msg.from==='hr'?'flex':'none';replyArea.style.flexDirection='column';}
  document.getElementById('icpReplyText').value='';
}
function icpSendReply(){
  const text=document.getElementById('icpReplyText').value.trim();
  if(!text){toast('⚠️','Please type a reply first.','var(--orange)');return;}
  const origMsg=icMessages.find(m=>m.id===icSelectedMsgId);
  icMessages.unshift({id:'msg_'+Date.now(),applicantPhone:icCurrentApplicant.phone,from:'applicant',
    subject:'Re: '+(origMsg?.subject||''),body:text,date:nowDate(),time:nowTime(),read:true});
  persist('icMessages');
  document.getElementById('icpReplyText').value='';
  toast('📤','Reply sent to HR.','var(--green)');icpRenderFolder();
}
function icpOpenCompose(){
  document.getElementById('icpComposeOverlay').classList.add('open');
  document.getElementById('icpComposeSubject').value='';
  document.getElementById('icpComposeBody').value='';
}
function icpCloseCompose(){document.getElementById('icpComposeOverlay').classList.remove('open');}
function icpSendCompose(){
  const subj=document.getElementById('icpComposeSubject').value.trim();
  const body=document.getElementById('icpComposeBody').value.trim();
  if(!subj||!body){toast('⚠️','Please fill in subject and message.','var(--orange)');return;}
  icMessages.unshift({id:'msg_'+Date.now(),applicantPhone:icCurrentApplicant.phone,from:'applicant',
    subject:subj,body:body,date:nowDate(),time:nowTime(),read:true});
  persist('icMessages');icpCloseCompose();
  toast('📤','Message sent to HR.','var(--green)');icpSwitchFolder('sent');
}
function moveToInterview(i){
  if(!isAdmin()){toast('🚫','Supervisors and Managers only.','var(--red)');return;}
  applications[i].status='interview';persist('applications');renderApplications();updateChips();
  toast('📅',applications[i].name+' moved to Interview stage.','var(--blue)');
}
function openHrMessages(i){
  const a=applications[i];if(!a)return;
  icHrViewApplicantPhone=a.phone;
  document.getElementById('hrMsgApplicantName').textContent=a.name+' — '+a.role;
  hrRenderThread();openModal('hrMsgModal');
}
function hrRenderThread(){
  const w=document.getElementById('hrMsgThread');if(!w||!icHrViewApplicantPhone)return;
  const msgs=icMessages.filter(m=>m.applicantPhone===icHrViewApplicantPhone).slice().sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time));
  if(!msgs.length){w.innerHTML='<div style="text-align:center;padding:18px;color:var(--text-3);font-size:12px;font-family:JetBrains Mono,monospace">No messages yet. Send one below.</div>';return;}
  w.innerHTML=msgs.map(m=>`
    <div style="display:flex;flex-direction:column;align-items:${m.from==='hr'?'flex-start':'flex-end'}">
      <div class="hr-msg ${m.from==='hr'?'from-hr':'from-applicant'}">
        <div style="font-size:10px;font-family:JetBrains Mono,monospace;color:${m.from==='hr'?'var(--amber)':'var(--text-3)'};margin-bottom:4px;letter-spacing:1px">${m.subject}</div>
        ${m.body}
      </div>
      <div class="hr-msg-meta ${m.from==='hr'?'':'right'}">${m.from==='hr'?'HR · ':'Applicant · '}${m.date} ${m.time}</div>
    </div>`).join('');
  w.scrollTop=w.scrollHeight;
}
function hrSendMessage(){
  const text=document.getElementById('hrMsgInput').value.trim();
  if(!text||!icHrViewApplicantPhone){toast('⚠️','Type a message first.','var(--orange)');return;}
  icMessages.unshift({id:'msg_'+Date.now(),applicantPhone:icHrViewApplicantPhone,from:'hr',
    subject:'Message from HR — Aurum Energy',body:text,date:nowDate(),time:nowTime(),read:false});
  persist('icMessages');
  document.getElementById('hrMsgInput').value='';hrRenderThread();
  toast('📤','Message sent to applicant.','var(--green)');
}
document.getElementById('icpComposeOverlay')?.addEventListener('click',function(e){if(e.target===this)icpCloseCompose();});

// Restore IC session on load
(function restoreIcSession(){
  const phone=lsLoad(LS_KEYS.icSession,null);
  if(!phone)return;
  const appl=applications.find(a=>a.phone===phone&&a.status==='interview');
  if(appl)icpEnter(appl,true);
})();


