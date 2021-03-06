console.log('Client side javascript is loaded!');

fetch('http://puzzle.mead.io/puzzle').then((response) => { 
    response.json().then((podaci) => {
        console.log(podaci);
    })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const lok = search.value
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch(`/weather?address=${lok}`).then((resp) => {
        resp.json().then((podaci) => {
            if(podaci.error) {
                messageTwo.textContent = podaci.error
            } else {
                messageOne.textContent = `Location: ${podaci.lokacija}`
                messageTwo.textContent = `Forecast: ${podaci.prognoza}`
            }
        })
    })
})
