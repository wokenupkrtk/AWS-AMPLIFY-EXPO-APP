import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';
import type { Schema } from "../amplify/data/resource";
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";

Amplify.configure(outputs);


  const client = generateClient<Schema>();

  export default function TodoList() {
    const [todos, setTodos] = useState<Schema["Todo"]["type"][]>([]);
  
    useEffect(() => {
      const sub = client.models.Todo.observeQuery().subscribe({
        next: ({ items }) => {
          setTodos([...items]);
        },
      });
  
      return () => sub.unsubscribe();
    }, []);
  
    const createTodo = async () => {
      await client.models.Todo.create({
        content: window.prompt("Todo content?"),
        isDone: false,
      });
      // no more manual refetchTodos required!
      // - fetchTodos()
    };
  
    return (
      <div>
        <button onClick={createTodo}>Add new todo</button>
        <ul>
          {todos.map(({ id, content }) => (
            <li key={id}>{content}</li>
          ))}
        </ul>
      </div>
    );
  }
 

