import Header from "./Header";
import Search from "./Search";
import Table from "./Table";

function Dashboard() {
  return (
    <div className="px-10 pt-8 w-full">
      <Header />
      <Search />
      <Table />
    </div>
  );
}

export default Dashboard;
