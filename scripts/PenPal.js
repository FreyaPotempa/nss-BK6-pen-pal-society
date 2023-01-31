import { LetterForm } from "./LetterForm.js"
import { PastLetters } from "./PastLetters.js"


export const PenPal = () => {
    return `
    <h1>Pen Pal Society</h1>
    <section class="penPalForm">
    ${LetterForm()}
    </section>
    
    <section class="pastLetters">
    <h2>Past Letters</h2>
    ${PastLetters()}
    </section>`
}