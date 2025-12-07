import { IconSymbol } from '@/app/components/ui/icon-symbol';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabsNavigator() {

  return (
    <Tabs>
      <Tabs.Screen
        name="chats"
        options={{
          title: 'Chats',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="menucard.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
