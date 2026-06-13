import React, { useState, useEffect } from "react";
import axios from "axios";

function JobForm({ job, onSuccess }) {
  const [formData, setFormData] = useState({
    company: "",
    job: "",
    location: "",
    salary: "",
    date: "",
    status: "Applied",
    notes: ""
  });

  useEffect(() => {
    if (job) {
      setFormData({
        company: job.company_name || "",
        job: job.job_title || "",
        location: job.location || "",
        salary: job.salary || "",
        date: job.application_date
          ? job.application_date.split("T")[0]
          : "",
        status: job.status || "Applied",
        notes: job.notes || ""
      });
    }
  }, [job]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (job) {
        await axios.put(
          `http://localhost:5000/jobs/${job.id}`,
          formData
        );
      } else {
        await axios.post(
          "http://localhost:5000/jobs",
          formData
        );
      }

      setFormData({
        company: "",
        job: "",
        location: "",
        salary: "",
        date: "",
        status: "Applied",
        notes: ""
      });

      if (onSuccess) {
        onSuccess();
      }

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} id="jobform">
        <label>Company Name:</label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          required
        />

        <label>Job Title:</label>
        <input
          type="text"
          name="job"
          value={formData.job}
          onChange={handleChange}
          required
        />

        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />

        <label>Salary:</label>
        <input
          type="number"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
        />

        <label>Application Date:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <label>Status:</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Rejected">Rejected</option>
          <option value="Offer">Offer</option>
        </select>

        <label>Notes:</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows="4"
        />

        <button type="submit">
          {job ? "Update Application" : "Save Application"}
        </button>
      </form>
    </div>
  );
}

export default JobForm;