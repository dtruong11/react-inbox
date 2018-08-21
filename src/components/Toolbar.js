import React, { Component } from 'react'

class Toolbar extends Component {
    // The only way to get the props 
    constructor (props) {
        super(props)
    }

    checkMessage = (messages) => {
        const all = messages.every(el =>  el.selected === true )
        const some = messages.some(el => el.selected === true)
        
        if (all) return "fa fa-check-square-o"
        else if (some) return "fa fa-minus-square-o"
        else return "fa fa-square-o"
    }

    // markAsRead = () => {
    //     const selectedMessages = this.state.messages.filter(message => message.selected === true)
    //     const newSelectedMessages = [ ...this.state.messages]
    // }

   
    disableToolbar = () => {
        const allSelected = this.props.messages.every(message => message.selected === false)
        return allSelected ? `disabled` : ''
      }
    
       
    render () {
        return (
        <div className="row toolbar">
            <div className="col-md-12">
                <p className="pull-right">
                <span className="badge badge">{this.props.countUnread()}</span>
                {this.props.countUnread() > 1 ? `unread messages` : `unread message`}
                </p>

                <a onClick={this.props.composedOn} className="btn btn-danger">
                    <i className="fa fa-plus"></i>
                </a>

                <button  onClick={ this.props.selectAll }   className="btn btn-default">
                <i className={ this.checkMessage(this.props.messages) } ></i>
                </button>

                <button onClick={ this.props.markAsRead } disabled={this.disableToolbar()} className="btn btn-default">
                Mark As Read
                </button>

                <button onClick={ this.props.markAsUnread } disabled={this.disableToolbar()} className="btn btn-default">
                Mark As Unread
                </button>

                <select onChange={(event) => {this.props.addLabel(event.target.value)}} className="form-control label-select" disabled={this.disableToolbar()}>
                <option>Apply label</option>
                <option value="dev">dev</option>
                <option value="personal">personal</option>
                <option value="gschool">gschool</option>
                </select>

                <select onChange={(event) => {this.props.removeLabel(event.target.value)}} className="form-control label-select" disabled={this.disableToolbar()}>
                <option>Remove label</option>
                <option value="dev">dev</option>
                <option value="personal">personal</option>
                <option value="gschool">gschool</option>
                </select>

                <button onClick={ this.props.deleteMessage } className="btn btn-default" disabled={this.disableToolbar()}>
                <i className="fa fa-trash-o"></i>
                </button>
        </div>
        </div>
        )
    }
}

export default Toolbar 