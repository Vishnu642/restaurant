import "./RestaurantDetails.css"

export const RestaurantDetails = ({
    image:url,name:title,cost,rating,votes,reviews,paymentMethods,cuisine:tags
})=>{
    return (
        <div className="container" >
            <div>
                <img  width="50px" src={url} alt={title} ></img>
            </div>
            <div>
                <div>{title}</div>
                <div>{tags}</div>
                <div>Cost for ${cost}</div>
                <div>accepts {JSON.stringify(paymentMethods)}</div>
            </div>
            <div>
                <div>{rating}</div>
                <div>{votes}votes</div>
                <div>{reviews}reviews</div>
            </div>
        </div>
    )
}