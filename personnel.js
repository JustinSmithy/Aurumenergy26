// ════════════════════════════════════════════
// PERSONNEL — accounts, roles, role logs, applications,
//             IC portal, shifts, my-shifts, my-stats,
//             crew picker, reimbursements
// ════════════════════════════════════════════

// ── ROLES ────────────────────────────────────
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
  saveCustomRoles(customRoles);
  logRoleEvent('Role Created',V('role-name'),'—',V('role-name'),currentUser?.name||'System');
  document.getElementById('role-name').value='';document.getElementById('role-desc').value='';
  closeModal('addRoleModal');renderRoles();populateRoleSelects();toast('✅','Role created!');
}
function deleteRole(i){
  const name=customRoles[i]?.name||'—';
  logRoleEvent('Role Deleted',name,name,'—',currentUser?.name||'System');
  customRoles.splice(i,1);saveCustomRoles(customRoles);renderRoles();populateRoleSelects();toast('🗑','Role deleted.','var(--text-3)');
}

// ── ROLE CHANGE LOGS ─────────────────────────
function logRoleEvent(action,subject,fromRole,toRole,actor){
  roleLogs.unshift({date:nowDate(),time:nowTime(),action,subject,fromRole,toRole,actor});
  saveRoleLogs(roleLogs);
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
function clearRoleLogs(){roleLogs.length=0;saveRoleLogs(roleLogs);renderRoleLogs();toast('🗑','Role logs cleared.','var(--text-3)');}

// ── ADMIN: ACCOUNTS ───────────────────────────
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
function verifyAcc(i){accounts[i].status='verified';savePersonnel(accounts);logRoleEvent('Account Verified',accounts[i].name,'—','Verified',currentUser?.name||'System');renderAccounts();toast('✅',accounts[i].name+' verified!');updateChips();}
function rejectAcc(i){accounts[i].status='rejected';savePersonnel(accounts);logRoleEvent('Account Rejected',accounts[i].name,'—','Rejected',currentUser?.name||'System');renderAccounts();toast('✕','Account rejected.','var(--red)');updateChips();}
function removeAcc(i){const n=accounts[i].name;logRoleEvent('Account Removed',n,accounts[i].role,'—',currentUser?.name||'System');accounts.splice(i,1);savePersonnel(accounts);renderAccounts();toast('🗑','Account removed.','var(--text-3)');}
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
  savePersonnel(accounts);
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
  savePersonnel(accounts);
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
  savePersonnel(accounts);
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
  savePersonnel(accounts);
  const user=accounts[i].username;
  const ri=pendingResets.findIndex(r=>r.username===user);if(ri>=0)pendingResets.splice(ri,1);
  savePendingResets(pendingResets);
  closeModal('resetPwModal');document.getElementById('rpNew').value='';
  renderAccounts();toast('🔑','Password reset successfully!','var(--green)');
}
function copyCredentials(){
  const name=document.getElementById('credName').textContent;
  const user=document.getElementById('credUser').textContent;
  const pw=document.getElementById('credPw').textContent;
  const role=document.getElementById('credRole').textContent;
  const text=`Aurum Energy — Operations Portal\nNew Account Credentials\n\nName: ${name}\nRole: ${role}\nUsername: ${user}\nPassword: ${pw}\n\nLogin at: https://justinsmythy.github.io\nYou must be verified by a Manager before you can log in.\nPlease change your password after first login.`;
  navigator.clipboard.writeText(text).then(()=>toast('📋','Credentials copied to clipboard!','var(--green)')).catch(()=>toast('⚠️','Copy failed — please copy manually.','var(--orange)'));
}

// ── ADMIN: APPLICATIONS ───────────────────────
function switchApplyDiv(div){
  const isOps=div==='ops';
  document.getElementById('apDivision').value=div;
  document.querySelectorAll('#apDivTabs .atab').forEach((t,i)=>t.classList.toggle('on',i===(isOps?0:1)));
  document.getElementById('apDivOpsInfo').style.display=isOps?'block':'none';
  document.getElementById('apDivCorpInfo').style.display=isOps?'none':'block';
  document.getElementById('apCorpFields').style.display=isOps?'none':'block';
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
  saveApplications(applications);
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
  savePersonnel(accounts);saveApplications(applications);
  renderApplications();updateChips();
  document.getElementById('credName').textContent=a.name;
  document.getElementById('credUser').textContent=uname;
  document.getElementById('credPw').textContent=pw;
  document.getElementById('credRole').textContent=a.role;
  openModal('credentialsModal');
}
function rejectApplication(i){applications[i].status='rejected';saveApplications(applications);renderApplications();updateChips();toast('✕','Application rejected.','var(--red)');}
function moveToInterview(i){
  if(!isAdmin()){toast('🚫','Supervisors and Managers only.','var(--red)');return;}
  applications[i].status='interview';saveApplications(applications);renderApplications();updateChips();
  toast('📅',applications[i].name+' moved to Interview stage.','var(--blue)');
}

// ── ADMIN: ASSIGN SHIFTS ──────────────────────
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
  saveAssignedShifts(assignedShifts);
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
function removeShift(i){assignedShifts.splice(i,1);saveAssignedShifts(assignedShifts);renderAssignedShifts();toast('🗑','Shift removed.','var(--text-3)');}

// ── SHIFT (employee) ──────────────────────────
setInterval(()=>{
  const now=new Date();
  const ce=document.getElementById('shClock');
  if(ce)ce.textContent=`${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;
  if(activeShift&&!activeShift.onBreak){const de=document.getElementById('shDur');if(de)de.textContent=fmtDur(Date.now()-activeShift.startMs-totalBreakMs);}
},1000);

setInterval(()=>{
  if(!currentUser)return;
  const now=new Date();
  const upcoming=assignedShifts.find(s=>s.employeeName===currentUser.name&&s.status==='accepted');
  if(!upcoming)return;
  try{
    const shiftDt=new Date(upcoming.date+' '+upcoming.startTime);
    const diffMin=Math.round((shiftDt-now)/60000);
    if(diffMin===30)toast('⏰','Your shift starts in 30 minutes! Head to Shift System when ready.','var(--amber)');
    if(diffMin===10)toast('⏰','Your shift starts in 10 minutes! Get ready.','var(--orange)');
    if(diffMin===0)toast('▶','Your shift is starting now! Go to Shift System to begin.','var(--green)');
  }catch(e){}
},60000);

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
  saveShiftHistory(shiftHistory);saveAssignedShifts(assignedShifts);
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

// ── MY SHIFTS ─────────────────────────────────
function acceptShift(i){
  const s=assignedShifts[i];if(!s)return;
  s.status='accepted';saveAssignedShifts(assignedShifts);updateChips();renderMyShifts();
  toast('✅','Shift accepted! You will be reminded when it is time.','var(--green)');
}
function declineShift(i){
  const s=assignedShifts[i];if(!s)return;
  s.status='declined';saveAssignedShifts(assignedShifts);updateChips();renderMyShifts();
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

// ── MY STATS ──────────────────────────────────
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
}

// ── CREW PICKER ───────────────────────────────
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

// ── IC EMAIL PORTAL ───────────────────────────
// icMessages array is declared and seeded in app.js via fetchIcMessages()
let icCurrentApplicant=null;
let icSelectedMsgId=null;
let icCurrentFolder='inbox';
let icHrViewApplicantPhone=null;

function icpEnter(appl,fromRestore){
  icCurrentApplicant=appl;
  if(!fromRestore)saveIcSession(appl.phone);
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
    saveIcMessages(icMessages);
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
  if(!msg.read){msg.read=true;saveIcMessages(icMessages);}
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
  saveIcMessages(icMessages);
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
  saveIcMessages(icMessages);icpCloseCompose();
  toast('📤','Message sent to HR.','var(--green)');icpSwitchFolder('sent');
}
document.getElementById('icpComposeOverlay')?.addEventListener('click',function(e){if(e.target===this)icpCloseCompose();});

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
  saveIcMessages(icMessages);
  document.getElementById('hrMsgInput').value='';hrRenderThread();
  toast('📤','Message sent to applicant.','var(--green)');
}

// ── REIMBURSEMENT REQUESTS ────────────────────
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
  saveReimbursements(reimbursementRequests);
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
function approveRR(i){if(!isAdmin())return;reimbursementRequests[i].status='Approved';saveReimbursements(reimbursementRequests);renderRR();updateRRStats();toast('✅','Request approved.','var(--green)');}
function rejectRR(i){if(!isAdmin())return;reimbursementRequests[i].status='Rejected';saveReimbursements(reimbursementRequests);renderRR();updateRRStats();toast('✕','Request rejected.','var(--red)');}

// ── IC SESSION RESTORE ────────────────────────
(function restoreIcSession(){
  const savedIcPhone = null;
  if(!savedIcPhone) return;

  const appl = applications.find(
    a => a.phone === savedIcPhone && a.status === 'interview'
  );

  if(appl) icpEnter(appl, true);
})();
