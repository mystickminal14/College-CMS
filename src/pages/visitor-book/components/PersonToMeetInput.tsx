import { useState } from "react";
import useGetTeams from "../../our-teams/hooks/useGetAll";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

// Free-text field with a suggestion dropdown backed by the existing OurTeam
// directory (top-5 by order, or live search). Any typed name is a valid
// submission — there is no "Other" branch because nothing here is a foreign
// key. See plan.md §2a.
const PersonToMeetInput: React.FC<Props> = ({ value, onChange }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { data } = useGetTeams({ search: value, limit: 5 });
  const suggestions = data?.data ?? [];

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
        placeholder="Type a name, or pick from suggestions"
        className="w-full px-4 py-2 border rounded-lg"
        required
      />

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-56 overflow-y-auto">
          {suggestions.map((member) => (
            <button
              type="button"
              key={member.id}
              onMouseDown={() => {
                onChange(member.name ?? "");
                setShowSuggestions(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
            >
              <span className="font-medium text-gray-900 dark:text-white">{member.name}</span>
              {member.position && (
                <span className="text-gray-500 dark:text-gray-400"> — {member.position}</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PersonToMeetInput;
