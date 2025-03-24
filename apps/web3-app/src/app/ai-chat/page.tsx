"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Avatar, message } from "antd";
import { SendOutlined, SyncOutlined, UserOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import { useRouter, useSearchParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Suspense } from "react";
import AiChatMessageVo from "@/defined-object/ai-chat-message-vo";

// API 基础 URL
const API_BASE_URL =
  process.env.NEXT_PUBLIC_LANGCHAIN_API_URL || "http://localhost:3000";

export default function AIChatPage() {
  return (
    <Suspense fallback={<span></span>}>
      <AIChatContent />
    </Suspense>
  );
}

function AIChatContent() {
  const [messages, setMessages] = useState<AiChatMessageVo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const [sessionId, setSessionId] = useState<string>(() => {
    const sessionId = searchParams.get("sessionId");
    return sessionId || "";
  });

  // 初始化对话线程
  useEffect(() => {
    const initThread = async () => {
      let sid = sessionId;
      if (!sid) {
        sid = uuidv4();
        router.push(`/ai-chat?sessionId=${sid}`);
      }

      try {
        // 获取历史消息
        const response = await fetch(
          `${API_BASE_URL}/api/history?sessionId=${sid}`
        );
        const data = await response.json();

        if (!data.data.length) {
          const initTalk = await fetch(
            `${API_BASE_URL}/api/createTalk?sessionId=${sid}`
          );
          const initTalkData = await initTalk.json();
          setMessages([initTalkData.data]);
        } else if (response.ok && data.data.length > 0) {
          setMessages(data.data);
        }
        setSessionId(sid);
      } catch (error) {
        console.error("Failed to initialize chat:", error);
        messageApi.error("初始化聊天失败");
      }
    };
    initThread();
  }, [sessionId]);

  // 自动滚动到最新消息
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesEndRef]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 发送消息
  const sendMessage = async () => {
    if (!inputValue.trim() || !sessionId) return;

    const userMessage: AiChatMessageVo = {
      role: "human",
      content: inputValue,
      sessionId: sessionId,
    };

    const newAssistantMessage: AiChatMessageVo = {
      role: "ai",
      content: "",
      sessionId: sessionId,
    };

    setInputValue("");
    setLoading(true);
    setMessages((prev) => [...prev, userMessage, newAssistantMessage]);

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
        },
        body: JSON.stringify({
          content: inputValue,
          sessionId: sessionId,
        }),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error("No response body");
      }

      let assistantMessage = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));
              assistantMessage += data.content;
              setMessages((prev) => [
                ...prev.slice(0, -1),
                { ...newAssistantMessage, content: assistantMessage },
              ]);
            } catch (e) {
              console.error("Failed to parse chunk:", e);
            }
          }
        }
      }
    } catch (error: any) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          ...prev[prev.length - 1],
          content: error?.message || "发生错误，请重试",
          isError: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // 处理按键事件
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <React.Fragment>
      <div className="h-full p-4 max-w-4xl mx-auto pb-20 backdrop-blur-md rounded-lg">
        {contextHolder}
        <div className="h-full overflow-auto p-4 ">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 my-8">
              你好我是你的英语 ai 学习助手，在这里我可以帮你提高英语交流水平
            </div>
          )}

          {messages.map((msg, index) => {
            let content = msg.content;
            if (Array.isArray(content)) {
              content = content[0].text;
            }

            // 将 \n 转换为实际换行符
            if (typeof content === "string") {
              content = content.replace(/\\n/g, "\n");
            }

            return (
              <div
                key={index}
                className={`mb-4 rounded-lg p-4 ${
                  msg.role === "human" ? "ml-12" : "mr-12"
                } bg-dark-lighter bg-opacity-30`}
              >
                <div className="flex items-start">
                  <Avatar
                    className="flex-none w-[30px]"
                    icon={
                      msg.role === "human" ? (
                        <UserOutlined />
                      ) : (
                        <img width={30} height={30} src="/ai-avatar.png" />
                      )
                    }
                  />
                  <div className="ml-3 mt-1 prose prose-invert max-w-none whitespace-pre-wrap break-words overflow-auto">
                    <ReactMarkdown
                      components={{
                        // 处理加粗文本
                        strong: ({ children }) => (
                          <span className="font-bold text-yellow-500">
                            {children}
                          </span>
                        ),
                        // 处理代码块
                        code: ({ node, className, children, ...props }) => {
                          if (className === "language-correction") {
                            return (
                              <div className="bg-gray-800 p-3 rounded-md mt-2 mb-2 whitespace-pre-wrap break-words">
                                {children}
                              </div>
                            );
                          }
                          return (
                            <pre className="bg-gray-800 p-3 rounded-md whitespace-pre-wrap break-words">
                              <code {...props}>{children}</code>
                            </pre>
                          );
                        },
                        // 添加段落处理
                        // 修改段落处理
                        p: ({ node, children, ...props }) => {
                          // 检查是否为最后一个段落
                          // Get the parent element's children array
                          const parentChildren =
                            (node as any)?.parent?.children || [];
                          // Check if current node is the last paragraph
                          const isLastParagraph =
                            parentChildren.indexOf(node) ===
                            parentChildren.length - 1;
                          return (
                            <p
                              className="whitespace-pre-wrap break-words"
                              {...props}
                            >
                              {children}
                              {/* {isLastParagraph && index === messages.length - 1 && loading && (
                                <SyncOutlined spin className="ml-1 inline-block" />
                              )} */}
                            </p>
                          );
                        },
                      }}
                    >
                      {typeof content === "string"
                        ? content
                        : JSON.stringify(content)}
                    </ReactMarkdown>
                    <span className="inline">
                      {index === messages.length - 1 && loading && (
                        <SyncOutlined spin className="ml-1 inline-block" />
                      )}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="fixed bottom-0 w-full bg-opacity-70 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto p-4">
          <div className="flex">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="输入您的英语问题或对话..."
              disabled={loading}
              // autoSize={{ minRows: 1, maxRows: 4 }}
              className="flex-grow"
            />
            <Button
              type="button"
              onClick={sendMessage}
              disabled={loading || !inputValue.trim()}
              className="ml-2 h-auto"
            >
              <span>
                <SendOutlined /> 发送
              </span>
            </Button>
          </div>
          <div className="mt-2 text-xs text-slate-400 text-center">
            提示：尝试用英语与助手对话，助手会帮助纠正您的语法错误并提供学习建议。
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
