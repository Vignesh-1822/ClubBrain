"""Fictional demo knowledge for the UW AI Club. Each row: (category, text, source, event, year)."""
from typing import List

from models.schemas import SeedItem

_ROWS = [
    # --- Top events ---
    ("event", "HuskyHacks 2025 was the club's biggest event: 287 attendees, theme \"AI for Social Good\", keynote by Dr. Elena Marchetti (fictional AI researcher). Feedback 4.6/5: attendees praised the mentors; main complaint was long registration lines.", "2025 Hackathon retro", "HuskyHacks 2025", "2025"),
    ("event", "AI Career Night 2025 drew 180 attendees with the theme \"From Campus to Copilot\". Highlight was an alumni panel; feedback 4.5/5, with students asking for more resume reviews.", "AI Career Night retro", "AI Career Night 2025", "2025"),
    ("event", "GenAI Workshop Series 2024 ran 4 sessions with ~120 average attendance (hands-on prompt engineering, RAG, agents). Feedback 4.4/5; attendees wanted laptops-ready setup guides sent in advance.", "GenAI Workshop retro", "GenAI Workshop Series 2024", "2024"),
    ("event", "Robotics x AI Demo Day 2024 had 150 attendees, theme \"Machines that Learn\", and received local news coverage (fictional Seattle Tech Weekly). Feedback 4.3/5; demo tables were the favorite part.", "Demo Day retro", "Robotics x AI Demo Day 2024", "2024"),
    ("event", "Founders Fireside 2025 had 95 attendees with the theme \"Build in Public\" and startup founder Kiran Desai (fictional) as guest. Intimate format scored 4.8/5, the club's highest feedback.", "Founders Fireside retro", "Founders Fireside 2025", "2025"),
    ("event", "Notable attendees across events (fictional): Dr. Elena Marchetti (HuskyHacks 2025 keynote), Kiran Desai (Founders Fireside guest), and a Seattle Tech Weekly reporter at Demo Day 2024.", "Events committee notes", "", "2025"),
    # --- Sponsors ---
    ("sponsor", "Google is the club's Gold sponsor at $10,000 for HuskyHacks 2025. Contact is through alumna Priya Nair; the request must be submitted 6-8 weeks ahead. Renewed for 2025 because the club delivered clear attendee metrics and a polished project showcase.", "Sponsorship committee notes", "HuskyHacks 2025", "2025"),
    ("sponsor", "Microsoft sponsors with an 8-week lead time and prefers student-impact metrics (projects shipped, first-time hackers, skills gained). Renewed in 2025 after the club sent a post-event impact report.", "Sponsorship committee notes", "", "2025"),
    ("sponsor", "Brewline Labs (fictional local startup) is the food and swag sponsor, covering snacks and T-shirts for 2024 and 2025 events. Renewed because the founders enjoyed meeting students and hiring interns.", "Sponsorship committee notes", "", "2025"),
    ("sponsor", "AWS provides cloud credits (about $5,000 in credits per hackathon) for participants. Renewed in 2025 because teams actually used the credits and the club reported usage numbers.", "Sponsorship committee notes", "HuskyHacks 2025", "2025"),
    # --- Alumni ---
    ("alumni", "Priya Nair ('23), PM at Google: warm intro that secured the Google Gold sponsorship in 2025. Best contact for Google asks.", "Alumni relations notes", "HuskyHacks 2025", "2025"),
    ("alumni", "Daniel Okafor ('22), Senior ML Engineer at Microsoft: judged HuskyHacks 2025 and introduced the club to Microsoft's university team.", "Alumni relations notes", "HuskyHacks 2025", "2025"),
    ("alumni", "Mei Lin Zhao ('21), Founder of Brewline Labs: brought in the local food and swag sponsorship and mentors at hackathons.", "Alumni relations notes", "", "2024"),
    ("alumni", "Jordan Lee ('25), now at an AWS partner firm: handled venue and permit logistics while a student and connected the club to the AWS credits program.", "Alumni relations notes", "", "2025"),
    ("alumni", "Arjun Mehta ('22), Data Scientist at Meta: speaks at AI Career Night alumni panels and runs resume reviews.", "Alumni relations notes", "AI Career Night 2025", "2025"),
    ("alumni", "Hannah Brooks ('24), Software Engineer at Amazon: mentored 5 hackathon teams at HuskyHacks 2025 and judged the GenAI Workshop final demos.", "Alumni relations notes", "HuskyHacks 2025", "2025"),
    # --- Pitches ---
    ("pitch", "The 2025 Google pitch won Gold sponsorship ($10k) thanks to an attendee demographics slide, last year's project showcase, and clear logo-placement tiers.", "Sponsorship pitch archive", "HuskyHacks 2025", "2025"),
    ("pitch", "The 2025 Microsoft pitch won sponsorship by leading with student-impact numbers (first-time hackers, projects shipped) and offering a recruiter session for attendees.", "Sponsorship pitch archive", "HuskyHacks 2025", "2025"),
    ("pitch", "The 2024 Brewline Labs pitch won food and swag sponsorship by offering founder office hours plus an intern recruiting table, a personal story rather than a formal deck.", "Sponsorship pitch archive", "", "2024"),
    ("pitch", "The 2024 pitch to a large fintech company failed: it was a generic deck with no attendee data, no tiers, and was sent only 3 weeks before the event.", "Sponsorship pitch archive", "", "2024"),
    # --- Rules ---
    ("rule", "Club rule: all sponsorships must be approved by the exec board and have a signed agreement before they are announced publicly.", "Club constitution", "", "2025"),
    ("rule", "Club rule: attendee verification is required at every event, with a student ID or .edu email check-in at the door.", "Club constitution", "", "2025"),
    ("rule", "Club rule: the code of conduct applies to all events and online spaces, and every participant must acknowledge it at registration.", "Club constitution", "", "2025"),
    ("rule", "Club rule: no alcohol at any club event, including sponsor-hosted socials.", "Club constitution", "", "2025"),
    ("rule", "Club rule: any spend above the approved event budget requires exec board approval before purchase; sponsors' funds are tracked by the treasurer.", "Club constitution", "", "2025"),
    # --- Warnings ---
    ("warning", "Avoid Memorial Union for events over 150 people: HuskyHacks 2025 (287 attendees) had severe registration congestion there.", "2025 Hackathon retro", "HuskyHacks 2025", "2025"),
    ("warning", "Avoid Spice Kitchen for catering: it arrived about 90 minutes late at a 2025 event.", "2025 Hackathon retro", "HuskyHacks 2025", "2025"),
    ("warning", "In 2024, unverified walk-ins at an event caused a capacity problem; always check attendees against the verified registration list.", "2024 Demo Day retro", "Robotics x AI Demo Day 2024", "2024"),
    ("warning", "In 2024, a 'sponsor' never paid because there was no signed agreement. Never count on sponsorship money without a signed contract.", "Sponsorship committee notes", "", "2024"),
    ("warning", "Do not announce sponsors before contracts are signed; an early 2024 announcement embarrassed the club when the deal fell through.", "Sponsorship committee notes", "", "2024"),
    # --- Lessons / decisions ---
    ("lesson", "Large events need multiple registration lines (at least 3 for 250+ attendees, split by last name) to avoid the congestion seen at HuskyHacks 2025.", "2025 Hackathon retro", "HuskyHacks 2025", "2025"),
    ("lesson", "Confirm catering 2 weeks before the event and again 2 days before.", "2025 Hackathon retro", "HuskyHacks 2025", "2025"),
    ("decision", "The club decided to start sponsor outreach 6-8 weeks before every major event.", "Sponsorship committee notes", "", "2025"),
    ("decision", "Green Leaf Catering is the club's preferred caterer: reliable and on time at 2024 and 2025 events.", "2025 Hackathon retro", "HuskyHacks 2025", "2025"),
    # --- People ---
    ("person", "Current leadership: Maya is the club President, Alex leads Sponsorship, Sarah leads Events, and Vignesh leads Engineering.", "Exec board roster", "", "2026"),
    ("person", "Alex, the current Sponsorship lead, managed the Google sponsorship relationship in 2025 together with alumna Priya Nair.", "Sponsorship committee notes", "HuskyHacks 2025", "2025"),
    ("person", "Jordan Lee (graduated '25) handled the 2025 venue booking and outdoor event permit. Ask Jordan for the venue contacts.", "2025 Hackathon retro", "HuskyHacks 2025", "2025"),
]

SEED_ITEMS: List[SeedItem] = [
    SeedItem(category=c, text=t, source=s, event=e, year=y) for c, t, s, e, y in _ROWS
]
