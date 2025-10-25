function SearchBar({ value, onChange }) {
    return (
        <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search by name or email...."
            className="border rounded-md p-2 w-full mb-4 md:w-1/2"
        />
    );
}
export default SearchBar;