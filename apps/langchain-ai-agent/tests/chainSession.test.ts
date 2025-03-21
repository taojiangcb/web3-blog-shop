import {
  getSession,
  createSession,
  deleteSession,
  clearExpiredSessions,
  getSessionCount,
  getSessionList,
  sessionExists,
  sessionExpired,
} from '../src/agents/chainSessions';

describe('ChainSessions', () => {
  beforeEach(() => {
    // 清理所有会话
    const sessions = getSessionList();
    sessions.forEach(session => deleteSession(session.sessionId));
  });

  test('创建新会话', () => {
    const sessionId = 'test-session-1';
    const session = createSession(sessionId);
    
    expect(session.sessionId).toBe(sessionId);
    expect(session.history).toBeDefined();
    expect(session.expiration).toBeGreaterThan(Date.now());
  });

  test('获取已存在的会话', () => {
    const sessionId = 'test-session-2';
    const createdSession = createSession(sessionId);
    const retrievedSession = getSession(sessionId);
    
    expect(retrievedSession).toEqual(createdSession);
  });

  test('删除会话', () => {
    const sessionId = 'test-session-3';
    createSession(sessionId);
    expect(sessionExists(sessionId)).toBe(true);
    
    deleteSession(sessionId);
    expect(sessionExists(sessionId)).toBe(false);
  });

  test('会话过期检查', () => {
    const sessionId = 'test-session-4';
    const session = createSession(sessionId);
    
    // 模拟会话过期
    session.expiration = Date.now() - 1000;
    expect(sessionExpired(sessionId)).toBe(true);
  });

  test('清理过期会话', () => {
    const sessionId1 = 'test-session-5';
    const sessionId2 = 'test-session-6';
    
    const session1 = createSession(sessionId1);
    createSession(sessionId2);
    
    // 设置 session1 过期
    session1.expiration = Date.now() - 1000;
    
    clearExpiredSessions();
    
    expect(sessionExists(sessionId1)).toBe(false);
    expect(sessionExists(sessionId2)).toBe(true);
  });

  test('获取会话数量', () => {
    expect(getSessionCount()).toBe(0);
    
    createSession('test-session-7');
    createSession('test-session-8');
    
    expect(getSessionCount()).toBe(2);
  });

  test('重复创建会话应该抛出错误', () => {
    const sessionId = 'test-session-9';
    createSession(sessionId);
    
    expect(() => createSession(sessionId)).toThrow('Session already exists');
  });
});