import { Todo } from '../types/Todo';
import { TodoCompletedUpdate } from '../types/TodoCompletedUpdate';
import { TodoTitleUpdate } from '../types/TodoTitleUpdate';

const BASE_URL = 'https://mate.academy/students-api';

interface POST {
  title: string;
  completed: boolean;
  userId: number;
}

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: Todo[] | POST | TodoCompletedUpdate | TodoTitleUpdate | null = null,
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  return wait(300)
    .then(() => fetch(BASE_URL + url, options))
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: POST) => request<T>(url, 'POST', data),
  patch: <T>(url: string, data: TodoCompletedUpdate | TodoTitleUpdate) => {
    return request<T>(url, 'PATCH', data);
  },
  delete: (url: string) => request(url, 'DELETE'),
};
