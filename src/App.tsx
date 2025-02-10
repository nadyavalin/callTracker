import { useFetchCallList } from "./api/api";
import "./App.css";

function App() {
  const { data, loading, error } = useFetchCallList(
    "2024-01-01",
    "2024-01-04",
    "both"
  );

  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <>
      <main>
        <div className="title-font head-part">
          <div>Все типы</div>
          <div>3 дня</div>
        </div>

        <div className="title-font main-part">
          {loading && <p>Загрузка данных...</p>}
          {error && <p>Ошибка: {error}</p>}
          {data && data.calls && Array.isArray(data.calls) ? (
            <table>
              <thead>
                <tr>
                  <th>Время</th>
                  <th>Сотрудник</th>
                  <th>Статус</th>
                  <th>Номер звонящего</th>
                  <th>Номер звонка</th>
                  <th>Длительность</th>
                </tr>
              </thead>
              <tbody>
                {data.calls.map((call, index) => (
                  <tr key={index}>
                    <td>{new Date(call.date).toLocaleString()}</td>
                    <td>{call.candidate_name}</td>
                    <td>{call.status}</td>
                    <td>{call.from_number}</td>
                    <td>{call.to_number}</td>
                    <td>{formatDuration(call.duration)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Нет доступных данных для отображения.</p>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
