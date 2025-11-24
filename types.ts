import React from 'react';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isStreaming?: boolean;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}