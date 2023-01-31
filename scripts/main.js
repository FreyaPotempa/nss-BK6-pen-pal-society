import { fetchAuthors, fetchRecipients, fetchTopics, fetchLetters, fetchSelectedTopics } from "./dataAccess.js"
import { PenPal } from "./PenPal.js"


const mainContainer = document.querySelector("#container")

mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        renderAll()
    }
)

export const renderAll = () => {
    fetchLetters()
    .then(() => fetchAuthors())
    .then(() => fetchRecipients())
    .then(() => fetchTopics())
    .then(() => fetchSelectedTopics())
    .then(
        () => {
            mainContainer.innerHTML = PenPal()
        }
    )
}

renderAll()