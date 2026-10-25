import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTask } from '../services/taskService.js';
import Navbar from '../components/Navbar.jsx';

export default function AddTask() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');

  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [errors, setErrors] = useState({});

  function showToast(type, message) {
    setToast({ type, message });
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => setToast(null), 2600);
  }

  function validate() {
    const next = {};
    if (!title.trim()) next.title = 'Title is required';
    if (description.trim().length < 20) next.description = 'Description must be at least 20 characters';

    const allowedStatuses = ['Pending', 'In Progress', 'Completed'];
    if (!allowedStatuses.includes(status)) next.status = 'Invalid status';

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSubmitting(true);
      await createTask({ title, description, status });
      showToast('success', 'Task created successfully');
      setTimeout(() => navigate('/'), 650);
    } catch (err) {
      const message = err?.response?.data?.message || 'Failed to create task';
      showToast('danger', message);

      if (message.toLowerCase().includes('title')) setErrors((p) => ({ ...p, title: message }));
      if (message.toLowerCase().includes('description')) setErrors((p) => ({ ...p, description: message }));
      if (message.toLowerCase().includes('status')) setErrors((p) => ({ ...p, status: message }));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <Navbar />

      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <h3 className="mb-3">Create New Task</h3>

            {toast ? (
              <div className="alert alert-dismissible fade show" role="alert">
                <span className={`badge text-bg-${toast.type}`}>{toast.type.toUpperCase()}</span> {toast.message}
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setToast(null)} />
              </div>
            ) : null}

            <form className="card p-4" onSubmit={onSubmit} noValidate>
              <div className="mb-3">
                <label className="form-label">Task Title</label>
                <input
                  className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Build Login Page"
                />
                {errors.title ? <div className="invalid-feedback">{errors.title}</div> : null}
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  placeholder="Write a clear description (min 20 characters)"
                />
                {errors.description ? <div className="invalid-feedback">{errors.description}</div> : null}
              </div>

              <div className="mb-4">
                <label className="form-label">Status</label>
                <select
                  className={`form-select ${errors.status ? 'is-invalid' : ''}`}
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                </select>
                {errors.status ? <div className="invalid-feedback">{errors.status}</div> : null}
              </div>

              <button className="btn btn-primary w-100" disabled={submitting} type="submit">
                {submitting ? 'Saving...' : 'Save Task'}
              </button>

              <div className="text-center mt-3">
                <button className="btn btn-link" type="button" onClick={() => navigate('/')}>
                  Back to Dashboard
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

