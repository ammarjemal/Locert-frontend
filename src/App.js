import { Route, Switch, Redirect } from "react-router-dom";
import SignupPage from "./pages/signup";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import MessagesPage from "./pages/messages";
import AlertPage from "./pages/alert";
import NewArticlePage from "./pages/new-article";
import UserProfilePage from "./pages/user-profile";
import Layout from "./components/layout/Layout";
import AdminLayout from "./components/Admin/layout/Layout";
import { Fragment } from "react";
import { useAuth } from "./store/auth-context";
import AdminPage from "./pages/admin";
import AdminArticlesPage from "./pages/admin/posts";
import AdminResearchersPage from "./pages/admin/researchers";
// import NotLoggedIn from "./UI/NotLoggedIn";

function App() {
  const { isLoggedIn, currentUser } = useAuth();
  const ProtectedRoute = ({children}) => {
    if(!isLoggedIn && currentUser?.userType === "researcher"){
      return <Redirect to="/login"/>
    }else if(!isLoggedIn && currentUser?.userType === "admin"){
        return <Redirect to="/admin-login"/>
    }else{
      return children;
    }
  }

  // console.log(currentUser);
  return (
    <Fragment>
      <Switch>
        <Route path="/" exact>
          <Layout>
            <HomePage/>
          </Layout>
        </Route>
        <Route path="/messages">
          <Layout>
            <ProtectedRoute>
              <MessagesPage/>
            </ProtectedRoute>
          </Layout>
        </Route>
        <Route path="/alert">
          <Layout>
            <ProtectedRoute>
              <AlertPage/>
            </ProtectedRoute>
          </Layout>
        </Route>
        <Route path="/user-profile/:uid">
          <Layout>
              <UserProfilePage/>
          </Layout>
        </Route>
        <Route path="/new-article">
          <Layout>
            <ProtectedRoute>
              <NewArticlePage/>
            </ProtectedRoute>
          </Layout>
        </Route>
        <Route path="/signup">
          <SignupPage/>
        </Route>
        <Route path="/login">
          <LoginPage/>
        </Route>
        <Route path="/admin" exact>
          <AdminLayout>
            <ProtectedRoute>
              <AdminPage/>
            </ProtectedRoute>
          </AdminLayout>
        </Route>
        <Route path="/admin/articles">
          <AdminLayout>
            <ProtectedRoute>
              <AdminArticlesPage/>
            </ProtectedRoute>
          </AdminLayout>
        </Route>
        <Route path="/admin/researchers">
          <AdminLayout>
            <ProtectedRoute>
              <AdminResearchersPage/>
            </ProtectedRoute>
          </AdminLayout>
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
