import { gql } from "@apollo/client";

export const GET_ALL_EMPLOYEES = gql`
  query GetAllEmployees {
    getAllEmployees {
      id
      name
      position
      department
      salary
    }
  }
`;

export const GET_EMPLOYEE_DETAILS = gql`
  query GetEmployeeDetails($id: ID!) {
    getEmployeeDetails(id: $id) {
      id
      name
      position
      department
      salary
    }
  }
`;

export const GET_EMPLOYEES_BY_DEPARTMENT = gql`
  query GetEmployeesByDepartment($department: String!) {
    getEmployeesByDepartment(department: $department) {
      id
      name
      position
      department
      salary
    }
  }
`;
// export const DELETE_EMPLOYEE = gql`
//   mutation DeleteEmployee($id: ID!) {
//     deleteEmployee(id: $id) {
//       id
//     }
//   }
// `;

// export const UPDATE_EMPLOYEE = gql`
//   mutation UpdateEmployee($id: ID!, $name: String, $position: String, $department: String, $salary: Float) {
//     updateEmployee(id: $id, name: $name, position: $position, department: $department, salary: $salary) {
//       id
//       name
//       position
//       department
//       salary
//     }
//   }
// `;

export const ADD_EMPLOYEE = gql`
  mutation AddEmployee($name: String!, $position: String!, $department: String!, $salary: Float!) {
    addEmployee(name: $name, position: $position, department: $department, salary: $salary) {
      id
      name
      position
      department
      salary
    }
  }
`;
