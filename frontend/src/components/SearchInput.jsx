import "../components/SearchInput.css"
import { CiSearch } from "react-icons/ci";
 const SearchInput = () => {
  return (
    <form className="Search">
        <input type="text" placeholder="Search" className="inputsearch"/>
        <button type ="sumbit" className="btn">
            <CiSearch className="cibtn" />
         
        </button>
    </form>
  )
}
export default SearchInput;
