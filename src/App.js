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
import AdminLoginPage from "./pages/admin/login";
import AdminArticlesPage from "./pages/admin/posts";
import AdminResearchersPage from "./pages/admin/researchers";
import { useAdminAuth } from "./store/admin-context";
import MyProfilePage from "./pages/my-profile";

function App() {
  const { isLoggedIn } = useAuth();
  const { isAdminLoggedIn } = useAdminAuth();
  const ProtectedRoute = ({children}) => {
    if(!isLoggedIn){
      return <Redirect to="/login"/>
    }else{
      return children;
    }
  }
  const AdminProtectedRoute = ({children}) => {
    console.log(isLoggedIn);
    if(!isLoggedIn || !isAdminLoggedIn){
        return <Redirect to="/admin/login"/>
    }else{
      return children;
    }
  }

  return (
    <Fragment>
      <Switch>
        <Route path="/" exact>
          <Layout>
            <HomePage/>
          </Layout>
        </Route>
        <Route path="/messages">
          <ProtectedRoute>
            <MessagesPage/>
          </ProtectedRoute>
        </Route>
        <Route path="/profile">
          <Layout>
            <ProtectedRoute>
              <MyProfilePage/>
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
        <Route path="/admin/login" exact>
          <AdminLoginPage/>
        </Route>
        <Route path="/admin/articles">
          <AdminProtectedRoute>
            <AdminLayout>
                <AdminArticlesPage/>
            </AdminLayout>
          </AdminProtectedRoute>
        </Route>
        <Route path="/admin/researchers">
          <AdminProtectedRoute>
            <AdminLayout>
              <AdminResearchersPage/>
            </AdminLayout>
          </AdminProtectedRoute>
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
