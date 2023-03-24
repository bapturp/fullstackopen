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

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };
