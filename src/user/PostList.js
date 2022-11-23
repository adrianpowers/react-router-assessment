import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom"
import Post from "./Post";
import PostLink from "./PostLink";
import NoPostSelectedMessage from "./NoPostSelectedMessage";

/*
  TODO: Update the below so that the components show on the appropriate route.

  The <NoPostSelectedMessage /> component should show up on the following route:
  /users/:userId/posts

  The <Post /> component should show up on the following route:
  /users/:userId/posts/:postId
*/

export const PostList = ({ posts }) => {
  const postLinks = posts.map((post) => (
    <PostLink key={post.id} userId={post.userId} post={post} />
  ));

  const {url, path} = useRouteMatch();
  
  return (
    <div className="row pt-2">
      <div className="col-3">
        <ul className="list-group">{postLinks}</ul>
      </div>
      <div className="col-9">
        <Route path={`${url}/:postId`}>
          <Post posts={posts} />
        </Route>
        <Route exact path={url}>
          <NoPostSelectedMessage />
        </Route>
      </div>
    </div>
  );
};

export default PostList;
