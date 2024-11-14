import { useState, useEffect } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>({
    authMode: 'apiKey',
    headers: async (requestOptions) => {
        console.log(requestOptions);
        /* The request options allow you to customize your headers based on the request options such
           as http method, headers, request URI, and query string. These options are typically used
           to create a request signature.
        {
          method: '...',
          headers: { },
          uri: '/',
          queryString: ""
        }
        */
        return {
          'My-Custom-Header': 'my value',
        };
      },
  });

// Now you should be able to make CRUDL operations with the
// Data client
const fetchTodos = async () => {
    const { data: todos, errors } = await client.models.Todo.list();
  };

export default function TodoList() {
  const [todos, setTodos] = useState<Schema["Todo"]["type"][]>([]);

  const fetchTodos = async () => {
    const { data: items, errors } = await client.models.Todo.list();
    setTodos(items);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const createTodo = async () => {
    await client.models.Todo.create({
      content: window.prompt("Todo content?"),
      isDone: false,
    });

    fetchTodos();
  }

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

