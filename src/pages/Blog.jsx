import React from "react";
import "./blog.css";
import "../index.css";
import posts from "../services/dummyPost.json";
import BlogPost from "../components/BlogPost";

function Blog() {
  function filterPostsByCategory(posts, category) {
    return posts.filter((post) => post.category === category);
  }

  let featuredPosts = filterPostsByCategory(posts, "featured");
  let storyPosts = filterPostsByCategory(posts, "stories");
  let tipsPost = filterPostsByCategory(posts, "tips");
  let ideaPosts = filterPostsByCategory(posts, "ideas");

  return (
    <main id="blog" className="blog-section container">
      <div className="page-title">
        <h1 className="main-headline">Blog</h1>
        <p>Event stories, ideas, tips, and tricks</p>
      </div>
      <div className="blog-body flex-row">
        <div className="col1 flex-col">
          {featuredPosts.map((post) => (
            <BlogPost key={post.id} {...post} />
          ))}
        </div>
        <div className="col2">
          {storyPosts.map((post) => (
            <BlogPost key={post.id} {...post} />
          ))}
        </div>
      </div>
      <div className="blog-listings flex-row justify">
        {tipsPost.map((post) => (
          <BlogPost key={post.id} {...post} />
        ))}
        {ideaPosts.map((post) => (
          <BlogPost key={post.id} {...post} />
        ))}
      </div>
    </main>
  );
}

export default Blog;
