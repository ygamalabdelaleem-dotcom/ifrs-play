---
title: "IFRS 9 — Financial Instruments / الأدوات المالية"
standard: "IFRS 9"
version: "As taught in BPP DipIFR Study Text 2025-26 (21st ed.), Ch 10"
effective_date: "Mandatory for periods beginning on or after 1 January 2018 (ST p.189)"
source: "Study Text Ch 10 §1, §3-§5 (p.182-221); Kit Q17 (fp.130), Q18 (fp.133), Q23 (fp.144-146), Mock 1 Q1, Q4, Mock 2 Q2, Mock 3 Q3"
---

# Overview / نظرة عامة

```summary
# الفكرة في سطر واحد
IFRS 9 يجيب على 4 أسئلة: **متى** أسجّل الأداة المالية؟ **كيف أصنّفها**؟ **بكام أقيسها**؟ **متى أخفض قيمتها** (خسائر ائتمانية متوقعة)؟ مع محاسبة التحوّط كخيار. (ST p.182, p.189)
```

**Simple explanation.** A financial instrument is a contract that creates a financial asset for one side and a financial liability or equity for the other (a loan, a receivable, a share, a derivative). IFRS 9 says when it goes on the balance sheet, how it is measured afterwards (cost-like or fair value), and when we must record a loss because the other side may not pay.

**Technical explanation.** There are three standards: IAS 32 (liability vs equity, offsetting), IFRS 7 (disclosures, not examinable) and IFRS 9 (recognition, derecognition, measurement, impairment and general hedge accounting) (ST p.182). Classification of a financial asset depends on **both** the business model and the contractual cash flow test (ST p.194).

```flow
Recognise :: When the entity becomes a party to the contract (ST p.189)
Classify :: Business model + SPPI test (assets); amortised cost unless FVTPL (liabilities)
Measure :: Initial: fair value (+/- transaction costs). Later: amortised cost or fair value
Impair :: Expected credit losses for assets at amortised cost / FVOCI
Derecognise :: Rights expire, or risks and rewards pass (assets). Extinguished (liabilities)
```

# Definitions and derivatives / التعريفات والمشتقات

| Term | العربية | Meaning (own wording, ST p.183) |
|---|---|---|
| Financial instrument | أداة مالية | A contract giving a financial asset to one entity and a financial liability or equity to another |
| Financial asset | أصل مالي | Cash, an equity instrument of another entity, or a contractual right to receive cash or another financial asset |
| Financial liability | التزام مالي | A contractual obligation to deliver cash or another financial asset |
| Equity instrument | أداة حقوق ملكية | A residual interest in the assets after deducting all liabilities |
| Derivative | مشتقة | Value moves with an underlying, little or no initial investment, settled at a future date (all three) |

Not financial instruments (ST p.184): inventories, PPE, intangibles, prepaid expenses, deferred revenue and most warranties. They give goods or services, not cash.

```split
title: Examples of financial instruments (ST p.184)
Financial assets: receivables, options, shares held as investments | 50
Financial liabilities: payables, loan notes, redeemable preference shares, forward contract at a loss | 50
```

Derivatives (ST p.185): **forwards**, **futures**, **options**, **swaps**. A derivative is recognised at once even though it costs little or nothing, because the entity is already a party to the contract.

```tip
# Recognition is different from other standards
A financial instrument is recognised when you become a party to the contract. A forward contract to buy iron is a financial liability from the commitment date. A plain order for iron is **not**, until delivery. (ST p.189-190)
```

# Recognition and derecognition / الاعتراف وإلغاء الاعتراف

## Financial assets (ST p.190-193)

An asset is derecognised when:
- the contractual rights to the cash flows **expire**, or
- the entity **transfers** the asset or substantially all the risks and rewards of ownership.

```tree
Rights to cash flows expired?
  Y: **Derecognise**
  N: Transferred the rights (or assumed a pass-through obligation)?
    N: **Keep recognising**
    Y: Substantially all risks and rewards transferred?
      Y: **Derecognise**
      N: Substantially all risks and rewards retained?
        Y: **Keep recognising**
        N: Control retained?
          N: **Derecognise**
          Y: Recognise only to the extent of continuing involvement
```

| Transferred (derecognise) | Not transferred (keep) |
|---|---|
| Unconditional sale | Sale and repurchase at a fixed price or sale price plus lender's return |
| Sale plus option to repurchase at fair value | Sale plus a total return swap |
| | Sale of short-term receivables where the seller guarantees credit losses |
| | Stock lending (ST p.193) |

```journal
# Gain or loss on derecognition (ST p.191)
Dr Cash and any new asset received | consideration
Cr Financial asset | carrying amount
Cr/Dr Profit or loss (investing category) | difference
note: Carrying amount allocated to the part derecognised, less consideration received.
```

## Financial liabilities (ST p.193)

Derecognised when **extinguished**: paid, cancelled or expired. A **substantial modification** counts as extinguishment and a new liability: the discounted PV of the new cash flows (at the original EIR) differs by **at least 10%** from the PV of the remaining original cash flows.

### Example A — The 10% test (our own numbers)

Remaining original cash flows have a PV of $1,000,000. After renegotiation the new cash flows, discounted at the original EIR, have a PV of $880,000.

```bars
title: PV of the cash flows ($)
Original terms | 1000000
New terms | 880000
```

Difference = (1,000,000 - 880,000) / 1,000,000 = **12%**, which is at least 10%. So the old liability is extinguished and a new one is recognised at fair value. The difference goes to profit or loss (financing category, ST p.193).

# Classification of financial assets / تصنيف الأصول المالية

Two tests, both about the **asset** (ST p.194): the **business model** (how management actually manages it, at portfolio level) and the **contractual cash flow** test (solely payments of principal and interest, "SPPI").

```tree
Is it an equity investment?
  Y: Held for trading?
    Y: **FVTPL**
    N: Irrevocable election at initial recognition for FVOCI?
      Y: **FVOCI (equity)**: only dividends go to profit or loss
      N: **FVTPL**
  N: Contractual cash flows solely principal and interest?
    N: **FVTPL**
    Y: Business model?
      Collect only: **Amortised cost**
      Collect and sell: **FVOCI (debt)**
      Other: **FVTPL**
```

```keyterm
# Fair value option (ST p.195)
Even if the asset qualifies for amortised cost or FVOCI, it can be designated at FVTPL at initial recognition to remove an **accounting mismatch**. It is irrevocable.
```

```split
title: How the business model decides (ST p.195-198)
Collect cash flows (some sales allowed, e.g. credit-rating fall) | 50
Collect and sell (both integral, e.g. liquidity bank with frequent sales) | 50
```

- **Collect only** (ST p.195): A Co holds investments to collect cash flows but sells if the credit rating falls or to fund capex. Occasional sales do not change the objective. If sales become frequent, reconsider.
- **Collect only** (ST p.196): C Co buys loan portfolios, some already credit-impaired, and chases collection. Using swaps to fix the rate does not change the model.
- **Collect and sell** (ST p.197-198): F Bank holds assets for liquidity needs and sells often and significantly to reinvest. Both collecting and selling are integral.

**SPPI (ST p.196-197).** Interest means time value of money plus credit risk. Pass: fixed, floating, capped floating, or linked to an unleveraged inflation index. **Fail:** a convertible loan (conversion option), or an inverse floating rate (8% minus LIBOR).

## Reclassification (ST p.199)

Only when the **business model changes**, and prospectively. Not allowed for: a change of intention for particular assets, a temporary market disappearance, or a transfer between parts of the entity with different models. Liabilities are never reclassified. Moving from amortised cost to fair value: the gain or loss goes to profit or loss. Moving from fair value to amortised cost: fair value becomes the new carrying amount.

# Classification of financial liabilities / تصنيف الالتزامات المالية

All liabilities are at **amortised cost**, except (ST p.198): held for trading, derivatives (not designated hedging instruments), liabilities from failed derecognition, and financial guarantees or below-market loan commitments. A liability can be designated at FVTPL to remove an accounting mismatch.

```warn
# Credit risk on liabilities at FVTPL (ST p.207)
When a liability is designated at FVTPL, the part of the fair value change due to the entity's **own credit risk** goes to **OCI**. The rest goes to profit or loss. Exception: if this creates or enlarges an accounting mismatch, everything goes to profit or loss.
```

# Measurement / القياس

```keyterm
# Amortised cost (ST p.200)
Initial amount, minus principal repaid, plus or minus the cumulative amortisation (effective interest method) of the difference to the maturity amount, and for assets adjusted for the loss allowance.
```

**Initial measurement (ST p.200, p.204).** Fair value. **Add** transaction costs for assets at amortised cost or FVOCI. **Deduct** transaction costs for liabilities at amortised cost. For FVTPL items, transaction costs are **expensed**.

```split
title: Transaction costs: where do they go?
Amortised cost / FVOCI asset: added to cost | 50
FVTPL asset: expensed immediately | 50
```

## Example B — Asset at amortised cost (Abacus, ST p.201)

Debt instrument bought 1 Jan 20X1 for $1,000. Principal $1,250, fixed interest 4.72% (= $59 a year), matures 31 Dec 20X5. Effective interest rate 10%.

| Year | Opening | Interest income at 10% | Cash received | Closing |
|---|---|---|---|---|
| 20X1 | 1,000 | 100 | (59) | 1,041 |
| 20X2 | 1,041 | 104 | (59) | 1,086 |
| 20X3 | 1,086 | 109 | (59) | 1,136 |
| 20X4 | 1,136 | 113 | (59) | 1,190 |
| 20X5 | 1,190 | 119 | (1,309) | 0 |

```bars
title: Carrying amount at year end ($)
20X1 | 1041
20X2 | 1086
20X3 | 1136
20X4 | 1190
```

```journal
# 20X1
Dr Cash | 59
Dr Financial asset (unwinding the discount) | 41
Cr Interest income (investing category) | 100
note: Income is EIR x opening carrying amount. The cash is the coupon. The difference increases the asset.
```

## Example C — Liability at amortised cost (Galaxy, ST p.204)

Deep discount bond issued 1 Jan 20X2 for $503,778, no interest, redeemed 31 Dec 20X4 for $600,000. EIR 6%.

```timeline
31 Dec 20X2 :: 503,778 x 6% = **30,226** finance cost. Carrying amount **534,004** (ST figures).
31 Dec 20X3 :: 534,004 x 6% = about 32,040. Carrying amount about 566,044 (our derivation).
31 Dec 20X4 :: about 33,963 finance cost, which brings the liability to $600,000 (small difference is rounding).
```

```journal
# 31 December 20X2
Dr Finance cost (financing category) | 30,226
Cr Bond liability | 30,226
note: There is no cash interest, so the whole cost increases the liability.
```

### Example D — Issue costs (Dazzle, ST p.205)

$600,000 loan notes, issue costs $200, no interest, redeemed 31 Dec 20X4 at a premium of $152,389. EIR 12%. Opening liability is **net proceeds $599,800**.

```bars
title: Liability at year end ($)
Start | 599800
31 Dec 20X3 | 671776
31 Dec 20X4 | 752389
```

Finance cost 20X3 = 599,800 x 12% = **71,976**. Finance cost 20X4 = 671,776 x 12% = **80,613**. Total cost over the life = premium + issue costs (here 152,389 + 200).

## Example E — Equity shares: FVTPL or FVOCI? (Wolf, ST p.202-203)

Wolf buys 10 million $1 shares in Hall at $5. Transaction costs $3m. At year end the price is $6.50. Dividend received: $0.20 per share ($2m).

```bars
title: Wolf, shares held for trading: items in profit or loss ($m)
Fair value gain (65 - 50) | 15
Dividend income | 2
Transaction costs (expense, deducted) | 3
```

| | (i) Trading (FVTPL) | (ii) FVOCI election |
|---|---|---|
| Initial carrying amount | 50 | **53** (50 + 3 costs) |
| Year end carrying amount | 65 | 65 |
| Profit or loss | +15 +2 -3 | +2 dividend only |
| OCI | none | **+12** (65 - 53) |

```trap
# Common trap
Transaction costs are **capitalised** only when the asset is **not** at FVTPL. If the election is for FVOCI, the costs go into the carrying amount and the gain in OCI is measured from that higher figure. Dividends are income either way. (ST p.203, Kit fp.130)
```

## Example F — Kit Q17: Gamma, shares in a key supplier (Kit fp.130)

200,000 shares in entity A, bought 1 Oct 20X6 at a fair value of $2.40 each ($480,000). Broker fee 2%, so Gamma paid $489,600. Year end fair value $2.70. Dividend $50,000 ($0.25 per share). Not held for trading.

```timeline
Initial :: Fair value $480,000. The $9,600 above fair value is a transaction cost, **expensed** (investing category) under the default FVTPL treatment.
Year end :: Fair value 200,000 x $2.70 = **$540,000**. Gain **$60,000** to profit or loss. Selling costs are not part of fair value.
Dividend :: $50,000 income in the investing category.
If FVOCI election :: Initial carrying amount **$489,600**. OCI gain = 540,000 - 489,600 = **$50,400**. Dividend still in profit or loss.
```

## Example G — Kit Q18: Delta, option then shares (Kit fp.133)

Delta paid $250,000 for an option on shares in Epsilon. On exercise (31 Dec 20X4) it paid $2m for 1m shares worth $2.60 each. Acquisition costs $100,000. Year end fair value $2.90 each. The shares are a trading portfolio.

```flow
Option :: A derivative: FVTPL, derecognised on exercise
Shares at exercise :: Fair value 1m x $2.60 = **$2.6m**
Income :: 2.6m - (2m + 250,000) = **$350,000** investment income (investing category)
Costs :: **$100,000** expensed (FVTPL)
Year end :: Fair value $2.9m, further gain **$300,000** (investing category)
```

# Impairment: expected credit losses / الانخفاض: الخسائر الائتمانية المتوقعة

Forward-looking model (ST p.208). It applies to assets at **amortised cost**, mandatory **FVOCI** debt, lease receivables, **contract assets**, loan commitments and financial guarantees. It does **not** apply to FVTPL assets (the fair value already reflects the loss) (ST p.209).

```tree
Where is the asset on the credit curve?
  Credit risk NOT significantly increased since initial recognition?
    Y: **Stage 1**: 12-month ECL. Interest on the gross carrying amount.
    N: Objective evidence of impairment?
      N: **Stage 2**: lifetime ECL. Interest on the gross carrying amount.
      Y: **Stage 3**: lifetime ECL. Interest on carrying amount **net** of the allowance.
```

```keyterm
# 12-month ECL (ST p.209)
The probability of default in the next 12 months multiplied by the **total** lifetime loss that would result from that default. It is **not** the cash shortfall expected in the next 12 months.
```

- There is a **rebuttable presumption** of a significant increase in credit risk at **30 days past due** (ST p.210).
- Low credit risk (investment grade) assets do not need lifetime ECL (ST p.210).
- Stage 1 to 2 and back: if credit quality improves, the 12-month basis is reinstated (ST p.209).
- Measure as a **probability-weighted** outcome, **discounted**, using reasonable and supportable information (ST p.211).
- Presentation: credit losses are in the **operating** category for a bank or for trade and lease receivables; for other entities lending is in the **investing** category (ST p.213).

## Example H — Three stages in one loan (Orange, ST p.209-210)

Three-year loan of $2m to Lemon on 1 July 20X4.

| Date | 12-month default risk | Lifetime risk | Loss given default | Allowance | Stage |
|---|---|---|---|---|---|
| 1 Jul 20X4 | 2% | 5.5% | 800,000 | 2% x 800,000 = **16,000** | 1 |
| 31 Dec 20X4 | 3.5% | 10.5% | 750,000 | (3.5% + 10.5%) x 750,000 = **105,000** | 2 |
| 31 Dec 20X5 | 1.5% | 1% | 450,000 | 1.5% x 450,000 = **6,750** | back to 1 |

```bars
title: Loss allowance ($)
1 Jul 20X4 | 16000
31 Dec 20X4 | 105000
31 Dec 20X5 | 6750
```

Total default risk went from 7.5% to 14% (a significant increase), then fell to 2.5% (a significant improvement).

## Example I — Trade receivable with a provision matrix (Kredco, ST p.213-214)

Kredco sells to Detco on 1 June 20X4 for $200,000, 60 days credit. Matrix rates used here: not overdue 1%, 1-30 days overdue 5% (higher bands also exist; the text extract of the last band is unclear, so it is not used). Allowance at 1 June = $200,000 x 1% = **$2,000**. By 31 July Detco has used up its credit period and moves to the 5% band.

```journal
# 1 June 20X4
Dr Trade receivables | 200,000
Cr Revenue | 200,000
Dr Expected credit losses (operating) | 2,000
Cr Allowance for receivables | 2,000
```

```journal
# 31 July 20X4
Dr Expected credit losses (operating) | 8,000
Cr Allowance for receivables | 8,000
note: Required allowance 200,000 x 5% = 10,000, less 2,000 already held. Good news from Detco's finance controller does not stop the matrix moving.
```

```warn
# Exam point
The simplified approach (lifetime ECL from day one) applies to trade receivables with no significant financing component. It is also an option for others and for lease receivables (ST p.213).
```

## Example J — Redblack provision matrix (ST p.214-215)

At 30 June 20X5 trade receivables are $68m. The matrix:

| Band | Carrying amount $'000 | Rate | Allowance $'000 |
|---|---|---|---|
| Current | 32,000 | 0.5% | 160 |
| 1-30 days | 16,000 | 1.8% | 288 |
| 31-60 days | 10,000 | 3.8% | 380 |
| 61-90 days | 7,000 | 7% | 490 |
| Over 90 days | 3,000 | 11% | 330 |
| **Total** | 68,000 | | **1,648** |

The allowance at 30 June 20X4 was $1,160,000, so the increase is **$488,000**.

```journal
# 30 June 20X5
Dr Expected credit losses (operating) | 488,000
Cr Allowance for receivables | 488,000
```

## Example K — Undrawn overdraft facilities (Debita, ST p.212)

Total approved facilities $10m, undrawn. $8m has no significant increase in credit risk, of which $4m is expected to be drawn within 12 months, default probability 3%. On $2m the credit quality has deteriorated and $2m is expected to be drawn over the life, probability 10%.

```split
title: Additional allowance on undrawn facilities ($)
Stage 1: 4m x 3% | 120000
Stage 2: 2m x 10% | 200000
```

Total allowance **$320,000**. Only the portion expected to be drawn is used.

# Hedge accounting / محاسبة التحوّط

Optional (ST p.216). The idea: put the gain and loss on the hedged item and the hedging instrument in the **same period**, so only the net effect hits profit.

```flow
Hedged item :: Asset, liability, firm commitment or forecast transaction exposed to risk
Hedging instrument :: Usually a derivative (a non-derivative only for foreign currency risk)
Conditions :: Eligible items, formal documentation at inception, economic relationship, credit risk does not dominate, correct hedge ratio (ST p.217)
Types examinable :: **Fair value hedge** and **cash flow hedge**. Net investment hedge is not examinable.
```

```split
title: Where the gains and losses go
Fair value hedge: instrument to profit or loss, item adjusted and to profit or loss | 50
Cash flow hedge: effective part to OCI (reserve), excess to profit or loss | 50
```

## Example L — Oil inventory and a futures contract (ST p.217-219)

20,000 gallons of oil cost $400,000. Futures contract to deliver at $22 a gallon on 31 March 20X4. At 31 Dec 20X3 spot is $23 and the futures price is $24.

- Without hedge accounting: loss on the futures 20,000 x (24 - 22) = **$40,000** in profit or loss. Inventory stays at cost.
- With hedge accounting (fair value hedge): inventory re-measured to 20,000 x 23 = $460,000, gain **$60,000**. Net effect: gain **$20,000** instead of a loss of $40,000 (ST p.218-219).

```journal
# With hedge accounting, 31 December 20X3
Dr Profit or loss | 40,000
Cr Financial liability (futures) | 40,000
Dr Inventory | 60,000
Cr Profit or loss | 60,000
```

## Example M — Jules fair value hedge (ST p.219-220)

10,000 ounces cost $200 each ($2m). Sold forward at $210 for 30 June 20X7. At 31 Dec 20X6: fair value $220, futures price $227. At 30 June 20X7 spot is $230 and the position is closed.

```timeline
31 Dec 20X6 :: Inventory gain 10,000 x (220-200) = **200,000**. Futures liability up 10,000 x (227-210) = **170,000**.
30 June 20X7 :: Further inventory gain 10,000 x (230-220) = **100,000**. Further futures loss 10,000 x (230-227) = **30,000**.
Sale :: Revenue 2,300,000, cost of sales 2,300,000 (inventory is now 2,300,000). Cash paid to close the futures **200,000**.
Result :: Profit on the whole transaction is only **$100,000**. Without the forward it would have been $300,000.
```

```bars
title: Gains and losses over the two periods ($)
Inventory gain | 300000
Futures loss | 200000
```

## Example N — Kit Q23: cash flow hedge of a firm commitment (Gamma, Kit fp.144-146)

Gamma agrees on 1 January 20X4 to buy a machine from a foreign supplier. It buys a forward to hedge the currency (100% effective). Delivery 30 June 20X4. The forward is a financial asset worth $60,000 at 31 March 20X4, $160,000 at 30 June and $360,000 at 31 July when it is settled.

```timeline
Before delivery :: The firm commitment is a non-onerous executory contract: **no liability** until delivery (IAS 37).
31 Mar 20X4 :: Forward gain **$60,000** to OCI (cash flow hedge reserve), not profit or loss.
30 Jun 20X4 :: Machine recognised at the spot rate: 14.4m / 9 = **$1.6m**. Further gain of **$100,000** to OCI. The cumulative reserve of **$160,000** is moved straight into the machine: carrying amount **$1.44m**.
31 Jul 20X4 :: Forward settles for $360,000 (a further $200,000 gain). Payable settled for 14.4m / 8 = $1.8m, so an **exchange loss of $200,000**, and the earlier OCI gain of $200,000 is reclassified to profit or loss.
Depreciation :: $1.44m x 1/5 x 9/12 = **$216,000** for the year to 31 March 20X5.
```

```journal
# 30 June 20X4: transfer of the reserve to the asset
Dr Cash flow hedge reserve | 160,000
Cr Property, plant and equipment | 160,000
note: This transfer is not in OCI. It is a reclassification of the amount into the asset's initial cost (IFRS 9 para. 6.5.11, ST p.220).
```

```warn
# Why examiners reported low marks (Kit fp.144)
Candidates recognised the machine too early (at the commitment date), did not explain why the commitment is not recognised, and forgot that the reserve goes into the asset cost, not through OCI again.
```

# Common mistakes / أخطاء شائعة

- Choosing the classification by management's **intention for one asset** instead of the portfolio business model (ST p.194, p.199).
- Treating the equity FVOCI election as available **for debt** (it is not, and for debt FVOCI is mandatory if the test is met) (ST p.195).
- Forgetting that **transaction costs are expensed** at FVTPL but **capitalised** otherwise (ST p.203, Kit fp.130, fp.133).
- Using 12-month ECL for a loan after a **significant increase** in credit risk (ST p.209).
- Calculating the 12-month ECL as the expected cash shortfall in 12 months. It is probability of default in 12 months x lifetime loss.
- Applying the amortised-cost interest to the **closing** balance instead of the **opening** balance.
- Recognising the **firm commitment** itself in a cash flow hedge (Kit fp.144).
- Applying ECL to FVTPL assets, which do not need it.
- Reclassifying liabilities (never allowed) or reclassifying assets without a change in business model.

# Exam focus / ما يتكرر في الامتحان

- June 2024: 10 marks on measurement of financial assets and the meaning of fair value, in answers to a trainee's questions. The examiner noted confusion between assets and liabilities and few references to IFRS 13 (ST p.204).
- September 2020: a cash flow hedge of a future firm commitment, Question 2. Answers were generally unsatisfactory because candidates did not explain the effect of hedge accounting (ST p.219, Kit Q23).
- IFRS 9 often appears inside a larger scenario question, so expect calculations (ST p.182).
- Kit questions: Q7, Q12, Q17, Q18, Q21, Q23, Q46, Mock 1 Q1 and Q4, Mock 2 Q2, Mock 3 Q3. Only Q17, Q18 and Q23 were read in detail for this page; the others are not summarised here.
- IFRS 7 disclosures are not tested (ST p.223).

# Quick review / مراجعة سريعة

```summary
# Key rules
- Recognise when you become **party to the contract** (derivatives too).
- Derecognise an asset on expiry of cash flows or transfer of **substantially all risks and rewards**. A liability when extinguished; **10% test** for modifications.
- Debt asset: SPPI + business model = **amortised cost** (collect), **FVOCI** (collect and sell), else **FVTPL**.
- Equity: always fair value. Not for trading: irrevocable **FVOCI** election, dividends in profit or loss.
- Liabilities: amortised cost, except FVTPL (held for trading, derivatives, designated). Own credit risk to **OCI**.
- Transaction costs: **expensed** for FVTPL, **capitalised** otherwise (deducted for liabilities).
- ECL: 12-month (stage 1), lifetime (stage 2), lifetime on net basis (stage 3). 30 days past due = rebuttable presumption.
- Hedge: **fair value** hedge adjusts the item and both go to profit or loss. **Cash flow** hedge: effective part to OCI, then into asset cost or reclassified.
```
