import axios from "axios";
import { CreateUserParams } from "../types/user";

export async function register(data: CreateUserParams) {
  try {
    const response = await axios.post('http://localhost:4000/register', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Erro inesperado: ${response.statusText}`);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erro ao registrar o usuário:", error.message);
    } else {
      console.error("Erro ao registrar o usuário:", error);
    }
    throw error;
  }
}
