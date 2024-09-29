"use client";
import React, { useState } from "react";

const Page = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [mainTask, setMainTask] = useState([]);
  const [isEditing, setIsEditing] = useState(false);  // New state to check if we're editing
  const [editIndex, setEditIndex] = useState(null);   // Index of the task being edited

  const submitHandler = (e) => {
    e.preventDefault();

    if (isEditing) {
      // Update the existing task
      const updatedTasks = [...mainTask];
      updatedTasks[editIndex] = { title, desc };
      setMainTask(updatedTasks);
      setIsEditing(false);   // Reset the editing state
      setEditIndex(null);    // Reset the index
    } else {
      // Add new task
      setMainTask([...mainTask, { title, desc }]);
    }

    setTitle("");
    setDesc("");
  };

  const deleteHandler = (i) => {
    const updatedTasks = [...mainTask];
    updatedTasks.splice(i, 1);
    setMainTask(updatedTasks);
  };

  const editHandler = (i) => {
    // Set the title and desc of the selected task to be edited
    setTitle(mainTask[i].title);
    setDesc(mainTask[i].desc);
    setIsEditing(true);       // Set editing mode to true
    setEditIndex(i);          // Store the index of the task being edited
  };

  let renderTask = <h2>No Task Available</h2>;

  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => (
      <li key={i} className="flex items-center justify-between mb-8">
        <div className="flex justify-between mb-5 w-2/3">
          <h5 className="text-2xl font-semibold">{t.title}</h5>
          <h6 className="text-lg font-medium">{t.desc}</h6>
        </div>
        <div>
          <button
            onClick={() => editHandler(i)}
            className="bg-yellow-400 text-white px-4 py-2 rounded font-bold mr-2"
          >
            Edit
          </button>
          <button
            onClick={() => deleteHandler(i)}
            className="bg-red-400 text-white px-4 py-2 rounded font-bold"
          >
            Delete
          </button>
        </div>
      </li>
    ));
  }

  return (
    <>
      <h1 className="bg-black text-white p-5 text-5xl font-bold text-center">
        Gulshan's To-Do List
      </h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          className="text-2xl border-zinc-800 border-4 m-8 px-4 py-2"
          placeholder="Enter Title Here"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          type="text"
          className="text-2xl border-zinc-800 border-4 m-8 px-4 py-2"
          placeholder="Enter Description Here"
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        />
        <button className="bg-black text-white px-4 py-3 m-5 text-2xl font-bold rounded">
          {isEditing ? "Update Task" : "Add Task"}
        </button>
      </form>
      <hr />
      <div className="p-8 bg-slate-200">
        <ul>{renderTask}</ul>
      </div>
    </>
  );
};

export default Page;
