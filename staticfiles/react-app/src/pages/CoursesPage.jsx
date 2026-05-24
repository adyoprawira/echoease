import { AlertCircle, ArrowRight, BookOpen, Search } from "lucide-react";

const courses = [
  {
    id: "ENGG1300",
    code: "ENGG1300",
    title: "Introduction to Electrical Systems",
    term: "Semester 1, 2024",
    image: "linear-gradient(135deg, #2c5aa0 0%, #1a3a5c 100%)",
    instructor: "JD",
    color: "#4a9fd8"
  },
  {
    id: "COMP3506",
    code: "COMP3506",
    title: "Algorithms & Data Structures",
    term: "Semester 1, 2024",
    image: "linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)",
    instructor: "AW",
    color: "#16c784"
  },
  {
    id: "PHIL1002",
    code: "PHIL1002",
    title: "Introduction to Philosophy",
    term: "Semester 1, 2024",
    image: "linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)",
    instructor: "SM",
    color: "#8b5cf6"
  }
];

const deadlines = [
  {
    id: 1,
    course: "ENGG1300: Lab Report 2",
    dueTime: "Due Tomorrow, 11:59 PM",
    icon: "alert",
    color: "#dc2626"
  },
  {
    id: 2,
    course: "COMP3506: Programming Assignment 1",
    dueTime: "Due Friday, 5:00 PM",
    icon: "file",
    color: "#06b6d4"
  }
];

function CoursesPage() {
  return (
    <section className="w-full max-w-6xl space-y-8">
      <div>
        <h1 className="text-3xl font-black text-ink md:text-4xl">Courses</h1>
        <p className="mt-1 text-slate-500">Current Terms</p>
      </div>

      <div className="flex items-center gap-3 rounded-lg border border-line bg-white px-4 py-2 shadow-sm">
        <Search size={18} className="text-slate-400" />
        <input
          type="search"
          placeholder="Search your courses"
          className="flex-1 border-0 bg-transparent py-1 outline-none placeholder:text-slate-400"
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <article
            key={course.id}
            className="group overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-line transition hover:shadow-lg"
          >
            <div
              className="h-32 w-full"
              style={{ background: course.image }}
              role="img"
              aria-label={`${course.code} course header`}
            />

            <div className="space-y-3 p-5">
              <div>
                <h2 className="text-lg font-black leading-tight text-ink">{course.title}</h2>
                <p className="mt-1 text-sm text-slate-500">{course.term}</p>
              </div>

              <div className="flex items-center justify-between">
                <span className="inline-grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                  {course.instructor}
                </span>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-sm font-bold text-brand transition hover:gap-2"
                >
                  View Course
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-black text-ink">Upcoming Deadlines</h2>

        <div className="space-y-3">
          {deadlines.map((deadline) => (
            <article
              key={deadline.id}
              className="flex items-center gap-4 rounded-lg border border-line bg-white p-4 shadow-sm transition hover:bg-paper"
            >
              <div
                className="grid h-12 w-1 flex-shrink-0 rounded-r-full"
                style={{ backgroundColor: deadline.color }}
              />

              <div className="flex flex-1 items-center gap-3 min-w-0">
                <div
                  className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full"
                  style={{ backgroundColor: `${deadline.color}20` }}
                >
                  {deadline.icon === "alert" ? (
                    <AlertCircle size={18} style={{ color: deadline.color }} />
                  ) : (
                    <BookOpen size={18} style={{ color: deadline.color }} />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-ink">{deadline.course}</p>
                  <p className="text-xs text-slate-500">{deadline.dueTime}</p>
                </div>
              </div>

              <ArrowRight size={16} className="flex-shrink-0 text-slate-300" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CoursesPage;
