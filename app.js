// ════════════════════════════════════════════
// DATA — runtime arrays, seeded via api.js
// All persistence is handled exclusively in api.js.
// Nothing here calls localStorage directly.
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
const accounts             = [];
const pendingResets        = fetchPendingResets();
const applications         = fetchApplications();
const deliveryLogs         = fetchDeliveryLogs();
const fieldReports         = fetchFieldReports();
const incidentReports      = fetchIncidentReports();
const clients              = fetchClients();
const fleet                = fetchFleet();
const orders               = fetchOrders();
const shiftHistory         = fetchShiftHistory();
const assignedShifts       = fetchAssignedShifts();
const customRoles          = fetchCustomRoles();
const maintenanceServiceLogs = fetchMaintenanceLogs();
const roleLogs             = fetchRoleLogs();
const reimbursementRequests = fetchReimbursements();
const icMessages           = fetchIcMessages();

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
// SHARED HELPERS
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
// MODAL + TOAST
// ════════════════════════════════════════════
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
// PAGE ROUTER
// ════════════════════════════════════════════
function showPage(id){
  if(currentUser) saveLastPage(id);
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('on'));
  const pg=document.getElementById('page-'+id);if(pg)pg.classList.add('on');
  const _m=document.querySelector('.main');
  if(_m){
    if(id==='stats'){_m.style.backgroundImage='url('+_BG_STATS+')';_m.style.backgroundSize='cover';_m.style.backgroundPosition='center';}
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
    else{_m.style.backgroundImage='none';}
  }
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
  if(id==='fleet'){renderFleet(fleet);updateFleetStats();}
  if(id==='maintenance'){renderMaintDamage();renderMaintService();populateMaintVehicleSelect();}
  if(id==='orders'){populateOrderDriverSelect();renderOrders(orders);}
  if(id==='reimbursement'){renderRR();updateRRStats();populateOrderRefSelects();}
  if(id==='reimbursement-form'){populateOrderRefSelects();if(currentUser){const rb=document.getElementById('rr-badge');if(rb&&!rb.value)rb.value=currentUser.badge;const rn=document.getElementById('rr-name');if(rn&&!rn.value)rn.value=currentUser.name;const rr=document.getElementById('rr-rank');if(rr)rr.value=currentUser.role;}}
  if(id==='information')renderRoles();
}
document.querySelectorAll('.si[data-page]').forEach(n=>n.addEventListener('click',()=>showPage(n.dataset.page)));
document.querySelectorAll('.ftabs').forEach(tabs=>tabs.querySelectorAll('.ftab').forEach(tab=>tab.addEventListener('click',()=>{tabs.querySelectorAll('.ftab').forEach(t=>t.classList.remove('on'));tab.classList.add('on');})));

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
// STATS DASHBOARD — company overview
// ════════════════════════════════════════════
function renderCompanyOverview(){
  const now=new Date();
  const todayStr=nowDate();

  const elDeliveries=document.getElementById('ovDeliveries');if(elDeliveries)elDeliveries.textContent=deliveryLogs.length;
  const elFleet=document.getElementById('ovFleet');if(elFleet)elFleet.textContent=fleet.filter(f=>f.status==='Operational').length+' / '+fleet.length;
  const elOrders=document.getElementById('ovOrders');if(elOrders)elOrders.textContent=orders.filter(o=>o.status!=='Completed').length;
  const elShifts=document.getElementById('ovShifts');if(elShifts)elShifts.textContent=shiftHistory.filter(s=>s.date===todayStr).length;
  const elStaff=document.getElementById('ovStaff');if(elStaff)elStaff.textContent=accounts.filter(a=>a.status==='verified').length;
  const elIncidents=document.getElementById('ovIncidents');if(elIncidents)elIncidents.textContent=incidentReports.filter(r=>r.status==='Open — Under Review').length;
  const elDmg=document.getElementById('ovDamage');
  if(elDmg){
    const serviced=new Set(maintenanceServiceLogs.filter(s=>s.statusAfter==='Operational'||s.statusAfter==='Off Duty').map(s=>s.plate));
    elDmg.textContent=deliveryLogs.filter(r=>r.rep&&r.rep!=='none'&&!serviced.has(r.vehicle)).length;
  }
  const elReimb=document.getElementById('ovReimb');if(elReimb)elReimb.textContent=reimbursementRequests.filter(r=>r.status==='Pending').length;

  // Weekly deliveries sparkline (last 7 days)
  const spark=document.getElementById('ovSpark');
  if(spark){
    const days=[];for(let i=6;i>=0;i--){const d=new Date(now-i*24*60*60*1000);days.push(d.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}));}
    const counts=days.map(d=>deliveryLogs.filter(r=>r.date===d).length);
    const max=Math.max(...counts,1);
    spark.innerHTML=counts.map((c,i)=>`<div title="${days[i]}: ${c} deliveries" style="flex:1;background:${c>0?'var(--amber)':'var(--surface2)'};height:${Math.max(4,Math.round(c/max*38))}px;border-radius:2px 2px 0 0;transition:height .3s ease"></div>`).join('');
  }

  // Recent activity feed
  const feed=document.getElementById('ovFeed');
  if(feed){
    const recent=[
      ...deliveryLogs.slice(0,5).map(r=>({ts:r.date+' '+r.time,ico:'📦',text:r.name+' logged a delivery — '+r.vehicle,sub:r.orderRef||'No order linked'})),
      ...fieldReports.slice(0,3).map(r=>({ts:r.date+' '+r.time,ico:'🛑',text:r.name+' filed a field report',sub:r.type+' · '+r.location})),
      ...incidentReports.slice(0,3).map(r=>({ts:r.date+' '+r.time,ico:'🚨',text:r.name+' reported an incident',sub:r.type+' — '+r.severity})),
      ...shiftHistory.slice(0,3).map(s=>({ts:s.date+' '+s.startTime,ico:'⏱',text:s.name+' completed a shift',sub:s.durationShort+' · '+s.deliveries+' deliveries'})),
    ].sort((a,b)=>b.ts.localeCompare(a.ts)).slice(0,8);
    if(!recent.length){feed.innerHTML='<div style="padding:18px;text-align:center;font-size:12px;color:var(--text-3);font-family:JetBrains Mono,monospace">No activity yet.</div>';return;}
    feed.innerHTML=recent.map(a=>`<div style="display:flex;align-items:flex-start;gap:10px;padding:9px 14px;border-bottom:1px solid rgba(255,255,255,.03)"><span style="font-size:14px;margin-top:1px">${a.ico}</span><div><div style="font-size:12px;font-weight:500;color:var(--text)">${a.text}</div><div style="font-size:10px;color:var(--text-3);font-family:'JetBrains Mono',monospace;margin-top:1px">${a.sub} · ${a.ts}</div></div></div>`).join('');
  }

  renderOnShiftWidget();
}

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

// ════════════════════════════════════════════
// LEADERBOARD
// ════════════════════════════════════════════
function renderLeaderboard(){
  var w=document.getElementById('lbWrap');if(!w)return;
  var emp={};
  accounts.filter(a=>a.status==='verified').forEach(a=>{emp[a.name]={name:a.name,role:a.role,badge:a.badge,initials:a.initials||a.name.slice(0,2).toUpperCase(),deliveries:0,fieldReports:0,incidents:0,shifts:0,totalHrMs:0,maint:0};});
  deliveryLogs.forEach(r=>{if(emp[r.name])emp[r.name].deliveries++;});
  fieldReports.forEach(r=>{if(emp[r.name])emp[r.name].fieldReports++;});
  incidentReports.forEach(r=>{if(emp[r.name])emp[r.name].incidents++;});
  shiftHistory.forEach(s=>{if(emp[s.name]){emp[s.name].shifts++;emp[s.name].totalHrMs+=s.durationMs||0;}});
  maintenanceServiceLogs.forEach(s=>{if(s.tech&&emp[s.tech])emp[s.tech].maint++;});
  var sorted=Object.values(emp).map(e=>({...e,score:e.deliveries*3+e.fieldReports*2+e.shifts*5+e.maint*2})).sort((a,b)=>b.score-a.score);
  if(!sorted.length){w.innerHTML='<div class="empty"><div class="empty-ico">🏆</div><div class="empty-t">No Data Yet</div><div class="empty-s">Complete shifts and log deliveries to appear on the leaderboard.</div></div>';return;}
  var medals=['🥇','🥈','🥉'];
  var rows=sorted.map((e,i)=>{
    var isMe=currentUser&&e.name===currentUser.name;
    return'<tr style="animation:rowIn .3s ease '+(i*.04)+'s both'+(isMe?';background:rgba(232,160,32,.06)':'')+'">'
      +'<td style="font-size:16px;text-align:center">'+(medals[i]||'<span style="font-size:12px;color:var(--text-3)">#'+(i+1)+'</span>')+'</td>'
      +'<td><div style="display:flex;align-items:center;gap:9px"><div style="width:30px;height:30px;background:linear-gradient(135deg,var(--amber),var(--amber-dim));border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#000">'+e.initials+'</div><div><div class="dn">'+e.name+(isMe?' <span style="font-size:10px;color:var(--amber)">(You)</span>':'')+'</div><div class="dc">'+e.role+'</div></div></div></td>'
      +'<td><span class="mono" style="color:var(--amber)">'+e.badge+'</span></td>'
      +'<td style="font-size:13px;font-weight:700;color:var(--amber)">'+e.score+'</td>'
      +'<td style="font-size:13px;font-weight:600">'+e.shifts+'</td>'
      +'<td style="font-size:12px;color:var(--text-2)">'+fmtShort(e.totalHrMs)+'</td>'
      +'<td style="font-size:13px;font-weight:600;color:var(--amber)">'+e.deliveries+'</td>'
      +'<td style="font-size:13px;font-weight:600;color:var(--blue)">'+e.fieldReports+'</td>'
      +'<td style="font-size:13px;font-weight:600;color:var(--orange)">'+e.maint+'</td>'
      +'</tr>';
  }).join('');
  w.innerHTML='<table><thead><tr><th>#</th><th>Employee</th><th>Badge</th><th>Score</th><th>Shifts</th><th>Hours</th><th>Deliveries</th><th>Field Reports</th><th>Maintenance</th></tr></thead><tbody>'+rows+'</tbody></table>';
}

// ════════════════════════════════════════════
// PROCEDURES TABS
// ════════════════════════════════════════════
function showProcTab(tab){
  ['gas','cistern','large'].forEach(function(t){
    const el=document.getElementById('proc-'+t);
    const btn=document.getElementById('ptab-'+t);
    if(el)el.style.display=t===tab?'block':'none';
    if(btn){btn.style.background=t===tab?'var(--amber)':'var(--surface2)';btn.style.color=t===tab?'#000':'var(--text-3)';}
  });
}
function showFieldTab(tab){
  ['charger','turbine-op','turbine-stat','solar','substation','oilwell'].forEach(function(t){
    const el=document.getElementById('ftab-content-'+t);
    const btn=document.getElementById('ftab-'+t);
    if(el)el.style.display=t===tab?'block':'none';
    if(btn){btn.style.background=t===tab?'var(--amber)':'var(--surface2)';btn.style.color=t===tab?'#000':'var(--text-3)';}
  });
}

// ════════════════════════════════════════════
// MAP
// ════════════════════════════════════════════
function initMap(){
  const el=document.getElementById('mapFrame');if(!el)return;
  if(!el.src||el.src==='about:blank')el.src='https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d12089.819449085455!2d-118.24368!3d34.05223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus';
}

// ════════════════════════════════════════════
// REFRESH ALL — called on login / session restore
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
