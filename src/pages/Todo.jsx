import React, { useEffect, useState, Suspense, lazy } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ListChecks } from "lucide-react";

const EditTask = lazy(() => import("./EditTask"));

const Todo = () => {
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/todolist/${id}`);
        setTodo(response.data);
      } catch (error) {
        console.error("Error fetching todo:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTodo();
  }, [id]);

  const handleEditTask = () => {
    setIsEditModalOpen(false);
    window.location.reload();
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/todolist/${id}`);
      navigate("/");
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <Suspense fallback={<p className="text-center text-gray-400">Loading...</p>}>
      <div className="flex justify-center items-center min-h-screen bg-[#121212] p-6">
        <Card className="relative w-full max-w-[700px] shadow-2xl rounded-2xl bg-[#1E1E1E] text-white p-6 transition-all duration-300 hover:shadow-[0px_4px_40px_rgba(0,255,255,0.5)]">
          {/* Header */}
          <CardHeader className="flex flex-col items-center gap-4 p-6 bg-gradient-to-r from-[#232323] to-[#1A1A1A] rounded-t-2xl shadow-md">
            <div className="flex items-center gap-3">
              <ListChecks className="w-10 h-10 text-cyan-400" />
              <h1 className="text-xl font-semibold text-gray-300">Task Details</h1>
            </div>
          </CardHeader>

          {/* Content */}
          <CardContent className="p-5 text-gray-300 text-lg">
            {loading ? (
              <p className="text-gray-500 animate-pulse">Loading task details...</p>
            ) : (
              <>
                <h2 className="text-2xl font-semibold text-white mb-3">{todo?.title}</h2>
                <p className="text-gray-400 mb-4">{todo?.date}</p>
                <p>{todo?.description}</p>
              </>
            )}
          </CardContent>

          {/* Footer */}
          <CardFooter className="p-4 flex justify-between items-center bg-[#232323] rounded-b-2xl shadow-md">
            <h1 className="text-gray-500">© Kyle Dimzon</h1>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="border border-gray-600 text-gray-400 px-4 py-2 rounded-lg hover:bg-gray-800 hover:text-white transition"
                onClick={() => setIsEditModalOpen(true)}
              >
                Edit Task
              </Button>
              <Button
                variant="outline"
                className="border border-red-500 text-red-400 px-4 py-2 rounded-lg hover:bg-red-800 hover:text-white transition"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                Delete
              </Button>
            </div>
          </CardFooter>
        </Card>

        {/* Edit Task Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-lg">
            <Suspense fallback={<p className="text-gray-400">Loading editor...</p>}>
              <EditTask task={todo} onClose={() => setIsEditModalOpen(false)} onTaskUpdated={handleEditTask} />
            </Suspense>
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        {isDeleteDialogOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-lg">
            <div className="bg-[#1E1E1E] p-6 rounded-xl shadow-lg text-center max-w-sm">
              <h2 className="text-white text-lg font-semibold">Are you sure you want to delete this task?</h2>
              <div className="mt-4 flex justify-center gap-4">
                <Button
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                  onClick={() => setIsDeleteDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-800"
                  onClick={confirmDelete}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Suspense>
  );
};

export default Todo;
