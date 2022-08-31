const mongoose = require('mongoose');
const helper = require('./test_helper');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
}, 100000);

test('there are two blogs', async () => {
  const blogs = await helper.blogsInDb();
  expect(blogs).toHaveLength(helper.initialBlogs.length);
});

test('unique identifier property is set to "id"', async () => {
  const blogs = await helper.blogsInDb();
  blogs.forEach((blog) => {
    expect(blog.id).toBeDefined();
    expect(blog._id).toBeUndefined();
  });
});

test('post request successfully creates new blog', async () => {
  const newBlog = {
    title: 'New Blog',
    author: 'John Smith',
    url: 'http://www.google.com',
    likes: 51,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  const titles = blogsAtEnd.map((blog) => blog.title);
  expect(titles).toContain('New Blog');
});

test('blog without likes defaults to zero', async () => {
  const newBlog = {
    title: 'New Blog',
    author: 'John Smith',
    url: 'http://www.google.com',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  const addedBlog = blogsAtEnd.find((blog) => blog.title === 'New Blog');
  expect(addedBlog.likes).toBe(0);
});

test('if title and url are missing 400 is received', async () => {
  const newBlog = {
    author: 'John Smith',
    likes: 2,
  };

  await api.post('/api/blogs').send(newBlog).expect(400);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

afterAll(() => {
  mongoose.connection.close();
});
