const { mostLikes } = require('../utils/list_helper');
const { listWithManyBlogs, listWithOneBlog } = require('./blog_data');

describe('most liked blog', () => {
  test('when list has no blog, equals null', () => {
    expect(mostLikes([])).toBe(null);
  });

  test('when list has one blog, equals the blog of that', () => {
    expect(mostLikes(listWithOneBlog)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5,
    });
  });

  test('when list has many blog, equals the blog of that', () => {
    expect(mostLikes(listWithManyBlogs)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    });
  });
});
