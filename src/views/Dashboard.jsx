import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { CalendarIcon, ClipboardIcon, ShareIcon, TrashIcon, ArchiveBoxIcon, PlusIcon, MagnifyingGlassIcon, ChevronDownIcon, EllipsisVerticalIcon, PhotoIcon, ListBulletIcon, TableCellsIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { ShareNoteDialog } from './components/ShareNoteDialog';

export const Dashboard = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Project Planning Meeting",
      content: "Discussed the upcoming project milestones and deliverables...",
      category: "Work",
      hasImage: true,
      createdAt: "2024-01-15",
      updatedAt: "2024-01-15",
    },
    {
      id: 2,
      title: "Recipe Ideas",
      content: "Collection of healthy meal prep recipes for the week...",
      category: "Personal",
      hasImage: false,
      createdAt: "2024-01-14",
      updatedAt: "2024-01-14",
    },
    {
      id: 3,
      title: "Book Notes: The Lean Startup",
      content:
        "Key insights from Eric Ries about building successful startups...",
      category: "Learning",
      hasImage: false,
      createdAt: "2024-01-13",
      updatedAt: "2024-01-13",
    },
    {
      id: 4,
      title: "Travel Itinerary - Japan",
      content: "Day-by-day plan for the upcoming trip to Tokyo and Kyoto...",
      category: "Travel",
      hasImage: true,
      createdAt: "2024-01-12",
      updatedAt: "2024-01-12",
    },
    {
      id: 5,
      title: "Grocery List",
      content: "List of items to buy for the upcoming week's shopping spree...",
      category: "Shopping",
      hasImage: false,
      createdAt: "2024-01-11",
      updatedAt: "2024-01-11",
    },
    {
      id: 6,
      title: "Dental Appointment",
      content: "Reminder for the dentist appointment on January 10th...",
      category: "Health",
      hasImage: false,
      createdAt: "2024-01-10",
      updatedAt: "2024-01-10",
    },
    {
      id: 7,
      title: "Family Dinner",
      content: "Planning for a cozy dinner with family members...",
      category: "Family",
      hasImage: true,
      createdAt: "2024-01-09",
      updatedAt: "2024-01-09",
    },
    {
      id: 8,
      title: "Vacation Planning",
      content: "Detailed plan for the upcoming vacation...",
      category: "Travel",
      hasImage: false,
      createdAt: "2024-01-08",
      updatedAt: "2024-01-08",  
    },
    {
      id: 9,
      title: "New Year's Resolution",
      content: "Setting new goals for the upcoming year...",
      category: "Personal",
      hasImage: false,
      createdAt: "2024-01-07",
      updatedAt: "2024-01-07",  
    },
    {
      id: 10,
      title: "Movie Night",
      content: "Planning for a movie night with friends...",
      category: "Family",
      hasImage: true,
      createdAt: "2024-01-06",
      updatedAt: "2024-01-06",
    },
    {
      id: 11,
      title: "Grocery Shopping",
      content: "List of items to buy for the upcoming week...",
      category: "Shopping",
      hasImage: false,
      createdAt: "2024-01-05",
      updatedAt: "2024-01-05",
    },
    {
      id: 12,
      title: "Dental Checkup",
      content: "Reminder for the dentist appointment on January 4th...",
      category: "Health",
      hasImage: false,
      createdAt: "2024-01-04",
      updatedAt: "2024-01-04",
    }
  ]);
  const [categories] = useState(["All", "Work", "Personal", "Learning", "Travel"]);
  const [viewMode, setViewMode] = useState("grid");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [shareDialog, setShareDialog] = useState({
    isOpen: false,
    noteTitle: "",
    noteId: null,
  });

  const toggleDropdown = (noteId) => {
    setActiveDropdown(activeDropdown === noteId ? null : noteId);
  };

  const openShareDialog = (note) => {
    setShareDialog({
      isOpen: true,
      noteTitle: note.title,
      noteId: note.id,
    });
    setActiveDropdown(null);
  };

  const closeShareDialog = () => {
    setShareDialog({
      isOpen: false,
      noteTitle: "",
      noteId: null,
    });
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest(".relative")) {
      setActiveDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex flex-col lg:flex-row items-center justify-between px-6 max-w-4xl mx-auto">
          <Link to="/" className="mb-3 text-xl font-bold text-gray-900">My Notes</Link>
          <div className="flex items-center gap-1 lg:gap-4">
            <Link to="/categories">
              <button className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition duration-200">
                Categories
              </button>
            </Link>
            <Link to="/dashboard/archive">
              <button className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition duration-200 flex items-center">
                <ArchiveBoxIcon className="size-5 mr-2" />
                <span className="hidden md:inline">Archive</span>
              </button>
            </Link>
            <Link to="/new-note">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 flex items-center">
                <PlusIcon className="size-5 mr-2" />
                <span className="hidden md:inline">New Note</span>
              </button>
            </Link>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-4xl mx-auto">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="size-5 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              placeholder="Search notes..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <ChevronDownIcon className="size-5 absolute right-2 top-1/2 transform -translate-y-1/2" />
            </div>
            <div className="flex border border-gray-300 rounded-md">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-2 text-sm rounded-l-md transition duration-200 ${viewMode === "grid" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
              >
                <TableCellsIcon className="size-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-2 text-sm rounded-r-md transition duration-200 ${viewMode === "list" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
              >
                <ListBulletIcon className="size-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Notes Grid/List */}
        {notes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No notes found</p>
            <p className="text-gray-400 text-sm mt-2">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
            {notes.map((note) => (
              <div key={note.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="p-4 pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold line-clamp-1 text-gray-900">
                        {note.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                          {note.category}
                        </span>
                        {note.hasImage && <PhotoIcon className="size-5" />}
                      </div>
                    </div>
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown(note.id)}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                      >
                        <EllipsisVerticalIcon className="size-5" />
                      </button>
                      {activeDropdown === note.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                          <div className="py-1">
                            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                              <PencilSquareIcon className="size-5 mr-2" />
                              Edit
                            </button>
                            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                              <ClipboardIcon className="size-5 mr-2" />
                              Copy
                            </button>
                            <button
                              onClick={() => openShareDialog(note)}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                            >
                              <ShareIcon className="size-5 mr-2" />
                              Share
                            </button>
                            <hr className="my-1" />
                            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                              <ArchiveBoxIcon className="size-5 mr-2" />
                              Archive
                            </button>
                            <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center">
                              <TrashIcon className="size-5 mr-2" />
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-4 pt-0">
                  <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                    {note.content}
                  </p>
                  <div className="flex items-center text-xs text-gray-400">
                    <CalendarIcon className="size-5 mr-2" />
                    {note.updatedAt}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination  */}
        <div className="mt-8 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <button className="px-3 py-2 text-sm border rounded-md bg-blue-600 text-white border-blue-600">
              1
            </button>
            <button className="px-3 py-2 text-sm border rounded-md">
              2
            </button>
            <button className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              Next
            </button>
          </nav>
        </div>
      </div>
        

        {/* Share Dialog */}
        <ShareNoteDialog
          isOpen={shareDialog.isOpen}
          noteTitle={shareDialog.noteTitle}
          noteId={shareDialog.noteId}
          onClose={closeShareDialog}
        />
    </div>
  );
};
