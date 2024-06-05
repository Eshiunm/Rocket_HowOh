import HistoryCard from "../../components/landLordManagement/history/HistoryCard";

export default function RentedHistory() {
  return (
    <main className="container py-6">
      <section className="layout-grid">
        <ul className="col-span-7 p-5">
          <HistoryCard canReview={true} />
          <HistoryCard canReview={false} />
          <HistoryCard canReview={true} />
          <HistoryCard canReview={false} />
        </ul>
      </section>
    </main>
  );
}