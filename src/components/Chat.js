import React from "react"
import io from 'socket.io-client'

class Chat extends React.Component{

    constructor(props) {
      super(props);
      this.state = {
        username:'',
        message:'',
        messages:[]
      };
      this.socket = io('localhost:8080')
      this.socket.on('RECEIVE_MESSAGE',(data) => {
        addMessage(data)
      })

    }

    addMessage = () =>{
      console.log(data)
      this.setState({ messages: [...this.state.messages,data] })
    }

    sendMessage = e =>{
      e.preventDefault()
      this.socket.emit(
        'SEND_MESSASGE',
        {
          author:this.state.username,
          message: this.state.message
        }
      )
      this.setState({message:''})
    }

    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-6" style={{ margin:'0 auto' }}>
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">Sala de chat</div>
                                <hr/>
                                <div className="messages">
                                  {
                                    this.state.messages.map( message => {
                                        return(
                                          <div>{message.autor}: {message.message}</div>
                                        )
                                    })
                                  }
                                </div>
                            </div>
                            <div className="card-footer">
                                    <input type="text" placeholder="User" className="form-control"/>
                                    <br/>
                                    <input type="text" placeholder="Message" className="form-control"/>
                                    <br/>
                                    <button onClick={this.sendMessage}  className="btn btn-primary form-control">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;
