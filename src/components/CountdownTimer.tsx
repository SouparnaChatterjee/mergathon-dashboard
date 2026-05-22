"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  targetDate: string;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isExpired: false,
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeLeft.isExpired) {
    return (
      <div className="countdown-expired" style={{ fontWeight: 600, color: "var(--accent-rose)" }}>
        🎉 Mergathon Event Concluded!
      </div>
    );
  }

  return (
    <div className="countdown">
      <div className="countdown-unit">
        <div className="countdown-value">{String(timeLeft.days).padStart(2, "0")}</div>
        <div className="countdown-label">Days</div>
      </div>
      <div className="countdown-sep">:</div>
      <div className="countdown-unit">
        <div className="countdown-value">{String(timeLeft.hours).padStart(2, "0")}</div>
        <div className="countdown-label">Hrs</div>
      </div>
      <div className="countdown-sep">:</div>
      <div className="countdown-unit">
        <div className="countdown-value">{String(timeLeft.minutes).padStart(2, "0")}</div>
        <div className="countdown-label">Mins</div>
      </div>
      <div className="countdown-sep">:</div>
      <div className="countdown-unit">
        <div className="countdown-value">{String(timeLeft.seconds).padStart(2, "0")}</div>
        <div className="countdown-label">Secs</div>
      </div>
    </div>
  );
}
