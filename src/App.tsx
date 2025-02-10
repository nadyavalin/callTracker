import { useEffect, useState } from "react";
import { useFetchCallList } from "./api/api";
import { CallListResponse } from "./types";
import { incomingCallsArrow, outgoingCallsArrow } from "./components/svg";
import "./App.css";

function App() {
  const { data, loading, error } = useFetchCallList(
    "2025-01-01",
    "2025-01-04",
    "both"
  ) as { data: CallListResponse; loading: boolean; error: string | null };

  const [grades, setGrades] = useState<{ [key: number]: string }>({});

  const formatPhoneNumber = (phone: string) => {
    if (phone.length !== 11 || phone[0] !== "7") {
      return phone;
    }
    return `+7 (${phone.slice(1, 4)}) ${phone.slice(4, 7)}-${phone.slice(
      7,
      9
    )}-${phone.slice(9)}`;
  };

  const getRandomGrade = () => {
    const gradesArray = ["Отлично", "Хорошо", "Плохо"];
    return gradesArray[Math.floor(Math.random() * gradesArray.length)];
  };

  const getGradeClass = (grade: string) => {
    switch (grade) {
      case "Отлично":
        return "grade-excellent";
      case "Хорошо":
        return "grade-good";
      case "Плохо":
        return "grade-bad";
      default:
        return "";
    }
  };

  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  useEffect(() => {
    if (data?.results) {
      const initialGrades = data.results.reduce((acc, _, index) => {
        acc[index] = getRandomGrade();
        return acc;
      }, {} as { [key: number]: string });
      setGrades(initialGrades);
    }
  }, [data]);

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
          {data && data.results && Array.isArray(data.results) ? (
            <table>
              <thead>
                <tr>
                  <th>Тип</th>
                  <th>Время</th>
                  <th>Сотрудник</th>
                  <th>Звонок</th>
                  <th>Источник</th>
                  <th>Оценка</th>
                  <th>Длительность</th>
                </tr>
              </thead>
              <tbody>
                {data.results.map((call, index) => {
                  const grade = grades[index];
                  return (
                    <tr key={call.id}>
                      <td>
                        {call.in_out === "1" ? (
                          <span
                            dangerouslySetInnerHTML={{
                              __html: incomingCallsArrow,
                            }}
                          />
                        ) : (
                          <span
                            dangerouslySetInnerHTML={{
                              __html: outgoingCallsArrow,
                            }}
                          />
                        )}
                      </td>
                      <td>
                        {new Date(call.date).toLocaleTimeString("ru-RU", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })}
                      </td>
                      <td>
                        <img src={call.person_avatar} alt="Avatar" />
                      </td>
                      <td>{formatPhoneNumber(call.partner_data.phone)}</td>
                      <td>{call.partner_data.name}</td>
                      <td>
                        <span className={`grade ${getGradeClass(grade)}`}>
                          {grade}
                        </span>
                      </td>
                      <td>{formatDuration(call.duration)}</td>
                    </tr>
                  );
                })}
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
