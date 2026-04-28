// ════════════════════════════════════════════
// VEHICLES — fleet registry and maintenance
// ════════════════════════════════════════════

// ── INSURANCE EXPIRY HELPERS ──────────────────
function insExpiryStatus(v){
  if(!v)return null;
  var insuredOn,insDays;
  if(typeof v==='object'&&v.insuredOn){insuredOn=v.insuredOn;insDays=parseInt(v.insDays)||30;}
  else if(typeof v==='string'){
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

// ── FLEET ─────────────────────────────────────
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
}
document.getElementById('flSrch').addEventListener('input',e=>{const q=e.target.value.toLowerCase();renderFleet(fleet.filter(f=>f.plate.toLowerCase().includes(q)||f.type.toLowerCase().includes(q)||(f.category||'').toLowerCase().includes(q)));});

// ── MAINTENANCE ───────────────────────────────
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
  const dmgPlates=getDamageReports().map(r=>r.vehicle).filter(v=>!fleet.find(f=>f.plate===v));
  dmgPlates.forEach(p=>{if(p&&p!=='—')sel.innerHTML+=`<option value="${p}">${p} (from damage report)</option>`;});
  const techEl=document.getElementById('ms-tech');
  if(techEl&&currentUser&&!techEl.value)techEl.value=currentUser.name;
}
function getDamageReports(){
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
function renderMaintSvcAddBtn(){if(isAdmin())openModal('maintServiceModal');else toast('🚫','Supervisors and Managers only.','var(--red)');}
