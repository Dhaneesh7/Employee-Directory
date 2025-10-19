import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_EMPLOYEE_DETAILS } from "../graphql/queries";

export default function EmployeeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, loading, error } = useQuery(GET_EMPLOYEE_DETAILS, { variables: { id } });

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error.message}</p>;

  const emp = data.getEmployeeDetails;

  return (
    <div className="container mx-auto p-5">
      <button
        onClick={() => navigate("/")}
        className="bg-gray-500 text-white px-4 py-2 rounded mb-5"
      >
        Back
      </button>

      <h1 className="text-2xl font-bold mb-3">{emp.name}</h1>
      <p><strong>Position:</strong> {emp.position}</p>
      <p><strong>Department:</strong> {emp.department}</p>
      <p><strong>Salary:</strong> ${emp.salary}</p>
    </div>
  );
}
