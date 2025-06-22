import React from "react";
import { PencilSquareIcon, TrashIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

export const CategoryCard = ({ category, colors }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="p-4">
        {/* Edit form: to show/hide conditionally */}
        {
          false && (
            <div className="space-y-4">
                <input
                    placeholder="Category name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="flex gap-2">
                    {/* tick the border when clicked */}
                    {colors.map((color) => (
                    <button
                        key={color}
                        className="w-6 h-6 rounded-full border-2 transition duration-200 border-gray-300"
                        style={{ backgroundColor: color }}
                    />
                    ))}
                </div>
                <div className="flex gap-2">
                    <button
                    className="px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition duration-200 flex items-center"
                    >
                    <CheckIcon className="h-5 w-5 mr-2" />
                    Save
                    </button>
                    <button
                    className="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-50 transition duration-200 flex items-center"
                    >
                    <XMarkIcon className="h-5 w-5 mr-2" />
                    Cancel
                    </button>
                </div>
            </div>
          )
        }

          {/* Category data  */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: category.color }}
                ></div>
                <h3 className="font-semibold">{category.name}</h3>
              </div>
              <div className="flex gap-1">
                <button
                  className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                >
                  <PencilSquareIcon className="h-5 w-5" />
                </button>
                <button
                  className="p-1 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
              {category.noteCount} notes
            </span>
          </div>
      </div>
    </div>
  );
}
