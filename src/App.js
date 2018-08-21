import React, { Component } from 'react';
import './App.css';
import Toolbar from './components/Toolbar'
import MessageList from './components/MessageList'
import Form from './components/Form'
import axios from 'axios'

class App extends Component {
  // DATA, pass data, functions down 

  constructor() {
    super ()

    this.state = {
      messages: [{
        'id': '',
        'subject' : '',
        'read' : '',
        'starred' : false,
        'selected' : false,
        'labels' : []
      }],
      composedOn: false 
    }
    // this.state={
    //   messages : [
    //     {
    //       "id": 1,
    //       "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
    //       "read": false,
    //       "starred": true,
    //       "labels": ["dev", "personal"]
    //     },
    //     {
    //       "id": 2,
    //       "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
    //       "read": false,
    //       "starred": false,
    //       "selected": true,
    //       "labels": []
    //     },
    //     {
    //       "id": 3,
    //       "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
    //       "read": false,
    //       "starred": true,
    //       "labels": ["dev"]
    //     },
    //     {
    //       "id": 4,
    //       "subject": "We need to program the primary TCP hard drive!",
    //       "read": true,
    //       "starred": false,
    //       "selected": true,
    //       "labels": []
    //     },
    //     {
    //       "id": 5,
    //       "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
    //       "read": false,
    //       "starred": false,
    //       "labels": ["personal"]
    //     },
    //     {
    //       "id": 6,
    //       "subject": "We need to back up the wireless GB driver!",
    //       "read": true,
    //       "starred": true,
    //       "labels": []
    //     },
    //     {
    //       "id": 7,
    //       "subject": "We need to index the mobile PCI bus!",
    //       "read": true,
    //       "starred": false,
    //       "labels": ["dev", "personal"]
    //     },
    //     {
    //       "id": 8,
    //       "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
    //       "read": true,
    //       "starred": true,
    //       "labels": []
    //     }
    //   ]
    // }
  }

  componentDidMount() {
    this.getMessages()

  }

  getMessages = async () => {
    const res = await axios.get('http://localhost:8082/api/messages')

    this.setState({
      messages: res.data 
    })
  }

  // it should be near the state 
  starMessage = async (id) => {
    let messageIds = []
    this.state.messages.map(m => {
      if (m.id === id) {
        messageIds.push(m.id)
      }
      return m 
    })

    const body = {
      messageIds,
      command : 'star' 
    }

    const res = await axios.patch('http://localhost:8082/api/messages', body)
    console.log(res)
    this.setState({
      messages: res.data
    })
  }

  highlight = (id) => {
    const newMessages = this.state.messages.map(el => {
      if(el.id === id) {
        el.selected = !el.selected  
      }
      return el 
    })

    this.setState({
      messages: newMessages 
    })
  }

  selectAll = () => {
    const allSelected = this.state.messages.every(message => message.selected === true)
    const selectedMessages = this.state.messages.map(message => {
      allSelected ? message.selected=false : message.selected=true
      return message 
    })

    this.setState ({
      messages: selectedMessages
    })
  }


  markAsRead = async () => {
    let messageIds = []
    this.state.messages
    .map(m => {
      if (m.selected === true) {
        messageIds.push(m.id)
      }
      return m 
    })

    const body = {
      messageIds,
      command : 'read',
      read: true 
    }

    const res = await axios.patch('http://localhost:8082/api/messages', body)
    this.setState({
      messages: res.data
    })
  }


  markAsUnread = async () => {
    let messageIds = []

    this.state.messages
    .map(m => {
      if (m.selected === true) {
        m.read=true 
        m.selected=false 
        messageIds.push(m.id)
      }
      return m 
    })

    const body = {
      messageIds,
      command : 'read',
      read: false 
    }

    const res = await axios.patch('http://localhost:8082/api/messages', body)

    this.setState ({
      messages: res.data
    })
  }


  deleteMessage = () => {
    const selectedMessages = this.state.messages
    .filter(message => message.selected !== true)
    
    this.setState ({
      messages: selectedMessages
    })
  }

  addLabel = async (label) => {
    const messageIds = this.state.messages.filter(m => m.selected).map(m => m.id )
    console.log('I am messageIds',messageIds)

     const body = {
      messageIds,
      command : 'addLabel',
      label 
    }

    const res = await axios.patch('http://localhost:8082/api/messages', body)

    this.setState ({
      messages: res.data
    })
  }

  removeLabel = async (label) => {
    const messageIds = this.state.messages.filter(m => m.selected).map(m => m.id )

     const body = {
      messageIds,
      command : 'removeLabel',
      label 
    }

    const res = await axios.patch('http://localhost:8082/api/messages', body)

    this.setState ({
      messages: res.data
    })
  }

  countUnread = () => {
    console.log("this.state.messages", this.state.messages)
    const count = this.state.messages.filter(el => el.read === false).length 
    return count 
  }

  toggleForm = () => {
    this.setState({
      composedOn: !this.state.composedOn
    })
  }

  createMessage = async ({subject, body }) => {
    const res = await axios.post('http://localhost:8082/api/messages', { subject, body })
    this.setState({
      messages: [ ...this.state.messages, res.data],
      composedOn: false 
    })
  }

  render() {
    return (
      <div className="container">
        <Toolbar  messages={this.state.messages} 
                  selectAll={this.selectAll} 
                  markAsRead={this.markAsRead} 
                  markAsUnread={ this.markAsUnread } 
                  deleteMessage={this.deleteMessage}
                  addLabel={this.addLabel}
                  removeLabel={this.removeLabel}
                  countUnread={this.countUnread}
                  composedOn={this.toggleForm}
                />
        {this.state.composedOn && <Form createMessage={this.createMessage}/>}
        <MessageList 
                  messages={this.state.messages}
                  starMessage={ this.starMessage } 
                  highlight={ this.highlight } 
                />
      </div>
    );
  }
}

export default App;
