function CreateProblemValidation(data) {
    try {
        const mandatoryField = ["title","description","difficulty",
        "tags","visibleTestCases","hiddenTestCases","startCode",
        "referenceSolution"];
        const IsAllow = mandatoryField.every((k) => Object.keys(data).includes(k));

        if (!IsAllow)
            throw new Error("Some Field Missing");
    }
    catch(err){
       throw new Error("CPV Error: "+err.message);
    }
}

module.exports = CreateProblemValidation;