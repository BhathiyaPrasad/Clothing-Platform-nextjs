import React, { useEffect, useState } from 'react';
import { Star, User } from 'lucide-react';
import { collection, where, query, getDocs, doc, addDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';

const ProductReviewComponent = ({ productId }) => {
    interface Review {
        id: string;
        rating: number;
        comment: string;
        name: string;
        productId: string;
        Date: string;
    }

    const [reviews, setReviews] = useState<Review[]>([]);
    const [newReview, setNewReview] = useState({ rating: 0, comment: '', name: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(date);
    };

    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            setError('');
            try {
                const orgDocId = '20240711-1011-SaluniFashion';
                const reviewRef = collection(doc(db, 'organizations', orgDocId), 'reviews');
                const reviewQuery = query(reviewRef, where('productId', '==', productId));

                const querySnapshot = await getDocs(reviewQuery);
                const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Review));
                setReviews(data);
            } catch (err) {
                setError('Failed to fetch reviews. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, [productId]);

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

        const reviewWithId = {
            ...newReview,
            id: Date.now().toString(),
            productId,
            Date: formatDate(new Date()),
        };
        setReviews([...reviews, reviewWithId]);
        setNewReview({ rating: 0, comment: '', name: '' });

        try {
            const orgDocId = '20240711-1011-SaluniFashion';
            const itemsRef = collection(doc(db, 'organizations', orgDocId), 'reviews');

            await addDoc(itemsRef, {
                name: reviewWithId.name,
                productId: reviewWithId.productId,
                rating: reviewWithId.rating,
                comment: reviewWithId.comment,
                Date: formatDate(new Date()),
            });
        } catch (err) {
            setError('Failed to submit review. Please try again.');
        }
    };

    const isFormValid = newReview.rating !== 0 && newReview.comment.trim() !== '' && newReview.name.trim() !== '';

    return (
        <div className="max-w-4xl mx-auto p-8 rounded-box z-index-1">
            {error && <div className="alert alert-error">{error}</div>}

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
                                    aria-label={`Rate ${star} out of 5`}
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
                        <button className="btn btn-primary" onClick={handleSubmitReview} disabled={!isFormValid}>
                            Submit Review
                        </button>
                    </div>
                </div>
            </div>

            {loading ? (
                <div>Loading reviews...</div>
            ) : (
                <div className="space-y-6">
                    {reviews.length === 0 ? (
                        <p>No reviews yet.</p>
                    ) : (
                        reviews.map((review) => (
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
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default ProductReviewComponent;
