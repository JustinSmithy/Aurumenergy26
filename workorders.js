// ════════════════════════════════════════════
// WORKORDERS — delivery logs, field reports,
//              incident reports, orders, clients
// ════════════════════════════════════════════

// ── POPULATE ORDER REF SELECTS ────────────────
function populateOrderRefSelects(){
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

// ── DELIVERY LOGS ─────────────────────────────
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
  saveDeliveryLogs(deliveryLogs);
  if(orderNum){
    const linkedOrder=orders.find(function(o){return o.number===orderNum;});
    if(linkedOrder&&linkedOrder.status!=='Completed'){
      linkedOrder.status='Completed';
      linkedOrder.completedAt=nowDate()+' '+nowTime();
      linkedOrder.completedBy=currentUser?currentUser.name:'—';
      saveOrders(orders);
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

// ── FIELD REPORTS ─────────────────────────────
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
function markFRComplete(i){if(!isAdmin())return;fieldReports[i].status='Completed';fieldReports[i].completedAt=nowDate()+' at '+nowTime();fieldReports[i].completedBy=currentUser?.name||'—';saveFieldReports(fieldReports);renderFR(fieldReports);updateFRStats();toast('✅','Field report marked as complete!','var(--green)');}
function submitFieldReport(){
  if(currentUser&&(V('fr-name').trim().toLowerCase()!==currentUser.name.trim().toLowerCase()||V('fr-badge').trim()!==currentUser.badge.trim())){toast('🚫','You can only submit on behalf of yourself.','var(--red)');return;}
  if(!V('fr-badge')||!V('fr-name')||!V('fr-type')||!V('fr-location')||!V('fr-vehicle')||!V('fr-outcome')||!V('fr-division')||!V('fr-desc')){toast('⚠️','Fill in all required fields.','var(--orange)');return;}
  const frTypeVal=V('fr-type')==='Other — Please Specify'?(V('fr-type-other')||V('fr-type')):V('fr-type');fieldReports.unshift({date:nowDate(),time:nowTime(),badge:V('fr-badge'),name:V('fr-name'),rank:V('fr-rank'),type:frTypeVal,location:V('fr-location'),vehicle:V('fr-vehicle'),outcome:V('fr-outcome'),parties:V('fr-parties'),division:V('fr-division'),orderRef:V('fr-order-ref'),status:V('fr-status')||'Open',crew:V('fr-crew'),fullDesc:V('fr-desc'),notes:V('fr-notes')});
  saveFieldReports(fieldReports);
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

// ── INCIDENT REPORTS ──────────────────────────
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
  saveIncidentReports(incidentReports);
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

// ── ORDERS ────────────────────────────────────
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
function markOrderComplete(i){if(!isAdmin())return;orders[i].status='Completed';orders[i].completedAt=nowDate()+' '+nowTime();orders[i].completedBy=currentUser?.name||'—';saveOrders(orders);updateOrderStats();renderOrders(orders);toast('✅','Order marked as complete!','var(--green)');}
function addOrder(){if(!isAdmin()){toast('🚫','Supervisors and Managers only.','var(--red)');return;}if(!V('ord-number')||!V('ord-title')||!V('ord-type')||!V('ord-division')){toast('⚠️','Fill in Order #, Division, Title and Type.','var(--orange)');return;}const ordTypeVal=V('ord-type')==='Other — Please Specify'?(V('ord-type-other')||V('ord-type')):V('ord-type');orders.unshift({date:nowDate(),time:nowTime(),number:V('ord-number'),division:V('ord-division'),title:V('ord-title'),client:V('ord-client'),type:ordTypeVal,priority:V('ord-priority')||'Normal',driver:V('ord-driver'),status:V('ord-status')||'Pending',notes:V('ord-notes'),locationImg:V('ord-location-img')});saveOrders(orders);['ord-number','ord-title','ord-client','ord-notes','ord-type-other','ord-location-img'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});['ord-type','ord-division'].forEach(id=>{const el=document.getElementById(id);if(el)el.selectedIndex=0;});closeModal('orderModal');updateOrderStats();renderOrders(orders);populateOrderRefSelects();toast('✅','Order created!');}
function cycleOrder(i){if(!isAdmin()){toast('🚫','Supervisors and Managers only.','var(--red)');return;}const s=orders[i].status;orders[i].status=s==='Pending'?'In Transit':s==='In Transit'?'Completed':'Pending';saveOrders(orders);updateOrderStats();renderOrders(orders);toast('🔄',`Status: ${orders[i].status}`,'var(--blue)');}
function delOrder(i){if(!isAdmin()){toast('🚫','Supervisors and Managers only.','var(--red)');return;}orders.splice(i,1);saveOrders(orders);updateOrderStats();renderOrders(orders);toast('🗑','Order removed.','var(--text-3)');}
function viewOrder(i){
  const o=orders[i];if(!o)return;
  const pC={'Low':'var(--text-2)','Normal':'var(--blue)','High':'var(--orange)','Urgent':'var(--red)'};
  document.getElementById('prevTitle').textContent='Order — '+(o.number?o.number+' · ':'')+o.title;
  const imgBlock=o.locationImg?`<div style="margin-top:14px;border-top:1px solid var(--border);padding-top:14px"><div style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:2px;color:var(--amber);text-transform:uppercase;margin-bottom:8px">📍 LOCATION IMAGE</div><img src="${o.locationImg}" alt="Location" style="width:100%;max-height:320px;object-fit:cover;border-radius:var(--r);border:1px solid var(--border)" onerror="this.parentElement.innerHTML='<div style=\'font-size:11px;color:var(--red);font-family:JetBrains Mono,monospace\'>⚠ Could not load image — check the URL is a valid direct Imgur link.</div>'"></div>`:'';
  document.getElementById('prevBody').innerHTML=`<div style="padding-bottom:12px;margin-bottom:14px;border-bottom:1px solid var(--border)"><div style="font-family:Space Grotesk,sans-serif;font-size:16px;font-weight:600;margin-bottom:3px">${o.title}</div><div class="mono" style="font-size:11px;color:var(--amber)">${o.number||'No Order #'} · ${o.division||'—'}</div><div class="mono" style="font-size:11px;color:var(--text-3)">${o.date} at ${o.time}</div></div>${pGrid(pRow('ORDER #',o.number||'—'),pRow('DIVISION',o.division||'—'),pRow('CLIENT',o.client||'—'),pRow('TYPE',o.type||'—'),pRow('PRIORITY',`<span style="color:${pC[o.priority]||'var(--text-2)'};font-weight:700">${o.priority||'—'}</span>`),pRow('ASSIGNED TO',o.driver||'Unassigned'),pRow('STATUS',o.status),o.completedAt?pRow('COMPLETED',o.completedAt+' by '+o.completedBy):'')}`+`${o.notes?`<div style="margin-top:8px">${pRow('DETAILS',o.notes)}</div>`:''}${imgBlock}`;
  openModal('prevModal');
}
document.getElementById('orSrch').addEventListener('input',e=>{const q=e.target.value.toLowerCase();renderOrders(orders.filter(o=>o.title.toLowerCase().includes(q)||o.client.toLowerCase().includes(q)));});

// ── CLIENTS ───────────────────────────────────
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
function addClient(){if(!isAdmin()){toast('🚫','Supervisors and Managers only.','var(--red)');return;}if(!V('cl-name')||!V('cl-contract')||!V('cl-status')){toast('⚠️','Fill in required fields.','var(--orange)');return;}clients.unshift({name:V('cl-name'),company:V('cl-company'),contract:V('cl-contract'),status:V('cl-status'),notes:V('cl-notes')});saveClients(clients);['cl-name','cl-company','cl-notes'].forEach(id=>document.getElementById(id).value='');['cl-contract','cl-status'].forEach(id=>document.getElementById(id).selectedIndex=0);closeModal('clientModal');updateClientStats();renderClients(clients);toast('✅','Client added!');}
function editClient(i){const c=clients[i];document.getElementById('ecl-idx').value=i;document.getElementById('ecl-name').value=c.name;document.getElementById('ecl-company').value=c.company||'';document.getElementById('ecl-contract').value=c.contract||'';document.getElementById('ecl-status').value=c.status;document.getElementById('ecl-notes').value=c.notes||'';openModal('editClientModal');}
function saveClient(){if(!isAdmin()){toast('🚫','Supervisors and Managers only.','var(--red)');return;}const i=parseInt(V('ecl-idx'));clients[i]={name:V('ecl-name'),company:V('ecl-company'),contract:V('ecl-contract'),status:V('ecl-status'),notes:V('ecl-notes')};saveClients(clients);closeModal('editClientModal');updateClientStats();renderClients(clients);toast('✅','Client updated!');}
function delClient(i){if(!isAdmin()){toast('🚫','Supervisors and Managers only.','var(--red)');return;}clients.splice(i,1);saveClients(clients);updateClientStats();renderClients(clients);toast('🗑','Client removed.','var(--text-3)');}
document.getElementById('clSrch').addEventListener('input',e=>{const q=e.target.value.toLowerCase();renderClients(clients.filter(c=>c.name.toLowerCase().includes(q)||(c.company||'').toLowerCase().includes(q)));});
