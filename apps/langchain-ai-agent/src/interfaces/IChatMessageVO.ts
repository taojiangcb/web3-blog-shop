import { MessageType } from "@langchain/core/messages";

export default interface ChatMessageVO {
  role: MessageType;
  content: string;
  sessionId: string;
}