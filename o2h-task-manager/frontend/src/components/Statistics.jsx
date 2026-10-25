function StatCard({ label, value, variant }) {
  return (
    <div className="card text-center">
      <div className="card-body p-3">
        <div className="text-muted" style={{ fontSize: 14 }}>
          {label}
        </div>
        <div className={`fw-bold fs-4 text-${variant}`}>{value}</div>
      </div>
    </div>
  );
}

export default function Statistics({ total, pending, completed }) {
  return (
    <div className="row g-3 mb-4">
      <div className="col-12 col-md-4">
        <StatCard label="Total Tasks" value={total} variant="primary" />
      </div>
      <div className="col-12 col-md-4">
        <StatCard label="Pending Tasks" value={pending} variant="warning" />
      </div>
      <div className="col-12 col-md-4">
        <StatCard label="Completed Tasks" value={completed} variant="success" />
      </div>
    </div>
  );
}

