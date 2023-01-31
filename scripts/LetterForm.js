import { getAuthors, getRecipients, getTopics, sendLetter } from "./dataAccess.js"


const mainContainer = document.querySelector("#container")

mainContainer.addEventListener(
    "click",
    clickEvent => {
        if (clickEvent.target.id === "sendLetter") {
            const letter = document.querySelector("textarea").value
            const letterAuthor = parseInt(document.querySelector(".authors option:checked").value)
            const letterRecipient = parseInt(document.querySelector(".recipients option:checked").value)
            const letterTopic = parseInt(document.querySelector("input[name='topic']:checked").value)

            const letterToSendToAPI = {
                letterContent: letter,
                authorId: letterAuthor,
                recipientId: letterRecipient,
                topicId: letterTopic,
                sent: new Date()
            }

            sendLetter(letterToSendToAPI)

        }
    }
)



export const LetterForm = () => {
    let html = ""
    
    const authors = getAuthors()
    html += `
    <select class="authors">
    <option value="0">Choose Author</option>
    ${authors.map(author => {
        return `<option value="${author.id}">${author.aName}</option>`
    }).join("")}
    </select>`
    
    html += `
    <div class="field">
    <label class="label" for="letterField">Letter</label>
    <form>
    <textarea type="text" id="letterfield" name="letterInput" class="input" rows= "5" cols = "10">
    </textarea>  
    </form>
    </div>`
    
    const topics = getTopics()
    html += 
    //radio buttons of topics
    `<div class="topics">
    ${topics.map(topic => {
        return `
        <input type="radio" name="topic" value="${topic.id}" />${topic.title}`
    }).join("")} 
    </div>`
    
    const recipients = getRecipients()
    html +=
    //dropdown list of recipients
    //for some reason only selection the recipient as the topic?
    `<select class="recipients">
    <option value="0">Choose Recipient</option>
    ${recipients.map(recipient => {
        return `<option value="${recipient.id}">${recipient.rName}</option>`
    }).join("")}
    </select>`
    
    //NEED MORE TO MAKE THIS WORK, ANOTHER EVENT LISTENER TO DOCUMENT THE CHANGE
//     const isButtonDisabled = () => {
//         const authorSelect = document.querySelector("authors") !== null
//         console.log(authorSelect)
//         if (authorSelect > 0) {
//             return ""
//         } else {
//         return `disabled`
//     }
// }

    html += `
    <article>
    <button type="button" id="sendLetter">Send Letter</button>
    </article>`
    
    return html
}