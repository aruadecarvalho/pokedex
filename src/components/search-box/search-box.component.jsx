import "./search-box.style.css";

const SearchBox = ({ className, placeholder, onChangeHandler }) => {
  return (
    <div className="search-box--container">
      <input
        className={`search-box ${className}`}
        type="search"
        placeholder={placeholder}
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default SearchBox;
