import { getLetters, getAuthors, getTopics, getRecipients, getSelectedTopics } from "./dataAccess.js";


export const PastLetters = () => {
    const letters = getLetters()
    
const matchLetterAuthor = (letter) => {
            const authors = getAuthors()
            const letterAuthor = authors.find(author => letter.authorId === author.id)
            return `${letterAuthor.aName} (${letterAuthor.aEmail})`
        }
const matchLetterTopics = (letter) => {
    const selectedtopics = getSelectedTopics()
    //filters all selected topics to just return the one that matches this letter
    const letterTopics = selectedtopics.filter(selectTopic => letter.letterId === selectTopic.letterId)
    const topics = getTopics()

    //currently have all topicIds relevant to that letter
    //need to match those to the topics array to print the new list.

    let listItems = ""
    for (const topic of topics) {
        for (const letterTopic of letterTopics) {
            if (letterTopic.topicId === topic.id) {
                listItems += `${topic.title} `
            }
        }
    }
    return listItems
}

const matchLetterRecipient = (letter) => {
    const recipients = getRecipients()
    const letterRecipient = recipients.find(recipient => letter.recipientId === recipient.id)
    return `${letterRecipient.rName} (${letterRecipient.rEmail}),`
}

const makeDateReadable = (letter) => {
    const dateStr = letter.sent.toLocaleString('en-US')
    let testDate = new Date(dateStr)
    // USE THE BELOW FOR DIFFERENT DATE FORMATS
    // let year = testDate.getFullYear()
    // let month = ("0" + (testDate.getMonth() + 1)).slice(-2)
    // let day = ("0" + testDate.getDate()).slice(-2)
    // let date_time = `${year}-${month}-${day}`
    // console.log(date_time)
    return `${testDate}`
}

    let html = `<div class="letterList">
    ${letters.map(letter => {
        return `<div class="postedLetter" id="${letter.id}">
        <p>Dear ${matchLetterRecipient(letter)}<br>
        <p>${letter.letterContent}</p>
        <p>Regards,<br>
        ${matchLetterAuthor(letter)}</p>
        <i>Sent on ${makeDateReadable(letter)}</i>
        <div class="selectedTopics">${matchLetterTopics(letter)}</div>
       
        </div>`
    }).join("")}
    </div>`



    return html
}

//ADVANCED: need new join table that will hold
// okay make a new join table using letterId and topicId (just 2 foreign keys)
//need to POST to two different .json databases 
//first convert the topics to checkboxes console.log
//then grab the values, console.log
