const { mostBlogs } = require('../utils/list_helper');
const { listWithManyBlogs, listWithOneBlog } = require('./blog_data');

describe('most authored blog', () => {
  test('when list has one blog, equals the blog of that', () =>
    expect(mostBlogs(listWithOneBlog)).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1,
    }));

  test('when list has no blog, equals null', () =>
    expect(mostBlogs([])).toBe(null));

  test('when list has many blogs, equals the blog of that', () =>
    expect(mostBlogs(listWithManyBlogs)).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    }));
});
