import React, { useState } from "react";
import { useNavigate } from "react-router";
import { CategoryCard } from "./components/CategoryCard";
import { ArrowLeftIcon, CheckIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";

const initialCategories = [
  { id: 1, name: "Work", color: "#3B82F6", noteCount: 12 },
  { id: 2, name: "Personal", color: "#10B981", noteCount: 8 },
  { id: 3, name: "Learning", color: "#F59E0B", noteCount: 15 },
  { id: 4, name: "Travel", color: "#EF4444", noteCount: 5 },
];

const colors = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
  "#06B6D4",
  "#84CC16",
];

export const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState(initialCategories);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const handleAddCategoryClick = () => {
    setIsAddingCategory(true);
  };

  const handleSaveCategory = () => {
    if (newCategoryName && selectedColor) {
      const newCategory = {
        id: categories.length + 1,
        name: newCategoryName,
        color: selectedColor,
        noteCount: 0,
      };
      setCategories([...categories, newCategory]);
      setNewCategoryName("");
      setSelectedColor("");
      setIsAddingCategory(false);
    }
  };

  const handleCancelAdd = () => {
    setNewCategoryName("");
    setSelectedColor("");
    setIsAddingCategory(false);
  };

  const confirmDeleteCategory = () => {
    if (categoryToDelete) {
      setCategories(categories.filter((cat) => cat.id !== categoryToDelete.id));
      setCategoryToDelete(null);
      setShowDeleteDialog(false);
    }
  };

  const cancelDelete = () => {
    setCategoryToDelete(null);
    setShowDeleteDialog(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="flex items-center justify-between px-6 max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition duration-200"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back
            </button>
            <h1 className="text-base lg:text-xl font-bold text-gray-900">Manage Categories</h1>
          </div>
          <button
            onClick={handleAddCategoryClick}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 flex items-center"
          >
            <PlusIcon className="h-5 w-5 mr-0 lg:mr-2" />
            <span className="hidden lg:inline">Add Category</span>
          </button>
        </div>
      </header>

      <div className="p-6 max-w-4xl mx-auto">
        {/* Add New Category Form: to show/hide conditionally */}
        {isAddingCategory && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="categoryName" className="text-sm font-medium text-gray-700">
                    Category Name
                  </label>
                  <input
                    id="categoryName"
                    type="text"
                    placeholder="Enter category name..."
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Color</label>
                  <div className="flex gap-2">
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded-full border-2 transition duration-200 border-gray-300 ${
                          selectedColor === color ? "border-black" : ""
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveCategory}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 flex items-center"
                  >
                    <CheckIcon className="h-5 w-5 mr-2" />
                    Save Category
                  </button>
                  <button
                    onClick={handleCancelAdd}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition duration-200 flex items-center"
                  >
                    <XMarkIcon className="h-5 w-5 mr-2" />
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Categories List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              colors={colors}
            />
          ))}
        </div>
      </div>

      {/* Delete Confirmation Dialog : to show/hide conditionally */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-2">Delete Category</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete "{categoryToDelete?.name}"? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteCategory}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
