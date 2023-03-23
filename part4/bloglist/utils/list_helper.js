const dummy = (blogs) => 1;

const totalLikes = (blogs) =>
  blogs.reduce((total, blog) => total + blog.likes, 0);

const favoriteBlog = (blogs) =>
  blogs.length === 0
    ? null
    : blogs.reduce((max, blog) => (blog.likes > max.likes ? blog : max));

module.exports = { dummy, totalLikes, favoriteBlog };
