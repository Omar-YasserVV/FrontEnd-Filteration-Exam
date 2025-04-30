import { useState, useEffect, useRef, useMemo } from "react";
import AddNoteDialog from "../components/AddNoteDialog";
import EditNoteDialog from "../components/EditNoteDialog";
import DeleteNoteDialog from "../components/DeleteNoteDialog";
import EmptyState from "../components/EmptyState";
import toast from "react-hot-toast";
import { PiTrashFill, PiPlusBold } from "react-icons/pi";
import { RiPencilFill, RiSearch2Line } from "react-icons/ri";

const NotesPage = () => {
  // State variables
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const isInitialMount = useRef(true);

  // Load notes from local storage
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);
  // Save notes to local storage
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes]);

  const filteredNotes = useMemo(() => {
    return notes
      .filter((note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((note) =>
        activeTab === "all" ? true : note.category === activeTab
      )
      .filter((note) => (showCompleted ? note.completed : true))
      .sort((a, b) => {
        // Sort by completion status first
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1;
        }
        // Then sort by date (newest first)
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
  }, [notes, searchQuery, activeTab, showCompleted]);

  const handleAddNote = (newNote) => {
    const date = new Date();
    const formattedDate = `${date.getDate().toString().padStart(2, "0")}.${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}.${date.getFullYear()}`;

    const note = {
      id: Date.now().toString(),
      title: newNote.title,
      description: newNote.description,
      category: newNote.category,
      date: formattedDate,
      completed: false,
    };

    setNotes([...notes, note]);
    setIsAddDialogOpen(false);

    toast.success("Note added successfully");
  };

  const handleEditNote = (updatedNote) => {
    setNotes(
      notes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
    setIsEditDialogOpen(false);

    toast.success("Note updated successfully");
  };

  const handleDeleteNote = () => {
    if (!currentNote) return;

    setNotes(notes.filter((note) => note.id !== currentNote.id));
    setIsDeleteDialogOpen(false);

    toast.success("Note deleted successfully");
  };

  const toggleNoteCompletion = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, completed: !note.completed } : note
      )
    );
  };

  const openEditDialog = (note) => {
    setCurrentNote(note);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (note) => {
    setCurrentNote(note);
    setIsDeleteDialogOpen(true);
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "personal":
        return "bg-amber-300 text-amber-700";
      case "home":
        return "bg-green-200 text-green-700";
      case "business":
        return "bg-purple-300 text-purple-900";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <>
      <header className="bg-white py-4 shadow-lg">
        <div className="lg:max-w-[1750px] mx-auto flex gap-4 max-lg:!px-10 lg:px-10">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <RiSearch2Line className="h-5 w-5 text-gray-700" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-3 w-full rounded-xl border-none focus:outline-none focus:ring-0 bg-gray-200 placeholder:text-gray-600 placeholder:font-semibold"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            className="bg-[#4990ff] hover:bg-blue-600 text-white text-sm !font-medium rounded-full px-4 py-2 flex items-center"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <PiPlusBold className=" w-[15px] mr-[7px]" /> Add
          </button>
        </div>
      </header>

      <div className="lg:max-w-[1750px] pt-7 mx-auto max-lg:!px-10 lg:px-10">
        {/* Header with search and add button */}

        {/* Main content */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-4">Your notes</h1>

          {/* Category tabs */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div className="mb-4 sm:mb-0">
              <div className="flex border-b">
                <button
                  className={`uppercase px-8 py-2 font-medium text-sm ${
                    activeTab === "all"
                      ? "border-b-2 border-[#4990ff] text-[#3990ff]"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("all")}
                >
                  All
                </button>
                <button
                  className={`uppercase px-4 py-2 font-medium text-sm ${
                    activeTab === "personal"
                      ? "border-b-2 border-blue-500 text-blue-500"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("personal")}
                >
                  Personal
                </button>
                <button
                  className={`uppercase px-4 py-2 font-medium text-sm ${
                    activeTab === "home"
                      ? "border-b-2 border-blue-500 text-blue-500"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("home")}
                >
                  Home
                </button>
                <button
                  className={`uppercase px-4 py-2 font-medium text-sm ${
                    activeTab === "business"
                      ? "border-b-2 border-blue-500 text-blue-500"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("business")}
                >
                  Business
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="show-completed"
                checked={showCompleted}
                onChange={(e) => setShowCompleted(e.target.checked)}
                className="cursor-pointer"
              />
              <label
                htmlFor="show-completed"
                className="text-sm text-gray-600 font-medium cursor-pointer select-none"
              >
                Show only completed notes
              </label>
            </div>
          </div>

          {/* Notes grid */}
          {filteredNotes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 select-none">
              {filteredNotes.map((note) => (
                <div
                  key={note.id}
                  className="bg-white !rounded-xl max-lg:max-w-[400px] p-4 shadow-lg hover:shadow-xl transition duration-200"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span
                      className={`px-3 py-[7px] rounded-full text-xs !font-bold capitalize ${getCategoryColor(
                        note.category
                      )}`}
                    >
                      {note.category}
                    </span>
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={note.completed}
                        onChange={() => toggleNoteCompletion(note.id)}
                        className="rounded border-gray-300"
                      />
                      <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => openEditDialog(note)}
                        aria-label="Edit note"
                      >
                        <RiPencilFill className="w-[18px] h-[17px]" />
                      </button>
                      <button
                        className="text-gray-500 hover:text-red-500"
                        onClick={() => openDeleteDialog(note)}
                        aria-label="Delete note"
                      >
                        <PiTrashFill className="w-[18px] h-[17px]" />
                      </button>
                    </div>
                  </div>
                  <div
                    className={
                      note.completed ? "line-through text-gray-500" : ""
                    }
                  >
                    <h2 className="text-xl font-semibold mb-2">{note.title}</h2>
                    <p className="text-gray-600 mb-4">{note.description}</p>
                  </div>
                  <div className="text-right text-sm text-gray-400">
                    {note.date}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              message={
                searchQuery
                  ? "No notes match your search"
                  : activeTab !== "all"
                  ? `No ${activeTab} notes found`
                  : "No notes yet. Click the Add button to create your first note!"
              }
            />
          )}
        </div>

        {/* Dialogs */}
        <AddNoteDialog
          isOpen={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          onAddNote={handleAddNote}
        />

        <EditNoteDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          note={currentNote}
          onEditNote={handleEditNote}
        />

        <DeleteNoteDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          note={currentNote}
          onDeleteNote={handleDeleteNote}
        />
      </div>
    </>
  );
};

export default NotesPage;
