const Task = require('../models/Task');

function formatTask(taskDoc) {
  const obj = taskDoc.toObject({ getters: false, virtuals: false });
  return {
    _id: obj._id,
    title: obj.title,
    description: obj.description,
    status: obj.status,
    createdAt: obj.createdAt ? obj.createdAt.toISOString().slice(0, 10) : obj.createdAt,
  };
}

async function getTasks(req, res, next) {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks.map(formatTask));
  } catch (err) {
    next(err);
  }
}

async function createTask(req, res, next) {
  try {
    const { title, description, status } = req.body;

    if (!title || !String(title).trim()) {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }

    if (!description || String(description).trim().length < 20) {
      return res.status(400).json({ success: false, message: 'Description must be at least 20 characters' });
    }

    const allowedStatuses = ['Pending', 'In Progress', 'Completed'];
    const safeStatus = status ? String(status) : 'Pending';
    if (!allowedStatuses.includes(safeStatus)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const created = await Task.create({ title: String(title).trim(), description: String(description).trim(), status: safeStatus });
    return res.status(201).json({ success: true, task: formatTask(created) });
  } catch (err) {
    next(err);
  }
}

async function updateTask(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ['Pending', 'In Progress', 'Completed'];
    const safeStatus = status ? String(status) : null;
    if (!safeStatus || !allowedStatuses.includes(safeStatus)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const updated = await Task.findByIdAndUpdate(id, { status: safeStatus }, { new: true });

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    return res.json({ success: true, task: formatTask(updated) });
  } catch (err) {
    next(err);
  }
}

async function deleteTask(req, res, next) {
  try {
    const { id } = req.params;
    const deleted = await Task.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    return res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};

