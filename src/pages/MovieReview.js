import React from "react";
import { useParams } from "react-router-dom";
import { useGetMovieReviewsList } from "../hooks/reviews/getMovieReviewsList";
import ReviewItem from "../components/movie/ReviewItem";

function MovieReview() {
  // Get the movieId from the URL parameters
  const { movieId } = useParams();

  // Pass the movieId to the hook
  const { data, isLoading, error } = useGetMovieReviewsList(movieId);

  if (isLoading) {
    return <div>Loading reviews...</div>;
  }

  if (error) {
    return <div>Error fetching reviews: {error.message}</div>;
  }

  return (
    <div>
      <h2 className="py-10 text-xl"> Reviews For {data.movieTitle}</h2>
      {data && data.reviews.length > 0 ? (
        <ul className="max-w-sm">
          {data?.reviews?.map((review) => (
            <ReviewItem
              key={review.id}
              userInitial={review.user.name.charAt(0)}
              userName={review.user.name}
              rating={review.rating}
              comment={review.comment}
              date={review.createdAt}
            />
          ))}
        </ul>
      ) : (
        <div>No reviews yet.</div>
      )}
    </div>
  );
}

export default MovieReview;
