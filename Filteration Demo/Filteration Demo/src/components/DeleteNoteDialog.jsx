"use client";

import { X } from "lucide-react";

const DeleteNoteDialog = ({ isOpen, onClose, note, onDeleteNote }) => {
  if (!isOpen || !note) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-md">
        <div className="flex justify-between items-center px-4 pt-4">
          <h2 className="text-lg font-semibold">Delete Note</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          <p className="mb-4">Are you sure you want to delete this note?</p>
          <div className="bg-gray-100 p-3 rounded-[10px] mb-4">
            <h3 className="font-medium text-gray-700">{note.title}</h3>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="px-5 py-2 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={onDeleteNote}
              className="px-5 py-2 bg-red-500 shadow-md hover:shadow-red-400 text-white rounded-xl text-sm font-medium "
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteNoteDialog;
