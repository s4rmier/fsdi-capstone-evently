import React from "react";
import posts from "../services/dummyPost.json";
import { useParams } from "react-router-dom";

function BlogDetails() {
  const { id } = useParams();
  const blogData = posts.find((post) => post.id === Number(id));

  if (!blogData) {
    return <div>Blog post not found.</div>;
  }

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };

    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  const formattedDate = formatDate(blogData.postdate);

  return (
    <figure className="blog-detail container flex-col">
      <img src={blogData.coverimg} alt="" />
      <figcaption>
        <div className="title-block flex-col justify">
          <h1 className="main-headline">Title {blogData.title}</h1>
          <h2>{blogData.subheading}</h2>
          <div className="author-block flex-row align">
            <p>
              Posted by:{blogData.author} | {formattedDate}
            </p>
          </div>
          <p className="post-body">{blogData.body}</p>
        </div>
      </figcaption>
    </figure>
  );
}

export default BlogDetails;
