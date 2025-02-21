import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ListChecks } from "lucide-react";
import TodoCard from "@/components/TodoCard";
import AddTodo from "../pages/AddTodo";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Todos = () => {
  const [data, setData] = useState([]);
  const [showAddTodo, setShowAddTodo] = useState(false);
  const navigate = useNavigate();

  const fetchTodo = async () => {
    try {
      const response = await axios.get("http://localhost:3000/todolist");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/todolist/${id}`);
      fetchTodo();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#121212] p-6">
      <Card className="relative w-full max-w-[900px] shadow-2xl rounded-2xl bg-[#1E1E1E] text-white p-6 transition-all duration-300 hover:shadow-[0px_4px_40px_rgba(0,255,255,0.5)]">
        
        {/* Header */}
        <CardHeader className="flex flex-col items-center gap-4 p-6 bg-gradient-to-r from-[#232323] to-[#1A1A1A] rounded-t-2xl shadow-md">
          <div className="flex items-center gap-3">
            <ListChecks className="w-10 h-10 text-cyan-400" />
            <h1 className="text-xl font-semibold text-gray-300">Todo List</h1>
          </div>
          <Button
            variant="outline"
            onClick={() => setShowAddTodo(true)}
            className="border border-gray-600 text-gray-400 px-4 py-2 rounded-lg hover:bg-gray-800 hover:text-white transition"
          >
            Add Task
          </Button>
        </CardHeader>

        {/* Content */}
        <CardContent className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.length === 0 ? (
              <p className="text-gray-400 col-span-full text-center">No tasks found</p>
            ) : (
              data.map((todo) => (
                <div key={todo.id} onClick={() => navigate(`/todo/${todo.id}`)} className="cursor-pointer">
                  <TodoCard data={todo} onDelete={deleteTodo} />
                </div>
              ))
            )}
          </div>
        </CardContent>

        {/* Footer */}
        <CardFooter className="p-4 flex justify-between text-gray-400 bg-[#232323] rounded-b-2xl shadow-md">
          <h1 className="text-gray-500">© Kyle Dimzon</h1>
        </CardFooter>
      </Card>

      {/* Add Task Modal */}
      {showAddTodo && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-lg">
          <AddTodo onClose={() => setShowAddTodo(false)} onTaskAdded={fetchTodo} />
        </div>
      )}
    </div>
  );
};

export default Todos;
