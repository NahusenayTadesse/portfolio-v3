/**
 * Long-form engineering notes.
 *
 * Kept in the repository rather than in Firestore: these are written once and
 * edited in a code review, unlike project records which are maintained from the
 * dashboard. Adding one means adding an entry here and deploying.
 */
export type Article = {
	slug: string;
	title: string;
	/** Used as the meta description and the card summary, so keep it under ~160 chars. */
	description: string;
	/** ISO date. Drives ordering and the published date in the JSON-LD. */
	date: string;
	readingMinutes: number;
	tags: string[];
	/** Article body as HTML, rendered inside a prose container. */
	body: string;
	/** Slugs of the case studies this article was written from; they link back to it. */
	projects?: string[];
};

export const articles: Article[] = [
	{
		slug: 'payroll-on-the-ethiopian-calendar',
		title: 'Payroll on the Ethiopian calendar',
		description:
			'Building a payroll and leave system on a 13-month calendar: why I did not write the date conversion, what the 5-day month breaks, and the ledger bug that only appears on the second save.',
		date: '2026-09-07',
		readingMinutes: 8,
		tags: ['SvelteKit', 'Payroll', 'Drizzle', 'MySQL', 'Ethiopian calendar'],
		projects: ['spotless-enterprise-erp'],
		body: `
<p class="lead">Most payroll systems assume twelve months of roughly equal length. Ethiopia has thirteen, and the last one is five days long. Here is what that actually costs you in a schema, and the parts I got wrong first.</p>

<h2>The shape of the problem</h2>

<p>The Ethiopian calendar has twelve months of exactly thirty days, then a thirteenth month called Pagume that holds the remainder of the solar year: five days, or six in a leap year. The new year falls on Meskerem 1, which is 11 September in the Gregorian calendar for most years. The year number runs seven or eight behind the Gregorian one depending on which side of that boundary you are on.</p>

<p>For a business system that matters in three separate places, and they fail differently:</p>

<ul>
<li><strong>Reporting periods.</strong> "This month" has to mean the Ethiopian month, because that is the month the client is invoiced for and the month staff are paid for.</li>
<li><strong>Payroll runs.</strong> A run belongs to a period. If the period is wrong, the run is wrong, and it is wrong in a way nobody notices until reconciliation.</li>
<li><strong>Display.</strong> Every date a user sees needs to be in the calendar they think in, while every date in the database stays a normal timestamp.</li>
</ul>

<h2>Do not write the conversion</h2>

<p>The first instinct is to write a converter. Resist it. Every runtime that ships an ICU build already has the Ethiopic calendar, and it has the leap year rules and the era handling correct in a way a hand-rolled version will not be after the first edge case.</p>

<pre><code>const parts = new Intl.DateTimeFormat('en-u-ca-ethiopic', {
  year: 'numeric',
  month: 'numeric'
}).formatToParts(date);</code></pre>

<p>That is the whole conversion. What is left is not the arithmetic, it is the two things the platform hands back in a shape you cannot use directly.</p>

<h3>The era rides along in the year</h3>

<p>Depending on the runtime, the year part comes back as <code>2019</code> or as <code>2019 ERA1</code> or with an <code>AM</code> suffix. Parsing that string with <code>Number()</code> gives you <code>NaN</code> on some machines and a number on others, which is the worst possible failure mode: it works on your laptop and breaks in production.</p>

<pre><code>const year = Number(
  parts.find((p) => p.type === 'year')?.value.replace(/\\D/g, '')
);</code></pre>

<p>Strip everything that is not a digit. It looks crude. It is the only version that behaves the same everywhere.</p>

<h3>Pagume must not exist</h3>

<p>This is the decision that took the longest to reach, and it is the one I would defend hardest.</p>

<p>Pagume is a real month. It is also five days long, and a five-day month destroys every per-month calculation in the system. A salary for Pagume is not a twelfth of anything. A monthly site invoice for Pagume is not a month of service. A leave accrual for Pagume is not a month of accrual. Treating it as month thirteen means every average, every projection and every comparison silently includes a period that is one sixth the size of its neighbours.</p>

<p>So the system clamps it:</p>

<pre><code>return { year, month: Math.min(month, 12) };</code></pre>

<p>Pagume is folded into the twelfth month. Those five days are still worked, still paid and still recorded, but they belong to Nehase for billing purposes. The alternative, a thirteenth period that is structurally unlike the other twelve, pushes a special case into every report in the system rather than containing it in one line.</p>

<p>The tests pin the boundary explicitly, because this is exactly the kind of rule that gets "simplified" by someone later:</p>

<pre><code>// 6-10 September 2026 is Pagume 1-5 of 2018. Nothing bills against it.
for (const day of ['06', '07', '08', '09', '10']) {
  expect(getEthiopianYearMonth(at(\`2026-09-\${day}\`)))
    .toEqual({ year: 2018, month: 12 });
}</code></pre>

<p>Those tests build their dates at noon UTC. A date at midnight is one timezone offset away from being the previous day, and on 10 September that is the difference between Pagume and Nehase. Test fixtures near a calendar boundary should never sit at midnight.</p>

<h2>Leave accrual is a grant table, not a number</h2>

<p>The obvious model for annual leave is a balance column on the employee. It is wrong, and it is wrong in a way that only shows up at the end of the first year.</p>

<p>Leave is earned in <em>grants</em>. An employee earns one on each employment anniversary, and how many days depends on how long they have served, read from entitlement brackets rather than hardcoded. Each grant carries its own expiry date, some number of years after it was issued. When that date passes the whole grant is voided and takes its unused days with it.</p>

<p>A single balance column cannot express any of that. It cannot tell you which days are about to expire, it cannot void a grant without guessing how many of the spent days came from it, and it cannot answer "how many days did this person lose last year" at all.</p>

<p>With grants as rows, one rule falls out for free: <strong>days are always spent oldest grant first</strong>. The days closest to expiring get used before newer ones, which is what an employee would choose if they were tracking it by hand, and it means expiry voids as few earned days as possible.</p>

<p>The accrual job does not run silently either. The same functions that commit a run also produce a preview, so an administrator sees exactly which grants would be issued and which would be voided before anything is written. A payroll system that changes balances without showing its working is a payroll system people stop trusting.</p>

<h2>The bug that only appears on the second save</h2>

<p>This is the part worth the whole article.</p>

<p>A leave request costs an employee's balance only while it is approved and only if its type draws on the balance. The naive implementation reacts to the action: on approve, subtract the days; on reject, add them back.</p>

<p>That version has two failures, and neither shows up in ordinary testing.</p>

<p><strong>Saving an approved leave again charges it twice.</strong> An administrator opens an approved leave, corrects a typo in the reason, saves. Status was approved before and is approved after, so nothing should move. The action-based code sees "approved" and subtracts the days a second time.</p>

<p><strong>Editing an approved leave leaks days.</strong> Someone changes an approved leave from five days to three, or switches it to a type that does not draw on the balance. The status never changes, so the action-based code does nothing at all, and two days sit permanently unaccounted for.</p>

<p>The fix is to stop modelling the action and model the state. The ledger is a pure function of what a leave <em>is</em>: its status, its type, its dates and its duration. Every change reads the cost before and the cost after and moves the balance by the difference.</p>

<pre><code>// Moves an employee's balance by the difference between two costs.
// A positive difference spends, a negative one refunds, and no
// difference touches nothing.
export async function settleLeaveCost(...)</code></pre>

<p>Re-saving an unchanged leave produces a difference of zero and is therefore free. Shortening an approved leave refunds exactly two days. Changing its type to a non-drawing one refunds all five. None of those needed a special case, because the difference calculation already covers them.</p>

<p>This is the general shape of the lesson, and it applies well beyond leave: <strong>when a value must stay consistent with a record, derive it from the record's state rather than from the events that changed it.</strong> Event-driven updates are correct only if you catch every event, and you will not.</p>

<h2>What I would keep</h2>

<p>Three things carried their weight, and I would do all three again on the next system:</p>

<ol>
<li><strong>One place where the calendar is decided.</strong> Every report, route and payroll run calls the same function. When the Pagume rule changed, it changed in one line rather than in nineteen report queries.</li>
<li><strong>Grants as rows, balances as derived.</strong> Any quantity that expires, or that anyone will one day ask a historical question about, wants to be a table.</li>
<li><strong>Unit tests on the arithmetic, not on the screens.</strong> The accrual, the ledger and the calendar boundary are tested directly. They are the parts where a bug is silent and expensive; the pages around them fail loudly and are cheap to check by hand.</li>
</ol>

<p>The calendar was the interesting part of this build, but it was not the hard part. The hard part was the ledger, and that would have been hard in any calendar.</p>
`
	}
];

export const getArticle = (slug: string): Article | undefined =>
	articles.find((a) => a.slug === slug);

export const sortedArticles = (): Article[] =>
	[...articles].sort((a, b) => b.date.localeCompare(a.date));
