import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const context = `Você é o assistente oficial da plataforma médica Achemed. Sua missão é orientar os usuários sobre o funcionamento da plataforma, esclarecer dúvidas sobre agendamentos, consultas, prontuários e demais funcionalidades disponíveis para médicos e pacientes.
Sempre responda em português, mesmo que a pergunta seja feita em outro idioma. Mencione o nome da plataforma Achemed em negrito em todas as respostas.
Seja extremante direto, objetivo e útil em suas orientações, texto curto e conciso.`;

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    const newMessages = [...messages, { type: "user", text: prompt }];
    setMessages(newMessages);
    setPrompt("");

    try {
      const res = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDhP66N4BNsUS_mBppOtkvYdH4o4LMrpIQ",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: context }, { text: prompt }],
              },
            ],
          }),
        }
      );

      const data = await res.json();
      const text =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Não consegui entender. Pode reformular?";

      setMessages([...newMessages, { type: "bot", text }]);
    } catch (error) {
      console.error("Erro ao chamar Gemini:", error);
      setMessages([
        ...newMessages,
        { type: "bot", text: "Erro ao chamar Gemini." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg px-4 py-2 bg-sky-600 text-white hover:bg-sky-700 transition">
        {isOpen ? (
          <X className="h-5 w-5 mr-2" />
        ) : (
          <MessageCircle className="h-5 w-5 mr-2" />
        )}
        <span>{isOpen ? "Fechar" : "Chat"}</span>
      </Button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 max-w-full bg-white shadow-xl rounded-xl border border-gray-200 flex flex-col overflow-hidden z-40">
          <div className="p-4 border-b">
            <h3 className="text-lg font-bold text-sky-700">ACHEMED</h3>
          </div>

          <div className="flex-1 p-4 overflow-y-auto text-sm text-gray-700 space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`rounded p-2 ${
                  msg.type === "user"
                    ? "bg-sky-100 text-right"
                    : "bg-gray-100 text-left"
                }`}>
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="bg-gray-100 rounded p-2 text-left">
                Digitando...
              </div>
            )}
          </div>

          <div className="border-t p-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="flex gap-2">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-1 px-3 py-2 text-sm border rounded focus:outline-none focus:ring"
              />
              <Button
                type="submit"
                disabled={loading}
                className="bg-sky-600 hover:bg-sky-700 text-white">
                Enviar
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
