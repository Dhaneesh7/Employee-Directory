import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Department {
    id: ID!
    name: String!
    floor: Int!
  }

  type Employee {
    id: ID!
    name: String!
    position: String!
    department: String!
    salary: Float!
  }

  type Query {
    getAllEmployees: [Employee]
    getEmployeeDetails(id: ID!): Employee
    getEmployeesByDepartment(department: String!): [Employee]
  }

  type Mutation {
    addEmployee(
      name: String!
      position: String!
      department: String!
      salary: Float!
    ): Employee
  }
`;
