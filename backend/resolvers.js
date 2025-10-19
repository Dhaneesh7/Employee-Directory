import { ObjectId } from "mongodb";
import { connectDB } from "./config/db.js";

export const resolvers = {
  Query: {
    async getAllEmployees() {
      const db = await connectDB();
      const employees = await db
        .collection("employees")
        .find({}, { projection: { name: 1, position: 1, department: 1, salary: 1 } })
        .toArray();

      // Map MongoDB _id to id
      return employees.map(emp => ({
        id: emp._id.toString(),
        name: emp.name,
        position: emp.position,
        department: emp.department,
        salary: emp.salary,
      }));
    },

    async getEmployeeDetails(_, { id }) {
      const db = await connectDB();
      try {
        const emp = await db
          .collection("employees")
          .findOne({ _id: new ObjectId(id) });
        if (!emp) return null;
        return {
          id: emp._id.toString(),
          name: emp.name,
          position: emp.position,
          department: emp.department,
          salary: emp.salary,
        };
      } catch {
        throw new Error("Invalid employee ID");
      }
    },

    async getEmployeesByDepartment(_, { department }) {
      const db = await connectDB();
      const employees = await db
        .collection("employees")
        .find({ department })
        .toArray();

      return employees.map(emp => ({
        id: emp._id.toString(),
        name: emp.name,
        position: emp.position,
        department: emp.department,
        salary: emp.salary,
      }));
    },
  },

  Mutation: {
    async addEmployee(_, { name, position, department, salary }) {
      const db = await connectDB();
      const result = await db
        .collection("employees")
        .insertOne({ name, position, department, salary });
      return {
        id: result.insertedId.toString(),
        name,
        position,
        department,
        salary,
      };
    },
  },
};
