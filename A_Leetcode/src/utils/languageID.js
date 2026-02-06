const axios = require('axios');
const getLanguageById = (lang) => {
    const language = {
        "c++": 54,
        "java": 62,
        "javascript": 63
    }
    return language[lang.toLowerCase()];
}

const submitBatch = async (submissions) => {
    const options = {
        method: "POST",
        url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
        params: {
            base64_encoded: "false"
        },
        headers: {
            "x-rapidapi-key": process.env.JUDGE0_KEY,
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
            "Content-Type": "application/json"
        },
        data: {
            submissions
        }
    }

    async function fetchData() {
        try {
            const response = await axios.request(options);
            return response.data;
        } catch (err) {
            throw new Error("Error" + err.message);
        }
    }

    return await fetchData();
}

const submitToken = async (ResultToken) => {

    const waiting = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    const options = {
        method: 'GET',
        url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
        params: {
            tokens: ResultToken.join(","),
            base64_encoded: 'false',
            fields: '*'
        },
        headers: {
            'x-rapidapi-key': process.env.JUDGE0_KEY,
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
        }
    };

    async function fetchData() {
        try {
            const response = await axios.request(options);
            return response.data;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    let attempts = 0;
    const maxAttempts = 10;

    while (attempts < maxAttempts) {
        const result = await fetchData();


        result.submissions.forEach((sub, index) => {
            console.log(`Submission ${index + 1} Status ID:`, sub.status_id);
        });



        const isResultObtained = result.submissions.every(
            (r) => r.status_id > 2
        );
        console.log(isResultObtained);

        if (isResultObtained) {
            return result.submissions;
        }
        attempts++;
        await waiting(2000);
        console.log("hello");
    }

    throw new Error("Execution Timeout: Judge0 did not respond in time.");
};

module.exports = { getLanguageById, submitBatch, submitToken };