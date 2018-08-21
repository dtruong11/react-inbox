import React from 'react'

const Message = ({id, subject, read, selected, starred, labels, starMessage, highlight}) => {
    
    const isRead = read ? 'read' : 'unread'
    const isSelected = selected ? 'selected' : ''
    const isChecked = selected ? 'checked' : ''
    const isStarred = starred ? "star fa fa-star" : "star fa fa-star-o"

    return (
    <div className={`row message ${isRead} ${isSelected}`}>
    <div className="col-xs-1">
        <div className="row">
        <div className="col-xs-2">
            <input onChange={() => highlight(id)} type="checkbox" checked={isChecked}  />
        </div>
        <div className="col-xs-2">
            <i data-id={id} onClick={ () => starMessage(id) } className={ isStarred }></i>
        </div>
        </div>
    </div>
    <div className="col-xs-11">
        <div>
            { labels.map((label, index) => <span key={index} className="label label-warning">{label}</span>) }
        </div>
        <a href="#">
            {subject}
        </a>
    </div>
    </div>
    )
}

export default Message 