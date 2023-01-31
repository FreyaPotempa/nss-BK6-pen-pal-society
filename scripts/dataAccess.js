import { renderAll } from "./main.js";

const letterBuilder = {
    authors: [],
    recipients: [],
    topics: [],
    letters: [],
    selectedTopics: []
}

const mainContainer = document.querySelector("#container")
const API = "http://localhost:8088"

export const fetchLetters = () => {
    return fetch(`${API}/letters`)
    .then(response => response.json())
    .then(
        (letterList) => {
            letterBuilder.letters = letterList
        }
    )
}

export const fetchAuthors = () => {
    return fetch(`${API}/authors`)
    .then(response => response.json())
    .then(
        (authorList) => {
            letterBuilder.authors = authorList
        }
    )
}

export const fetchTopics = () => {
    return fetch(`${API}/topics`)
    .then(response => response.json())
    .then(
        (topicList) =>
        letterBuilder.topics = topicList
    )
}

export const fetchRecipients = () => {
    return fetch(`${API}/recipients`)
    .then(response => response.json())
    .then(
        (recipientList) => {
            letterBuilder.recipients = recipientList
        }
    )
}
//BUILT TO FETCH AND GET NEW RETURNED TABLE
export const fetchSelectedTopics = () => {
    return fetch(`${API}/selectedTopics`)
    .then(response => response.json())
    .then(
        (topics) => {
            letterBuilder.selectedTopics = topics
        }
    )
}

export const getSelectedTopics = () => {
 return letterBuilder.selectedTopics.map(topic => ({...topic}))
}

export const getLetters = () => {
    return letterBuilder.letters.map(letter => ({...letter}))
}

export const getAuthors = () => {
    return letterBuilder.authors.map(author => ({...author}))
}

export const getTopics = () => {
    return letterBuilder.topics.map(topic => ({...topic}))
}

export const getRecipients = () => {
    return letterBuilder.recipients.map(recipient => ({...recipient}))
}

export const sendLetter = (userInput) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userInput)
    }

    return fetch(`${API}/letters`, fetchOptions)
    .then(response => response.json())
    .then(() => {
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
    })

}

export const sendTopic = (userInput) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userInput)
    }

    return fetch(`${API}/selectedTopics`, fetchOptions)
    .then(response => response.json())
    .then(() => {
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
    })
}