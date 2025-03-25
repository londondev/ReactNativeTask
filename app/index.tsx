import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {View, Text, ScrollView, TextInput, TouchableOpacity, Switch} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import TaskItem from './components/TaskItem';

export type Task = {
    id: string;
    description: string;
    isComplete: boolean;
};

const NUMBER_OF_TASKS = 5;
const API_URL = `https://jsonplaceholder.typicode.com/todos?_limit=${NUMBER_OF_TASKS}`;

export default function Index() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [showIncompleteOnly, setShowIncompleteOnly] = useState(false);


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

    const addTask = () => {
        if (newTask.trim() === '') return;
        const newItem: Task = {
            id: Date.now().toString(),
            description: newTask.trim(),
            isComplete: false,
        };

        setTasks(prev => [newItem, ...prev]);
        setNewTask('');
    };

    const filteredTasks = useMemo(() =>  showIncompleteOnly
        ? tasks.filter(task => !task.isComplete)
        : tasks, [tasks, showIncompleteOnly]);


    return (
      <SafeAreaView className="flex-1 bg-white px-section">
        <Text className="text-header font-bold mb-section">Task List</Text>
          <View className="flex-row items-center justify-end mb-4">
              <Text className="mr-2">Show incomplete only</Text>
              <Switch
                  value={showIncompleteOnly}
                  onValueChange={setShowIncompleteOnly}
              />
          </View>
          <View className="flex-row items-center mb-section space-x-2">
              <TextInput
                  className="flex-1 border border-gray-300 rounded-md px-3 py-4 bg-white mr-2" onChange={content => setNewTask(content.nativeEvent.text)}
                  value={newTask} placeholder={'Add a task'}
              />
              <TouchableOpacity
                  onPress={addTask}
                  className="bg-blue-500 px-4 py-4 rounded-md"
              >
                  <Text className="text-white font-semibold">Add</Text>
              </TouchableOpacity>
          </View>
        <ScrollView>
          {filteredTasks.map(task => (
              <TaskItem
                  key={task.id}
                  id={task.id}
                  description={task.description}
                  isComplete={task.isComplete}
                  toggleComplete={toggleComplete}
              />
          ))}
        </ScrollView>
      </SafeAreaView>
  );
}
