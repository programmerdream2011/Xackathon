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
    if(motivation.includes(".") || experience.includes(".")){
        score += 30;
    } else {
        score += 20;
    }


    let decision = "";

    if(score >= 81){
        decision = "ACCEPT ✅";
    } else if(score >= 67){
        decision = "MAYBE ⚠️";
    } else {
        decision = "REJECT ❌";
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

    if(!skills.toLowerCase().includes("teamwork")){
        feedback += "Work more and do projects in teams";
    }

    let data = {
        motivation,
        experience,
        skills,
        score,
        decision,
        feedback
    };

    localStorage.setItem("candidate", JSON.stringify(data));


    // OUTPUT

    document.getElementById("result").innerText =
        "Score: " + score + " " +
        "Decision: " + decision + " " +
        "Feedback: " + feedback;
}
