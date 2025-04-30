import { useState, useEffect } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";

const EditNoteDialog = ({ isOpen, onClose, note, onEditNote }) => {
  const [editedNote, setEditedNote] = useState(null);

  useEffect(() => {
    if (note) {
      setEditedNote({ ...note });
    }
  }, [note]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!editedNote.title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (editedNote.description.length > 200) {
      toast.error("Description must be less than 200 characters");
      return;
    }

    onEditNote(editedNote);
  };

  if (!isOpen || !editedNote) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white !rounded-xl w-full max-w-md">
        <div className="flex justify-between items-center px-4 pt-4">
          <h2 className="text-lg font-semibold">Edit Note</h2>
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
              htmlFor="edit-title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              id="edit-title"
              type="text"
              value={editedNote.title}
              onChange={(e) =>
                setEditedNote({ ...editedNote, title: e.target.value })
              }
              className="w-full p-2 border rounded-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="edit-description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description{" "}
              <span className="text-xs text-gray-500">
                (max 200 characters)
              </span>
            </label>
            <textarea
              id="edit-description"
              value={editedNote.description}
              onChange={(e) =>
                setEditedNote({ ...editedNote, description: e.target.value })
              }
              className="w-full p-2 border rounded-xl min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="text-xs text-right text-gray-500 mt-1">
              {editedNote.description.length}/200
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
                  id="edit-personal"
                  name="edit-category"
                  value="personal"
                  checked={editedNote.category === "personal"}
                  onChange={() =>
                    setEditedNote({ ...editedNote, category: "personal" })
                  }
                  className="mr-2 cursor-pointer"
                />
                <label
                  htmlFor="edit-personal"
                  className="font-medium text-gray-700 cursor-pointer select-none"
                >
                  Personal
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="edit-home"
                  name="edit-category"
                  value="home"
                  checked={editedNote.category === "home"}
                  onChange={() =>
                    setEditedNote({ ...editedNote, category: "home" })
                  }
                  className="mr-2 cursor-pointer"
                />
                <label
                  htmlFor="edit-home"
                  className="font-medium text-gray-700 cursor-pointer select-none"
                >
                  Home
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="edit-business"
                  name="edit-category"
                  value="business"
                  checked={editedNote.category === "business"}
                  onChange={() =>
                    setEditedNote({ ...editedNote, category: "business" })
                  }
                  className="mr-2 cursor-pointer"
                />
                <label
                  htmlFor="edit-business"
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNoteDialog;
