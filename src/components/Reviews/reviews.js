import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import {BsFillEmojiSmileFill, BsFillEmojiNeutralFill, BsFillEmojiFrownFill, BsFillFilePersonFill} from "react-icons/bs";

const Review = (props) => {

    let username = props.user.name;
    let role = props.user.role;

    let rating = [1, 3, 5]

    const navigate = useNavigate();
    const [dateTime, setDateTime] = useState("");
    const [formData, updateFormData] = React.useState({
        reviewText: "",
        rating: 1
    })
    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        })
    }
    const onFormSubmit = (e) => {
        e.preventDefault();
        const reviewText = formData.reviewText;
        const rating = formData.rating;
        let data = {
            dateTimeCreated: dateTime,
            reviewText: reviewText,
            rating: rating,
            userId: props.user.userID,
            postId: props.post.postID,
        }
        props.onAddReview(data);
        // navigate(`/reviews/${props.post.id}`);
    }

    useEffect(() => {
        props.loadReviews(props.post.postID);
        var date = new Date();
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var day  = ("0" + (date.getDate())).slice(-2);
        var year = date.getFullYear();
        var hour =  ("0" + (date.getHours())).slice(-2);
        var min =  ("0" + (date.getMinutes())).slice(-2);
        var seg = ("0" + (date.getSeconds())).slice(-2);
        date = year + "-" + month + "-" + day + "-" + hour + "-" +  min + "-" + seg + ".000";
        setDateTime(date);
    }, [])

    let review;
    if (role != null && role === "ROLE_USER") {
        review = (
            <div className="mt-4">
                <form onSubmit={onFormSubmit}>
                    <fieldset className="rounded p-3"
                              style={{border: "2px solid grey", backgroundColor: "#cbebf5"}}>
                        <div className="form-group">
                            <label htmlFor="text" className="pb-2"><b>Review :</b></label>
                            <input type="text"
                                   className="form-control"
                                   id="reviewText"
                                   name="reviewText"
                                   required
                                   placeholder="Enter review text"
                                   onChange={handleChange}
                            />
                        </div>
                        <div className="form-group pb-2">
                            <label className="d-block"><b>Rating :</b></label>
                            {rating.map((term, index) => (
                                <span key={index} className="pe-5 pb-2">
                                    <input
                                        type="radio"
                                        name="rating"
                                        value={term}
                                        onChange={handleChange}
                                    />
                                    {term === 1 ?
                                        <span><BsFillEmojiFrownFill></BsFillEmojiFrownFill></span> : term === 3 ?
                                            <span><BsFillEmojiNeutralFill></BsFillEmojiNeutralFill></span> :
                                            <span><BsFillEmojiSmileFill></BsFillEmojiSmileFill></span>}
                                </span>
                            ))}
                        </div>
                        <button id="submit" type="submit" className="submitBtn btn">Submit</button>
                    </fieldset>
                </form>
            </div>
        );
    } else {
        review = (<span></span>);
    }

    return (
        <div>
            <div className={"container flex-xs-column"} style={{
                height: "100vh", display: 'flex',
                justifyContent: 'center'
            }}>
                <div className="float-start w-50 h-auto">
                    {review}

                    <table className="table mt-3" style={{borderCollapse: "collapse", background: "#cbebf5"}}>
                        <thead>
                        <tr style={{borderBottom: "1px solid grey"}}>
                            <th>User</th>
                            <th>Review</th>
                            <th>Rating</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {props.reviews.map((term, key) => {
                                return (
                                    <tr style={{borderBottom: "1px solid grey"}} key={key}>
                                        <td><BsFillFilePersonFill></BsFillFilePersonFill>{term.user.username}</td>
                                        <td>{term.reviewText}</td>
                                        <td>
                                            {term.rating === 1 ?
                                                <span><BsFillEmojiFrownFill></BsFillEmojiFrownFill></span> : term.rating === 3 ?
                                                    <span><BsFillEmojiNeutralFill></BsFillEmojiNeutralFill></span> :
                                                    <span><BsFillEmojiSmileFill></BsFillEmojiSmileFill></span>}
                                        </td>
                                        <td> {
                                            username != null && term.user.username === username
                                                ? <button title={"Delete"} className={"btn btn-danger me-1"}
                                                          onClick={() => props.onDeleteReview(term.id, props.post.id)}>Delete</button>
                                                : <span></span>
                                        }</td>
                                    </tr>
                                );
                            }
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Review;
