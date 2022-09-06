const mongoose = require('mongoose');
const helper = require('./test_helper');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');

const api = supertest(app);

beforeEach(async () => {
  // Delete all users in test DB to handle token expiration
  await User.deleteMany({});

  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe('when there are some initial blogs saved', () => {
  let token;

  beforeEach(async () => {
    const newUser = {
      username: 'root',
      name: 'root',
      password: 'pass',
    };

    await api.post('/api/users').send(newUser);

    const response = await api.post('/api/login').send(newUser);

    token = `bearer ${response.body.token}`;
  });

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .set('Authorization', token)
      .expect('Content-Type', /application\/json/);
  }, 100000);

  test('all blogs are retrieved ', async () => {
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

  test('blog retrieval fails with 404 if blog does not exist', async () => {
    const validNonExistingId = await helper.nonExistingId();

    await api
      .get(`/api/blogs/${validNonExistingId}`)
      .expect(404)
      .set('Authorization', token);
  });

  test('blog retrieval fails with 400 if id is invalid', async () => {
    const invalidId = '315135t3523tg';

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
      .set('Authorization', token);
  });
});

describe('addition of a new blog', () => {
  let token;

  beforeEach(async () => {
    const newUser = {
      username: 'root',
      name: 'root',
      password: 'pass',
    };

    await api.post('/api/users').send(newUser);

    const response = await api.post('/api/login').send(newUser);

    token = `bearer ${response.body.token}`;
  });

  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'New Blog',
      author: 'John Smith',
      url: 'http://www.google.com',
      likes: 51,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', token)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).toContain('New Blog');
  });

  test('fails with code 401 if token not provided', async () => {
    const newBlog = {
      title: 'New Blog',
      author: 'John Smith',
      url: 'http://www.google.com',
      likes: 51,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', '')
      .expect(401);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).not.toContain('New Blog');
  });

  test('fails with status 400 if title or url are missing', async () => {
    const newBlog = {
      author: 'John Smith',
      likes: 2,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', token)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
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
      .set('Authorization', token)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    const addedBlog = blogsAtEnd.find((blog) => blog.title === 'New Blog');
    expect(addedBlog.likes).toBe(0);
  });
});

describe('deletion of a blog', () => {
  let token;

  beforeEach(async () => {
    const newUser = {
      username: 'root',
      name: 'root',
      password: 'pass',
    };

    await api.post('/api/users').send(newUser);

    const response = await api.post('/api/login').send(newUser);

    token = `bearer ${response.body.token}`;
  });

  test('succeeds with code 204 if id is valid', async () => {
    const newBlog = {
      title: 'Test Entry',
      author: 'Nobody',
      url: 'www.google.com',
      likes: 1,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', token)
      .expect(201);

    const blogs = await helper.blogsInDb();
    const blogToDelete = blogs.find((blog) => blog.title === newBlog.title);

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', token)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).not.toContain(newBlog.title);
  });
});

describe('updating a blog', () => {
  let token;

  beforeEach(async () => {
    const newUser = {
      username: 'root',
      name: 'root',
      password: 'pass',
    };

    await api.post('/api/users').send(newUser);

    const response = await api.post('/api/login').send(newUser);

    token = `bearer ${response.body.token}`;
  });

  test('succeeds with status 200 if data is valid', async () => {
    const blogToUpdate = {
      id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
    };

    blogToUpdate.likes = blogToUpdate.likes + 1;

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)
      .set('Authorization', token)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    const updatedBlog = blogsAtEnd.find((blog) => blog.id === blogToUpdate.id);

    expect(updatedBlog.likes).toBe(8);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
