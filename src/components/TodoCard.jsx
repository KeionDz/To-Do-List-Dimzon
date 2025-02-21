import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Calendar } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";

const TodoCard = ({ data, onDelete }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Prevent navigation if alert is open
  const handleCardClick = (e) => {
    if (!open) {
      navigate(`/todo/${data.id}`);
    }
  };

  return (
    <div 
      onClick={handleCardClick} 
      className="cursor-pointer"
    >
      <Card className="bg-[#232323] text-white rounded-xl shadow-md transition-all duration-300 hover:shadow-[0px_4px_20px_rgba(0,255,255,0.5)] p-6 border border-gray-600 w-full max-w-[400px]">
        <CardHeader className="pb-4 flex justify-between items-center border-b border-gray-500">
          <div className="flex w-full justify-between items-center">
            <CardTitle className="text-lg font-semibold text-cyan-400 truncate pr-4">
              {data.title}
            </CardTitle>
            <div className="flex items-center text-gray-400 text-sm">
              <Calendar className="w-5 h-5 mr-2" />
              {data.date}
            </div>
          </div>
        </CardHeader>
        <CardContent className="text-gray-300 text-base h-auto min-h-[60px] max-h-32 overflow-hidden border-b border-gray-500 p-4">
          {data.description}
        </CardContent>
        <CardFooter className="flex justify-end p-4">
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              <Button 
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                onClick={(e) => e.stopPropagation()} // Prevents navigation
              >
                <Trash2 className="w-5 h-5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent 
              className="bg-[#1E1E1E] border border-gray-700 text-white"
              onClick={(e) => e.stopPropagation()} // Prevents accidental navigation when clicking the dialog
            >
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this task? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel 
                  className="border border-gray-600 text-gray-400 px-4 py-2 rounded-lg hover:bg-gray-800 hover:text-white transition"
                  onClick={(e) => e.stopPropagation()} // Prevents navigation
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents navigation
                    onDelete(data.id);
                    setOpen(false);
                  }}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TodoCard;
