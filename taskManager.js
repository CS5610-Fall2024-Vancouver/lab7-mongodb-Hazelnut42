// Import MongoDB client
const { MongoClient } = require('mongodb');

// MongoDB Atlas connection string
const uri = "mongodb+srv://Hazelchen:NikkariAoe0607@cluster0.wht3u.mongodb.net/";

// Connect to MongoDB Atlas
async function main() {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log("Connected to MongoDB Atlas");

    // Reference to the taskManagerDB database and tasks collection
    const db = client.db("taskManagerDB");
    const collection = db.collection("tasks");

    // --- Insert Multiple Tasks ---
    const tasks = [
      {
        title: "Complete MongoDB CRUD activity",
        description: "Write a Node.js script that performs CRUD operations in MongoDB Atlas",
        completed: false,
        dueDate: "2024-11-15"
      },
      {
        title: "Study JavaScript",
        description: "Learn about async/await and promises",
        completed: false,
        dueDate: "2024-10-30"
      },
      {
        title: "Exercise",
        description: "Go for a 30-minute run",
        completed: false,
        dueDate: "2024-10-25"
      }
    ];

    // Insert the tasks into the collection
    const result = await collection.insertMany(tasks);
    console.log("Inserted tasks:", result.insertedIds);

    // --- Query and Print All Tasks ---
    const allTasks = await collection.find().toArray();
    console.log("\n--- All Tasks ---");
    allTasks.forEach(task => console.log(task));

    // --- Update a Task ---
    const updateResult = await collection.updateOne(
      { title: "Complete MongoDB CRUD activity" }, // Filter to find the task to update
      { $set: { completed: true } }                // Update the "completed" field to true
    );
    console.log("\n--- Task Updated ---");
    console.log("Updated task count:", updateResult.modifiedCount);

    // --- Delete a Task ---
    const deleteResult = await collection.deleteOne({ title: "Exercise" });
    console.log("\n--- Task Deleted ---");
    console.log("Deleted task count:", deleteResult.deletedCount);

    // --- Query Tasks Due in the Future ---
    const futureTasks = await collection.find({
      dueDate: { $gt: new Date().toISOString().split('T')[0] } // Find tasks with dueDate in the future
    }).toArray();

    console.log("\n--- Future Tasks ---");
    futureTasks.forEach(task => console.log(task));

  } catch (error) {
    console.error(error);
  } finally {
    // Close the connection to MongoDB Atlas
    await client.close();
  }
}

main().catch(console.error);