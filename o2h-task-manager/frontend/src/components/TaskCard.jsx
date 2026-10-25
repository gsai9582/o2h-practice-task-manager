export default function TaskCard({ task, onComplete, onDelete }) {
  const statusToColor = {
    Pending: 'warning',
    'In Progress': 'primary',
    Completed: 'success',
  };

  return (
    <div className="card h-100">
      <div className="card-body d-flex flex-column gap-2">
        <div className="d-flex align-items-start justify-content-between gap-2">
          <h5 className="card-title mb-0">{task.title}</h5>
          <span className={`badge text-bg-${statusToColor[task.status] || 'secondary'} align-self-start`}>
            {task.status}
          </span>
        </div>
        <p className="card-text text-secondary mb-0">{task.description}</p>
        <div className="mt-auto">
          <div className="text-muted" style={{ fontSize: 13 }}>
            Created: {task.createdAt}
          </div>
          <div className="d-flex gap-2 mt-3">
            {task.status !== 'Completed' ? (
              <button className="btn btn-success flex-grow-1" onClick={() => onComplete(task)}>
                Complete Task
              </button>
            ) : (
              <button className="btn btn-outline-success flex-grow-1" disabled>
                Completed
              </button>
            )}
            <button className="btn btn-outline-danger" onClick={() => onDelete(task)}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

