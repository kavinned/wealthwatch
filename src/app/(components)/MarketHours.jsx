"use client";

import { useEffect, useState } from "react";

const MIN = 60 * 1000;
const DAY = 24 * 60 * MIN;

export const MARKETS = [
  {
    name: "New York",
    venue: "NYSE · Nasdaq",
    timeZone: "America/New_York",
    open: 9 * 60 + 30,
    close: 16 * 60,
  },
  {
    name: "London",
    venue: "LSE",
    timeZone: "Europe/London",
    open: 8 * 60,
    close: 16 * 60 + 30,
  },
  {
    name: "Tokyo",
    venue: "TSE",
    timeZone: "Asia/Tokyo",
    open: 9 * 60,
    close: 15 * 60,
  },
  {
    name: "Hong Kong",
    venue: "HKEX",
    timeZone: "Asia/Hong_Kong",
    open: 9 * 60 + 30,
    close: 16 * 60,
  },
  {
    name: "Frankfurt",
    venue: "XETRA",
    timeZone: "Europe/Berlin",
    open: 9 * 60,
    close: 17 * 60 + 30,
  },
];

const formatters = new Map();

function wallMs(date, timeZone) {
  let formatter = formatters.get(timeZone);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat("en-US", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    });
    formatters.set(timeZone, formatter);
  }
  const parts = {};
  for (const { type, value } of formatter.formatToParts(date)) parts[type] = value;
  return Date.UTC(
    +parts.year,
    +parts.month - 1,
    +parts.day,
    +parts.hour,
    +parts.minute,
    +parts.second,
  );
}

// Wall-clock time in a time zone -> real instant, robust across DST changes.
function instantFor(targetWallMs, timeZone, nowMs) {
  let instant = targetWallMs - (wallMs(new Date(nowMs), timeZone) - nowMs);
  for (let i = 0; i < 2; i++) {
    instant = targetWallMs - (wallMs(new Date(instant), timeZone) - instant);
  }
  return instant;
}

// ponytail: Mon–Fri fixed sessions; exchange holidays and lunch breaks ignored.
export function marketSession(nowMs, market) {
  const local = wallMs(new Date(nowMs), market.timeZone);
  const localDate = new Date(local);
  const weekday = localDate.getUTCDay();
  const minutes =
    localDate.getUTCHours() * 60 + localDate.getUTCMinutes();
  const dayStart =
    local -
    (localDate.getUTCHours() * 60 * MIN +
      localDate.getUTCMinutes() * MIN +
      localDate.getUTCSeconds() * 1000);
  const isWeekday = weekday >= 1 && weekday <= 5;

  if (isWeekday && minutes >= market.open && minutes < market.close) {
    const closes = instantFor(dayStart + market.close * MIN, market.timeZone, nowMs);
    return { openNow: true, opensIn: 0, closesIn: closes - nowMs };
  }

  let daysAhead = 0;
  if (!isWeekday) daysAhead = (8 - weekday) % 7;
  else if (minutes >= market.close) daysAhead = weekday === 5 ? 3 : 1;

  const opens = instantFor(
    dayStart + daysAhead * DAY + market.open * MIN,
    market.timeZone,
    nowMs,
  );
  return { openNow: false, opensIn: opens - nowMs, closesIn: 0 };
}

function formatDuration(ms) {
  const totalMinutes = Math.max(0, Math.round(ms / MIN));
  const days = Math.floor(totalMinutes / (24 * 60));
  const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
  const minutes = totalMinutes % 60;
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

const formatClock = (minutes) =>
  `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;

function tooltip(market, session) {
  const hours = `${formatClock(market.open)}–${formatClock(market.close)} exchange time`;
  if (session == null) return `${market.venue} · ${hours}`;
  if (session.openNow) {
    return `${market.venue} · ${hours} · Open, closes in ${formatDuration(session.closesIn)}`;
  }
  return `${market.venue} · ${hours} · Opens in ${formatDuration(session.opensIn)}`;
}

export default function MarketHours() {
  const [now, setNow] = useState(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    const timer = setTimeout(tick, 0);
    const interval = setInterval(tick, 30 * 1000);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="card-light p-4 md:p-5">
      <h5 className="text-base font-semibold text-ink">Markets</h5>
      <ul role="list" className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {MARKETS.map((market) => {
          const session = now == null ? null : marketSession(now, market);
          return (
            <li
              key={market.name}
              title={tooltip(market, session)}
              className="rounded-control bg-black/[0.03] px-3 py-2"
            >
              <p className="truncate text-sm font-semibold text-ink">
                {market.name}
              </p>
              <p className="truncate text-xs text-muted">{market.venue}</p>
              {session == null ? (
                <p className="mt-1 text-xs text-muted">—</p>
              ) : session.openNow ? (
                <p className="tabular mt-1 text-xs font-semibold text-emerald-700">
                  Open · closes in {formatDuration(session.closesIn)}
                </p>
              ) : (
                <p className="tabular mt-1 text-xs text-muted">
                  Opens in {formatDuration(session.opensIn)}
                </p>
              )}
            </li>
          );
        })}
      </ul>
      <p className="mt-2 text-[11px] text-muted">
        Local exchange time. Holidays and session breaks not shown.
      </p>
    </div>
  );
}
