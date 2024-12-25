import { useEffect, useState } from "react";
import { usePreferences } from "../../hooks/usePreference";
import { UserPreference } from "../../types";

const Preferences = () => {
  const { preferences, options, updatePreferences, isLoading, isUpdating } =
    usePreferences();
  const [selectedPreferences, setSelectedPreferences] =
    useState<UserPreference>({
      categories: [],
      sources: [],
      authors: [],
    });

  console.log(selectedPreferences);

  useEffect(() => {
    if (preferences) {
      setSelectedPreferences(preferences?.data);
    }
  }, [preferences]);

  const handleSelectionChange = (
    type: keyof UserPreference,
    value: string,
    checked: boolean
  ) => {
    setSelectedPreferences((prev) => {
      const updated = { ...prev };
      console.log(updated);
      console.log(type);
      if (!updated[type]) {
        updated[type] = [];
      }
      if (checked) {
        updated[type] = [...updated[type], value];
      } else {
        updated[type] = updated[type].filter((item) => item !== value);
      }
      return updated;
    });
  };

  const handleSave = () => {
    updatePreferences(selectedPreferences);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">News Preferences</h2>

      {/* Categories */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {options?.data?.categories.map((category) => (
            <label key={category} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedPreferences?.categories?.includes(category)}
                onChange={(e) =>
                  handleSelectionChange(
                    "categories",
                    category,
                    e.target.checked
                  )
                }
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sources */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Sources</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {options?.data?.sources.map((source) => (
            <label key={source} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedPreferences?.sources?.includes(source)}
                onChange={(e) =>
                  handleSelectionChange("sources", source, e.target.checked)
                }
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">{source}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Authors */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Authors</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {options?.data?.authors.map((author) => (
            <label key={author} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedPreferences?.authors?.includes(author)}
                onChange={(e) =>
                  handleSelectionChange("authors", author, e.target.checked)
                }
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">{author}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={isUpdating}
        className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {isUpdating ? "Saving..." : "Save Preferences"}
      </button>
    </div>
  );
};

export default Preferences;
