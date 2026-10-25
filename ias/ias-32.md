---
title: "IAS 32 — Financial Instruments: Presentation / عرض الأدوات المالية"
standard: "IAS 32"
version: "As taught in BPP DipIFR Study Text 2025-26 (21st ed.), Ch 10 §2"
effective_date: "Exact source reference could not be verified from the uploaded document."
source: "Study Text Ch 10 §2 (p.185-189); Kit Q18, Mock 1 Q4"
---

# Overview / نظرة عامة

```summary
# الفكرة في سطر واحد
الأداة المالية تُصنَّف **التزام** أو **حقوق ملكية** حسب **الجوهر** لا الشكل القانوني. العلامة الحاسمة: هل على المصدِر **التزام تعاقدي** بتسليم نقد أو أصل مالي؟ (ST p.186)
```

**Simple explanation.** If the issuer must hand over cash (or another financial asset), it is a liability. If the issuer has no such duty, it is equity. The label "share" does not decide it.

**Technical explanation.** IAS 32's objective is to set principles for presenting instruments as liabilities or equity and for offsetting financial assets and liabilities (ST p.185). Classification is made on initial recognition and is not changed while the instrument is recognised (ST p.186).

```tree
Does the issuer have a contractual obligation to deliver cash or another financial asset?
  Y: **Financial liability**
  N: Settled in own shares?
    Fixed amount of cash for a fixed number of own shares?
      Y: **Equity**
      N: **Liability** (variable number of shares, or other settlement)
```

# Liability or equity? / التزام أم حقوق ملكية

| Instrument | Classification | Why (ST p.186) |
|---|---|---|
| Redeemable preference shares (fixed date, fixed amount) | **Liability** | Issuer must redeem |
| Cumulative irredeemable preference shares | **Liability** | Fixed dividends still must be paid later |
| Ordinary shares | Equity | No obligation to distribute |
| Share options sold | Not debt | No obligation to deliver cash (ST p.205) |

- **Contingent settlement** (ST p.186): if cash or shares depends on an uncertain event outside both parties' control, treat as a **liability** unless the chance is remote.
- **Settlement options** (ST p.187): a derivative where one party chooses how to settle is an asset or liability unless every alternative gives equity.
- **Puttable instruments** (ST p.188-189): a holder's right to put the instrument for cash makes it a liability, but IAS 32 allows equity classification if conditions are met. A duty to pay a pro rata share of net assets only on **liquidation** is equity.

```warn
# Ability to pay is irrelevant
If the issuer cannot pay because of a currency shortage, the obligation still exists and it is still a liability. (ST p.186)
```

# Compound instruments / الأدوات المركبة

Convertible debt has a **liability** part (the debt) and an **equity** part (the holder's conversion option). IAS 32 splits them (ST p.187):

```flow
1 :: Value the **liability** first: discount the cash flows at the market rate for similar debt **without** conversion
2 :: Equity = proceeds minus the liability (residual)
3 :: The split stays fixed even if the chance of conversion changes
```

## Example A — Rathbone (ST p.187-188)

2,000 bonds issued at par $1,000 ($2m), three-year term, 6% interest paid yearly in arrears. Market rate for similar non-convertible debt 9%. Discount factors at 9%: year 3 = 0.772, annuity for 3 years = 2.531.

```split
title: Splitting $2,000,000 of proceeds ($)
Liability: PV of principal 1,544,000 + PV of interest 303,720 = 1,847,720 | 1847720
Equity (balancing figure) | 152280
```

```journal
# Issue
Dr Cash | 2,000,000
Cr Financial liability | 1,847,720
Cr Equity (option component) | 152,280
```

## Example B — EFG hybrid (ST p.206)

10,000 5% convertible bonds at $50 par = $500,000, five years, market rate for similar non-convertible debt 6%. Factors at 6%: principal 0.747, annuity 4.212.

| | $ |
|---|---|
| PV of principal 500,000 x 0.747 | 373,500 |
| PV of interest 25,000 x 4.212 | 105,300 |
| **Liability component** | **478,800** |
| **Equity component** (500,000 - 478,800) | **21,200** |

```bars
title: Split of $500,000
Liability | 478800
Equity | 21200
```

```trap
# Common trap
The liability is the **present value of the cash flows at the straight-debt rate**. Do not take the equity as a share of the face value or discount at the coupon rate. (ST p.187)
```

# Treasury shares, costs and distributions / أسهم الخزينة والتوزيعات

- **Treasury shares:** deducted from equity. No gain or loss in profit or loss on purchase, sale, issue or cancellation (ST p.188).
- **Interest, dividends, losses and gains** on a liability go to profit or loss (financing category). **Distributions** on equity are debited directly to equity (ST p.188).
- **Transaction costs** of an equity issue are deducted from equity, usually share premium (ST p.188).

# Offsetting / المقاصة

A financial asset and liability are offset only if the entity (ST p.188):
- has a **legally enforceable right** of set-off, **and**
- **intends** to settle net or to realise and settle at the same time.

```tip
# Both conditions, always
A legal right alone is not enough, and an intention alone is not enough.
```

# Common mistakes / أخطاء شائعة

- Calling redeemable or cumulative preference shares **equity** because they are legally "shares".
- Computing the equity part first. IAS 32 values the **liability first** and the equity is the residual (ST p.187).
- Discounting a convertible at the **coupon** rate instead of the market rate for similar straight debt.
- Recognising a gain or loss on buying back own shares.
- Offsetting with a right but no intention to settle net.

# Exam focus / ما يتكرر في الامتحان

- Convertible loans are a regular numerical item inside bigger scenarios (the Kit has several convertible loan exhibits). The individual Kit answers were not read for this page.
- ACCA's article "When does debt seem to be equity?" and a video on debt versus equity are on the DipIFR resources page (ST p.189). Not part of the uploaded files.

# Quick review / مراجعة سريعة

```summary
# Key rules
- Obligation to deliver cash = **liability**; no obligation = **equity**. Substance over form.
- Redeemable and cumulative preference shares are **liabilities**.
- Convertible bond: **liability first** at the straight-debt market rate; equity is the balance.
- Treasury shares reduce equity; no profit or loss.
- Offset only with a **legal right** and the **intention** to settle net.
```
