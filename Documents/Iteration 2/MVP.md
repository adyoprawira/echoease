# UQ Student Wellbeing Support Platform – MVP

## Project Overview

This MVP is a student wellbeing support platform designed to reduce barriers to accessing university support services. The system is integrated through a **Support Button inside UQ Blackboard**, allowing students to quickly access support without needing to search multiple university websites.

The platform focuses on three major student pain points:

- Low awareness of existing support services  
- High friction caused by booking systems and complicated processes  
- Preference for relatable, immediate, and low-pressure support options  

---

# Problem Statement

Many university students experience stress related to academics, finances, loneliness, or mental health. Although support services already exist, students often avoid using them because:

| Problem | Description |
|--------|-------------|
| Low Visibility | Students do not know where support services are located |
| Too Much Effort | Searching websites and booking appointments feels tiring |
| Formal Systems | Traditional counselling systems feel intimidating |
| Delayed Help | Slow responses reduce motivation to seek support |
| Isolation | Students often prefer coping alone |

---

# Proposed MVP Solution

A **Support Button inside Blackboard** redirects students to a dedicated wellbeing support website.

This website provides:

| Core Feature | Purpose |
|-------------|---------|
| Anonymous Forum | Students share experiences and support each other |
| Private Chat | Students talk directly with trained professionals |
| Quick Resources | Fast access to useful wellbeing information |
| Low-Friction Access | No complicated booking system |

---

# User Journey

| Step | User Action | Result |
|------|------------|--------|
| 1 | Student opens Blackboard | Notices Support Button |
| 2 | Clicks Support Button | Redirected to support platform |
| 3 | Selects support type | Forum / Chat / Resources |
| 4 | Receives support | Immediate assistance |

---

# Blackboard Integration

## Existing Blackboard Navigation

| Home | Courses | Grades | Calendar |
|------|--------|--------|----------|

## Proposed Blackboard Navigation

| Home | Courses | Grades | Calendar | Support |
|------|--------|--------|----------|---------|

The Support button should remain visible across all Blackboard pages.

---

# MVP Website Structure

## Landing Page

| Section | Content |
|--------|---------|
| Header | You Don’t Have To Deal With It Alone |
| Button 1 | Anonymous Forum |
| Button 2 | Private Chat Now |
| Button 3 | Quick Resources |

---

# Feature 1 – Anonymous Forum

## Description

Students can post publicly while remaining anonymous. Other students may reply anonymously as well.

## Example Use Cases

| Student Post | Peer Reply |
|-------------|-----------|
| Feeling overwhelmed with assignments lately | Same here, try splitting tasks smaller |
| Struggling financially this semester | Have you checked university emergency grants? |
| Feeling lonely on campus | Join clubs, helped me a lot |

## Forum MVP Functions

| Feature | Included |
|--------|----------|
| Anonymous Posting | Yes |
| Anonymous Replies | Yes |
| Reactions / Likes | Yes |
| Report Content | Yes |
| Moderator Review | Yes |

---

# Feature 2 – Private Chat With Professional

## Description

Students who need confidential help can start a private chat with trained staff.

## Chat Entry Form

| Field | Type |
|------|------|
| Nickname | Optional |
| Topic | Dropdown |
| Message | Text |

## Support Topics

| Topic Options |
|--------------|
| Stress |
| Anxiety |
| Financial Pressure |
| Academic Burnout |
| Loneliness |
| Other |

## Private Chat MVP Functions

| Feature | Included |
|--------|----------|
| Live Chat | Yes |
| Queue System | Yes |
| Anonymous Nickname | Yes |
| Crisis Escalation | Yes |

---

# Feature 3 – Quick Resources

Students can access helpful self-service resources immediately.

| Resource Type | Examples |
|--------------|----------|
| Mental Health | Stress management guides |
| Finance | Emergency support / budgeting |
| Academic Help | Extensions / study support |
| Emergency Help | Crisis contacts |

---

# Why This MVP Works

| Research Insight | MVP Response |
|-----------------|-------------|
| Students dislike booking systems | Instant access support |
| Students want anonymity | Anonymous forum and chat |
| Students prefer relatable support | Peer forum |
| Students trust experts for serious issues | Private professional chat |
| Students use Blackboard daily | Integrated support button |

---

# Functional Requirements

| ID | Requirement |
|----|------------|
| FR1 | User can click Support Button from Blackboard |
| FR2 | User can post anonymously in forum |
| FR3 | User can reply anonymously |
| FR4 | User can start private chat |
| FR5 | User can browse quick resources |
| FR6 | Moderator can review reports |

---

# Non-Functional Requirements

| ID | Requirement |
|----|------------|
| NFR1 | Platform must be simple and intuitive |
| NFR2 | Response time should feel fast |
| NFR3 | User anonymity must be protected |
| NFR4 | Mobile friendly design |
| NFR5 | Secure data handling |

---

# MVP Tech Stack

| Layer | Recommended Tool |
|------|------------------|
| Frontend | React / Next.js |
| Backend | Firebase / Supabase |
| Database | Firestore / PostgreSQL |
| Realtime Chat | Firebase Realtime DB |
| Hosting | Vercel |

---

# Prototype Screens

| Screen No | Screen Name |
|----------|------------|
| 1 | Blackboard Dashboard |
| 2 | Landing Page |
| 3 | Anonymous Forum |
| 4 | Private Chat |
| 5 | Resource Hub |
| 6 | Moderator Dashboard |

---

# Success Metrics

| Metric | Target |
|-------|-------|
| Support button click rate | 40%+ users notice |
| Forum usage | 20+ weekly posts |
| Chat requests | Growing weekly demand |
| User satisfaction | Positive feedback |
| Reduced access friction | Faster first contact |

---

# Future Improvements

| Version | New Feature |
|--------|------------|
| V2 | AI triage assistant |
| V2 | Mood tracking |
| V2 | Appointment booking |
| V2 | Push notifications |
| V3 | Blackboard native integration |

---

# Final Value Proposition

Students need wellbeing support that feels:

| Need | Delivered By MVP |
|-----|------------------|
| Fast | One-click access |
| Safe | Anonymous options |
| Human | Peer + professional help |
| Easy | Blackboard integration |
| Supportive | Community connection |

---

# Summary

This MVP transforms university wellbeing support from a hidden, formal, high-effort system into an accessible, student-friendly, low-pressure digital experience.

Instead of searching for help, students can receive support directly where they already study: Blackboard.