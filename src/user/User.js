import React, { useEffect, useState } from "react";
import { useParams, useRouteMatch, Link, NavLink, Switch, Route } from "react-router-dom"
import UserProfile from "./UserProfile";
import { fetchUserWithPosts } from "../api";
import PostList from "./PostList";
import PostsNav from "./PostsNav";
import ErrorMessage from "../common/ErrorMessage";

export const User = () => {
  const [user, setUser] = useState({ posts: [] });
  const [error, setError] = useState(undefined);
  const { userId } = useParams(); 
  const { path, url } = useRouteMatch();

  useEffect(() => {
    const abortController = new AbortController();
    fetchUserWithPosts(userId, abortController.signal)
      .then(setUser)
      .catch(setError);

    return () => abortController.abort();
  }, [userId]);

  if (error) {
    return (
      <ErrorMessage error={error}>
        <p>
          <Link to={"/"}>Return Home</Link>
        </p>
      </ErrorMessage>
    );
  }
  return (
    <section className="container">
      <PostsNav />
      <div className="border p-4 h-100 d-flex flex-column">
        <h2 className="mb-3">{user.name}</h2>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <NavLink to={url} className="nav-link">Profile</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={`${url}/posts`} className="nav-link">Posts</NavLink>
          </li>
        </ul>

        {user.id ? (
          <div className="p-4 border border-top-0">
            <Switch>
              <Route exact path={url}>
                <UserProfile user={user} />
              </Route>
              <Route path={`${url}/posts`}>
                <PostList posts={user.posts} />
              </Route>
            </Switch>
          </div>
        ) : (
          <div className="p-4 border border-top-0">
            <p>Loading...</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default User;
