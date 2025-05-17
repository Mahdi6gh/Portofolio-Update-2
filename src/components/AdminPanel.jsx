import { useEffect, useState } from "react";
import { db, collection, addDoc, getDocs, deleteDoc, doc } from "../firebase";

export default function AdminPanel() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    Title: "",
    Description: "",
    Img: "",
    Link: "",
  });

  // دریافت پروژه‌ها
  const fetchProjects = async () => {
    const snapshot = await getDocs(collection(db, "projects"));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setProjects(data);
  };

  // افزودن پروژه
  const handleAdd = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "projects"), form);
    setForm({ Title: "", Description: "", Img: "", Link: "" });
    fetchProjects();
  };

  // حذف پروژه
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "projects", id));
    fetchProjects();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          🔧 Admin Panel
        </h2>

        <form onSubmit={handleAdd} className="space-y-4">
          <input
            type="text"
            placeholder="Project Title"
            className="w-full border border-gray-300 p-2 rounded"
            value={form.Title}
            onChange={(e) => setForm({ ...form, Title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            className="w-full border border-gray-300 p-2 rounded"
            value={form.Description}
            onChange={(e) => setForm({ ...form, Description: e.target.value })}
          />
          <input
            type="text"
            placeholder="Image URL"
            className="w-full border border-gray-300 p-2 rounded"
            value={form.Img}
            onChange={(e) => setForm({ ...form, Img: e.target.value })}
          />
          <input
            type="text"
            placeholder="Link"
            className="w-full border border-gray-300 p-2 rounded"
            value={form.Link}
            onChange={(e) => setForm({ ...form, Link: e.target.value })}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            ➕ Add Project
          </button>
        </form>

        <hr className="my-6" />

        <ul className="space-y-4">
          {projects.map((project) => (
            <li
              key={project.id}
              className="p-4 border rounded shadow-sm flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold text-lg text-gray-800">
                  {project.Title}
                </h3>
                <p className="text-sm text-gray-600">{project.Description}</p>
              </div>
              <button
                onClick={() => handleDelete(project.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                🗑 Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
