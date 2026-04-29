// ===== GLOBAL STUB FIXES =====

// prevent missing function crashes
function fetchPendingResets() { return []; }
function loadIcSession() { return null; }
function checkInsuranceExpiry() {}

// prevent variable before initialization crashes
var activeShift = null;

// prevent background error
var _BG_DL = "https://i.postimg.cc/YqLfMBCd/login-background.jpg";
