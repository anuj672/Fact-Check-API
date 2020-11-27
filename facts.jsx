import React from 'react';
import './index.css';

function dayDiff(timeStamp) {
    const day = new Date().getUTCDate();
    const month = new Date().getUTCMonth();
    const reviewDay = timeStamp.substring(8, 10);
    const reviewMonth = timeStamp.substring(5, 7);
    const monthdiff = month - reviewMonth + 1;
    let daydiff = day - reviewDay;

    if (monthdiff == 1)
        return monthdiff + " month ago";
    else if (monthdiff != 0)
        return monthdiff + " months ago";
    else if (daydiff == 0)
        return "Today";
    else if (daydiff == 1)
        return daydiff + " day ago";
    else
        return daydiff + " days ago";
}

function facts(props) {
    return (
        <>
            <div className="facts" >
                <h3 className="fact_claim">Claim by {props.claimant} :</h3>
                <span className="fact_text" style={{ marginLeft: '20px' }}>{props.text}</span>
                <h4 className="fact_rating" style={{ marginLeft: '20px' }}>Rating: {props.textualRating}</h4>
                <a href={props.url} target="_blank" style={{ color: '#4083f3', marginLeft: '20px' }}>
                    Read Article
                </a><br />
                <span style={{ color: '#9e9e9e', fontSize: '12px', marginLeft: '20px' }}>{dayDiff(props.reviewDate)}</span>
            </div>
        </>
    );
}

export default facts;