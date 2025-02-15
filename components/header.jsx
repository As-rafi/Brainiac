import Account from "./account";
import Logo from "./logo";
import Nav from "./navbar";
import SearchBar from "./searchbar";

export default function Header() {
  return (
    <div
      className="container-fluid p-2"
      style={{
        position: "sticky",
        top: "0px",
        zIndex: 100,
        background: "linear-gradient(90deg, #ffffff, #f2f2f2)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        borderBottom: "1px solid #eaeaea",
      }}
    >
      <Account />
      <Logo />
      <div className="d-flex justify-content-between">
        <Nav />
        <SearchBar />
      </div>
    </div>
  );
}
