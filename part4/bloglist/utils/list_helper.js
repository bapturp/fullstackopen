const dummy = (blogs) => 1;

const totalLikes = (blogs) =>
  blogs.reduce((total, blog) => total + blog.likes, 0);

const favoriteBlog = (blogs) =>
  blogs.length === 0
    ? null
    : blogs.reduce((max, blog) => (blog.likes > max.likes ? blog : max));

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const authorCount = {};

  blogs.forEach((blog) => {
    if (blog.author in authorCount) {
      authorCount[blog.author].blogs++;
    } else {
      authorCount[blog.author] = { author: blog.author, blogs: 1 };
    }
  });

  const authorCountList = [];
  for (const [_, value] of Object.entries(authorCount)) {
    authorCountList.push(value);
  }

  return authorCountList.sort((a, b) => b.blogs - a.blogs)[0];
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  const authorDict = {};

  blogs.forEach((blog) => {
    if (blog.author in authorDict) {
      authorDict[blog.author].likes =
        authorDict[blog.author].likes + blog.likes;
    } else {
      authorDict[blog.author] = { author: blog.author, likes: blog.likes };
    }
  });

  const authorList = [];
  for (const [_, value] of Object.entries(authorDict)) {
    authorList.push(value);
  }

  return authorList.sort((a, b) => b.likes - a.likes)[0];
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
