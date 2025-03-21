interface AiChatMessageVo {
  role: "human" | "ai";
  content: string;
  sessionId: string;
}

export default AiChatMessageVo;
