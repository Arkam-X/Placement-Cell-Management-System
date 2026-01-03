import { useEffect, useState } from "react";
import { getAllStudents } from "../../api/tpo.api";
import * as XLSX from "xlsx";
import "../../styles/tpo/studentsTable.css";

const displayValue = (value) => {
  if (
    value === null ||
    value === undefined ||
    value === "" ||
    (Array.isArray(value) && value.length === 0)
  ) {
    return "-";
  }
  return value;
};

const StudentsTable = () => {
  const [students, setStudents] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    department: "",
    year: "",
    company: "",
  });

  const fetchStudents = async () => {
    const res = await getAllStudents(filters);
    if (res.success) setStudents(res.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(students);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    XLSX.writeFile(workbook, "students.xlsx");
  };

  return (
    <div className="students-page">
      <h2 className="students-title">Students List</h2>

      {/* Filters */}
      <div className="filters-bar">
        <input
          name="search"
          placeholder="Search by Name or PRN"
          onChange={handleChange}
          className="filter-input"
        />

        <input
          name="department"
          placeholder="Department"
          onChange={handleChange}
          className="filter-input"
        />

        <input
          name="year"
          placeholder="Year"
          onChange={handleChange}
          className="filter-input"
        />

        <input
          name="company"
          placeholder="Company"
          onChange={handleChange}
          className="filter-input"
        />

        <div className="filter-actions">
          <button className="filter-btn apply-btn" onClick={fetchStudents}>
            Apply Filters
          </button>
          <button className="filter-btn export-btn" onClick={exportToExcel}>
            Export Excel
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table className="students-table">
          <thead>
            <tr>
              <th>#</th>
              <th>PRN</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Year</th>
              <th>CGPA</th>
              <th>Companies</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => (
              <tr key={i}>
                <td>{displayValue(s.serialNo)}</td>
                <td>{displayValue(s.prn)}</td>
                <td>{displayValue(s.name)}</td>
                <td>{displayValue(s.email)}</td>
                <td>{displayValue(s.department)}</td>
                <td>{displayValue(s.year)}</td>
                <td>{displayValue(s.cgpa)}</td>
                <td>{displayValue(s.companies)}</td>
                <td>
                  <span className={`status status-${s.status}`}>
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsTable;
