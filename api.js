// ════════════════════════════════════════════
// api.js — Data Access Layer
//
// All persistence is isolated here.
// Currently backed by localStorage so the app
// keeps working exactly as before.
//
// TO MIGRATE: replace each function body with
// a real fetch() call to your backend.
// Nothing outside this file touches localStorage
// or knows how data is stored.
// ════════════════════════════════════════════

// ── Internal localStorage helpers (private) ──
// These are the ONLY place in the codebase that
// should reference localStorage directly.
const supabase = window.supabase.createClient(
  "https://cjzjlfpccdlmqjadgdax.supabase.co",
  "sb_publishable_j89NCUX9ZNx9NiTvuqpEaQ_FjDM90uR"
);
const _LS = {
  get(key, fallback) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
    catch(e) { return fallback; }
  },
  set(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch(e) {}
  },
  remove(key) {
    try { localStorage.removeItem(key); } catch(e) {}
  }
};

// ── localStorage key registry (private) ──
const _K = {
  accounts:         'ae_accounts',
  pendingResets:    'ae_pendingResets',
  applications:     'ae_applications',
  deliveryLogs:     'ae_deliveryLogs',
  fieldReports:     'ae_fieldReports',
  incidentReports:  'ae_incidentReports',
  clients:          'ae_clients',
  fleet:            'ae_fleet',
  fleetVersion:     'ae_fleet_version',
  orders:           'ae_orders',
  shiftHistory:     'ae_shiftHistory',
  assignedShifts:   'ae_assignedShifts',
  customRoles:      'ae_customRoles',
  maintenanceLogs:  'ae_maintenanceLogs',
  roleLogs:         'ae_roleLogs',
  icMessages:       'ae_icMessages',
  reimbursements:   'ae_reimbursements',
  session:          'ae_session',
  icSession:        'ae_icSession',
  lastPage:         'ae_last_page',
};

// ════════════════════════════════════════════
// SESSION
// Manages which user is currently logged in.
// Replace with token/cookie handling when ready.
// ════════════════════════════════════════════

/**
 * loginUser(username, password)
 * Validates credentials and returns the matching
 * account object, or null on failure.
 * → Replace with: POST /api/auth/login
 */
function loginUser(username, password) {
  return accounts.find(
    a => a.username === username && a.password === password && a.status === 'verified'
  ) || null;
}

/**
 * saveSession(username)
 * Persists the logged-in username so the session
 * survives a page reload.
 * → Replace with: set httpOnly cookie / JWT storage
 */
function saveSession(username) {
  _LS.set(_K.session, username);
}

/**
 * loadSession()
 * Returns the previously saved username, or null.
 * → Replace with: read token from cookie / header
 */
function loadSession() {
  return _LS.get(_K.session, null);
}

/**
 * clearSession()
 * Destroys the current session token.
 * → Replace with: POST /api/auth/logout
 */
function clearSession() {
  _LS.set(_K.session, null);
}

/**
 * saveIcSession(phone)
 * Persists an interview-candidate portal session.
 * → Replace with: short-lived token or cookie
 */
function saveIcSession(phone) {
  _LS.set(_K.icSession, phone);
}

/**
 * loadIcSession()
 * Returns the saved IC portal phone number, or null.
 */
function loadIcSession() {
  return _LS.get(_K.icSession, null);
}

/**
 * clearIcSession()
 * Clears the IC portal session.
 */
function clearIcSession() {
  _LS.set(_K.icSession, null);
}

/**
 * saveLastPage(pageId)
 * Remembers which page the user was on.
 * → Replace with: user preference endpoint or drop entirely
 */
function saveLastPage(pageId) {
  _LS.set(_K.lastPage, pageId);
}

/**
 * loadLastPage()
 * Returns the last visited page id, or null.
 */
function loadLastPage() {
  return _LS.get(_K.lastPage, null);
}

/**
 * clearLastPage()
 */
function clearLastPage() {
  _LS.remove(_K.lastPage);
}

// ════════════════════════════════════════════
// PERSONNEL — accounts, pending resets, applications
// ════════════════════════════════════════════

/**
 * fetchPersonnel()
 * Returns all user accounts.
 * → Replace with: GET /api/personnel
 */
function fetchPersonnel() {
  return _LS.get(_K.accounts, DEFAULT_ACCOUNTS);
}

/**
 * savePersonnel(data)
 * Persists the full accounts array.
 * → Replace with: PUT /api/personnel  (or per-record PATCH)
 */
function savePersonnel(data) {
  _LS.set(_K.accounts, data);
}

/**
 * fetchPendingResets()
 * Returns all pending password-reset requests.
 * → Replace with: GET /api/personnel/resets
 */
function fetchPendingResets() {
  return _LS.get(_K.pendingResets, []);
}

/**
 * savePendingResets(data)
 * → Replace with: PUT /api/personnel/resets
 */
function savePendingResets(data) {
  _LS.set(_K.pendingResets, data);
}

/**
 * fetchApplications()
 * Returns all job applications.
 * → Replace with: GET /api/applications
 */
async function fetchApplications() {
  const { data, error } = await supabase
    .from('applications')
    .select('*');

  if (error) {
    console.error('Supabase error:', error);
    return [];
  }

  return data;
}
async function saveApplication(application) {
  const { error } = await supabase
    .from('applications')
    .upsert([application], { onConflict: 'id' });

  if (error) {
    console.error('[saveApplication]', error.message);
  }
}

// ════════════════════════════════════════════
// ROLES
// ════════════════════════════════════════════

/**
 * fetchCustomRoles()
 * Returns admin-created custom roles.
 * → Replace with: GET /api/roles/custom
 */
function fetchCustomRoles() {
  return _LS.get(_K.customRoles, []);
}

/**
 * saveCustomRoles(data)
 * → Replace with: PUT /api/roles/custom
 */
function saveCustomRoles(data) {
  _LS.set(_K.customRoles, data);
}

/**
 * fetchRoleLogs()
 * Returns role-change audit log entries.
 * → Replace with: GET /api/roles/logs
 */
function fetchRoleLogs() {
  return _LS.get(_K.roleLogs, []);
}

/**
 * saveRoleLogs(data)
 * → Replace with: POST /api/roles/logs  (append-only)
 */
function saveRoleLogs(data) {
  _LS.set(_K.roleLogs, data);
}

// ════════════════════════════════════════════
// FLEET & MAINTENANCE
// ════════════════════════════════════════════

const FLEET_VERSION = 'v3';

/**
 * fetchFleet()
 * Returns the fleet vehicle array, seeding with
 * DEFAULT_FLEET on first load or version mismatch.
 * → Replace with: GET /api/fleet
 *   (drop the version-stamp logic; server owns migrations)
 */
function fetchFleet() {
  const storedVer = localStorage.getItem(_K.fleetVersion);
  if (storedVer !== FLEET_VERSION) {
    _LS.remove(_K.fleet);
    _LS.set(_K.fleetVersion, FLEET_VERSION);
  }
  let stored = _LS.get(_K.fleet, null);
  if (!Array.isArray(stored) || !stored.length) {
    _LS.set(_K.fleet, DEFAULT_FLEET);
    return DEFAULT_FLEET.slice();
  }
  // Merge in any DEFAULT_FLEET vehicles not already stored
  const merged = [...stored];
  DEFAULT_FLEET.forEach(def => {
    if (!merged.find(v => v.plate === def.plate && v.type === def.type))
      merged.push(def);
  });
  if (merged.length !== stored.length) _LS.set(_K.fleet, merged);
  return merged;
}

/**
 * saveFleet(fleetArray)
 * Persists the full fleet array after any mutation.
 * → Replace with: PATCH /api/fleet/:plate  (single vehicle)
 *   or PUT /api/fleet  (whole array)
 */
function saveFleet(data) {
  _LS.set(_K.fleet, data);
}

/**
 * fetchMaintenanceLogs()
 * Returns all maintenance / service log entries.
 * → Replace with: GET /api/maintenance
 */
function fetchMaintenanceLogs() {
  return _LS.get(_K.maintenanceLogs, []);
}

/**
 * saveMaintenanceLogs(data)
 * → Replace with: POST /api/maintenance  (append new entry)
 */
function saveMaintenanceLogs(data) {
  _LS.set(_K.maintenanceLogs, data);
}

// ════════════════════════════════════════════
// WORK ORDERS & OPERATIONS LOGS
// ════════════════════════════════════════════

/**
 * fetchDeliveryLogs()
 * → Replace with: GET /api/logs/delivery
 */
function fetchDeliveryLogs() {
  return _LS.get(_K.deliveryLogs, []);
}

/**
 * saveDeliveryLogs(data)
 * → Replace with: POST /api/logs/delivery  (new entry)
 */
function saveDeliveryLogs(data) {
  _LS.set(_K.deliveryLogs, data);
}

/**
 * fetchFieldReports()
 * → Replace with: GET /api/reports/field
 */
function fetchFieldReports() {
  return _LS.get(_K.fieldReports, []);
}

/**
 * saveFieldReports(data)
 * → Replace with: POST /api/reports/field
 */
function saveFieldReports(data) {
  _LS.set(_K.fieldReports, data);
}

/**
 * fetchIncidentReports()
 * → Replace with: GET /api/reports/incident
 */
function fetchIncidentReports() {
  return _LS.get(_K.incidentReports, []);
}

/**
 * saveIncidentReports(data)
 * → Replace with: POST /api/reports/incident
 */
function saveIncidentReports(data) {
  _LS.set(_K.incidentReports, data);
}

/**
 * fetchOrders()
 * → Replace with: GET /api/orders
 */
function fetchOrders() {
  return _LS.get(_K.orders, []);
}

/**
 * saveOrders(data)
 * → Replace with: PATCH /api/orders/:id  or  PUT /api/orders
 */
function saveOrders(data) {
  _LS.set(_K.orders, data);
}

/**
 * fetchClients()
 * → Replace with: GET /api/clients
 */
function fetchClients() {
  return _LS.get(_K.clients, []);
}

/**
 * saveClients(data)
 * → Replace with: PUT /api/clients/:id
 */
function saveClients(data) {
  _LS.set(_K.clients, data);
}

// ════════════════════════════════════════════
// SHIFTS
// ════════════════════════════════════════════

/**
 * fetchShiftHistory()
 * → Replace with: GET /api/shifts/history
 */
function fetchShiftHistory() {
  return _LS.get(_K.shiftHistory, []);
}

/**
 * saveShiftHistory(data)
 * → Replace with: POST /api/shifts/history  (new completed shift)
 */
function saveShiftHistory(data) {
  _LS.set(_K.shiftHistory, data);
}

/**
 * fetchAssignedShifts()
 * → Replace with: GET /api/shifts/assigned
 */
function fetchAssignedShifts() {
  return _LS.get(_K.assignedShifts, []);
}

/**
 * saveAssignedShifts(data)
 * → Replace with: PUT /api/shifts/assigned
 */
function saveAssignedShifts(data) {
  _LS.set(_K.assignedShifts, data);
}

// ════════════════════════════════════════════
// IC MESSAGES & REIMBURSEMENTS
// ════════════════════════════════════════════

/**
 * fetchIcMessages()
 * → Replace with: GET /api/ic/messages
 */
function fetchIcMessages() {
  return _LS.get(_K.icMessages, []);
}

/**
 * saveIcMessages(data)
 * → Replace with: POST /api/ic/messages  (new message)
 */
function saveIcMessages(data) {
  _LS.set(_K.icMessages, data);
}

/**
 * fetchReimbursements()
 * → Replace with: GET /api/reimbursements
 */
function fetchReimbursements() {
  return _LS.get(_K.reimbursements, []);
}

/**
 * saveReimbursements(data)
 * → Replace with: POST /api/reimbursements  (new request)
 *   or PATCH /api/reimbursements/:id  (status update)
 */
function saveReimbursements(data) {
  _LS.set(_K.reimbursements, data);
}
