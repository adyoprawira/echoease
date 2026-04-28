# UQ Student Wellbeing Support Platform – MVP

## Project Overview

The UQ Student Wellbeing Support Platform is a community-first digital support system designed to reduce barriers preventing students from accessing help.

Instead of forcing students into formal counselling pathways immediately, this MVP creates a safer and lower-pressure first step through anonymous peer community support, with private support options available when needed.

The platform is accessed through a **Support Button integrated inside UQ Blackboard**, allowing students to seek support directly from a system they already use daily.

---

# Problem Statement

Although university wellbeing services already exist, many students do not use them.

Common barriers identified include:

| Problem | Description |
|--------|-------------|
| Low Awareness | Students are unaware of available support services |
| Hidden Access Points | Support is difficult to find across separate websites |
| Booking Friction | Appointments feel formal, stressful, and time-consuming |
| Emotional Pressure | Many students are not ready for immediate counselling |
| Isolation | Students often cope alone rather than seek help |

---

# Core MVP Solution

A **Support Button inside Blackboard** redirects students to a dedicated wellbeing platform built around progressive support.

## Support Journey

| Stage | Student Need | Feature |
|------|--------------|---------|
| 1 | I feel alone | Community Forum |
| 2 | I want advice | Anonymous Post / Peer Replies |
| 3 | I need deeper help | Private Chat |
| 4 | I need urgent support | Emergency Resources |

---

# Blackboard Integration

## Current Blackboard Navigation

| Home | Courses | Grades | Calendar |
|------|--------|--------|----------|

## Proposed Blackboard Navigation

| Home | Courses | Grades | Calendar | Support |
|------|--------|--------|----------|---------|

The Support button remains visible across all pages.

---

# MVP Website Structure

## Landing Page

### Header

**You Are Not Alone. Support Starts Here.**

### Main Options

| Option | Purpose |
|-------|---------|
| Read Student Experiences | Passive support and reassurance |
| Ask Anonymously | Community advice and connection |
| Talk Privately | One-to-one support |
| Urgent Help | Crisis resources |

---

# Primary Feature – Anonymous Community Forum

## Description

Students can safely engage with a moderated anonymous forum where they can:

- Read similar student experiences  
- Ask questions anonymously  
- Receive peer support  
- Feel less isolated  
- Engage without pressure  

This acts as the first support layer for students who may not be ready for direct counselling.

---

# Forum MVP Functions

| Feature | Included |
|--------|----------|
| Anonymous Posts | Yes |
| Anonymous Replies | Yes |
| Like / Support Reactions | Yes |
| Tags (Stress / Finance / Study) | Yes |
| Search Posts | Yes |
| Report Harmful Content | Yes |
| Moderator Review | Yes |

---

# Example Forum Posts

| Student Post | Community Reply |
|-------------|----------------|
| Feeling overwhelmed with deadlines | Same here, try breaking tasks into smaller goals |
| Struggling financially this semester | Have you checked student assistance grants? |
| Feeling lonely at university | Joining clubs helped me a lot |

---

# Secondary Feature – Private Support Chat

## Description

Students needing deeper or more personal support can transition into private chat.

This is available as a secondary pathway after community support or through direct access.

---

# Private Chat MVP Functions

| Feature | Included |
|--------|----------|
| Live Text Chat | Yes |
| Anonymous Nickname | Yes |
| Topic Selection | Yes |
| Queue System | Yes |
| Escalation to Staff | Yes |

---

# Chat Topics

| Topic |
|------|
| Stress |
| Anxiety |
| Academic Pressure |
| Financial Stress |
| Loneliness |
| Other |

---

# Emergency Support Layer

Students in urgent situations can immediately access crisis support.

| Resource | Example |
|---------|---------|
| Emergency Contact | 000 |
| Crisis Line | University / External Hotline |
| Immediate Help Page | Mental health emergency guide |

---

# Why Forum Is Primary

Research findings suggest many students are more comfortable reading or anonymously engaging before talking directly with staff.

| User Behaviour Insight | MVP Response |
|-----------------------|-------------|
| Students fear formal systems | Anonymous low-pressure forum |
| Students want relatable advice | Peer responses |
| Students feel less alone seeing others struggle | Shared experiences |
| Students avoid counselling first step | Community-first pathway |
| Students still need deeper support later | Private chat escalation |

---

# Functional Requirements

| ID | Requirement |
|----|------------|
| FR1 | User can access Support Button from Blackboard |
| FR2 | User can read forum posts |
| FR3 | User can create anonymous posts |
| FR4 | User can reply anonymously |
| FR5 | User can start private chat |
| FR6 | User can access urgent help resources |
| FR7 | Moderator can review reports |

---

# Non-Functional Requirements

| ID | Requirement |
|----|------------|
| NFR1 | Platform must feel safe and welcoming |
| NFR2 | Navigation must be simple and intuitive |
| NFR3 | Forum must protect anonymity |
| NFR4 | Platform must be mobile responsive |
| NFR5 | Fast loading and responsive performance |
| NFR6 | Secure data storage |

---

# MVP Tech Stack

| Layer | Tool |
|------|------|
| Frontend | React / Next.js |
| Backend | Firebase / Supabase |
| Database | Firestore / PostgreSQL |
| Authentication | Optional Guest Access |
| Hosting | Vercel |

---

# Prototype Screens

| Screen No | Name |
|----------|------|
| 1 | Blackboard Dashboard |
| 2 | Support Landing Page |
| 3 | Anonymous Forum |
| 4 | Create Post Modal |
| 5 | Private Chat |
| 6 | Emergency Help Page |
| 7 | Moderator Dashboard |

---

# Success Metrics

| Metric | Target |
|-------|-------|
| Blackboard Support Click Rate | High visibility |
| Forum Weekly Active Users | Growing engagement |
| Anonymous Posts Created | Regular activity |
| Transition to Private Chat | Students escalate when needed |
| Positive Feedback | Improved student trust |

---

# Future Improvements

| Version | Feature |
|--------|---------|
| V2 | AI moderation assistant |
| V2 | Mood check-ins |
| V2 | Smart triage chatbot |
| V3 | Native Blackboard embedded version |
| V3 | Peer volunteer mentor system |

---

# Value Proposition

| Student Need | MVP Solution |
|-------------|-------------|
| I need low-pressure help | Anonymous forum |
| I feel alone | Shared student experiences |
| I need private support | Direct chat pathway |
| I need urgent help | Crisis resources |
| I need easy access | Blackboard integration |

---

# Summary

This MVP rethinks student wellbeing support by recognising that many students need connection before counselling.

Rather than starting with formal appointments, the platform creates a safer first step through community support, anonymity, and easy access.

By integrating into Blackboard, support becomes visible, immediate, and part of everyday student life.