import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../utils/useAxios";

function Quizpage() {
    const [selectedOption, setSelectedOption] = useState("");
    const [quizIds, setQuizIds] = useState([]);
    const [index, setIndex] = useState(0);
    const [question, setQuestion] = useState("");
    const [choices, setChoices] = useState([]);
    const param = useParams();

    const getQuizIds = async () => {
        try {
            const response = await useAxios().get(`/user/subject/chapterid/${1}`);
            if (response) {
                setQuizIds(response.data.chapterquizid);
                console.log(response.data.chapterquizid);
            } else {
                console.log(response);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getQuizIds();
    }, []);

    useEffect(() => {
        if (quizIds.length > 0 && index < quizIds.length) {
            const getQuiz = async () => {
                try {
                    const response = await useAxios().get(`/user/subject/quiz/${quizIds[index]}`);
                    if (response) {
                        setQuestion(response.data.question);
                        setChoices([
                            { option: 'A', text: response.data.choice_a },
                            { option: 'B', text: response.data.choice_b },
                            { option: 'C', text: response.data.choice_c },
                            { option: 'D', text: response.data.choice_d }
                        ]);
                        console.log(response);
                    } else {
                        console.log(response);
                    }
                } catch (error) {
                    console.error(error);
                }
            };

            getQuiz();
        }
    }, [index, quizIds]);

    const handleIndex = (e) => {
        e.preventDefault();
        if (index < quizIds.length - 1) {
            setIndex(index + 1);
        } else {
            console.log('Quiz Completed');
        }
    };

    return (
        <div className="container">
            <h2>Quiz Application</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="question1">{question}</label>
                    <br />
                </div>
                {choices.map((choice, idx) => (
                    <div className="form-group" key={idx}>
                        <label htmlFor={`option${choice.option}`}>{choice.text}</label>
                        <input
                            type="radio"
                            id={`option${choice.option}`}
                            name="options"
                            value={choice.option}
                            onChange={() => setSelectedOption(choice.option)}
                        />
                        <br />
                    </div>
                ))}
                <button type="submit" className="btn btn-primary" onClick={handleIndex}>
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Quizpage;
