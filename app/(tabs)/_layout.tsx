import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

interface TabIconProps {
  name: IoniconsName;
  activeName: IoniconsName;
  color: string;
  focused: boolean;
  size: number;
}

function TabIcon({ name, activeName, color, focused, size }: TabIconProps) {
  return <Ionicons name={focused ? activeName : name} size={size} color={color} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.tabBarActive,
        tabBarInactiveTintColor: Colors.tabBarInactive,
        tabBarStyle: {
          backgroundColor: Colors.tabBar,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          paddingBottom: Platform.OS === 'ios' ? 0 : 8,
          height: Platform.OS === 'ios' ? 80 : 64,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        headerStyle: { backgroundColor: Colors.surface },
        headerTintColor: Colors.text,
        headerTitleStyle: { fontWeight: '800', fontSize: 18 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerTitle: 'F1 Stats',
          tabBarIcon: ({ color, focused, size }) => (
            <TabIcon
              name="flag-outline"
              activeName="flag"
              color={color}
              focused={focused}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="drivers"
        options={{
          title: 'Drivers',
          tabBarIcon: ({ color, focused, size }) => (
            <TabIcon
              name="person-outline"
              activeName="person"
              color={color}
              focused={focused}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="constructors"
        options={{
          title: 'Teams',
          tabBarIcon: ({ color, focused, size }) => (
            <TabIcon
              name="car-sport-outline"
              activeName="car-sport"
              color={color}
              focused={focused}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="races"
        options={{
          title: 'Schedule',
          tabBarIcon: ({ color, focused, size }) => (
            <TabIcon
              name="calendar-outline"
              activeName="calendar"
              color={color}
              focused={focused}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}
