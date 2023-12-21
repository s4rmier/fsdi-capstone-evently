import React from "react";
import { Link } from "react-router-dom";

function BlogPost({
  id,
  title,
  category,
  postdate,
  author,
  subheading,
  coverimg,
  body,
}) {
  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };

    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  const formattedDate = formatDate(postdate);

  return (
    <figure className={`${category}-post`}>
      <img src={coverimg} alt="" />
      <figcaption>
        <div className="post-author flex-row align">
          <h4 className="post-category">{category}</h4>
          <p>
            Posted by: {author} on {formattedDate}
          </p>
        </div>
        <Link to={`/blog/${id}`}>
          <h3 className="blog-title">{title}</h3>
        </Link>
        <h4 className="post-sub-heading">{subheading}</h4>
      </figcaption>
    </figure>
  );
}

export default BlogPost;
