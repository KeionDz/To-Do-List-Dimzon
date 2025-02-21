import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import axios from "axios";

const EditTask = ({ task, onClose, onTaskUpdated }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [date, setDate] = useState(task.date);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(`http://localhost:3000/todolist/${task.id}`, {
        title,
        description,
        date,
      });

      onTaskUpdated();
      onClose();
    } catch (error) {
      console.error("Failed to update task:", error);
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md">
      <Card className="relative w-[500px] bg-[#1E1E1E] text-white shadow-lg rounded-xl p-6">
        {/* Header */}
        <CardHeader className="text-center">
          <h2 className="text-lg font-semibold">Edit Task</h2>
        </CardHeader>

        {/* Form Content */}
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-y-1">
            <Label>Title</Label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-3 bg-[#2A2A2A] border-gray-600 rounded-md text-white"
            />
          </div>

          <div className="flex flex-col gap-y-1">
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-3 bg-[#2A2A2A] border-gray-600 rounded-md text-white"
            />
          </div>

          <div className="flex flex-col gap-y-1">
            <Label>Date</Label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="p-3 bg-[#2A2A2A] border-gray-600 rounded-md text-white"
            />
          </div>
        </CardContent>

        {/* Footer */}
        <CardFooter className="flex justify-between mt-4">
          <Button onClick={onClose} variant="outline" className="border-gray-600 text-gray-400 hover:bg-gray-800">
            Cancel
          </Button>
          <Button
            onClick={handleUpdate}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-md"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EditTask;
