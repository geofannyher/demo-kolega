import React from "react";
import { useEffect, useRef, useState } from "react";
import { supabase } from "../../services/supabase/connection";

const AdminChat = () => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fetchChatHistory = async () => {
    try {
      const { data, error } = await supabase
        .from("chat")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        setChatHistory(data);
      }
    } catch (error: any) {
      console.error("Error fetching chat history:", error.message);
    }
  };

  useEffect(() => {
    fetchChatHistory();
  }, []); // Panggil fetchChatHistory saat komponen dimuat

  useEffect(() => {
    scrollToBottom(); // Panggil scrollToBottom setelah chat history diperbarui
  }, [chatHistory]); // Panggil saat chatHistory berubah

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  const renderHighlightedText = (text: string) => {
    if (!searchKeyword.trim()) return text; // Jika kata kunci pencarian kosong, kembalikan teks asli

    const regex = new RegExp(`(${searchKeyword.trim()})`, "gi"); // Buat ekspresi reguler dari kata kunci pencarian (global dan case-insensitive)
    const parts = text.split(regex); // Pisahkan teks berdasarkan kata kunci pencarian

    return parts.map((part, index) => {
      if (regex.test(part)) {
        // Bagian ini adalah bagian teks yang cocok dengan kata kunci (disorot)
        return (
          <span key={index} className="bg-yellow-200 border p-1">
            {part}
          </span>
        );
      } else {
        // Bagian ini adalah bagian teks asli (tidak cocok dengan kata kunci)
        return <span key={index}>{part}</span>;
      }
    });
  };

  const filteredChatHistory = chatHistory.filter((message) =>
    message.text.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="flex h-[100vh] flex-col bg-white">
      <div className="container mx-auto p-4">
        <h3 className="font-semibold">History Admin</h3>
        <input
          type="text"
          value={searchKeyword}
          onChange={handleSearch}
          placeholder="Cari chat..."
          className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
        />
      </div>
      <div className="hide-scrollbar container mx-auto flex-1 space-y-2 overflow-y-auto p-4">
        {filteredChatHistory.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-2 rounded-lg ${
                message.sender === "user" ? "mr-2" : "ml-2"
              } bg-gray-300`}
            >
              {renderHighlightedText(message.text)}
            </div>
          </div>
        ))}
        {filteredChatHistory.length === 0 && (
          <p className="text-gray-500 text-center mt-4">
            Tidak ada hasil chat yang cocok.
          </p>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default AdminChat;
