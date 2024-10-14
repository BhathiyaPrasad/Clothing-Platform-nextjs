import React, { useEffect, useState } from 'react';
import { Star, User } from 'lucide-react';
import { collection, where, query, getDocs, doc, addDoc } from 'firebase/firestore'
import { db } from '../utils/firebase';

const ProductReviewComponent = ({ productId }) => {
    interface Review {
        id: string;
        rating: number;
        comment: string;
        name: string;
        productId: string;  // Add productId to the Review interface
        Date: string;
    }

    const [reviews, setReviews] = useState<Review[]>([]);
    const [newReview, setNewReview] = useState({ rating: 0, comment: '', name: '' });

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const orgDocId = 'InterithmT4';
                const reviewRef = collection(doc(db, "organizations", orgDocId), "reviews");
                const reviewQuery = query(
                    reviewRef,
                    where("productId", "==", productId)
                );

                const querySnapshot = await getDocs(reviewQuery);
                const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Review));
                setReviews(data);
            } catch (err) {
                console.log('Error while fetching reviews:', err);
            } finally {
                console.log('Reviews fetched');
            }
        };
        fetchReviews();
    }, [productId]); // Include productId in the dependency array




    const handleRatingChange = (rating) => {
        setNewReview({ ...newReview, rating });
    };

    const handleInputChange = (e) => {
        setNewReview({ ...newReview, [e.target.name]: e.target.value });
    };

    const handleSubmitReview = async () => {
        if (newReview.rating === 0 || newReview.comment.trim() === '' || newReview.name.trim() === '') {
            alert('Please provide a rating, name, and comment');
            return;
        }
        const reviewWithId = { ...newReview, id: Date.now().toString(), productId, Date: new Date().toLocaleDateString() }; // Add productId and Date here
        setReviews([...reviews, reviewWithId]);
        setNewReview({ rating: 0, comment: '', name: '' });

        try {
            const orgDocId = 'InterithmT4';
            const itemsRef = collection(doc(db, "organizations", orgDocId), "reviews");

            await addDoc(itemsRef, {
                name: reviewWithId.name,
                productId: reviewWithId.productId,
                rating: reviewWithId.rating,
                comment: reviewWithId.comment,
                Date: new Date().toLocaleDateString()

            })
        }
        catch (err) {
            console.log('error while review add', err);
        }

        finally {
            console.log('Review submitted:', reviewWithId);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 rounded-box z-index-1">
            <div className="card bg-base-100 shadow-xl mb-8">
                <div className="card-body">
                    <h3 className="card-title text-2xl mb-4">Write a Review</h3>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Your Name</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            className="input input-bordered w-full"
                            value={newReview.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-control mt-4">
                        <label className="label">
                            <span className="label-text">Rating</span>
                        </label>
                        <div className="rating rating-lg">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <input
                                    key={star}
                                    type="radio"
                                    name="rating-2"
                                    className="mask mask-star-2 bg-orange-400"
                                    checked={star === newReview.rating}
                                    onChange={() => handleRatingChange(star)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="form-control mt-4">
                        <label className="label">
                            <span className="label-text">Your Review</span>
                        </label>
                        <textarea
                            name="comment"
                            className="textarea textarea-bordered h-24"
                            placeholder="Write your review here..."
                            value={newReview.comment}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>
                    <div className="card-actions justify-end mt-6">
                        <button className="btn btn-primary" onClick={handleSubmitReview}>
                            Submit Review
                        </button>
                    </div>
                </div>
            </div>
            <div className="space-y-6">
                {reviews.map((review) => (
                    <div key={review.id} className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <div className="flex items-center mb-4">
                                <div className="avatar placeholder mr-4">
                                    <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                                        <User size={24} />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold">{review.name}</h4>
                                    <div className="rating rating-sm">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <input
                                                key={star}
                                                type="radio"
                                                name={`rating-${review.id}`}
                                                className="mask mask-star-2 bg-orange-400"
                                                checked={star <= review.rating}
                                                readOnly
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                            <div className="card-actions justify-end">
                                <div className="badge badge-outline">{review.Date}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductReviewComponent;
