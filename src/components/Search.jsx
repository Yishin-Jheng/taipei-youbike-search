import rideBike from "../assets/img.svg";
import Dropdowns from "./Dropdowns";
import Input from "./Input";
import CheckList from "./CheckList";

function Search() {
  return (
    <section className="search padding-x">
      <div className="search__container">
        <h2 className="search__title text-l">站點資訊</h2>

        <Dropdowns />

        <Input />

        <CheckList />
      </div>

      <img
        src={rideBike}
        className="search__image"
        alt="people are riding bikes"
      />
    </section>
  );
}

export default Search;
