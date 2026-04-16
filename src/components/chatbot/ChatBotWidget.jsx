import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const API_URL = "https://api.groq.com/openai/v1/chat/completions";

const SYSTEM_PROMPT = `
Rol: Actúa como el Asistente Digital Oficial de Tafí del Valle, Tucumán. Tu objetivo es ayudar a turistas y residentes con información precisa, amable y culturalmente enriquecedora.

Personalidad: Eres hospitalario, orgulloso de tus raíces calchaquíes y eficiente. Tu lenguaje debe ser claro y acogedor.

Conocimientos Clave:
- Ubicación: Tafí del Valle se encuentra a 107 km de San Miguel de Tucumán por la Ruta 307.
- Autoridad: El Intendente es Francisco Caliva.
- Emergencias: Ten siempre a mano los números: Hospital (03867-421031), Policía (03867-421011) y Bomberos (03867-421115).
- Eventos: Prioriza la Fiesta Nacional del Queso en febrero y la Pasión en Semana Santa como los eventos más importantes.

Instrucciones de Respuesta:
- Si preguntan por trámites municipales, indica que deben dirigirse a la Secretaría de Gobierno en el edificio municipal (Av. Belgrano).
- Si preguntan por turismo, recomienda visitar el Dique La Angostura, el Museo Jesuítico La Banda y probar el queso tafinisto.
- Formato: Usa negritas para destacar números de teléfono y fechas importantes. Utiliza listas para que la información sea fácil de leer en móviles.
- Restricción: No inventes fechas exactas de eventos si no están confirmadas en el calendario oficial de 2026. Ante la duda, sugiere contactar a la oficina de turismo (03867-421020).

Ejemplo de saludo: "¡Bienvenido al Portal de los Valles Calchaquíes! Soy tu asistente tafinisto. ¿En qué puedo ayudarte hoy?"

Nota: Para obtener información en tiempo real sobre cortes de ruta (frecuentes en temporada de lluvias en la Cuesta del Infiernillo), se recomienda siempre consultar el estado de Vialidad Provincial.
`;

const ChatBotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '¡Bienvenido al Portal de los Valles Calchaquíes! Soy tu asistente tafinisto. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
            userMessage
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      });

      const data = await response.json();
      const botMessage = { 
        role: 'assistant', 
        content: data.choices[0]?.message?.content || "Lo siento, tuve un pequeño problema. ¿Podrías repetir eso?" 
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error Groq API:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Ups, mi conexión con el cerro está débil. Por favor, intenta de nuevo en un momento." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-96 max-w-[calc(100vw-2rem)] h-[500px] bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary p-4 flex justify-between items-center text-white shadow-lg">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Tafinito</h3>
                  <p className="text-[10px] opacity-80 text-primary-light">Asistente Municipal</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/10 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-primary-mid">
              {messages.map((m, i) => (
                <div 
                  key={i} 
                  className={`flex ${m.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`flex gap-2 max-w-[85%] ${m.role === 'assistant' ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`mt-1 p-1 rounded-full h-fit ${m.role === 'assistant' ? 'bg-primary-light text-primary' : 'bg-primary text-white'}`}>
                      {m.role === 'assistant' ? <Bot size={14} /> : <User size={14} />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm shadow-sm ${
                      m.role === 'assistant' 
                        ? 'bg-white text-gray-800 rounded-tl-none border border-primary-light' 
                        : 'bg-primary text-white rounded-tr-none'
                    }`}>
                      {m.content}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2 bg-white p-3 rounded-2xl shadow-sm border border-primary-light">
                    <Loader2 size={16} className="animate-spin text-primary" />
                    <span className="text-xs text-gray-500">Tafinito está pensando...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/50 border-t border-primary-light">
              <div className="relative flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Escribe tu consulta aquí..."
                  className="flex-1 bg-white border border-primary-light rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-inner"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading}
                  className="bg-primary hover:bg-primary-mid disabled:bg-primary-light text-white p-2 rounded-full transition-all shadow-md active:scale-95 flex items-center justify-center"
                >
                  <Send size={18} />
                </button>
              </div>
              <p className="text-[9px] text-center text-gray-400 mt-2">
                Energizado por Groq AI • Municipalidad de Tafí del Valle
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary text-white p-4 rounded-full shadow-2xl flex items-center justify-center relative group"
      >
        <div className="absolute inset-0 bg-primary-mid rounded-full animate-ping opacity-20 group-hover:opacity-40" />
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </motion.button>
    </div>
  );
};

export default ChatBotWidget;
