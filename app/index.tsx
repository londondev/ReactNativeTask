import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView } from 'react-native';
import TaskItem from './components/TaskItem';
import {Task} from "@/app/types";

const NUMBER_OF_TASKS = 5;
const API_URL = `https://jsonplaceholder.typicode.com/todos?_limit=${NUMBER_OF_TASKS}`;

export default function Index() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch(API_URL);
      const data = await res.json();
      const mapped = data.map((item: any) => ({
        id: String(item.id),
        description: item.title,
        isComplete: item.completed,
      }));
      setTasks(mapped);
    };

    fetchTasks();
  }, []);

  const toggleComplete = useCallback((id: string) => {
    setTasks(prev =>
        prev.map(task =>
            task.id === id ? { ...task, isComplete: !task.isComplete } : task
        )
    );
  }, []);

  return (
      <View className="flex-1 bg-white pt-safe px-section">
        <Text className="text-header font-bold mb-section">Task List</Text>

        <ScrollView>
          {tasks.map(task => (
              <TaskItem
                  key={task.id}
                  id={task.id}
                  description={task.description}
                  isComplete={task.isComplete}
                  toggleComplete={toggleComplete}
              />
          ))}
        </ScrollView>
      </View>
  );
}
