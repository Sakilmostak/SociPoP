class ChatEngine{
    constructor(chatBoxId, userEmail, name){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        this.name= name;

        //io is provided by socket.io
        // emits the connect event
        this.socket = io.connect('http://54.172.116.247:5000');

        if(this.userEmail){
            this.connectionHandler();
        }
    }

    connectionHandler(){
        //storing the pointer to class as 'this' under local scope changes
        let self = this;
        //when the connection is established with server side
        this.socket.on('connect', function(){
            console.log('connection established using sockets...');

            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'socipop'
            });

            self.socket.on('user_joined', function(data){
                console.log('A user joined!', data);
            })
        });

        $('#send-message').click(function(){
            let msg= $('#chat-message-input').val();

            if(msg!= ''){
                self.socket.emit('send_message',{
                    message: msg,
                    user_email: self.userEmail,
                    user_name: self.name,
                    chatroom: 'socipop'
                });
            }
        });

        self.socket.on('recieve_message', function(data){
            console.log('message recieved', data.message);

            let newMessage = $('<li>');

            let messageType = 'other-message';

            if(data.user_email == self.userEmail){
                messageType = 'self-message';
            }

            newMessage.append($(`<small>${data.user_name}</small>
                                 <span> ${data.message}</span>
                                   `));

            // newMessage.append($('<sub>',{
            //     'html': data.user_email
            // }));

            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);
        })
    }
}