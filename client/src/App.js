import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import HomeFeed from "./components/HomeFeed";
import Notifications from "./components/Notifications";
import Bookmarks from "./components/Bookmarks";
import TweetDetails from "./components/TweetDetails";
import Profile from "./components/Profile";
import Sidebar from "./components/Sidebar";

const PageWrapper = styled.div`
  display: flex;
  margin: 0 15%;
`;

const SidebarColumn = styled.div`
  flex: 3;
`;

const RouterColumn = styled.div`
  flex: 7;
`;

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <PageWrapper>
              <SidebarColumn>
                <Sidebar />
              </SidebarColumn>
              <RouterColumn>
                <HomeFeed />
              </RouterColumn>
            </PageWrapper>
          </Route>
          <Route exact path="/notifications">
            <PageWrapper>
              <SidebarColumn>
                <Sidebar />
              </SidebarColumn>
              <RouterColumn>
                <Notifications />
              </RouterColumn>
            </PageWrapper>
          </Route>
          <Route exact path="/bookmarks">
            <PageWrapper>
              <SidebarColumn>
                <Sidebar />
              </SidebarColumn>
              <RouterColumn>
                <Bookmarks />
              </RouterColumn>
            </PageWrapper>
          </Route>
          <Route exact path="/tweet/:tweetId">
            <PageWrapper>
              <SidebarColumn>
                <Sidebar />
              </SidebarColumn>
              <RouterColumn>
                <TweetDetails />
              </RouterColumn>
            </PageWrapper>
          </Route>
          <Route exact path="/:profileId">
            <PageWrapper>
              <SidebarColumn>
                <Sidebar />
              </SidebarColumn>
              <RouterColumn>
                <Profile />
              </RouterColumn>
            </PageWrapper>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
