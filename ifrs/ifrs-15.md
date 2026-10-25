---
title: "IFRS 15 — Revenue from Contracts with Customers / الإيراد من العقود مع العملاء"
standard: "IFRS 15"
version: "As taught in BPP DipIFR Study Text 2025-26 (21st ed.), Ch 3"
effective_date: "Issued May 2014 (ST p.40). Effective date: exact source reference could not be verified from the uploaded document."
source: "Study Text Ch 3 (p.39-58); Kit Q2, Q3, Q4, Q9, Q15, Q33"
---

# Overview / نظرة عامة

```summary
# الفكرة في سطر واحد
الإيراد يُسجَّل عندما تنتقل **السيطرة** على السلعة أو الخدمة إلى العميل، وبالمبلغ الذي تتوقع المنشأة أن تستحقه. (ST p.40)
```

**Simple explanation.** You promised something to a customer. When you hand over control of it, you can record revenue. If the job takes months (a building), you record revenue as the work progresses.

**Technical explanation.** IFRS 15 sets one model for all contracts with customers. Its core principle is that revenue depicts the transfer of promised goods or services in an amount that reflects the consideration the entity expects to be entitled to. Transfer is judged by **control**: the ability to direct the use of the asset and obtain substantially all of its remaining benefits (ST p.40).

# Scope and key definitions / النطاق والتعريفات

IFRS 15 applies to all contracts with customers except (ST p.41, para. 5 as quoted):
- Leases (IFRS 16)
- Insurance contracts (IFRS 4)
- Financial instruments and other rights and obligations in the scope of IFRS 9, IFRS 10, IFRS 11, IAS 27 or IAS 28
- Non-monetary exchanges between entities in the same line of business

| Term | العربية | Meaning (own wording, from ST p.41) |
|---|---|---|
| Contract | عقد | Agreement between two or more parties that creates enforceable rights and obligations |
| Performance obligation | التزام أداء | Promise to transfer a distinct good or service (or a series of distinct, substantially the same goods or services) |
| Transaction price | سعر المعاملة | Amount the entity expects to be entitled to, excluding amounts collected for third parties (e.g. sales tax) |
| Stand-alone selling price | سعر البيع المنفرد | Price at which the entity would sell the good or service separately |
| Contract asset | أصل العقد | Right to consideration for goods/services already transferred, **conditional on something other than time** (e.g. future performance) |
| Receivable | ذمة مدينة | Right to consideration that is **unconditional**: only time must pass |
| Contract liability | التزام العقد | Obligation to transfer goods/services for which the entity has already received (or is due) consideration |

```tip
# Sales tax is not revenue
VAT and similar taxes collected only for third parties are not an economic benefit to the entity, so they are excluded from revenue. (ST p.41)
```

# The five-step model / نموذج الخطوات الخمس

```flow
Identify the contract :: Step 1
Identify the performance obligations :: Step 2
Determine the transaction price :: Step 3
Allocate the price to the obligations :: Step 4
Recognise revenue when (or as) each obligation is satisfied :: Step 5
```

```warn
# Exam point (ST p.42)
Do **not** just list the five steps unless the question asks for them. The examiner's report for June 2024 raised this again. Apply the steps to the facts instead.
```

## Step 1 — The contract (ST p.42, paras. 9-10)

A contract is within IFRS 15 only when all of these are met:
- The parties approved it and are committed to it
- Each party's rights over the goods/services can be identified
- Payment terms can be identified
- It has commercial substance
- Collection of the consideration is probable

It can be written, verbal or implied.

## Step 2 — Performance obligations (ST p.42-43)

A promised good or service is **distinct** if both are true:

```tree
Is it distinct?
  Y: Can the customer benefit from it on its own (or with resources readily available)?
    Y: Is the promise separately identifiable from the other promises in the contract?
      Y: **Separate performance obligation**
      N: Combine with the other promises (they form one combined output)
    N: Combine with other promises
```

```example
# Office Solutions and CommSoft (ST p.43)
Contract with Logisticity: (a) software licence, (b) installation (no customisation), (c) 3 years of technical support, (d) 3 years of updates.
Other companies can install and support CommSoft, and the software works without updates or support.
**Conclusion:** each item is distinct, so there are **four performance obligations**. The installation does not significantly modify the software, so it is a separate output, not an input to a combined one.
```

## Step 3 — Transaction price (ST p.43-44, paras. 47-72)

The price includes the **probability-weighted estimate of variable consideration** (discounts, rebates, refunds, price concessions, credits, penalties), the effect of customer credit risk, and the time value of money if material.

```keyterm
# The constraint on variable consideration
Variable amounts are included only where it is **highly probable** that there will not be a significant reversal of revenue when the uncertainty is resolved. (ST p.43)
```

### Example A — Volume discount (Taplop, ST p.43-44)

Price $500 per laptop, falling retrospectively to $450 if TrillCo buys more than 500 in the year.

```timeline
Quarter to 30 Sep 20X5 :: TrillCo bought 70 laptops. Taplop expects fewer than 500 in the year, so a reversal is not expected. Revenue = 70 x $500 = **$35,000**.
Quarter to 31 Dec 20X5 :: TrillCo buys 250 more and Taplop now expects to pass 500 units, so the price becomes $450 for all units.
Revenue in the quarter :: 250 x $450 = $112,500, less the $3,500 price cut on the first 70 units (70 x $50) = **$109,000**.
```

```bars
title: Revenue recognised by quarter (Taplop)
unit: $
Quarter to 30 Sep 20X5 | 35000
Quarter to 31 Dec 20X5 | 109000
```

```journal
# Quarter to 31 December 20X5 (prepared from ST figures)
Dr Trade receivables | 112,500
Cr Revenue | 109,000
Cr Refund liability / reduction of earlier receivable | 3,500
note: The $3,500 corrects revenue already recorded for the first 70 units. The exact account used for the reduction is a presentation choice; the revenue effect is the point.
```

### Example B — Significant financing component (Lansdale, ST p.44)

Product X sold on 31 Dec 20X7 for $12,100 payable 24 months after delivery. Cash price $10,000. Cost $8,000.

```flow
At delivery :: Revenue and receivable = **$10,000** (cash price)
Over 24 months :: Difference of $2,100 is **interest income**
Rate :: 12,100 / 10,000 = 1.21 = 1.10 x 1.10, so the effective rate is 10% a year (our calculation)
Presentation :: Interest income in the operating category (ST p.44)
```

```journal
# 31 December 20X7
Dr Trade receivable | 10,000
Cr Revenue | 10,000
```

```journal
# 31 December 20X7 (cost of the product)
Dr Cost of sales | 8,000
Cr Inventory | 8,000
```

```journal
# Years ended 31 December 20X8 and 20X9 (our calculation at 10%)
Dr Trade receivable (20X8) | 1,000
Cr Interest income | 1,000
note: 20X9: interest = (10,000 + 1,000) x 10% = 1,100. Total interest 1,000 + 1,100 = 2,100.
```

## Step 4 — Allocation (ST p.45)

Allocate the transaction price to each obligation **in proportion to stand-alone selling prices (SSPs)**. If not sold separately, estimate the SSP.

### Example C — Free handset (ST p.45)

Handset SSP $100. Two-year network contract at $20 a month = $480 total.

```split
title: Standalone selling prices (total $580)
Handset | 100
Network service (2 years) | 480
```

```split
title: Allocation of the $480 actually received
Handset (17%) = $82 | 82
Network service (83%) = $398 | 398
```

```timeline
Year 1 revenue :: Handset $82 + service $398 / 2 = $199, total **$281**
Year 2 revenue :: Service **$199**
Effect :: IFRS 15 moves $41 of revenue from Year 2 to Year 1 (under the old approach: $240 each year)
```

### Example D — Warranties (Premier Co, ST p.47)

Machine sold for $196,000 (its SSP). A standard one-year assurance warranty is included. As a new customer, an extra six-month warranty is given free; it normally sells for $4,000.

```split
title: Allocating $196,000 (total SSP $200,000)
Machine ($196,000 SSP) | 192080
Extended warranty ($4,000 SSP) | 3920
```

- Machine revenue **$192,080** at delivery, when control passes.
- Extended warranty **$3,920** recognised over the extra six months.
- The standard assurance warranty is **not** a performance obligation. It is a provision under IAS 37.

## Step 5 — When is the obligation satisfied? (ST p.45-46)

```tree
Do any of the over-time criteria apply?
  Y: **Recognise revenue OVER TIME** (measure progress, see below)
  N: **Recognise revenue at a POINT IN TIME** when the customer obtains control
```

**Over time if one of these is met** (ST p.45):
1. The customer simultaneously receives and consumes the benefit as the entity performs
2. The entity's work creates or enhances an asset the customer controls as it is built
3. The work creates no asset with an alternative use to the entity, **and** the entity has an enforceable right to payment for work done to date

**Point in time, indicators of control** (ST p.46): present right to payment; legal title; physical possession; risks and rewards transferred; customer acceptance.

**Measuring progress** (ST p.46):

| Method | Basis | Examples |
|---|---|---|
| Output methods | Value to the customer of what has been transferred | Surveys of work done, units produced or delivered |
| Input methods | The entity's inputs | Labour hours, costs incurred (costs must contribute to progress) |

If the outcome cannot be measured reliably early in a contract but costs will be recovered, recognise revenue only up to **costs incurred** (ST p.46).

# Contract costs / تكاليف العقد (ST p.46)

```tree
Is it a cost of obtaining the contract?
  Y: Incremental (would not exist if the contract were not won, e.g. sales commission)?
    Y: **Capitalise as an asset** if recoverable
    N: **Expense** as incurred (cost incurred anyway)
  N: Cost of fulfilling the contract. In the scope of IAS 2, IAS 16 or IAS 38?
    Y: Follow that standard
    N: Capitalise if it relates directly to a contract, creates/enhances resources for future performance, and is expected to be recovered
```

Capitalised costs are amortised consistently with the transfer of the related goods or services.

# Common types of transaction / أنواع معاملات شائعة (ST p.47-51)

## Principal or agent? (ST p.48)

```tree
Does the entity control the good/service before it goes to the customer?
  Y: **Principal**: revenue = gross amount
  N: **Agent**: revenue = fee or commission only
```

Indicators of a principal: primarily responsible for fulfilment; bears inventory risk; sets the price.

```example
# Fancy Goods Co (ST p.48)
Website where suppliers set prices and deliver directly. FG earns 5% commission and has no further obligation.
Supplier is responsible for fulfilment; FG holds no inventory; FG sets no prices. **FG is an agent.** Revenue = commission received.
```

## Repurchase agreements (ST p.48-49)

| Form | Customer obtains control? | Accounting |
|---|---|---|
| Forward (must repurchase) or call option (right to repurchase) | No | Repurchase price below original price: **lease** (IFRS 16). Equal or above: **financing** |
| Put option (customer can require repurchase) | Depends on incentive | Significant economic incentive to exercise: **lease**. No incentive and price below original: sale with right of return. Price at or above original and above expected market value: financing |

```example
# Call option, A Co (ST p.49)
Sells an asset for $1m on 1 Jan 20X7 with a right to repurchase for $1.1m by 31 Dec 20X7. Control is not transferred, so it is a **financing**: A Co keeps the asset, books a $1m financial liability and $0.1m interest. If the option lapses, A Co derecognises the asset and recognises revenue of **$1.1m**.
```

```journal
# 1 January 20X7 (prepared from ST figures)
Dr Cash | 1,000,000
Cr Financial liability | 1,000,000
```

```journal
# Over 20X7
Dr Interest expense | 100,000
Cr Financial liability | 100,000
```

```journal
# 31 December 20X7, option lapses
Dr Financial liability | 1,100,000
Cr Revenue | 1,100,000
note: A Co also derecognises the asset to cost of sales at its carrying amount, which the example does not give.
```

```example
# Put option (ST p.49)
Same sale, but A Co must repurchase at B Co's request for $900,000 while the expected market value is $750,000. B Co has a significant economic incentive to exercise, so control does not pass. A Co accounts for a **lease** (IFRS 16); the $100,000 difference is treated as lease payments received.
```

## Consignment (ST p.49-51)

Indicators that the dealer does **not** control the goods: manufacturer controls them until a trigger (e.g. sale on, time passes); manufacturer can demand them back; dealer has no unconditional obligation to pay.

```example
# Jameson Co and Rochester Diamonds (ST p.50-51)
Rochester keeps legal title and the right to change the price, unsold items go back after nine months, and Jameson pays only when items sell (deposit netted off).
**Consignment: Jameson does not include the jewellery in inventory.** Revenue for the manufacturer comes when Jameson sells to the end customer.
```

## Bill-and-hold (ST p.51)

The customer has control only if **all four** are met: the reason is substantive (e.g. customer asked); the goods are separately identified as the customer's; they are ready for transfer; the entity cannot use them or send them to someone else.

```example
# Machine and spare parts (ST p.51)
Customer pays on 31 Dec 20X9, takes the machine, and asks the entity to store the inspected, accepted spare parts. **Three performance obligations**: machine (point in time, 31 Dec 20X9), spare parts (point in time, same date) and **storage service (over time)**.
```

## Sale with right of return (ST p.51)

Do not recognise revenue for goods expected to be returned. Estimate by expected value or most likely amount. Show a **refund liability** and reduce revenue. Recognise an **asset** for the right to recover the goods, adjusted against cost of sales (para. B20).

## Warranties (ST p.47)

- Customer can buy the warranty separately, or it gives a service beyond assurance: **separate performance obligation**.
- Required by law or assurance only: **IAS 37**, not a performance obligation.

# Presentation / العرض (ST p.52)

```tree
Has the customer paid (or is payment due) before the entity performs?
  Y: **Contract liability**
  N: Has the entity performed but not yet been paid?
    Y: Is the right to payment conditional on more than the passage of time?
      Y: **Contract asset**
      N: **Receivable**
    N: Nothing to recognise yet
```

- Revenue invoiced: receivable. Revenue earned but not invoiced: contract asset.
- Contract assets and liabilities are presented separately, under current assets and current liabilities (ST p.53).
- Loss-making contracts are onerous contracts under IAS 37 (ST p.53).
- Interest income from a financing component sits in the operating category (ST p.44).
- The Study Text gives no detailed IFRS 15 disclosure list. Exact source reference could not be verified from the uploaded document.

# Calculations / الحسابات

**Over-time contract, input method (costs to costs):**

```flow
% complete :: Costs to date / (costs to date + estimated costs to complete)
Revenue :: % complete x total contract price
Cost of sales :: Costs incurred to date
Contract asset :: Revenue recognised - amounts invoiced (if positive)
Contract liability :: Amounts invoiced - revenue recognised (if positive)
```

## Example E — Tower block (ST p.52-53)

Price $1,500,000. Year 1: costs $600,000; certified 50% complete (output method); certificates $750,000; further costs $600,000.

```bars
title: Year 1 profit or loss ($)
Revenue | 750000
Cost of sales | -600000
Profit | 150000
```

```journal
# 31 December 20X5
Dr Contract asset | 750,000
Cr Revenue | 750,000
note: No amount is invoiced, so none is a receivable.
```

```journal
Dr Cost of sales | 600,000
Cr Cash / payables (costs incurred) | 600,000
```

## Example F — P Co (ST p.54)

Price $750m. Costs incurred $225m. Estimated costs to complete $340m. Invoiced and received $290m. Input method.

```flow
% complete :: 225 / (225 + 340) = 39.8%, rounded to 40% in the Study Text
Revenue :: 40% x $750m = $300m
Cost of sales :: $225m
Profit :: $75m
Contract asset :: $300m - $290m = $10m
```

## Example G — Santolina Co (ST p.55)

Building contract: total revenue $290,000, value of performance obligations satisfied to date $230,000, costs to date $210,450, amounts invoiced $210,000, cash received $194,000. Separately, bricks sold to the customer at a point in time: $14,000 on credit, cost $10,000.

```bars
title: Statement of profit or loss ($)
Revenue (230,000 + 14,000) | 244000
Cost of sales (210,450 + 10,000) | -220450
Gross profit | 23550
```

- Contract asset: $230,000 - $210,000 = **$20,000**
- Trade receivables: $210,000 - $194,000 + $14,000 = **$30,000**

# Past-exam style example (Kit Q2, Delta Dec 2019, answer Kit fp.93-94)

```example
# Exhibit 1, sale with right of return and deferred payment
1 April 20X7: product sold for $121,000 payable 30 June 20X9. Cost $80,000. Customer may return it until 30 June 20X7 (not returned). Cash price $100,000. Discount rate 10%.
- 1 April: no revenue, because variable consideration cannot be estimated. Move $80,000 from inventory to a **right-to-recover asset**.
- 30 June 20X7: uncertainty over returns ends. Recognise revenue of **$100,000** (present value of $121,000 in two years). Transfer $80,000 to cost of sales.
- Interest income for the year to 30 Sep 20X7: $100,000 x 10% x 3/12 = **$2,500** (operating category).
- Trade receivable at 30 Sep 20X7: **$102,500**.
```

```example
# Exhibit 2, machine plus three years of servicing
Contract price $7.5m. Machine stand-alone price $7m. Servicing costs $200,000 per six months, so $1.2m over 3 years, with a 20% margin: stand-alone price = 1.2 / 0.8 = **$1.5m**.
```

```split
title: Allocation of $7.5m
Machine (7 / 8.5) | 6176
Servicing (1.5 / 8.5) | 1324
```

- Machine revenue **$6.176m** on 1 April 20X7 (delivery).
- Servicing is recognised evenly over 36 months. Year to 30 Sep 20X7: 1.5/8.5 x 7.5m x 6/36 = **$221,000**.
- Deferred revenue at year end: 1.5/8.5 x 7.5m x 30/36 = **$1.103m**: current $0.441m (12/30), non-current $0.662m (18/30).

# Common mistakes / أخطاء شائعة

- Listing the five steps with no application (ST p.42, June 2024 examiner's report).
- Short answers: one well-explained point is worth about one mark, so match the points to the marks (ST p.41, June 2023 examiner's report).
- Forgetting that a contract with several distinct promises needs the price **allocated by SSP** (Kit Q2).
- Recognising revenue on consignment goods at delivery.
- Treating a legally required warranty as a separate performance obligation. It is IAS 37.
- Showing an agent's gross sales as revenue instead of the commission.
- Forgetting the financing component when payment is deferred well beyond 12 months (Kit fp.94).

# Exam focus / ما يتكرر في الامتحان

- June 2023 (15-mark requirement): a contract to construct and install complex machinery, a single performance obligation recognised over time (ST p.41).
- Kit questions that use IFRS 15: Q2 (answer fp.93-94), Q3 (fp.95), Q4 (fp.98), Q9 (fp.112), Q15 (fp.124), Q33 (fp.167), Mock 1 Q4, Mock 2 Q2.
- ACCA technical article "Revenue revisited" and a topic explainer video are on the DipIFR resources page (ST p.40). Not part of the uploaded files.

# Quick review / مراجعة سريعة

```summary
# Key rules
- Revenue = transfer of **control**, measured at the transaction price.
- Five steps: contract, obligations, price, allocation, satisfaction.
- Distinct goods or services = separate obligations. Allocate by **SSP**.
- Over time if: simultaneous benefit, customer-controlled asset, or no alternative use plus right to payment.
- Principal = gross revenue. Agent = commission.
- Call option or forward: no control transfer. Price at or above original = financing; below = lease.
- Consignment and bill-and-hold: decide who controls the goods.
- Contract asset = performance done, payment conditional. Receivable = unconditional. Contract liability = paid before performance.
```
