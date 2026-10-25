export default function SearchBar({ value, onChange }) {
  return (
    <div className="input-group">
      <span className="input-group-text">Search</span>
      <input
        className="form-control"
        placeholder="Search tasks by title..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

