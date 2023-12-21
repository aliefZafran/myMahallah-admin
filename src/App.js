import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./screens/login/Login";
import Homepage from "./screens/homepage/Homepage";
import RoomPage from "./screens/roompage/RoomPage";
import ManageRoom from "./screens/manageRoom/ManageRoom";
import Form from "./screens/forms/Form";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import ManageForm from "./screens/forms/ManageForm";
import Settings from "./screens/settingsPage/Settings";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/*"
          element={
            <>
              <Header />
              <Sidebar />
              <Routes>
                <Route path="/homepage" element={<Homepage />} />
                <Route path="/room" element={<RoomPage />} />
                <Route
                  path="/manageroom/:block/:level/:roomNumber"
                  element={<ManageRoom />}
                />
                <Route path="/forms" element={<Form />} />
                <Route path="/form/id/:id" element={<ManageForm />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
