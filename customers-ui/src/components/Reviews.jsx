import React, { useEffect, useState } from "react";
import { FaHospitalAlt } from "react-icons/fa";
import { Star } from "react-feather";
import { apiFetch } from "../services/api";
import { toast } from "sonner";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    message: "",
    stars: 0,
  });


  useEffect(() => {
    apiFetch("/reviews/list.php?limit=5")
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const renderStars = (rating = 0) =>
    [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={15}
        fill={index < rating ? "gold" : "none"}
        stroke="gold"
      />
    ));

  const renderSelectableStars = () =>
    [...Array(5)].map((_, index) => {
      const starValue = index + 1;
      return (
        <Star
          key={index}
          size={15}
          style={{ cursor: "pointer" }}
          fill={starValue <= form.stars ? "gold" : "none"}
          stroke="gold"
          onClick={() =>
            setForm((prev) => ({
              ...prev,
              stars: starValue,
            }))
          }
        />
      );
    });

    const handleSubmit = async (e) => {
      e.preventDefault()
      setSubmitting(true)
      if (form.full_name.trim() === "") {
        toast.error("Please add a name")
        return
      }
      if (form.message.trim() === "") {
        toast.error("Please add a review")
        return
      }
      if (form.stars == 0) {
        toast.error("Please add a rating")
        return
      }
      try {
        await apiFetch("/reviews/create.php", {
        method: "POST",
        body: JSON.stringify(form), 
      })
      setForm({
        full_name: "",
        message: "",
        stars: 0,
      })
      setReviews(prev => [form, ...prev])
      toast.success("Review submitted successfully!")
      } catch (error) {
        toast.error("Failed to submit review. Please try again.")
      } finally {
        setSubmitting(false)
      }
    }

    const formatDateOnly = (timestamp) => {
      if (!timestamp) return "";

      const date = new Date(timestamp);

      return date.toISOString().split("T")[0];
    };

  return (
    <div
      className="reviewsContainer"
      style={{ background: "#40ba8dbe" }}
      id="reviews"
    >
      <div
        className="container-1"
        style={{
          padding: "70px 0px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          color: "#54595f",
        }}
      >
        <span style={{ fontSize: "1.6em", fontWeight: 600 }}>
          OUR REVIEWS
        </span>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "35px",
            gap: "14px",
            alignItems: "center",
          }}
        >
          <hr style={{ borderTop: '1px solid #54595f'}} className='horizontal' />
          <FaHospitalAlt size={23} />
          <hr style={{ borderTop: '1px solid #54595f'}} className='horizontal' />
        </div>

        <div
          style={{
            marginTop: "50px",
            display: "flex",
            gap: "40px",
            width: "90%",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {/* LEFT SIDE - FORM */}
          <div
            style={{
              width: "320px",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <h3>Add a Review</h3>

            <input
              type="text"
              placeholder="Full Name"
              value={form.full_name}
              style={{borderRadius: '6px', padding: '8px', border: '1px solid #ccc', background: '#ffffff9d'}}
              onChange={(e) =>
                setForm({ ...form, full_name: e.target.value })
              }
            />

            <div style={{ display: "flex", gap: "6px" }}>
              {renderSelectableStars()}
            </div>

            <textarea
              rows="3"
              placeholder="Write your review..."
              value={form.message}
              style={{borderRadius: '6px', padding: '8px', border: '1px solid #ccc', background: '#ffffff9d'}}
              onChange={(e) =>
                setForm({ ...form, message: e.target.value })
              }
            />

            <button
              style={{
                padding: "8px",
                background: "#54595f",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
              disabled={submitting}
              onClick={handleSubmit}
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              width: "340px",
            }}
          >

            {loading && <p>Loading reviews...</p>}
            {!loading && reviews.length === 0 && <p>No reviews yet.</p>}

            {reviews.map((review) => (
              <div
                key={review.id}
                style={{
                  padding: "20px",
                  background: "#54595f",
                  borderRadius: "10px",
                  color: "#cbcbcb",
                }}
              >
                <strong style={{ fontSize: "15px" }}>
                  {review.full_name}
                </strong>
                <span style={{ fontSize: "14px", color: "#cbcbcb", marginLeft: "10px" }}>
                  {formatDateOnly(review.created_at)}
                </span>

                <div
                  style={{
                    display: "flex",
                    gap: "4px",
                    margin: "8px 0",
                  }}
                >
                  {renderStars(Number(review.stars))}
                </div>

                <p style={{ margin: 0, wordBreak: "break-word" }}>
                  {review.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reviews
