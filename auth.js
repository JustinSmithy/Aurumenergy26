let _BG_DL = "https://i.postimg.cc/YqLfMBCd/login-background.jpg";

// ════════════════════════════════════════════
// AUTH — login, register, recover, logout, session, info panels
// ════════════════════════════════════════════

function showInfoPanel(key){
  const map={about:'infoAbout',services:'infoServices',safety:'infoSafety',contact:'infoContact'};
  const labelMap={about:'About Us',services:'Services',safety:'Safety',contact:'Contact'};
  const id=map[key];if(!id)return;
  document.querySelectorAll('.info-overlay').forEach(el=>el.classList.remove('open'));
  document.getElementById(id).classList.add('open');
  document.querySelectorAll('.auth-nav-link').forEach(el=>{
    el.classList.toggle('active', el.textContent.trim()===labelMap[key]);
  });
}
function closeInfoPanel(id){
  const el=document.getElementById(id);if(el)el.classList.remove('open');
  document.querySelectorAll('.auth-nav-link').forEach(el=>el.classList.remove('active'));
  const opEl=document.getElementById('navOperations');
  if(opEl)opEl.classList.add('active');
}
document.querySelectorAll('.info-overlay').forEach(el=>{
  el.addEventListener('click',function(e){if(e.target===this)closeInfoPanel(this.id);});
  const observer=new MutationObserver(()=>{
    if(el.classList.contains('open')){
      const body=el.querySelector('.info-panel-body');
      if(body)body.scrollTop=0;
    }
  });
  observer.observe(el,{attributes:true,attributeFilter:['class']});
});
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
  const uNorm=u.replace(/[^a-z0-9]/g,'');
  const appl=applications.find(a=>{
    const phoneNorm=(a.phone||'').toLowerCase().replace(/[^a-z0-9]/g,'');
    const nameNorm=(a.name||'').toLowerCase().trim();
    return a.status==='interview'&&(phoneNorm===uNorm||a.phone.toLowerCase().trim()===u)&&(p.toLowerCase().trim()===nameNorm);
  });
  if(appl){if(btn){btn.textContent='Sign In';btn.disabled=false;btn.style.opacity='';}icpEnter(appl);return;}
  const acc=loginUser(u,p);
  if(!acc){if(btn){btn.textContent='Sign In';btn.disabled=false;btn.style.opacity='';}document.getElementById('lErr').style.display='block';return;}
  document.getElementById('lErr').style.display='none';
  document.getElementById('authWrap').style.display='none';
  document.getElementById('app').classList.add('on');
  currentUser=acc;
  saveSession(acc.username);
  document.getElementById('sbAv').textContent=acc.initials;
  document.getElementById('sbName').textContent=acc.name;
  document.getElementById('sbRole').textContent=acc.role+' · #'+acc.badge;
  document.getElementById('adminNav').style.display=isAdmin()?'block':'none';
  updateChips();populateRoleSelects();refreshAll();clearLastPage();showPage('stats');
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
  savePersonnel(accounts);
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
  savePendingResets(pendingResets);
  err.style.display='none';ok.style.display='block';
}

function doLogout(){
  currentUser=null;activeShift=null;totalBreakMs=0;
  clearSession();
  document.getElementById('app').classList.remove('on');
  document.getElementById('authWrap').style.display='flex';
  document.getElementById('lUser').value='';document.getElementById('lPass').value='';
  authTab('login');
}
function icpLogout(){
  clearIcSession();
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
  const sc=document.getElementById('myShiftChip');
  if(sc&&currentUser){
    const hasShift=assignedShifts.some(s=>s.employeeName===currentUser.name&&(s.status==='assigned'||s.status==='accepted'));
    sc.style.display=hasShift?'inline':'none';
  }
}

// ════════════════════════════════════════════
// SESSION RESTORE + BOOT
// ════════════════════════════════════════════
(function bootApp(){
  const _bm=document.querySelector('.main');
  if(_bm){_bm.style.backgroundImage='url('+_BG_DL+')';_bm.style.backgroundSize='cover';_bm.style.backgroundPosition='center';}
  const savedIcPhone = null;
  if(savedIcPhone){
    const appl=applications.find(a=>a.status==='interview'&&a.phone===savedIcPhone);
    if(appl){icpEnter(appl,true);return;}
  }
  const savedUsername=loadSession();
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
      showPage(loadLastPage()||'stats');
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
