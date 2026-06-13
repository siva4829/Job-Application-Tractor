import React, { useState, useEffect } from "react";
import axios from "axios";
import JobForm from "../components/jobform";

function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  const [totalApp, setTotalApp] = useState(0);
  const [applied, setApplied] = useState(0);
  const [inter, setInter] = useState(0);
  const [reject, setReject] = useState(0);
  const [offer, setOffer] = useState(0);

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    try {
      const response = await axios.get(
        "http://localhost:5000/jobs"
      );

      const jobsData = response.data;

      setJobs(jobsData);

      setTotalApp(jobsData.length);

      setApplied(
        jobsData.filter(
          (job) => job.status === "Applied"
        ).length
      );

      setInter(
        jobsData.filter(
          (job) => job.status === "Interview"
        ).length
      );

      setReject(
        jobsData.filter(
          (job) => job.status === "Rejected"
        ).length
      );

      setOffer(
        jobsData.filter(
          (job) => job.status === "Offer"
        ).length
      );
    } catch (err) {
      console.error(err);
    }
  }

  const deleteJob = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/jobs/${id}`
      );

      fetchJobs();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdd = () => {
    setEditingJob(null);
    setShowForm(true);
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setShowForm(true);
  };

  const handleSuccess = () => {
    fetchJobs();
    setShowForm(false);
    setEditingJob(null);
  };

  return (
    <div>
      <header>
        <h1>Job Application Tracker</h1>
      </header>

      <h2>Total Applications: {totalApp}</h2>

      <p>Applied: {applied}</p>
      <p>Interview Scheduled: {inter}</p>
      <p>Rejected: {reject}</p>
      <p>Offers: {offer}</p>

      <button
        type="button"
        onClick={handleAdd}
      >
        ADD
      </button>

      {showForm && (
  <JobForm
    job={editingJob}
    onSuccess={() => {
      fetchJobs();
      setShowForm(false);
      setEditingJob(null);
    }}
  />
)}

      <hr />

      <h2>Applications</h2>

      {jobs.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        jobs.map((job) => (
          <div key={job.id}>
            <h3>{job.company_name}</h3>

            <p>
              <strong>Role:</strong>{" "}
              {job.job_title}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {job.status}
            </p>

            <p>
              <strong>Location:</strong>{" "}
              {job.location}
            </p>

            <button
             onClick={() => {
                setEditingJob(job);
                 setShowForm(true);
            }}
>
  Edit
</button>

            <button
              onClick={() =>
                deleteJob(job.id)
              }
            >
              Delete
            </button>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;