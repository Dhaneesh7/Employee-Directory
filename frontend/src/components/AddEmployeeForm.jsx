import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_EMPLOYEE } from "../graphql/queries";

export default function AddEmployeeForm({ onAdded, employee }) {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");

  useEffect(() => {
    if (employee) {
      setName(employee.name);
      setPosition(employee.position);
      setDepartment(employee.department);
      setSalary(employee.salary?.toString() || "");
    } else {
      setName("");
      setPosition("");
      setDepartment("");
      setSalary("");
    }
  }, [employee]);

  const [addEmployee, { error: addError }] = useMutation(ADD_EMPLOYEE, { onCompleted: onAdded });

  const handleSubmit = (e) => {
    e.preventDefault();
    const variables = { name, position, department, salary: parseFloat(salary) };

 
      addEmployee({ variables });
    
  };

  return (
    <form onSubmit={handleSubmit} className="mb-5 p-4 border rounded bg-gray-50 flex flex-col gap-2">
      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="border p-2 w-full rounded"/>
      <input type="text" placeholder="Position" value={position} onChange={e => setPosition(e.target.value)} className="border p-2 w-full rounded"/>
      <input type="text" placeholder="Department" value={department} onChange={e => setDepartment(e.target.value)} className="border p-2 w-full rounded"/>
      <input type="number" placeholder="Salary" value={salary} onChange={e => setSalary(e.target.value)} className="border p-2 w-full rounded"/>
      <button type="submit" className={`px-4 py-2 rounded text-white font-semibold ${employee ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"}`}>
        {employee ? "Update Employee" : "Add Employee"}
      </button>

                { addError && <p className="text-red-500 mt-2">{addError.message}</p>}
    </form>
  );
}
