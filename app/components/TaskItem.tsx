import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type TaskItemProps = {
    id: string;
    description: string;
    isComplete: boolean;
    toggleComplete: (id: string) => void;
};

const TaskItem: React.FC<TaskItemProps> = ({ id, description, isComplete, toggleComplete }) => {
    return (
        <TouchableOpacity
            onPress={() => toggleComplete(id)}
            className="flex-row items-center bg-gray-100 rounded-lg p-4 mb-3"
        >
            <View
                className={`w-5 h-5 mr-4 rounded-full border-2 ${
                    isComplete ? 'bg-green-500 border-green-500' : 'border-gray-400'
                }`}
            />
            <Text className={`text-base ${isComplete ? 'line-through text-gray-400' : 'text-gray-800'}, text-xl`}>
                {description}
            </Text>
        </TouchableOpacity>
    );
};

export default TaskItem;
