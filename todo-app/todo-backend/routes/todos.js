const express = require('express');
const { Todo } = require('../mongo');
const { getAsync, setAsync } = require('../redis');
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  setAsync("added_todos", todos.length)
  res.send(todos);
});

/* GET number of todos */
router.get('/statistics', async(_, res) => {
  const length = parseInt(await getAsync("added_todos"))
  const response = {
    "added_todos": length
  }
  res.send(response)
})

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })  
  const length = getAsync("added_todos")
  setAsync("added_todos", length+1)
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  const length = getAsync("added_todos")
  setAsync("added_todos", length-1)  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  await Todo.findByIdAndUpdate(req.todo._id, req.body)
  res.status(204).send(req.body);
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
