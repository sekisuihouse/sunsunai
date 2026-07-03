export function NewsList({
  items,
}: {
  items: Array<{ date: string; label: string; title: string }>;
}) {
  return (
    <div className="km-news-list">
      {items.map((item) => (
        <article className="km-news-item" key={`${item.date}-${item.title}`}>
          <div className="km-meta">
            <time dateTime={item.date}>{item.date}</time>
            <br />
            {item.label}
          </div>
          <strong>{item.title}</strong>
        </article>
      ))}
    </div>
  );
}
