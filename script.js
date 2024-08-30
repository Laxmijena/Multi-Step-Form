document.addEventListener("DOMContentLoaded", function () {
    const formSteps = document.querySelectorAll(".form-step");
    const progressBar = document.querySelectorAll(".step");
    const form = document.getElementById("multi-step-form");
    
    let currentStep = 0;
    
    // Load saved data
    const savedData = JSON.parse(localStorage.getItem("formData")) || {};
    Object.keys(savedData).forEach(key => {
        if (document.getElementById(key)) {
            document.getElementById(key).value = savedData[key];
        }
    });
    
    showStep(currentStep);
    
    // Next buttons
    document.getElementById("next-1").addEventListener("click", () => {
        if (validateStep(currentStep)) {
            saveData();
            currentStep++;
            showStep(currentStep);
        }
    });

    document.getElementById("next-2").addEventListener("click", () => {
        if (validateStep(currentStep)) {
            saveData();
            currentStep++;
            showStep(currentStep);
        }
    });

    document.getElementById("next-3").addEventListener("click", () => {
        if (validateStep(currentStep)) {
            saveData();
            populateReview();
            currentStep++;
            showStep(currentStep);
        }
    });


    // Previous buttons
    document.getElementById("prev-1").addEventListener("click", () => {
        currentStep--;
        showStep(currentStep);
    });

    document.getElementById("prev-2").addEventListener("click", () => {
        currentStep--;
        showStep(currentStep);
    });

    document.getElementById("prev-3").addEventListener("click", () => {
        currentStep--;
        showStep(currentStep);
    });
    // Submit button
    document.getElementById("submit").addEventListener("click", () => {
        if (validateStep(currentStep)) {
            saveData();
            alert("Form Submitted Successfully !");
            localStorage.removeItem("formData");
            form.reset();
            currentStep = 0;
            showStep(currentStep);
        }
    });
    
    function showStep(step) {
        formSteps.forEach((stepDiv, index) => {
            stepDiv.classList.remove("active");
            progressBar[index].classList.remove("active");
        });

        formSteps[step].classList.add("active");
        progressBar[step].classList.add("active");
    }
    
    

        function validateStep(step) {
            const inputs = formSteps[step].querySelectorAll("input[required]");
            let isValid = true;
    
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /^\d{10}$/;
    
            inputs.forEach(input => {
                const errorMessage = input.nextElementSibling;
                const inputType = input.getAttribute("type");
                let errorText = "";
    
                if (!input.value.trim()) {
                    isValid = false;
                    errorText = `${input.previousElementSibling.textContent} is required`;
                } else if (inputType === "email" && !emailRegex.test(input.value.trim())) {
                    isValid = false;
                    errorText = "Please enter a valid email address";
                } else if (inputType === "tel" && !phoneRegex.test(input.value.trim())) {
                    isValid = false;
                    errorText = "Please enter a valid 10-digit phone number";
                } 
    
                if (errorText) {
                    errorMessage.style.display = "block";
                    errorMessage.textContent = errorText;
                } else {
                    errorMessage.style.display = "none";
                }
            });
            
            return isValid;
        }
    
    function saveData() {
        const formData = new FormData(form);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        localStorage.setItem("formData", JSON.stringify(formObject));
    }
    
    function populateReview() {
        const reviewSection = document.getElementById("review-section");
        const formData = new FormData(form);
        reviewSection.innerHTML = "";

        formData.forEach((value, key) => {
            const p = document.createElement("p");
            p.textContent = `${key}: ${value}`;
            reviewSection.appendChild(p);
        });
    }
});
