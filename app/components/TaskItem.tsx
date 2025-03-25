import React from 'react';
import { View, Text } from 'react-native';
import Checkbox from 'expo-checkbox';

type TaskItemProps = {
  id: string;
  description: string;
  isComplete: boolean;
  toggleComplete: (id: string) => void;
};

const TaskItem: React.FC<TaskItemProps> = ({ id, description, isComplete, toggleComplete }) => {
  return (
      <View className="flex-row items-center p-4 mb-3 bg-gray-100 rounded-lg">
        <Checkbox
            value={isComplete}
            onValueChange={() => toggleComplete(id)}
            color={isComplete ? '#4caf50' : undefined}
            style={{ width: 30, height: 30 }}
        />
        <Text
            className={`ml-3 text-base ${
                isComplete ? 'line-through text-gray-400' : 'text-gray-800'
            }`}
        >
          {description}
        </Text>
      </View>
  );
};

export default TaskItem;