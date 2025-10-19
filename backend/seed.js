import { connectDB } from "./config/db.js";

const employees = [
  { name: "Arjun", position: "Frontend Dev", department: "Engineering", salary: 40000 },
  { name: "Sneha", position: "Backend Dev", department: "Engineering", salary: 42000 },
  { name: "Rahul", position: "HR Executive", department: "HR", salary: 30000 },
  { name: "Meera", position: "Finance Analyst", department: "Finance", salary: 38000 },
  { name: "Vijay", position: "UI Designer", department: "Design", salary: 35000 },
];

(async () => {
  const db = await connectDB();
  await db.collection("employees").deleteMany({});
  await db.collection("employees").insertMany(employees);
  console.log("✅ Seed data added!");
  process.exit();
})();
