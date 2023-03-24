const { totalLikes } = require('../utils/list_helper');
const { listWithManyBlogs, listWithOneBlog } = require('./blog_data');

describe('total likes', () => {
  test('when list is empty, equals the likes of that', () => {
    result = totalLikes([]);
    expect(result).toBe(0);
  });

  test('when list has only one blog, equals the likes of that', () => {
    result = totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test('when list has many blogs, equals the likes of that', () => {
    result = totalLikes(listWithManyBlogs);
    expect(result).toBe(36);
  });
});
