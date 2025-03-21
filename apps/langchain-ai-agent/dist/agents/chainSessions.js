"use strict";
exports.id = 920;
exports.ids = [920];
exports.modules = {

/***/ 4075:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSession = getSession;
exports.createSession = createSession;
exports.deleteSession = deleteSession;
exports.clearExpiredSessions = clearExpiredSessions;
exports.getSessionCount = getSessionCount;
exports.getSessionList = getSessionList;
exports.sessionExists = sessionExists;
exports.sessionExpired = sessionExpired;
const memory_1 = __webpack_require__(635);
const mapping = new Map();
function getSession(sessionId) {
    if (sessionExpired(sessionId)) {
        deleteSession(sessionId);
    }
    if (!mapping.has(sessionId)) {
        const newSession = createSession(sessionId);
        return newSession;
    }
    const session = mapping.get(sessionId);
    return session;
}
function createSession(sessionId) {
    if (sessionExists(sessionId)) {
        throw new Error("Session already exists");
    }
    const expiration = 86400000;
    const newSession = {
        sessionId,
        history: new memory_1.ChatMessageHistory(),
        expiration: Date.now() + expiration,
    };
    mapping.set(sessionId, newSession);
    return newSession;
}
function deleteSession(sessionId) {
    mapping.delete(sessionId);
}
function clearExpiredSessions() {
    const now = Date.now();
    for (const [sessionId, session] of mapping) {
        if (session.expiration < now) {
            mapping.delete(sessionId);
        }
    }
}
function getSessionCount() {
    return mapping.size;
}
function getSessionList() {
    return Array.from(mapping.values());
}
function sessionExists(sessionId) {
    return mapping.has(sessionId);
}
function sessionExpired(sessionId) {
    const session = mapping.get(sessionId);
    if (session) {
        return session.expiration < Date.now();
    }
    return true;
}


/***/ })

};
;
//# sourceMappingURL=chainSessions.js.map