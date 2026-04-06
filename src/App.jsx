import { useState } from "react";
import "./App.css";

export default function App() {
  const [students, setStudents] = useState([
    { name: "Ankit", score: 78 },
    { name: "Raman", score: 45 },
    { name: "Doremon", score: 90 },
    { name: "Hitesh", score: 68 }
  ]);

  const [newName, setNewName] = useState("");
  const [newScore, setNewScore] = useState("");

  const addStudent = () => {
    if (!newName || !newScore) return;
    setStudents([...students, { name: newName, score: Number(newScore) }]);
    setNewName("");
    setNewScore("");
  };

  const handleUpdate = (index, value) => {
    const updated = [...students];
    updated[index].temp = value;
    setStudents(updated);
  };

  const saveUpdate = (index) => {
    const updated = [...students];
    if (updated[index].temp !== undefined) {
      updated[index].score = Number(updated[index].temp);
    }
    setStudents(updated);
  };

  const total = students.length;
  const passed = students.filter((s) => s.score >= 40).length;
  const avg = Math.round(
    students.reduce((a, b) => a + b.score, 0) / students.length
  );

  return (
    <div className="container">

      {/* HEADER */}
      <div className="main-header">
        <div className="sub-header">
          <span className="mini-line"></span>
          <p className="sub-title">ACADEMIC TERMINAL V2.0</p>
        </div>

        <h1>
          STUDENT <span>SCOREBOARD</span>
        </h1>

        <div className="line"></div>
      </div>

      {/*  NEW FORM HEADER */}
      <div className="form-header">
        <div className="left">
          <span className="circle"></span>
          <span>REGISTER STUDENT</span>
        </div>

        <div className="right">
          NEW ENTRY
        </div>
      </div>

      {/* INPUT */}
      <div className="form">
        <input
          placeholder="Student name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          placeholder="Score (0-100)"
          type="number"
          value={newScore}
          onChange={(e) => setNewScore(e.target.value)}
        />
        <button onClick={addStudent}>+ ADD</button>
      </div>

      {/* STATS */}
      <div className="stats">
        <div>
          <p className="label">TOTAL</p>
          <span className="value">{total}</span>
        </div>

        <div>
          <p className="label">PASSED</p>
          <span className="value">{passed}</span>
        </div>

        <div>
          <p className="label">AVG SCORE</p>
          <span className="value">{avg}</span>
        </div>
      </div>


      {/* TABLE HEADER */}
      <div className="table-header">
        <span>STUDENT RECORDS</span>
        <span>{students.length} entries</span>
      </div>

      {/* TABLE */}
      <div className="table">
        <div className="row header">
          <span>NAME</span>
          <span>SCORE</span>
          <span>STATUS</span>
          <span>UPDATE</span>
        </div>

        {students.map((s, i) => (
          <div className={`row ${s.score < 40 ? "pass-row" : "fail-row"}`} key={i}>
            <span>{s.name}</span>

            <span className="score">{s.score}</span>

            <span>
              <div className={s.score >= 40 ? "status pass" : "status fail"}>
                <span className="dot"></span>
                {s.score >= 40 ? "PASS" : "FAIL"}
              </div>
            </span>

            <span className="update-box">
              <input
                defaultValue={s.score}
                onChange={(e) => handleUpdate(i, e.target.value)}
              />
              <button onClick={() => saveUpdate(i)}>SAVE</button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}