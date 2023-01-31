import { getAuthors, getLetters, getRecipients, getTopics, sendLetter, sendTopic } from "./dataAccess.js"


const mainContainer = document.querySelector("#container")

mainContainer.addEventListener(
    "click",
    clickEvent => {
        if (clickEvent.target.id === "sendLetter") {
            const letter = document.querySelector("textarea").value
            const letterAuthor = parseInt(document.querySelector(".authors option:checked").value)
            const letterRecipient = parseInt(document.querySelector(".recipients option:checked").value)
            const letterTopics = document.querySelectorAll("input[name='topic']:checked")
            const pastLetters = getLetters()
            const setLetterId = pastLetters.length + 1
            
            for (const letterTopic of letterTopics) {
                const letterTopicId = parseInt(letterTopic.value)
                const topicToSendToAPI = {
                    topicId: letterTopicId,
                    letterId: setLetterId
                }

                sendTopic(topicToSendToAPI)
            }

            console.log(letterTopics)

            const letterToSendToAPI = {
                letterId: setLetterId,
                letterContent: letter,
                authorId: letterAuthor,
                recipientId: letterRecipient,
                // topicId: letterTopic,
                sent: new Date()
            }


            sendLetter(letterToSendToAPI)

        }
    }
)

/*
Within the event listener, I will also post a separate fetch with topic and letterId
*/

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
    //ADV checkboxes to select multiple topics
    `<div class="topics">
    ${topics.map(topic => {
        return `
        <input type="checkbox" name="topic" value="${topic.id}" />${topic.title}`
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
