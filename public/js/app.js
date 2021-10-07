console.log('client side javascript loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//   response.json().then((data)=>{
//     console.log(data)
//   })
// })

fetch('http://localhost:3000/weather?address=dubai').then((response) =>{
  response.json().then((data) =>{
     console.log(data)
  })
})


const weatherForm = document.querySelector('form')
const select = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
  e.preventDefault()
  const location = select.value
  messageOne.textContent = 'Loading.....'
  messageTwo.textContent = ''
  fetch('http://localhost:3000/weather?address='+location).then((response) =>{
    response.json().then((data) =>{
        if (data.error){
          messageOne.textContent = data.error
        }else {
          messageOne.textContent = 'Location:'+ data.location
          messageTwo.textContent = 'Temperature:'+ data.temperature
        }
    })
  })
})
