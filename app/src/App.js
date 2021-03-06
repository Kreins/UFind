import React from "react";
// Importing react-router-dom to use the React Router
import { Route, Switch, BrowserRouter } from "react-router-dom";
import "./App.css";
import "antd/dist/antd.css";
import Course from "./components/Course/Course";
import CourseAdmin from "./components/Course/CourseAdmin";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Team from "./components/Team/user/Team";
import Admin from "./components/Admin/Admin";
import Profile from "./components/Profile/Profile";
import AdminTeam from "./components/Team/admin/Team";
import AdminUserTable from "./components/AdminUserTable/AdminUserTable";


class App extends React.Component {
  state = {
    users: [
      { username: "Jack", password: "123456", admin: false },
      { username: "admin", password: "admin", admin: true },
    ],
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Login appState={this.state} />}
            />
            <Route
              exact
              path="/Home"
              render={() => <Home appState={this.state} />}
            />
            <Route
              exact
              path="/Admin"
              render={() => <Admin appState={this.state} />}
            />
            <Route
              exact
              path="/Profile"
              render={() => <Profile appState={this.state} />}
            />
            <Route
              exact
              path="/Course"
              render={() => <Course appState={this.state} />}
            />
            <Route
              exact
              path="/CourseAdmin"
              render={() => <CourseAdmin appState={this.state} />}
            />
            <Route
              exact
              path="/Team"
              render={() => <Team appState={this.state} />}
            />
            <Route
              exact
              path="/Profile"
              render={() => <Profile appState={this.state} />}
            />
            <Route
              exact
              path="/teamAdmin"
              render={() => <AdminTeam appState={this.state} />}
            />
            <Route
                exact
                path="/AdminUsers"
                render={() => <AdminUserTable appState={this.state} />}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
