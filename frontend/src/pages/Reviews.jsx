import React from 'react'
import { useEffect } from 'react'
import { apiFetch, cachedFetch } from '../services/api'
import { useState } from 'react'
import { Star, Trash, Trash2 } from "react-feather"
import { toast } from 'react-toastify'

export default function Reviews() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    const fetchReviews = async () => {
      const res = await cachedFetch('/reviews/list.php')
      setReviews(res)
      setLoading(false)
    }
    fetchReviews()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      setDeleting(true)
      const res = await apiFetch(`/reviews/delete.php?id=${id}`)
      setReviews((prevReviews) => prevReviews.filter((review) => review.id !== id))
      toast.success(res)
    } catch (error) {
      console.error(error)
      toast.error(error)
    } finally {
      setDeleting(false)
    }
  }

  const renderStars = (rating = 0) =>
    [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={15}
        fill={index < rating ? "gold" : "none"}
        stroke="gold"
      />
    ))

    const formatDateOnly = (timestamp) => {
      if (!timestamp) return "";

      const date = new Date(timestamp);

      return date.toISOString().split("T")[0];
    }

  return (
    <div className="full-container">
      <div style={{
        display: "flex",
        gap: "30px",
        flexDirection: 'row',
        flexWrap: "wrap",
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
              width: "340px",
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
            <div className="trash"
              style={{
                display: "flex",
                height: '20px'
              }}
            >
              <span
              style={{
                position: 'absolute',
                marginLeft: '280px',
                cursor: 'pointer',
                padding: "9px",
                borderRadius: "50%"
              }}
              className='delete'
              onClick={() => !deleting && handleDelete(review.id)}
              >
                <Trash2 size={18} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
