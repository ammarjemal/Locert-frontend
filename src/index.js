import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'tw-elements';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './store/auth-context';
import { ChatContextProvider } from './store/chat-context';
import { AdminContextProvider } from './store/admin-context';
import { UserProfileContextProvider } from './store/user-profile-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <UserProfileContextProvider>
      <AuthContextProvider>
        <ChatContextProvider>
          <AdminContextProvider>
              <App />
          </AdminContextProvider>
        </ChatContextProvider>
      </AuthContextProvider>
    </UserProfileContextProvider>
  </BrowserRouter>
);