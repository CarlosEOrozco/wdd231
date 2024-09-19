// Current year and last modified
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last modified: ${document.lastModified}`;

// Course list 
const courses = [
    { courseCode: "CSE101", courseName: "Intro to Programming", credits: 3, completed: true },
    { courseCode: "CSE102", courseName: "Data Structures", credits: 3, completed: false },
    { courseCode: "WDD101", courseName: "Web Development I", credits: 3, completed: true },
    { courseCode: "WDD102", courseName: "Web Development II", credits: 3, completed: false }
];

// How to filter and display  my courses
function displayCourses(filter = null) {
    const container = document.getElementById("course-container");
    container.innerHTML = ""; // Clear existing content
    courses.filter(course => !filter || course.courseCode.startsWith(filter))
        .forEach(course => {
            const card = document.createElement("div");
            card.classList.add("course-card");
            if (course.completed) {
                card.classList.add("completed");
            }
            card.innerHTML = `<h3>${course.courseCode} - ${course.courseName}</h3>
                              <p>Credits: ${course.credits}</p>`;
            container.appendChild(card);
        });
}

document.getElementById("all-courses-btn").addEventListener("click", () => displayCourses());
document.getElementById("cse-courses-btn").addEventListener("click", () => displayCourses("CSE"));
document.getElementById("wdd-courses-btn").addEventListener("click", () => displayCourses("WDD"));

// display
displayCourses();
