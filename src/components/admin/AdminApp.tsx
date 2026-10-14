import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { AuthError, getUser, handleAuthCallback, login, logout } from "@netlify/identity";
import { calendarStaff, staffById, unassignedColour } from "@/data/calendar-staff";
import { type Booking, type BookingStatus } from "@/lib/booking-store";
import { deleteBooking } from "@/lib/delete-booking.functions";
import { listBookings } from "@/lib/list-bookings.functions";
import { saveBooking } from "@/lib/save-booking.functions";

type View = "day" | "week" | "month";
type StaffFilter = "all" | (typeof calendarStaff)[number]["id"];

const DAY_START = 8;
const DAY_END = 20;
const HOUR_HEIGHT = 52;

const emptyDraft = (date: Date) => ({
  id: undefined as number | undefined,
  clientName: "",
  phone: "",
  service: "",
  staffId: "",
  date: format(date, "yyyy-MM-dd"),
  time: "09:00",
  durationMinutes: 60,
  status: "confirmed" as BookingStatus,
  notes: "",
});

type Draft = ReturnType<typeof emptyDraft>;

function colourFor(staffId: string | null) {
  return staffById(staffId)?.colour ?? unassignedColour;
}

function useIsNarrow() {
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const apply = () => setNarrow(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  return narrow;
}

function rangeFor(cursor: Date, view: View) {
  if (view === "day") {
    const from = startOfDay(cursor);
    return { from, to: addDays(from, 1) };
  }
  if (view === "week") {
    const from = startOfWeek(cursor, { weekStartsOn: 1 });
    return { from, to: addDays(from, 7) };
  }
  const monthStart = startOfMonth(cursor);
  const from = startOfWeek(monthStart, { weekStartsOn: 1 });
  const to = addDays(endOfWeek(endOfMonth(cursor), { weekStartsOn: 1 }), 1);
  return { from, to };
}

export function AdminApp() {
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [preview, setPreview] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [view, setView] = useState<View>("week");
  const narrow = useIsNarrow();
  const viewChosen = useRef(false);
  const [cursor, setCursor] = useState(() => new Date());
  const [staff, setStaff] = useState<StaffFilter>("all");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadError, setLoadError] = useState("");
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);

  const signedIn = Boolean(email) || preview;

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        await handleAuthCallback();
        const user = await getUser();
        if (active && user?.email) setEmail(user.email);
      } catch {
        /* Identity is enabled on the deployed site. */
      } finally {
        if (active) setReady(true);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const load = useCallback(async () => {
    if (!signedIn) return;
    const { from, to } = rangeFor(cursor, view);
    try {
      const rows = await listBookings({
        data: { from: from.toISOString(), to: to.toISOString(), preview },
      });
      setBookings(rows);
      setLoadError("");
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : "Could not load bookings");
    }
  }, [cursor, preview, signedIn, view]);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    if (viewChosen.current || !narrow) return;
    setView("day");
  }, [narrow]);

  const chooseView = (next: View) => {
    viewChosen.current = true;
    setView(next);
  };

  const focusDay = (day: Date) => {
    viewChosen.current = true;
    setCursor(day);
    setView("day");
  };

  const visible = useMemo(
    () => bookings.filter((booking) => staff === "all" || booking.staffId === staff),
    [bookings, staff],
  );
  const unscheduled = visible.filter((booking) => !booking.startsAt);

  const signIn = async () => {
    setAuthError("");
    try {
      const user = await login(loginEmail.trim(), password);
      setEmail(user.email ?? loginEmail.trim());
      setPassword("");
    } catch (error) {
      setAuthError(error instanceof AuthError ? error.message : "Could not sign in");
    }
  };

  const signOut = async () => {
    setPreview(false);
    setEmail(null);
    try {
      await logout();
    } catch {
      /* already signed out */
    }
  };

  const openNew = (date: Date, time = "09:00") => {
    setDraft({ ...emptyDraft(date), time, staffId: staff === "all" ? "" : staff });
  };

  const openExisting = (booking: Booking) => {
    const when = booking.startsAt ? new Date(booking.startsAt) : new Date();
    setDraft({
      id: booking.id,
      clientName: booking.clientName,
      phone: booking.phone,
      service: booking.service,
      staffId: booking.staffId ?? "",
      date: format(when, "yyyy-MM-dd"),
      time: format(when, "HH:mm"),
      durationMinutes: booking.durationMinutes,
      status: booking.status,
      notes: booking.notes,
    });
  };

  const persist = async () => {
    if (!draft) return;
    setSaving(true);
    try {
      const startsAt = draft.date && draft.time ? new Date(`${draft.date}T${draft.time}`).toISOString() : null;
      await saveBooking({
        data: {
          ...(draft.id ? { id: draft.id } : {}),
          clientName: draft.clientName,
          phone: draft.phone,
          service: draft.service,
          staffId: draft.staffId || null,
          startsAt,
          durationMinutes: Number(draft.durationMinutes),
          status: draft.status,
          notes: draft.notes,
          preview,
        },
      });
      setDraft(null);
      await load();
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : "Could not save");
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!draft?.id) return;
    setSaving(true);
    try {
      await deleteBooking({ data: { id: draft.id, preview } });
      setDraft(null);
      await load();
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : "Could not delete");
    } finally {
      setSaving(false);
    }
  };

  if (!ready) {
    return <main className="grid min-h-screen place-items-center text-sm text-muted-foreground">Loading…</main>;
  }

  if (!signedIn) {
    return (
      <main className="grid min-h-screen place-items-center bg-background px-4">
        <form
          className="w-full max-w-sm rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
          onSubmit={(event) => {
            event.preventDefault();
            void signIn();
          }}
        >
          <p className="font-display text-3xl">Admin</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in with the email invited for your team login.
          </p>
          <label className="mt-5 block text-sm font-medium">
            Email
            <input
              type="email"
              required
              value={loginEmail}
              onChange={(event) => setLoginEmail(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-border px-4 py-3 text-sm"
            />
          </label>
          <label className="mt-4 block text-sm font-medium">
            Password
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-border px-4 py-3 text-sm"
            />
          </label>
          {authError ? <p className="mt-3 text-sm text-destructive">{authError}</p> : null}
          <button type="submit" className="book-now-cta mt-5 w-full rounded-full px-5 py-2.5 text-sm font-medium">
            Sign in
          </button>
          {import.meta.env.DEV ? (
            <button
              type="button"
              className="mt-3 w-full text-sm text-muted-foreground underline-offset-4 hover:underline"
              onClick={() => setPreview(true)}
            >
              Preview calendar on this computer
            </button>
          ) : null}
          <Link to="/" className="mt-4 block text-center text-sm text-primary">
            Back to the site
          </Link>
        </form>
      </main>
    );
  }

  const shift = (direction: number) => {
    setCursor((current) =>
      view === "month" ? addMonths(current, direction) : addDays(current, direction * (view === "week" ? 7 : 1)),
    );
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:flex-wrap sm:items-center sm:px-6">
          <div className="flex items-center gap-3">
            <div className="mr-auto min-w-0">
              <p className="font-display text-2xl leading-none">Admin</p>
              <p className="truncate text-xs text-muted-foreground">{preview ? "Local preview" : email}</p>
            </div>
            <button type="button" className="shrink-0 px-2 py-2 text-sm text-muted-foreground" onClick={() => void signOut()}>
              Sign out
            </button>
          </div>
          <div className="grid grid-cols-3 rounded-full border border-border p-1 text-sm sm:flex">
            {(["day", "week", "month"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => chooseView(item)}
                className={`min-h-11 rounded-full px-3 py-2 capitalize ${view === item ? "bg-primary text-primary-foreground" : ""}`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-[1fr_auto_1fr] gap-2 text-sm sm:flex sm:items-center">
            <button type="button" className="min-h-11 rounded-full border border-border px-3 py-2" onClick={() => shift(-1)}>
              Prev
            </button>
            <button type="button" className="min-h-11 rounded-full border border-border px-4 py-2" onClick={() => setCursor(new Date())}>
              Today
            </button>
            <button type="button" className="min-h-11 rounded-full border border-border px-3 py-2" onClick={() => shift(1)}>
              Next
            </button>
          </div>
          <button
            type="button"
            className="min-h-11 rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground sm:w-fit"
            onClick={() => openNew(cursor)}
          >
            New booking
          </button>
        </div>
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 pb-3 sm:px-6">
          <StaffTab active={staff === "all"} colour="#3f3a45" label="Admin" onClick={() => setStaff("all")} />
          {calendarStaff.map((member) => (
            <StaffTab
              key={member.id}
              active={staff === member.id}
              colour={member.colour}
              label={member.name}
              onClick={() => setStaff(member.id)}
            />
          ))}
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-5 sm:px-6 sm:py-6 lg:grid-cols-[1fr_16rem]">
        <aside className={`lg:order-last ${unscheduled.length === 0 ? "hidden lg:block" : ""}`}>
          <h2 className="font-display text-xl">To schedule</h2>
          <ul className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:block lg:space-y-2 lg:overflow-visible lg:pb-0">
            {unscheduled.length === 0 ? <li className="text-sm text-muted-foreground">None waiting.</li> : null}
            {unscheduled.map((booking) => (
              <li key={booking.id} className="min-w-[14rem] shrink-0 lg:min-w-0">
                <button type="button" className="w-full rounded-2xl border border-border bg-card p-3 text-left" onClick={() => openExisting(booking)}>
                  <span className="block text-sm font-medium">{booking.clientName}</span>
                  <span className="text-xs text-muted-foreground">{booking.service || "Enquiry"}</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>
        <section className="min-w-0">
          <h1 className="mb-4 font-display text-2xl sm:text-3xl">
            {view === "day" ? format(cursor, "EEEE d MMMM") : format(cursor, "MMMM yyyy")}
          </h1>
          {loadError ? <p className="mb-3 text-sm text-destructive">{loadError}</p> : null}
          {view === "month" ? (
            <MonthGrid
              cursor={cursor}
              bookings={visible}
              compact={narrow}
              onOpen={openExisting}
              onCreate={narrow ? focusDay : openNew}
            />
          ) : narrow && view === "week" ? (
            <WeekAgenda
              days={eachDayOfInterval({
                start: startOfWeek(cursor, { weekStartsOn: 1 }),
                end: endOfWeek(cursor, { weekStartsOn: 1 }),
              })}
              bookings={visible}
              onOpen={openExisting}
              onCreate={(day) => openNew(day)}
            />
          ) : (
            <TimeGrid
              days={
                view === "day"
                  ? [startOfDay(cursor)]
                  : eachDayOfInterval({
                      start: startOfWeek(cursor, { weekStartsOn: 1 }),
                      end: endOfWeek(cursor, { weekStartsOn: 1 }),
                    })
              }
              bookings={visible}
              onOpen={openExisting}
              onCreate={(day, hour) => openNew(day, `${String(hour).padStart(2, "0")}:00`)}
            />
          )}
        </section>
      </div>

      {draft ? (
        <BookingEditor
          draft={draft}
          saving={saving}
          onChange={setDraft}
          onClose={() => setDraft(null)}
          onSave={() => void persist()}
          onDelete={() => void remove()}
        />
      ) : null}
    </div>
  );
}

function StaffTab({
  label,
  colour,
  active,
  onClick,
}: {
  label: string;
  colour: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-sm ${active ? "border-foreground" : "border-border"}`}
    >
      <span className="h-2.5 w-2.5 rounded-full" style={{ background: colour }} />
      {label}
    </button>
  );
}

function TimeGrid({
  days,
  bookings,
  onOpen,
  onCreate,
}: {
  days: Date[];
  bookings: Booking[];
  onOpen: (booking: Booking) => void;
  onCreate: (day: Date, hour: number) => void;
}) {
  const singleDay = days.length === 1;
  const hours = Array.from({ length: DAY_END - DAY_START }, (_, index) => DAY_START + index);
  return (
    <div className="overflow-x-auto rounded-3xl border border-border bg-card">
      <div
        className={singleDay ? "grid" : "grid min-w-[720px]"}
        style={{ gridTemplateColumns: singleDay ? "3.25rem minmax(0, 1fr)" : `4rem repeat(${days.length}, minmax(0, 1fr))` }}
      >
        <div />
        {days.map((day) => (
          <div key={day.toISOString()} className="border-b border-border px-2 py-2 text-sm font-medium">
            {format(day, "EEE d")}
          </div>
        ))}
        <div>
          {hours.map((hour) => (
            <div key={hour} className="pr-2 text-right text-xs text-muted-foreground" style={{ height: HOUR_HEIGHT }}>
              {format(new Date(2020, 0, 1, hour), "h a")}
            </div>
          ))}
        </div>
        {days.map((day) => (
          <div key={day.toISOString()} className="relative border-l border-border" style={{ height: hours.length * HOUR_HEIGHT }}>
            {hours.map((hour) => (
              <button
                key={hour}
                type="button"
                className="block w-full border-b border-border/70"
                style={{ height: HOUR_HEIGHT }}
                onClick={() => onCreate(day, hour)}
                aria-label={`Add booking ${format(day, "EEEE")} ${hour}:00`}
              />
            ))}
            {bookings
              .filter((booking) => booking.startsAt && isSameDay(new Date(booking.startsAt), day))
              .map((booking) => {
                const start = new Date(booking.startsAt!);
                const minutes = start.getHours() * 60 + start.getMinutes() - DAY_START * 60;
                const top = (minutes / 60) * HOUR_HEIGHT;
                const height = Math.max(28, (booking.durationMinutes / 60) * HOUR_HEIGHT - 4);
                return (
                  <button
                    key={booking.id}
                    type="button"
                    onClick={() => onOpen(booking)}
                    className="absolute inset-x-1 overflow-hidden rounded-xl px-2 py-1 text-left text-xs text-white"
                    style={{ top, height, background: colourFor(booking.staffId) }}
                  >
                    <span className="block font-medium">{booking.clientName}</span>
                    <span className="opacity-90">{format(start, "h:mm a")}</span>
                  </button>
                );
              })}
          </div>
        ))}
      </div>
    </div>
  );
}

function WeekAgenda({
  days,
  bookings,
  onOpen,
  onCreate,
}: {
  days: Date[];
  bookings: Booking[];
  onOpen: (booking: Booking) => void;
  onCreate: (day: Date) => void;
}) {
  return (
    <div className="space-y-3">
      {days.map((day) => {
        const items = bookings
          .filter((booking) => booking.startsAt && isSameDay(new Date(booking.startsAt), day))
          .sort((a, b) => new Date(a.startsAt!).getTime() - new Date(b.startsAt!).getTime());
        return (
          <section key={day.toISOString()} className="rounded-3xl border border-border bg-card p-3">
            <div className="flex items-center justify-between gap-3 px-1">
              <h3 className="font-medium">{format(day, "EEEE d")}</h3>
              <button type="button" className="min-h-11 px-2 text-sm text-primary" onClick={() => onCreate(day)}>
                Add
              </button>
            </div>
            {items.length === 0 ? <p className="px-1 pb-2 text-sm text-muted-foreground">No bookings</p> : null}
            <ul className="space-y-2">
              {items.map((booking) => (
                <li key={booking.id}>
                  <button
                    type="button"
                    onClick={() => onOpen(booking)}
                    className="flex min-h-14 w-full items-center gap-3 rounded-2xl px-3 py-2 text-left text-white"
                    style={{ background: colourFor(booking.staffId) }}
                  >
                    <span className="w-16 shrink-0 text-sm">{format(new Date(booking.startsAt!), "h:mm a")}</span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium">{booking.clientName}</span>
                      <span className="block truncate text-xs opacity-90">{booking.service || "Booking"}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

function MonthGrid({
  cursor,
  bookings,
  compact,
  onOpen,
  onCreate,
}: {
  cursor: Date;
  bookings: Booking[];
  compact: boolean;
  onOpen: (booking: Booking) => void;
  onCreate: (day: Date) => void;
}) {
  const start = startOfWeek(startOfMonth(cursor), { weekStartsOn: 1 });
  const end = endOfWeek(endOfMonth(cursor), { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start, end });
  return (
    <div className="grid grid-cols-7 overflow-hidden rounded-3xl border border-border bg-card">
      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((label) => (
        <div key={label} className="border-b border-border px-1 py-2 text-center text-xs font-medium text-muted-foreground sm:px-2 sm:text-left">
          {compact ? label.slice(0, 1) : label}
        </div>
      ))}
      {days.map((day) => {
        const items = bookings.filter((booking) => booking.startsAt && isSameDay(new Date(booking.startsAt), day));
        return (
          <button
            key={day.toISOString()}
            type="button"
            onClick={() => onCreate(day)}
            className={`min-h-16 border-b border-r border-border p-1 text-left sm:min-h-28 sm:p-2 ${isSameMonth(day, cursor) ? "" : "opacity-40"}`}
          >
            <span className="text-sm">{format(day, "d")}</span>
            {compact ? (
              <span className="mt-1 flex flex-wrap gap-1">
                {items.slice(0, 3).map((booking) => (
                  <span
                    key={booking.id}
                    className="h-2 w-2 rounded-full"
                    style={{ background: colourFor(booking.staffId) }}
                  />
                ))}
              </span>
            ) : (
              <span className="mt-1 block space-y-1">
                {items.slice(0, 3).map((booking) => (
                  <span
                    key={booking.id}
                    className="block truncate rounded-md px-1 py-0.5 text-[11px] text-white"
                    style={{ background: colourFor(booking.staffId) }}
                    onClick={(event) => {
                      event.stopPropagation();
                      onOpen(booking);
                    }}
                  >
                    {booking.clientName}
                  </span>
                ))}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function BookingEditor({
  draft,
  saving,
  onChange,
  onClose,
  onSave,
  onDelete,
}: {
  draft: Draft;
  saving: boolean;
  onChange: (draft: Draft) => void;
  onClose: () => void;
  onSave: () => void;
  onDelete: () => void;
}) {
  const field = "mt-1 w-full rounded-2xl border border-border px-3 py-3 text-base sm:py-2 sm:text-sm";
  return (
    <div className="fixed inset-0 z-30 flex items-end bg-foreground/20 sm:grid sm:justify-end" onClick={onClose}>
      <form
        className="max-h-[92dvh] w-full overflow-y-auto rounded-t-3xl bg-card p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-xl sm:h-full sm:max-h-none sm:w-[min(100%,24rem)] sm:rounded-none sm:pb-5"
        onClick={(event) => event.stopPropagation()}
        onSubmit={(event) => {
          event.preventDefault();
          onSave();
        }}
      >
        <h2 className="font-display text-2xl">{draft.id ? "Edit booking" : "New booking"}</h2>
        <label className="mt-4 block text-sm font-medium">
          Client
          <input required className={field} value={draft.clientName} onChange={(event) => onChange({ ...draft, clientName: event.target.value })} />
        </label>
        <label className="mt-3 block text-sm font-medium">
          Phone
          <input className={field} value={draft.phone} onChange={(event) => onChange({ ...draft, phone: event.target.value })} />
        </label>
        <label className="mt-3 block text-sm font-medium">
          Service
          <input className={field} value={draft.service} onChange={(event) => onChange({ ...draft, service: event.target.value })} />
        </label>
        <label className="mt-3 block text-sm font-medium">
          Team member
          <select className={field} value={draft.staffId} onChange={(event) => onChange({ ...draft, staffId: event.target.value })}>
            <option value="">Unassigned</option>
            {calendarStaff.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </label>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <label className="text-sm font-medium">
            Date
            <input type="date" required className={field} value={draft.date} onChange={(event) => onChange({ ...draft, date: event.target.value })} />
          </label>
          <label className="text-sm font-medium">
            Start
            <input type="time" required className={field} value={draft.time} onChange={(event) => onChange({ ...draft, time: event.target.value })} />
          </label>
        </div>
        <label className="mt-3 block text-sm font-medium">
          Duration
          <select
            className={field}
            value={draft.durationMinutes}
            onChange={(event) => onChange({ ...draft, durationMinutes: Number(event.target.value) })}
          >
            {[30, 45, 60, 90, 120].map((minutes) => (
              <option key={minutes} value={minutes}>
                {minutes} minutes
              </option>
            ))}
          </select>
        </label>
        <label className="mt-3 block text-sm font-medium">
          Status
          <select
            className={field}
            value={draft.status}
            onChange={(event) => onChange({ ...draft, status: event.target.value as BookingStatus })}
          >
            <option value="requested">Requested</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </label>
        <label className="mt-3 block text-sm font-medium">
          Private notes
          <textarea className={field} rows={4} value={draft.notes} onChange={(event) => onChange({ ...draft, notes: event.target.value })} />
        </label>
        <div className="mt-5 flex flex-wrap gap-2">
          <button type="submit" disabled={saving} className="min-h-11 rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground">
            {saving ? "Saving…" : "Save"}
          </button>
          {draft.id ? (
            <button type="button" className="min-h-11 rounded-full border border-border px-4 py-2 text-sm" onClick={onDelete}>
              Delete
            </button>
          ) : null}
          <button type="button" className="ml-auto min-h-11 px-2 text-sm text-muted-foreground" onClick={onClose}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
}
