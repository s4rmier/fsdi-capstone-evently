import React from "react";

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
    <figure className="blog-post">
      <figure className={`${category}-post`}>
        <img src={coverimg} alt="" />
        <figcaption>
          <div className="post-author flex-row align">
            <h4 className="post-category">{category}</h4>
            <p>
              Posted by: {author} on {formattedDate}
            </p>
          </div>
          <h3 className="">{title}</h3>
          <h4 className="post-sub-heading">{subheading}</h4>
        </figcaption>
      </figure>
    </figure>
  );
}

export default BlogPost;
