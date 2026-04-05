function analyze(){
    let fields = document.querySelectorAll(".feature");

    let motivation = fields[0].value;
    let experience = fields[1].value;
    let skills = fields[2].value;

    let totalText = motivation + " " + experience + " " + skills;

    let score = 0;

    if(totalText.length > 200){
        score += 30;
    } else if(totalText.length > 150){
        score += 20;
    } else if(totalText.length > 100){
        score += 10;}
    else {
        score += 0;
    }

    let keywords = ["leadership", "project", "AI", "teamwork","volunteering","music","art","sport","science project","robotics"];
    keywords.forEach(word => {
        if(totalText.toLowerCase().includes(word)){
            score += 5;
        }
    });

    // структура
    if(motivation.includes(".") && experience.includes(".") && skills.includes(".") && motivation.includes(",") && experience.includes(",") && skills.includes(",")){
        score += 30;
    } else if(motivation.includes(".") && experience.includes(".") && skills.includes(".")){
        score+=15;
    }
    else {
        score += 0;
    }

    if(score > 100){
    score = 100;
}

    let decision = "";

    if(score >= 81){
        decision = "Accept ✅";
    } else if(score >= 67){
        decision = "Maybe ⚠️";
    } else {
        decision = "Reject ❌";
    }

    let feedback = "";

    if(motivation.length > 200){
        feedback += "Good motivation. ";
    } else {
        feedback += "You need better motivation. ";
    }

    if(!experience.toLowerCase().includes("project")){
        feedback += "Add more project examples. ";
    }

        if(!experience.toLowerCase().includes("leadership")){
        feedback += "Tell us about your leadership skills. ";
    }

        if(!experience.toLowerCase().includes("sport")){
        feedback += "You should do sports or martial arts. ";
    }

    if(!skills.toLowerCase().includes("teamwork")){
        feedback += "Work more and do projects in teams. ";
    }

    let data = {
        motivation,
        experience,
        skills,
        score,
        decision,
        feedback
    };

        let history = JSON.parse(localStorage.getItem("history")) || [];

        history.push(data);
        localStorage.setItem("history", JSON.stringify(history));

    // OUTPUT

    document.getElementById("result").innerText =
        " Score: " + score + 
        " | Decision: " + decision + 
        " | Feedback: " + feedback;
}
        
        function showData(){

    let history = JSON.parse(localStorage.getItem("history"));

    let output = "";

    if(!history || history.length === 0){
        output = "<p>No saved data ❌</p>";
    } else {
        history.forEach((item, index) => {
            output += `
            <div class="card">
                <h3>Candidate ${index + 1}</h3>
                <p><b>Score:</b> ${item.score}</p>
                <p><b>Decision:</b> ${item.decision}</p>
                <p><b>Feedback:</b> ${item.feedback}</p>
            </div>
            `;
        });
    }

    document.getElementById("history").innerHTML = output;
}


        function clearData(){
            localStorage.removeItem("history");
            location.reload();
}



window.onload = function(){

    let history = JSON.parse(localStorage.getItem("history"));

    if(history && history.length > 0){
        let last = history[history.length - 1];

        let fields = document.querySelectorAll(".feature");

        fields[0].value = last.motivation;
        fields[1].value = last.experience;
        fields[2].value = last.skills;

        document.getElementById("result").innerText =
            "Last result:\nScore: " + last.score +
            "\nDecision: " + last.decision +
            "\nFeedback: " + last.feedback;
    }
}
