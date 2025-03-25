import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// import {TaskItemProps} from "@/app/types";

export type TaskItemProps = {
    id: string;
    description: string;
    isComplete: boolean;
    toggleComplete: (id: string) => void;
};
const TaskItem: React.FC<TaskItemProps> = ({ id, description, isComplete, toggleComplete }) => {
    return (
        <TouchableOpacity
            onPress={() => toggleComplete(id)}
            className="flex-row items-center bg-gray-100 rounded-lg p-4 mb-3 pr-1.5"
        >
            <View
                className={`w-5 h-5 mr-4 rounded-full border-2 ${
                    isComplete ? 'bg-green-500 border-green-500' : 'border-gray-400'
                }`}
            />
            <View className="flex-1 pr-2">
                <Text className={`text-base ${isComplete ? 'line-through text-gray-400' : 'text-gray-800'}`}>{description}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default TaskItem;
