const listHelper = require('../utils/list_helper');

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];

describe('total likes', () => {
  test('of empty list is null', () => {
    expect(listHelper.totalLikes([])).toBe(null);
    expect(listHelper.totalLikes(null)).toBe(null);
  });

  test('when list has only one blog, equal the likes of that', () => {
    expect(listHelper.totalLikes([blogs[0]])).toBe(7);
  });

  test('of blog with zero likes equals zero', () => {
    expect(listHelper.totalLikes([blogs[4]])).toBe(0);
  });

  test('of list with many blogs, total likes is accurate', () => {
    expect(listHelper.totalLikes(blogs)).toBe(36);
  });
});

describe('favourite blog', () => {
  test('of empty list is null', () => {
    expect(listHelper.favouriteBlog([])).toBe(null);
    expect(listHelper.favouriteBlog(null)).toBe(null);
  });

  test('of one is that blog', () => {
    expect(listHelper.favouriteBlog([blogs[0]])).toEqual(blogs[0]);
  });

  test('equals the blog with most likes', () => {
    expect(listHelper.favouriteBlog(blogs)).toEqual(blogs[2]);
  });
});

describe('author with the most blogs', () => {
  test('of empty list is null', () => {
    expect(listHelper.mostBlogs([])).toBe(null);
    expect(listHelper.mostBlogs(null)).toBe(null);
  });

  test('of one is one', () => {
    expect(listHelper.mostBlogs([blogs[2]])).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1,
    });
  });

  test('equals the author with the most blogs', () => {
    expect(listHelper.mostBlogs(blogs)).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    });
  });
});

describe('author with most likes', () => {
  test('of empty list is null', () => {
    expect(listHelper.mostLikes([])).toBe(null);
    expect(listHelper.mostLikes(null)).toBe(null);
  });

  test('of one is the likes of that blog', () => {
    expect(listHelper.mostLikes([blogs[0]])).toEqual({
      author: 'Michael Chan',
      likes: 7,
    });
  });

  test('author with most likes across all blogs is returned', () => {
    expect(listHelper.mostLikes(blogs)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    });
  });
});
