import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteTask, getTasks, updateTask } from '../services/taskService.js';
import Navbar from '../components/Navbar.jsx';
import TaskCard from '../components/TaskCard.jsx';
import TaskFilter from '../components/TaskFilter.jsx';
import SearchBar from '../components/SearchBar.jsx';
import Statistics from '../components/Statistics.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import EmptyState from '../components/EmptyState.jsx';

export default function Dashboard() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sort, setSort] = useState('newest');

  const [toast, setToast] = useState(null);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        setLoading(true);
        const data = await getTasks();
        if (active) setTasks(Array.isArray(data) ? data : []);
      } catch {
        if (active) setTasks([]);
        showToast('danger', 'Failed to load tasks');
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  function showToast(type, message) {
    setToast({ type, message });
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => setToast(null), 2600);
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = tasks;

    if (statusFilter !== 'All') {
      list = list.filter((t) => t.status === statusFilter);
    }

    if (q) {
      list = list.filter((t) => String(t.title || '').toLowerCase().includes(q));
    }

    const dir = sort === 'newest' ? -1 : 1;

    return [...list].sort((a, b) => {
      const da = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const db = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return (da - db) * dir;
    });
  }, [tasks, query, statusFilter, sort]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const pending = tasks.filter((t) => t.status === 'Pending').length;
    const completed = tasks.filter((t) => t.status === 'Completed').length;
    return { total, pending, completed };
  }, [tasks]);

  async function handleComplete(task) {
    try {
      await updateTask(task._id, { status: 'Completed' });
      setTasks((prev) => prev.map((t) => (t._id === task._id ? { ...t, status: 'Completed' } : t)));
      showToast('success', 'Task marked as completed');
    } catch {
      showToast('danger', 'Failed to update task');
    }
  }

  async function handleDelete(task) {
    try {
      await deleteTask(task._id);
      setTasks((prev) => prev.filter((t) => t._id !== task._id));
      showToast('success', 'Task deleted successfully');
    } catch {
      showToast('danger', 'Failed to delete task');
    }
  }

  return (
    <div>
      <Navbar />

      <div className="container py-4">
        <Statistics total={stats.total} pending={stats.pending} completed={stats.completed} />

        <div className="row g-3 align-items-end mb-3">
          <div className="col-12 col-md-5">
            <SearchBar value={query} onChange={setQuery} />
          </div>
          <div className="col-12 col-md-3">
            <TaskFilter value={statusFilter} onChange={setStatusFilter} />
          </div>
          <div className="col-12 col-md-4">
            <select className="form-select" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {toast ? (
          <div
            className="alert alert-dismissible fade show"
            role="alert"
            style={{ position: 'fixed', top: 16, right: 16, zIndex: 9999, minWidth: 260 }}
          >
            <span className={`badge text-bg-${toast.type}`}>{toast.type.toUpperCase()}</span> {toast.message}
            <button type="button" className="btn-close" aria-label="Close" onClick={() => setToast(null)} />
          </div>
        ) : null}

        {loading ? (
          <LoadingSpinner />
        ) : filtered.length === 0 ? (
          <EmptyState onAdd={() => navigate('/add')} />
        ) : (
          <div className="row g-3">
            {filtered.map((task) => (
              <div key={task._id} className="col-12 col-md-6 col-lg-4">
                <TaskCard task={task} onComplete={handleComplete} onDelete={handleDelete} />
              </div>
            ))}
          </div>
        )}

        <div className="text-end mt-4">
          <button className="btn btn-primary" onClick={() => navigate('/add')}>
            Add New Task
          </button>
        </div>
      </div>
    </div>
  );
}

