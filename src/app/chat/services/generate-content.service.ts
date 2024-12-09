import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const generateContent = async (
  userId: string,
  prompt: string,
  tone: string,
  content: string
): Promise<
  | { status: "success"; message: string; payload: any }
  | { status: "error"; message: string }
> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/chat`, {
      user_id: userId,
      prompt,
      tone,
      content,
    });

    return {
      status: "success",
      message: "Chat response generated successfully.",
      payload: response.data.data,
    };
  } catch (error: any) {
    return {
      status: "error",
      message: error.response?.data?.detail || "Failed to generate chat response.",
    };
  }
};

export const getMessagesByChatId = async (chatId: string): Promise<
  | { status: "success"; messages: Array<{ text: string; sender: "user" | "bot"; name: string }> }
  | { status: "error"; message: string }
> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/chat/${chatId}/messages`);

    const messages = response.data.data.map((message: any) => ({
      text: message.answer || message.prompt,
      sender: message.answer ? "bot" : "user",
      name: message.answer ? "Bot" : "User",
    }));

    return {
      status: "success",
      messages,
    };
  } catch (error: any) {
    return {
      status: "error",
      message: error.response?.data?.detail || "Failed to fetch chat messages.",
    };
  }
};

export const getChatsByUserId = async (userId: number): Promise<
  | { status: "success"; chats: Array<any> }
  | { status: "error"; message: string }
> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/${userId}`);

    return {
      status: "success",
      chats: response.data.chats,
    };
  } catch (error: any) {
    return {
      status: "error",
      message: error.response?.data?.detail || "Failed to fetch chats.",
    };
  }
};

export const postReply = async (
  userId: number,
  entry: string,
  tone: string,
  answerType: string,
  chatId: string
): Promise<
  | { status: "success"; reply: any }
  | { status: "error"; message: string }
> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/reply`, {
      user_id: userId,
      entry,
      tone,
      answer_type: answerType,
      chat_id: chatId,
    });

    return {
      status: "success",
      reply: response.data.reply,
    };
  } catch (error: any) {
    return {
      status: "error",
      message: error.response?.data?.detail || "Failed to post reply.",
    };
  }
};