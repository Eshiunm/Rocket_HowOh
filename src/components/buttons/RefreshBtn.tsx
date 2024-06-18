export default function RefreshBtn() {
  return (
    <button
      type="button"
      className="outline-button-s mb-3 flex gap-1 items-center"
      onClick={() => window.location.reload()}
    >
      重新整理
      <span className="material-symbols-outlined text-base leading-4">
        autorenew
      </span>
    </button>
  );
}
