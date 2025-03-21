import { ChatMessageHistory } from "langchain/memory";

export interface Session {
  sessionId: string;
  history: ChatMessageHistory;
  expiration: number;
}

const mapping = new Map<string, Session>();

export function getSession(sessionId: string) {
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

export function createSession(sessionId: string) {
  if (sessionExists(sessionId)) {
    throw new Error("Session already exists");
  }
  const expiration = 86400000;
  const newSession = {
    sessionId,
    history: new ChatMessageHistory(),
    expiration: Date.now() + expiration,
  };
  mapping.set(sessionId, newSession);
  return newSession;
}

export function deleteSession(sessionId: string) {
  mapping.delete(sessionId);
}

export function clearExpiredSessions() {
  const now = Date.now();
  for (const [sessionId, session] of mapping) {
    if (session.expiration < now) {
      mapping.delete(sessionId);
    }
  }
}
export function getSessionCount() {
  return mapping.size;
}

export function getSessionList() {
  return Array.from(mapping.values());
}

export function sessionExists(sessionId: string) {
  return mapping.has(sessionId);
}

export function sessionExpired(sessionId: string) {
  const session = mapping.get(sessionId);
  if (session) {
    return session.expiration < Date.now();
  }
  return true;
}
