//var wsServer = 'ws://echo.websocket.events/'
var wsServer = 'ws://localhost:9898'
var websocket = null 

window.onload = function() {
    var form = document.getElementById('message-form')
    var messageField = document.getElementById('message')
    var messageList = document.getElementById('messages')
    var websocketStatus = document.getElementById('status')
    var websocketDisconnect = document.getElementById('close')
    var websocketConnect = document.getElementById('connect')

    form.onsubmit = (event) => {
        event.preventDefault()

        let message = messageField.value

        if(websocket.readyState == websocket.CLOSED || websocket.readyState == websocket.CLOSING) {
            websocketStatus.style.color = "red";
            websocketStatus.innerHTML = "WebSocket is already close or closing"
            return
        }

        websocket.send(message)

        messageList.innerHTML +=
            `<div class="message sol">
                <div class="messageText" data-time="">
                    ${message}
                </div>
            </div>`

        messageField.value = ""

        return false
    }

    websocketConnect.onclick = (event) => {
        event.preventDefault()

        configWebSocket()

        websocketConnect.setAttribute('disabled', '')
        websocketDisconnect.removeAttribute('disabled')

        return false
    }

    websocketDisconnect.onclick = (event) => {
        event.preventDefault()

        websocket.close()

        messageList.innerHTML = ''

        websocketStatus.innerHTML = "WebSocket disconnected"
        websocketStatus.style.color = "red";

        websocketConnect.removeAttribute('disabled')
        websocketDisconnect.setAttribute('disabled', '')

        return false
    }

    function configWebSocket() {
        websocket = new WebSocket(wsServer)  

        websocket.onerror = (error) => {
            console.log("WebSocket Error: " + error)
        }
    
        websocket.onopen = (event) => {
            websocketStatus.innerHTML = "Connected to server: " + event.currentTarget.url
            websocketStatus.style.color = "green";
        }
    
        websocket.onmessage = (event) => {
            let message = event.data
            
            let isDefaultConnectionMessage = (message == 'echo.websocket.events sponsored by Lob.com')

            if(!isDefaultConnectionMessage) {
                messageList.innerHTML +=
                    `<div class="message sag mtLine">
                        <div class="messageText" data-time="">
                            Server: ${message}
                        </div>
                    </div>`
            }
        }
    
        websocket.onclose = (event) => {
            websocketStatus.innerHTML = "WebSocket disconnected"
            websocketStatus.style.color = "red";
        }
    }

}

