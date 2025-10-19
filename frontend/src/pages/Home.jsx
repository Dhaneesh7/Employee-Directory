import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { GET_ALL_EMPLOYEES, GET_EMPLOYEES_BY_DEPARTMENT } from "../graphql/queries";
// import { DELETE_EMPLOYEE,UPDATE_EMPLOYEE } from "../graphql/queries";
import AddEmployeeForm from "../components/AddEmployeeForm";

export default function Home() {
  const { data, loading, error, refetch } = useQuery(GET_ALL_EMPLOYEES);
  const [department, setDepartment] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  // const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
    // onCompleted: () => refetch(),
  // });
   const navigate = useNavigate();
  const { data: deptData } = useQuery(GET_EMPLOYEES_BY_DEPARTMENT, {
    variables: { department },
    skip: department === "All",
  });

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error.message}</p>;

  const employees = department === "All" ? data.getAllEmployees : deptData?.getEmployeesByDepartment;

  const departments = ["All", ...new Set(data.getAllEmployees.map(emp => emp.department))];
 const handleEmployeeClick = (id) => (e) => {
    e.preventDefault();
    navigate(`/employee/${id}`);
  };
  return (
    <div className="container mx-auto p-5">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Employee Directory</h1>

      <div className="flex flex-col md:flex-row md:items-center md:gap-4 mb-6">
        <div className="flex items-center gap-2 mb-3 md:mb-0 bg-blue-400">
         <label className="font-semibold text-gray-700">Filter by Department:</label>
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {departments.map(dep => (
            <option key={dep} value={dep}>{dep}</option>
          ))}
        </select>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
                    className={`ml-auto px-4 py-2 rounded text-white font-semibold transition 
            ${showForm ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"}`}

        >
          {showForm ? "Close Form" : "Add New Employee"}
        </button>
      </div>

      {showForm &&(
        <div className="mb-6 p-4 border border-gray-200 rounded shadow-sm bg-gray-50">
           <AddEmployeeForm 
              employee={editingEmployee}
                onAdded={() => { setShowForm(false); setEditingEmployee(null); refetch(); }} />
</div>
      )}
       <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
          <thead className="bg-blue-500 text-white">

          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Position</th>
            <th className="border px-4 py-2">Department</th>
            <th className="border px-4 py-2">Salary</th>
          </tr>
        </thead>
        <tbody>
          {employees?.map(emp => (
            <tr key={emp.id} className="hover:bg-gray-100" onClick={handleEmployeeClick(emp.id)}>
              <td className="border px-4 py-2">
                <Link to={`/employee/${emp.id}`} className="text-blue-500">{emp.name}</Link>
              </td>
              <td className="border px-4 py-2">{emp.position}</td>
              <td className="border px-4 py-2">{emp.department}</td>
              <td className="border px-4 py-2">{emp.salary}</td>
              {console.log(emp)}
               
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}
