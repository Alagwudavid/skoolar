'use client'

import { ChatRoom } from "@/components/communities/chat-room";

interface PageProps {
  params: { id: string };
}

export default function CommunityPage({ params }: PageProps) {
  const { id } = params;
  
  // Mock data for frontend-only version
  const community = {
    id,
    name: 'Computer Science Hub',
    description: 'Connect with CS students and professionals'
  };

  const messages = [
    {
      id: '1',
      content: 'Welcome to the community!',
      created_at: new Date().toISOString(),
      sender_id: 'user-1',
      sender: {
        username: 'john_doe',
        full_name: 'John Doe'
      }
    },
    {
      id: '2',
      content: 'Happy to be here!',
      created_at: new Date().toISOString(),
      sender_id: 'user-2',
      sender: {
        username: 'jane_smith',
        full_name: 'Jane Smith'
      }
    }
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4 border-b pb-4">
        <h1 className="text-2xl font-bold">{community.name}</h1>
        <p className="text-muted-foreground">{community.description}</p>
      </div>
      
      <ChatRoom 
        communityId={id} 
        initialMessages={messages} 
        currentUserId="current-user" 
      />
    </div>
  );
}
