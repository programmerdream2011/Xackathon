function analyze(){
    let fields = document.querySelectorAll(".feature");

    let motivation = fields[0].value;
    let experience = fields[1].value;
    let skills = fields[2].value;

    let totalText = motivation + " " + experience + " " + skills;

    let score = 0;

    if(totalText.length > 150){
        score += 30;
    } else if(totalText.length > 80){
        score += 20;
    } else {
        score += 10;
    }

    let keywords = ["leadership", "project", "AI", "teamwork"];
    keywords.forEach(word => {
        if(totalText.toLowerCase().includes(word)){
            score += 10;
        }
    });

    // структура
    if(motivation.includes(".") || experience.includes(".")){
        score += 30;
    } else {
        score += 10;
    }


    let decision = "";

    if(score >= 75){
        decision = "ACCEPT ✅";
    } else if(score >= 65){
        decision = "MAYBE ⚠️";
    } else {
        decision = "REJECT ❌";
    }

    let feedback = "";

    if(motivation.length > 50){
        feedback += "Good motivation. ";
    } else {
        feedback += "Motivation is too short. ";
    }

    if(!experience.toLowerCase().includes("project")){
        feedback += "Add more project examples. ";
    }

    if(!skills.toLowerCase().includes("teamwork")){
        feedback += "Mention teamwork skills. ";
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
        "Score: " + score +
        "Decision: " + decision +
        "Feedback: " + feedback;
}