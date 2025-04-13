import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { enChatPrompt } from "./enChatPrompt";
import { AIMessage } from "@langchain/core/messages";
import { deleteSession, getSession } from "./chainSessions";
import {deepSeek} from "./LLM";

const chain = enChatPrompt.pipe(deepSeek);

const getMessageSession = (_sessionId: string) => {
  const session = getSession(_sessionId);
  return session!.history;
};

const chainWithHistory = new RunnableWithMessageHistory({
  runnable: chain,
  getMessageHistory: getMessageSession,
  inputMessagesKey: "input",
  historyMessagesKey: "history_message",
});

async function createTalk(sessionId: string) {
  const firstMessage = new AIMessage(
    "Hello, I'm JO, your English learning assistant, and today we can talk about something you're interested in."
  );
  const session = getSession(sessionId);
  await session!.history.addAIMessage(firstMessage.content as string);
  return firstMessage;
}

async function getHistoryTalks(sessionId: string) {
  const session = getSession(sessionId);
  const history = session!.history;
  const messages = await history.getMessages();
  return messages;
}

async function clearHistoryTalks(sessionId: string) {
  const session = getSession(sessionId);
  const history = session!.history;
  await history.clear();
}

export {
  chainWithHistory,
  createTalk,
  getHistoryTalks,
  clearHistoryTalks,
  deleteSession,
};
