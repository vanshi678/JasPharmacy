import Badge from "./Badge";

const statusConfig = {
  Available: { color: "green", label: "Available" },
  Busy: { color: "red", label: "Busy" },
  "In Stock": { color: "green", label: "In Stock" },
  "Low Stock": { color: "yellow", label: "Low Stock" },
  "Out of Stock": { color: "red", label: "Out of Stock" },
  Expired: { color: "gray", label: "Expired" },
  Upcoming: { color: "blue", label: "Upcoming" },
  Confirmed: { color: "purple", label: "Confirmed" },
  Completed: { color: "green", label: "Completed" },
  Cancelled: { color: "red", label: "Cancelled" },
  Scheduled: { color: "blue", label: "Scheduled" },
  Pending: { color: "yellow", label: "Pending" },
  Reviewing: { color: "blue", label: "Reviewing" },
  Preparing: { color: "orange", label: "Preparing" },
  Ready: { color: "purple", label: "Ready" },
  Active: { color: "green", label: "Active" },
  Inactive: { color: "gray", label: "Inactive" },
};

function StatusBadge({ status }) {
  const config = statusConfig[status] || { color: "gray", label: status };
  return <Badge color={config.color}>{config.label}</Badge>;
}

export default StatusBadge;