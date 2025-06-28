import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { ArrowLeftIcon, CheckIcon, CloudArrowUpIcon, ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";

const categories = ["Work", "Personal", "Learning", "Travel"];

export const NewNote = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  const [uploadedImage, setUploadedImage] = useState(null);
  const imageInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
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
            <h1 className="text-base lg:text-xl font-bold text-gray-900">New Note</h1>
          </div>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 flex items-center"
          >
            <CheckIcon className="h-5 w-5 mr-0 lg:mr-2" />
            <span className="hidden lg:inline">Save Note</span>
          </button>
        </div>
      </header>

      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">Create New Note</h2>
            <div className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="Enter note title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium text-gray-700">
                  Category
                </label>
                <div className="relative">
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full appearance-none bg-white border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon className="h-5 w-5 absolute right-2 top-1/2 transform -translate-y-1/2" />
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Images</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    ref={imageInputRef}
                  />
                  <button
                    type="button"
                    onClick={() => imageInputRef.current && imageInputRef.current.click()}
                    className="cursor-pointer focus:outline-none"
                  >
                    <CloudArrowUpIcon className="h-10 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Click to upload images or drag and drop</p>
                  </button>
                </div>

                {/* Uploaded Image Preview */}
                {
                  uploadedImage &&
                  <div className="relative w-24 h-24 mt-4">
                    <img
                      src={uploadedImage}
                      alt={`Upload`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeImage()}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                }
              </div>

              {/* Content */}
              <div className="space-y-2">
                <label htmlFor="content" className="text-sm font-medium text-gray-700">
                  Content
                </label>
                <textarea
                  id="content"
                  placeholder="Write your note content here..."
                  rows={12}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
