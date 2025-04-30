import { useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";

const AddNoteDialog = ({ isOpen, onClose, onAddNote }) => {
  const [newNote, setNewNote] = useState({
    title: "",
    description: "",
    category: "personal",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newNote.title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (newNote.description.length > 200) {
      toast.error("Description must be less than 200 characters");
      return;
    }

    onAddNote(newNote);
    setNewNote({
      title: "",
      description: "",
      category: "personal",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-md">
        <div className="flex justify-between items-center px-4 pt-4 ">
          <h2 className="text-lg font-semibold">Add New Note</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={newNote.title}
              onChange={(e) =>
                setNewNote({ ...newNote, title: e.target.value })
              }
              placeholder="Enter note title"
              className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description{" "}
              <span className="text-xs text-gray-500">
                (max 200 characters)
              </span>
            </label>
            <textarea
              id="description"
              value={newNote.description}
              onChange={(e) =>
                setNewNote({ ...newNote, description: e.target.value })
              }
              placeholder="Enter note description"
              className="w-full p-2 border rounded-xl min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="text-xs text-right text-gray-500 mt-1">
              {newNote.description.length}/200
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="personal"
                  name="category"
                  value="personal"
                  checked={newNote.category === "personal"}
                  onChange={() =>
                    setNewNote({ ...newNote, category: "personal" })
                  }
                  className="mr-2 cursor-pointer"
                />
                <label
                  htmlFor="personal"
                  className="font-medium text-gray-700 cursor-pointer select-none"
                >
                  Personal
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="home"
                  name="category"
                  value="home"
                  checked={newNote.category === "home"}
                  onChange={() => setNewNote({ ...newNote, category: "home" })}
                  className="mr-2 cursor-pointer"
                />
                <label
                  htmlFor="home"
                  className="font-medium text-gray-700 cursor-pointer select-none"
                >
                  Home
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="business"
                  name="category"
                  value="business"
                  checked={newNote.category === "business"}
                  onChange={() =>
                    setNewNote({ ...newNote, category: "business" })
                  }
                  className="mr-2 cursor-pointer"
                />
                <label
                  htmlFor="business"
                  className="font-medium text-gray-700 cursor-pointer select-none"
                >
                  Business
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-[7px] text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-[8px] hover:shadow-blue-300 hover:shadow-md hover:bg-blue-500 text-sm font-medium "
            >
              Add Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNoteDialog;
