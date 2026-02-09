"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Message {
  id: string;
  content: string;
  sender_id: string;
  created_at: string;
  sender?: {
    username?: string;
    full_name?: string;
  };
}

interface ChatRoomProps {
  communityId: string;
  initialMessages: Message[];
  currentUserId: string;
}

export function ChatRoom({ communityId, initialMessages, currentUserId }: ChatRoomProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom on load and when messages change
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Frontend-only: Add message directly to state
    const newMessage: Message = {
      id: Math.random().toString(),
      content: input,
      sender_id: currentUserId,
      created_at: new Date().toISOString(),
      sender: {
        username: 'You',
        full_name: 'You'
      }
    };
    
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] border rounded-lg overflow-hidden">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
             <div
               key={msg.id}
               className={`flex items-start gap-2 ${
                 msg.sender_id === currentUserId ? "flex-row-reverse" : "flex-row"
               }`}
             >
               <Avatar className="h-8 w-8">
                 <AvatarFallback>U</AvatarFallback>
               </Avatar>
               <div
                 className={`rounded-lg p-3 text-sm ${
                   msg.sender_id === currentUserId
                     ? "bg-primary text-primary-foreground"
                     : "bg-muted"
                 }`}
               >
                 {msg.content}
               </div>
             </div>
          ))}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>
      <div className="p-4 border-t bg-background">
        <form onSubmit={handleSend} className="flex gap-2">
          <Input 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Type a message..." 
            className="flex-1"
          />
          <Button type="submit">Send</Button>
        </form>
      </div>
    </div>
  );
}

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] border rounded-lg overflow-hidden">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
             <div
               key={msg.id}
               className={`flex items-start gap-2 ${
                 msg.sender_id === currentUserId ? "flex-row-reverse" : "flex-row"
               }`}
             >
               <Avatar className="h-8 w-8">
                 <AvatarFallback>U</AvatarFallback>
               </Avatar>
               <div
                 className={`rounded-lg p-3 text-sm ${
                   msg.sender_id === currentUserId
                     ? "bg-primary text-primary-foreground"
                     : "bg-muted"
                 }`}
               >
                 {msg.content}
               </div>
             </div>
          ))}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>
      <div className="p-4 border-t bg-background">
        <form onSubmit={handleSend} className="flex gap-2">
          <Input 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Type a message..." 
            className="flex-1"
          />
          <Button type="submit">Send</Button>
        </form>
      </div>
    </div>
  );
}
