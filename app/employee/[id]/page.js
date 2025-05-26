"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Tabs from "../../../components/Tabs";
import StarRating from "../../../components/StarRating";

export default function EmployeePage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        data.performance = Math.floor(Math.random() * 5) + 1;
        data.bio = "A growth-driven employee with a track record of consistent improvement.";
        setUser(data);
      });
  }, [id]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-6 text-black">
      <h1 className="text-2xl font-bold">{user.firstName} {user.lastName}</h1>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Address: {user.address?.address}</p>
      <StarRating rating={user.performance} />
      <p className="mt-2 italic">{user.bio}</p>
      <Tabs userId={user.id} />
    </div>
  );
}
