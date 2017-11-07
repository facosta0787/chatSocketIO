import React from "react"
import io from 'socket.io-client'

class Chat extends React.Component{

    constructor(props) {
      super(props);
      this.state = {
        author:'',
        message:'',
        messages:[]
      };

      this.socket = io('12.1.1.196:8080')

      this.socket.on('RECEIVE_MESSAGE',(data) => {
        this.addMessage(data)
      })

    }

    addMessage = (data) =>{
      console.log(data)
      this.setState({ messages: [...this.state.messages,data] })
    }

    sendMessage = e =>{
      e.preventDefault()
      this.socket.emit(
        'SEND_MESSASGE',
        {
          author:this.state.author,
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
                                    this.state.messages.map( (message,idx) => {
                                        return(
                                          <div key={idx}>{message.author}: {message.message}</div>
                                        )
                                    })
                                  }
                                </div>
                            </div>
                            <div className="card-footer">
                                    <input type="text" placeholder="User" value={this.state.author} onChange={ev => this.setState({author: ev.target.value})} className="form-control"/>
                                    <br/>
                                    <input type="text" placeholder="Message" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})} className="form-control"/>
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
