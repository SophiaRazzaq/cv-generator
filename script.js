document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("cvForm");
    const errorContainer = document.getElementById("errorContainer");
    const cvOutput = document.getElementById("cvOutput");
    const printBtn = document.createElement("button");

    printBtn.textContent = "Print CV";
    printBtn.classList.add("btn", "btn-secondary", "w-100", "mt-3");
    printBtn.id = "printBtn";
    printBtn.addEventListener("click", () => window.print());

    const fields = [
        { id: "fullName", name: "Full Name", validation: /^[A-Za-z\s]+$/, error: "Only letters and spaces allowed." },
        { id: "experience", name: "Experience", validation: /^\d+$/, error: "Must be a number greater than 0." },
        { id: "cgpa", name: "CGPA", validation: /^(?:[0-3](?:\.\d{1,2})?|4(?:\.0{1,2})?)$/, error: "Enter a valid CGPA (0.00 - 4.00)." },
        { id: "education", name: "Education", validation: /.+/, error: "This field is required." },
        { id: "about", name: "About", validation: /.{10,}/, error: "Must be at least 10 characters." },
        { id: "contact", name: "Contact", validation: /^(\+\d{1,3}[- ]?)?\d{10}$/, error: "Enter a valid 10-digit phone number." },
        { id: "skills", name: "Skills", validation: /^[A-Za-z\s,]+$/, error: "Skills must be comma-separated words." },
        { id: "address", name: "Address", validation: /.+/, error: "This field is required." },
    ];

    const validateForm = () => {
        errorContainer.innerHTML = "";
        errorContainer.classList.add("d-none");

        const errors = [];

        for (const field of fields) {
            const input = document.getElementById(field.id);
            if (!input.value.trim().match(field.validation)) {
                errors.push(`${field.name}: ${field.error}`);
                input.classList.add("is-invalid");
            } else {
                input.classList.remove("is-invalid");
            }
        }

        if (errors.length > 0) {
            errorContainer.innerHTML = `<div class="alert alert-danger">${errors.join("<br>")}</div>`;
            errorContainer.classList.remove("d-none");
            cvOutput.classList.add("d-none"); // Hide CV output if errors exist
            return false;
        }

        return true;
    };
    const printCV = () => {
        const cvOutput = document.getElementById("cvOutput");
        
        if (cvOutput.classList.contains("d-none")) {
            alert("Generate the CV first before printing.");
            return;
        }
    
        window.print();  // Now it will print only the CV content
    };
    
    const generateCV = () => {
        const fullName = document.getElementById("fullName").value;
        const experience = document.getElementById("experience").value;
        const cgpa = document.getElementById("cgpa").value;
        const education = document.getElementById("education").value;
        const about = document.getElementById("about").value;
        const contact = document.getElementById("contact").value;
        const skills = document.getElementById("skills").value
            .split(",")
            .map((skill) => skill.trim())
            .join(", ");
        const address = document.getElementById("address").value;

        cvOutput.innerHTML = `
            <div class="card p-4 shadow bg-white">
                <h3 class="text-center">${fullName}</h3>
                <p><strong>Experience:</strong> ${experience} years</p>
                <p><strong>CGPA:</strong> ${cgpa}</p>
                <p><strong>Education:</strong> ${education}</p>
                <p><strong>About:</strong> ${about}</p>
                <p><strong>Contact:</strong> ${contact}</p>
                <p><strong>Skills:</strong> ${skills}</p>
                <p><strong>Address:</strong> ${address}</p>
            </div>
        `;

        cvOutput.appendChild(printBtn);
        printBtn.style.display = "block";
        cvOutput.classList.remove("d-none");

        // Automatically prompt for print after CV generation
        setTimeout(() => window.print(), 500);
    };

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (validateForm()) {
            generateCV();
        }
    });
});
