"use client";

import { MastraClient } from "@mastra/client-js";
import React, { useState, useRef, useEffect } from "react";
import { Spin, Avatar, Card, message } from "antd";
import { SendOutlined, UserOutlined, RobotOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import { useRouter, useSearchParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Suspense } from 'react';

const mastraClient = new MastraClient({
  baseUrl: process.env.NEXT_PUBLIC_MASTRA_API_URL || "http://localhost:4111",
});

const agentId = "englishTutorAgent";
const agent = mastraClient.getAgent(agentId);

export default function AIChatPage() {
  return (
    <Suspense fallback={<span></span>}>
      <AIChatContent />
    </Suspense>
  );
}

function AIChatContent() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [
      {
        role: "assistant",
        content:
          "Hello, I'm JO, your English learning assistant, and today we can talk about something you're interested in.",
      },
    ]
  );
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const [threadId, setThreadId] = useState<string>("");

  // 初始化对话线程
  useEffect(() => {
    const initThread = async () => {
      let rid = searchParams.get("rid");
      if (!rid) {
        rid = uuidv4();
        // 更新 URL，添加 resourceId
        router.push(`/ai-chat?rid=${rid}`);
      }

      let tid = null;
      const threads = await mastraClient.getMemoryThreads({
        resourceId: rid,
        agentId,
      });

      if (threads.length > 0) {
        tid = threads[0];
      } else {
        const thread = await mastraClient.createMemoryThread({
          resourceid: rid,
          title: "Learn english",
          metadata: {
            project: "mastra",
            topic: "architecture",
          },
          threadId: "",
          agentId: agentId,
        });
        tid = thread;
      }
      setThreadId(tid.id);

      const tInstance = mastraClient.getMemoryThread(tid.id, agentId);
      const { messages } = await tInstance.getMessages();
      if (messages.length > 0) {
        setMessages(messages as any);
      }
    };
    initThread();
  }, [searchParams]);

  // 自动滚动到最新消息
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 发送消息
  const sendMessage = async () => {
    if (!inputValue.trim() || !threadId) return;
    // Use a stable ID format
    const messageId = `${threadId}-${messages.length + 1}`;
    const assistantMessageId = `${threadId}-${messages.length + 2}`;

    // 添加用户消息到聊天记录
    const userMessage = {
      id: messageId,
      role: "user",
      content: inputValue,
      createdAt: new Date().toISOString(),
      threadId: threadId,
      type: "text",
    };

    const newAssistantMessage = {
      id: assistantMessageId,
      role: "assistant" as const,
      content: "",
      threadId: threadId,
      type: "text",
    };

    setInputValue("");
    setLoading(true);
    setMessages((prev) => [...prev, userMessage, newAssistantMessage]);

    try {
      let rid = searchParams.get("rid") || "";
      if (!rid) {
        throw Error("rid id not defined");
      }

      // 调用 Mastra 代理获取回复
      const response = await agent.stream({
        messages: [userMessage as any],
        threadId: threadId,
        resourceId: rid,
      });

      if (!response.body) {
        throw new Error("No response body");
      }

      if (response.status !== 200) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let assistantMessage = "";
      let errorMessage = "";

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          buffer += chunk;

          const matches = buffer.matchAll(/0:"((?:\\.|(?!").)*?)"/g);
          const errorMatches = buffer.matchAll(/3:"((?:\\.|(?!").)*?)"/g);

          if (errorMatches) {
            for (const match of errorMatches) {
              const content = match[1];
              errorMessage += content;
              setMessages((prev) => [
                ...prev.slice(0, -1),
                {
                  ...prev[prev.length - 1],
                  content: errorMessage,
                  isError: true,
                },
              ]);
            }
          }

          for (const match of matches) {
            const content = match[1].replace(/\\"/g, '"');
            assistantMessage += content;
            setMessages((prev) => [
              ...prev.slice(0, -1),
              { ...newAssistantMessage, content: assistantMessage },
            ]);
          }
          buffer = "";
        }
      } catch (error: any) {
        throw new Error(error.message);
      } finally {
        reader.releaseLock();
      }
    } catch (error: any) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          ...prev[prev.length - 1],
          content:
            error?.message ||
            `An error occurred while processing your request.`,
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
                  msg.role === "user" ? "ml-12" : "mr-12"
                } bg-dark-lighter bg-opacity-30`}
              >
                <div className="flex items-start">
                  <Avatar
                    className="flex-none w-[30px]"
                    icon={
                      msg.role === "user" ? (
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
                        p: ({ node, children, ...props }) => (
                          <p
                            className="whitespace-pre-wrap break-words"
                            {...props}
                          >
                            {children}
                          </p>
                        ),
                      }}
                    >
                      {typeof content === "string"
                        ? content
                        : JSON.stringify(content)}
                    </ReactMarkdown>
                    {index === messages.length - 1 && loading && (
                      <span>
                        <Spin tip="AI 思考中..." />
                      </span>
                    )}
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
