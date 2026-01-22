import { AppProviders } from "./contexts/AppProviders";
import { Dashboard } from "./components/Dashboard";
import { ToastContainer } from "./components/ToastContainer";

function App() {
  return (
    <AppProviders>
      <Dashboard />
      <ToastContainer />
    </AppProviders>
  );
}

export default App;
