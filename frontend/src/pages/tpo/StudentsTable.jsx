import { useEffect, useState } from "react";
import { getAllStudents } from "../../api/tpo.api";
import * as XLSX from "xlsx";

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
    <div>
      <h2>Students List</h2>

      {/* 🔍 Filters */}
      <input
        name="search"
        placeholder="Search by Name or PRN"
        onChange={handleChange}
      />

      <input
        name="department"
        placeholder="Department"
        onChange={handleChange}
      />

      <input
        name="year"
        placeholder="Year"
        onChange={handleChange}
      />

      <input
        name="company"
        placeholder="Company"
        onChange={handleChange}
      />

      <button onClick={fetchStudents}>Apply Filters</button>
      <button onClick={exportToExcel}>Export Excel</button>

      {/* 📋 Table */}
      <table border="1" cellPadding="8">
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
              <td>{s.serialNo}</td>
              <td>{s.prn}</td>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.department}</td>
              <td>{s.year}</td>
              <td>{s.cgpa}</td>
              <td>{s.companies}</td>
              <td>{s.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsTable;
