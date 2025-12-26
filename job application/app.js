/* =======================================
   Job Application Tracker – Professional
   Fully working app.js for index.html
======================================= */

// ---------- STATE ----------
let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
let editJobId = null; // track which job is being edited

// ---------- DOM ELEMENTS ----------
const jobForm = document.getElementById("jobForm");
const jobList = document.getElementById("jobList");

const totalAppsEl = document.getElementById("totalApps");
const interviewsEl = document.getElementById("interviews");
const offersEl = document.getElementById("offers");
const rejectedEl = document.getElementById("rejected");

const companyInput = document.getElementById("company");
const roleInput = document.getElementById("role");
const statusInput = document.getElementById("status");
const followUpInput = document.getElementById("followUp");
const notesInput = document.getElementById("notes");

// ---------- INIT ----------
document.addEventListener("DOMContentLoaded", () => {
    renderJobs();
    updateDashboard();
});

// ---------- ADD / EDIT JOB ----------
jobForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const company = companyInput.value.trim();
    const role = roleInput.value.trim();
    const status = statusInput.value;
    const followUp = followUpInput.value;
    const notes = notesInput.value.trim();

    if (!company || !role) {
        alert("Company and Role are required");
        return;
    }

    if (editJobId) {
        // EDIT JOB
        const index = jobs.findIndex(job => job.id === editJobId);
        jobs[index] = {
            ...jobs[index],
            company,
            role,
            status,
            followUp,
            notes
        };
        editJobId = null;
        jobForm.querySelector("button").textContent = "Add Application";
    } else {
        // ADD NEW JOB
        const newJob = {
            id: Date.now(),
            company,
            role,
            status,
            followUp,
            notes
        };
        jobs.push(newJob);
    }

    saveToStorage();
    renderJobs();
    updateDashboard();
    jobForm.reset();
});

// ---------- SAVE TO LOCALSTORAGE ----------
function saveToStorage() {
    localStorage.setItem("jobs", JSON.stringify(jobs));
}

// ---------- RENDER JOBS ----------
function renderJobs() {
    jobList.innerHTML = "";

    if (jobs.length === 0) {
        jobList.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center; color:#64748b;">
                    No job applications added yet
                </td>
            </tr>
        `;
        return;
    }

    jobs.forEach(job => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${job.company}</td>
            <td>${job.role}</td>
            <td>
                <span class="status ${job.status.toLowerCase()}">${job.status}</span>
            </td>
            <td>${job.followUp || "-"}</td>
            <td>
                <button class="action-btn" onclick="editJob(${job.id})">✏️</button>
                <button class="action-btn" onclick="deleteJob(${job.id})">🗑️</button>
            </td>
        `;

        jobList.appendChild(tr);
    });
}

// ---------- DELETE JOB ----------
function deleteJob(id) {
    if (!confirm("Are you sure you want to delete this application?")) return;

    jobs = jobs.filter(job => job.id !== id);
    saveToStorage();
    renderJobs();
    updateDashboard();
}

// ---------- EDIT JOB ----------
function editJob(id) {
    const job = jobs.find(job => job.id === id);
    if (!job) return;

    companyInput.value = job.company;
    roleInput.value = job.role;
    statusInput.value = job.status;
    followUpInput.value = job.followUp;
    notesInput.value = job.notes;

    editJobId = id;
    jobForm.querySelector("button").textContent = "Update Application";
}

// ---------- DASHBOARD COUNTERS ----------
function updateDashboard() {
    totalAppsEl.textContent = jobs.length;
    interviewsEl.textContent = countByStatus("Interview");
    offersEl.textContent = countByStatus("Offer");
    rejectedEl.textContent = countByStatus("Rejected");
}

function countByStatus(status) {
    return jobs.filter(job => job.status === status).length;
}
