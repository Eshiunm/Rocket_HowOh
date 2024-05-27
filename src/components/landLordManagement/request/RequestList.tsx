import RequestCard from "./RequestCard";

export default function RequestList() {
  return (
    <ul>
      <RequestCard status="send" />
      <RequestCard status="reject" />
      <RequestCard status="none" />
    </ul>
  );
}