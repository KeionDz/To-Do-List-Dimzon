import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import axios from "axios";
import EditTask from "./EditTask";

const Todo = () => {
  const [todo, setTodo] = useState(null);
  const { id } = useParams();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/todolist/${id}`);
        setTodo(response.data);
      } catch (error) {
        console.error("Error fetching todo:", error);
      }
    };

    fetchTodo();
  }, [id]);

  const handleEditTask = () => {
    setIsEditModalOpen(false);
    window.location.reload(); // Refresh page after editing
  };

  if (!todo) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <Card className="w-[750px] shadow-lg rounded-xl bg-gray-800 border border-gray-700">
        
        {/* Header */}
        <CardHeader className="bg-gray-700 p-5 rounded-t-xl">
          <CardTitle className="text-2xl font-semibold text-white">{todo.title}</CardTitle>
          <CardDescription className="text-gray-400">{todo.date}</CardDescription>
        </CardHeader>

        {/* Content */}
        <CardContent className="p-6 text-gray-300 text-lg">
          <p>{todo.description}</p>
        </CardContent>

        {/* Footer */}
        <CardFooter className="p-4 flex justify-between items-center bg-gray-700 rounded-b-xl border-t border-gray-600">
          <h1 className="text-gray-400">© Kyle Dimzon</h1>
          <Button
            variant="outline"
            className="border-gray-500 text-gray-300 hover:bg-gray-600 transition-all"
            onClick={() => setIsEditModalOpen(true)}
          >
            Edit Task
          </Button>
        </CardFooter>
      </Card>

      {/* Edit Task Modal */}
      {isEditModalOpen && (
        <EditTask task={todo} onClose={() => setIsEditModalOpen(false)} onTaskUpdated={handleEditTask} />
      )}
    </div>
  );
};

export default Todo;
