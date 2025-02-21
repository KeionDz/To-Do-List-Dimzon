import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !date) {
      setError("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      const newTodo = { title, description, date };
      await axios.post("http://localhost:3000/todolist", newTodo);
      setTitle("");
      setDescription("");
      setDate("");
      setError("");
      handleClose();
    } catch (err) {
      console.error("Error adding task:", err);
      setError("Failed to add task. Try again.");
    }
    setLoading(false);
  };

  const handleClose = () => {
    window.location.href = "/";
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md">
      <Card className="relative w-[600px] bg-[#232323] text-white shadow-xl rounded-xl p-6 border border-gray-700">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
        >
          <X className="w-6 h-6" />
        </button>

        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold text-cyan-400">
            Add To-Do
          </CardTitle>
          <CardDescription className="text-center text-gray-400">
            Fill all fields to add a new task.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-y-4 py-4">
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <div className="flex flex-col gap-y-1">
            <Label className="text-gray-300">Title</Label>
            <Input
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-3 border border-gray-600 rounded-md bg-[#2b2b2b] text-white focus:border-cyan-400"
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <Label className="text-gray-300">Description</Label>
            <Textarea
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-3 border border-gray-600 rounded-md bg-[#2b2b2b] text-white focus:border-cyan-400"
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <Label className="text-gray-300">Date</Label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="p-3 border border-gray-600 rounded-md bg-[#2b2b2b] text-white focus:border-cyan-400"
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-y-4">
          <Button
            onClick={handleSubmit}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 rounded-lg transition"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Task"}
          </Button>
          <p className="text-gray-500 text-sm text-center">© Kyle Dimzon</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddTodo;
