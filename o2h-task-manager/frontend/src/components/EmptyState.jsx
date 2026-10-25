export default function EmptyState({ onAdd }) {
  return (
    <div className="text-center my-5">
      <h4 className="mb-2">No Tasks Found</h4>
      <p className="text-secondary mb-3">Create your first task</p>
      {onAdd ? (
        <button className="btn btn-primary" onClick={onAdd}>
          Create Task
        </button>
      ) : null}
    </div>
  );
}

