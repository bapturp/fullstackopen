const { favoriteBlog } = require('../utils/list_helper');
const { listWithManyBlogs, listWithOneBlog } = require('./blog_data');

describe('favorite blog', () => {
  test('when list has only one blog, equals the blog of that', () =>
    expect(favoriteBlog(listWithOneBlog)).toEqual(listWithOneBlog[0]));

  test('when list is empty, expect empty object', () =>
    expect(favoriteBlog([])).toBe(null));

  test('when list has many blogs, equals the blog of that', () =>
    expect(favoriteBlog(listWithManyBlogs)).toEqual(listWithManyBlogs[2]));
});
