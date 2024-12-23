import Navbar from "./components/Navbar/index";
import AllRoutes from "./components/Routing/AllRoutes";
import UserContext from "./contexts/userContext";
import useFetchData from "./hooks/useFetchData";
import { setAuthToken } from "./utils/SetToken";

setAuthToken();
const App = () => {
  const { data: user } = useFetchData("/user", ["user"]);
  return (
    <UserContext.Provider value={user || null}>
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <main className="flex-grow">
          <AllRoutes />
        </main>
      </div>
    </UserContext.Provider>
  );
};

export default App;
