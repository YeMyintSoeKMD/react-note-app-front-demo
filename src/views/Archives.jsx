import { useState, useEffect } from "react";
import {
  CalendarIcon,
  ArrowRightIcon,
  TrashIcon,
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router";

export const Archives = () => {
  const [archivedNotes] = useState([
    {
      id: 1,
      title: "Old Project Notes",
      content: "Notes from the completed project last quarter...",
      category: "Work",
      archivedAt: "2024-01-10",
      originalDate: "2023-12-15",
    },
    {
      id: 2,
      title: "Vacation Planning 2023",
      content: "Planning details for last year's summer vacation...",
      category: "Travel",
      archivedAt: "2024-01-08",
      originalDate: "2023-06-20",
    },
    {
      id: 3,
      title: "Course Notes - React Basics",
      content: "Basic React concepts and examples from online course...",
      category: "Learning",
      archivedAt: "2024-01-05",
      originalDate: "2023-11-30",
    },
  ]);

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleDropdown = (noteId) => {
    setActiveDropdown((prev) => (prev === noteId ? null : noteId));
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest(".relative")) {
      setActiveDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const filteredNotes = archivedNotes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="flex items-center justify-between px-6 max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <button className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition duration-200">
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Back
              </button>
            </Link>
            <h1 className="text-base lg:text-xl font-bold text-gray-900">
              Archived Notes
            </h1>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-4xl mx-auto">
        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <MagnifyingGlassIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              placeholder="Search archived notes..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Archived Notes */}
        {filteredNotes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No archived notes found</p>
            <p className="text-gray-400 text-sm mt-2">
              {searchQuery
                ? "Try adjusting your search"
                : "Your archived notes will appear here"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
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
                        <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full border border-yellow-200">
                          Archived
                        </span>
                      </div>
                    </div>
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown(note.id)}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                      >
                        <EllipsisVerticalIcon className="h-5 w-5" />
                      </button>
                      {activeDropdown === note.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                          <div className="py-1">
                            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                              <ArrowRightIcon className="h-5 w-5 mr-2" />
                              Restore
                            </button>
                            <hr className="my-1" />
                            <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center">
                              <TrashIcon className="h-5 w-5 mr-2" />
                              Delete Permanently
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
                  <div className="space-y-1 text-xs text-gray-400">
                    <div className="flex items-center">
                      <CalendarIcon className="h-5 w-5 mr-2" />
                      Created: {note.originalDate}
                    </div>
                    <div className="flex items-center">
                      <CalendarIcon className="h-5 w-5 mr-2" />
                      Archived: {note.archivedAt}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog (conditionally render as needed) */}
      {false && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-2">
              Delete Note Permanently
            </h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to permanently delete "note title"? This
              action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition duration-200">
                Cancel
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200">
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
