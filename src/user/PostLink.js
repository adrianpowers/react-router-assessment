import React from "react";
import { NavLink, useRouteMatch } from "react-router-dom";

export const PostLink = ({ post }) => {
  const { url } = useRouteMatch();
  return (
    <li className="list-group-item text-truncate">
      <NavLink to={`${url}/${post.id}`}>{post.title}</NavLink>
    </li>
  );
};

export default PostLink;
