#!/usr/bin/env python3
"""Adds varied exercise types to learn/*.json: journal entries (je), calculations (calc),
ordering (order), classification (classify) and select-all (multi).
Run once after editing:  python3 learn/_extra.py  then  python3 site/build.py"""
import json
from pathlib import Path

HERE = Path(__file__).resolve().parent

def je(s, lines, distract, why):
    return {"s": s, "lines": lines, "distract": distract, "why": why}
def calc(s, a, why, unit=""):
    return {"s": s, "a": a, "why": why, "unit": unit}
def order(s, steps, why=""):
    return {"s": s, "steps": steps, "why": why}
def classify(s, buckets, items, why=""):
    return {"s": s, "buckets": buckets, "items": items, "why": why}
def multi(s, opts, a, why):
    return {"s": s, "opts": opts, "a": a, "why": why}

X = {}
X["IAS 2"] = dict(
 je=[je("Goods are bought on credit for 50,000 (perpetual inventory system).",
        [["Dr","Inventory",50000],["Cr","Trade payables",50000]], [["Cash",50000],["Cost of sales",50000]],
        "Inventory increases and a liability to the supplier arises."),
     je("Inventory with a cost of 8,000 has an NRV of 6,500 at year-end. Record the write-down.",
        [["Dr","Cost of sales (write-down)",1500],["Cr","Inventory",1500]], [["Inventory",6500],["OCI",1500]],
        "Write down to NRV: 8,000 - 6,500 = 1,500 expense in profit or loss.")],
 calc=[calc("Opening: 100 units @ 10. Purchases: 200 units @ 13. Sold: 150 units. Using FIFO, what is closing inventory?", 1950,
            "Sold first 100 @ 10 and 50 @ 13. Left: 150 @ 13 = 1,950."),
       calc("Opening: 100 units @ 10. Purchases: 200 units @ 13. Sold: 150 units. Using periodic weighted average, what is closing inventory?", 1800,
            "Average = (1,000 + 2,600) / 300 = 12. Closing = 150 x 12 = 1,800.")],
 order=[order("رتّب خطوات قياس بند مخزون في نهاية السنة", ["Determine cost (purchase + conversion + other costs)","Estimate the selling price","Deduct costs to complete and costs to sell to get NRV","Carry the item at the lower of cost and NRV"])],
 classify=[classify("صنّف كل تكلفة: تُضاف لتكلفة المخزون ولا مصروف؟", ["تكلفة مخزون","مصروف"],
   [["Non-recoverable import duties",0],["Freight-in to the warehouse",0],["Abnormal waste",1],["Storage of finished goods",1],["Sales commissions",1],["Factory supervisor salary",0],["General admin salaries",1]])],
 multi=[multi("Which cost formulas does IAS 2 permit? (select all)", ["FIFO","LIFO","Weighted average","Specific identification","Highest-in, first-out"], [0,2,3], "LIFO and HIFO are not permitted.")])

X["IAS 16"] = dict(
 je=[je("A machine is bought for 200,000 cash. Installation costs of 10,000 are also paid in cash.",
        [["Dr","Property, plant and equipment",210000],["Cr","Cash",210000]], [["Installation expense",10000],["Property, plant and equipment",200000]],
        "Installation is directly attributable, so it is part of cost."),
     je("Annual depreciation on equipment is 25,000.",
        [["Dr","Depreciation expense",25000],["Cr","Accumulated depreciation",25000]], [["Cash",25000],["Revaluation surplus",25000]],
        "Depreciation is an expense with a credit to accumulated depreciation."),
     je("Land carried at 500,000 is revalued to 650,000 for the first time.",
        [["Dr","Land",150000],["Cr","Revaluation surplus (OCI)",150000]], [["Revenue",150000],["Retained earnings",150000]],
        "A first upward revaluation goes to OCI and the revaluation surplus.")],
 calc=[calc("Cost 120,000, residual value 20,000, useful life 5 years, straight line. Carrying amount at the end of year 2?", 80000,
            "Depreciation = 100,000 / 5 = 20,000 a year. 120,000 - 40,000 = 80,000."),
       calc("An asset with a carrying amount of 52,000 is sold for 45,000. What is the loss on disposal?", 7000,
            "52,000 - 45,000 = 7,000 loss in profit or loss.")],
 order=[order("رتّب مراحل حياة الأصل الثابت", ["Initial recognition at cost","Available for use: depreciation starts","Annual review of useful life and residual value","Derecognition on disposal: gain or loss to P&L"])],
 classify=[classify("ترسمل التكلفة ولا مصروف؟", ["ترسمل","مصروف"],
   [["Purchase price",0],["Non-refundable import duty",0],["Site preparation",0],["Staff training",1],["Opening ceremony",1],["Professional fees for installation",0],["Routine repairs",1]])],
 multi=[multi("Which are changes in accounting ESTIMATE (applied prospectively)? (select all)", ["Change in useful life","Change in residual value","Change in depreciation method","Correcting last year's depreciation calculation mistake"], [0,1,2], "Correcting a mistake is a prior period error, applied retrospectively.")])

X["IAS 38"] = dict(
 je=[je("Development costs of 90,000 are paid in cash. All IAS 38 criteria are met.",
        [["Dr","Development costs (intangible asset)",90000],["Cr","Cash",90000]], [["Research expense",90000],["Goodwill",90000]],
        "Development meeting all criteria is capitalised."),
     je("Research costs of 40,000 are paid in cash.",
        [["Dr","Research expense",40000],["Cr","Cash",40000]], [["Intangible asset",40000],["Prepayments",40000]],
        "Research is always expensed.")],
 calc=[calc("Development costs: Jan-Mar 30,000 (criteria not met), Apr-Dec 90,000 (criteria met from 1 April). How much is capitalised?", 90000,
            "Only costs after the criteria are met. The earlier 30,000 stays expensed."),
       calc("A licence costs 300,000, useful life 10 years, straight line, no residual. Carrying amount after 3 years?", 210000,
            "Amortisation 30,000 a year. 300,000 - 90,000 = 210,000.")],
 order=[order("رتّب مراحل مشروع داخلي", ["Research phase: expense","All criteria met: capitalise development","Asset available for use: start amortisation","Review useful life and method each year-end"])],
 classify=[classify("يُعترف به كأصل غير ملموس ولا مصروف؟", ["أصل","مصروف"],
   [["Purchased patent",0],["Internally generated brand",1],["Development meeting all criteria",0],["Research",1],["Advertising campaign",1],["Purchased software licence",0],["Staff training",1]])],
 multi=[multi("Which are REQUIRED to capitalise development costs? (select all)", ["Technical feasibility","Intention to complete","Ability to use or sell the asset","Board approval of the annual budget","Adequate resources to complete","Reliable measurement of the expenditure"], [0,1,2,4,5], "Budget approval is not a criterion; probable future benefits is.")])

X["IAS 40"] = dict(
 je=[je("Investment property under the fair value model rises from 2,000,000 to 2,300,000.",
        [["Dr","Investment property",300000],["Cr","Fair value gain (P&L)",300000]], [["Revaluation surplus (OCI)",300000],["Depreciation expense",300000]],
        "IAS 40 fair value changes go to profit or loss."),
     je("Rent of 60,000 for the current year is received in cash.",
        [["Dr","Cash",60000],["Cr","Rental income",60000]], [["Investment property",60000],["Deferred income",60000]],
        "Rent earned in the year is income.")],
 calc=[calc("Investment property bought for 1,000,000 plus legal fees 20,000 and transfer tax 30,000. Initial cost?", 1050000,
            "Transaction costs are included in initial cost."),
       calc("Fair value model: opening fair value 800,000, closing fair value 760,000. Loss in profit or loss?", 40000,
            "800,000 - 760,000 = 40,000 loss in P&L.")],
 order=[order("رتّب الأسئلة اللي تحدد معيار العقار", ["Held for sale in the ordinary course of business? → IAS 2","Used in production or administration? → IAS 16","Held for rentals or capital appreciation? → IAS 40","Choose fair value or cost model for all investment property"])],
 classify=[classify("صنّف كل عقار", ["IAS 40","IAS 16","IAS 2"],
   [["Office building rented to a third party",0],["Head office",1],["Land held for an undecided future use",0],["Apartments built to sell (developer)",2],["Factory used in production",1],["Building held for capital appreciation",0]])],
 multi=[multi("Fair value model for investment property: which are TRUE? (select all)", ["No depreciation","Fair value changes go to P&L","Fair value changes go to OCI","Applies to all investment property","Depreciated over 50 years"], [0,1,3], "Gains and losses go to P&L and there is no depreciation.")])

X["IAS 36"] = dict(
 je=[je("A machine (cost model) has a carrying amount of 400,000 and a recoverable amount of 330,000.",
        [["Dr","Impairment loss (P&L)",70000],["Cr","Accumulated impairment - PPE",70000]], [["Revaluation surplus",70000],["Machine",330000]],
        "Loss = 400,000 - 330,000 = 70,000 to P&L."),
     je("A revalued building has a revaluation surplus of 50,000. It is now impaired by 80,000.",
        [["Dr","Revaluation surplus (OCI)",50000],["Dr","Impairment loss (P&L)",30000],["Cr","Building",80000]], [["Impairment loss (P&L)",80000],["Revaluation surplus (OCI)",80000]],
        "First use the surplus (50,000), the rest (30,000) to P&L.")],
 calc=[calc("Carrying amount 900, FVLCD 700, value in use 760. Impairment loss?", 140,
            "Recoverable = higher of 700 and 760 = 760. Loss = 900 - 760 = 140."),
       calc("A CGU has a carrying amount of 1,000 including goodwill of 150. Recoverable amount 800. How much of the loss goes to goodwill?", 150,
            "Loss is 200. Goodwill (150) is written off first, then 50 to other assets pro rata.")],
 order=[order("رتّب خطوات اختبار الاضمحلال", ["Look for indicators (or annual test for goodwill)","Estimate FVLCD and value in use","Recoverable amount = the higher of the two","Compare with carrying amount and recognise any loss"])],
 classify=[classify("مؤشر خارجي ولا داخلي؟", ["خارجي","داخلي"],
   [["Market interest rates increased",0],["Physical damage to the asset",1],["Market capitalisation below net assets",0],["Plan to restructure the operation",1],["Adverse change in the legal environment",0],["Performance worse than budget",1]])],
 multi=[multi("Which must be tested for impairment every year? (select all)", ["Goodwill","Indefinite-life intangible","Intangible not yet available for use","Machinery","Inventory"], [0,1,2], "Others are tested only when there is an indicator (inventory is under IAS 2).")])

X["IAS 37"] = dict(
 je=[je("Lawyers say it is probable the company will pay 120,000 in a court case.",
        [["Dr","Legal expense (P&L)",120000],["Cr","Provision",120000]], [["Cash",120000],["Retained earnings",120000]],
        "Probable outflow + reliable estimate = provision."),
     je("Unwinding of the discount on a decommissioning provision: 8,000.",
        [["Dr","Finance cost",8000],["Cr","Provision",8000]], [["Property, plant and equipment",8000],["Depreciation expense",8000]],
        "Unwinding is a finance cost.")],
 calc=[calc("Warranty: 1,000 units sold. 90% no defects, 8% minor (100 each), 2% major (500 each). Provision?", 18000,
            "80 x 100 + 20 x 500 = 8,000 + 10,000 = 18,000."),
       calc("Onerous contract: cost to fulfil 50,000, penalty to exit 35,000. Provision?", 35000,
            "Lower of the cost of fulfilling and the penalty for exiting.")],
 order=[order("رتّب أسئلة قرار المخصص", ["Is there a present obligation from a past event?","Is an outflow of resources probable?","Can the amount be estimated reliably?","Recognise a provision (otherwise consider disclosure)"])],
 classify=[classify("نعمل إيه في كل حالة؟", ["مخصص","إفصاح فقط","لا شيء"],
   [["Probable outflow, reliable estimate",0],["Possible outflow",1],["Remote outflow",2],["Expected future operating losses",2],["Probable inflow from a lawsuit",1],["Restructuring announced with a detailed plan before year-end",0]])],
 multi=[multi("Which costs can be included in a restructuring provision? (select all)", ["Redundancy payments","Lease termination penalties for closed sites","Retraining continuing staff","Marketing the new image","Relocating continuing staff"], [0,1], "Only direct costs not linked to ongoing activities.")])

X["IFRS 15"] = dict(
 je=[je("A customer pays 30,000 in advance for goods to be delivered next month.",
        [["Dr","Cash",30000],["Cr","Contract liability",30000]], [["Revenue",30000],["Trade receivables",30000]],
        "No performance yet, so a contract liability."),
     je("The goods are now delivered (the 30,000 advance was received last month).",
        [["Dr","Contract liability",30000],["Cr","Revenue",30000]], [["Cash",30000],["Trade receivables",30000]],
        "Control passes on delivery: release the contract liability to revenue.")],
 calc=[calc("A phone plus a 2-year service plan sells for 1,200. Stand-alone prices: phone 900, service 600. Revenue allocated to the phone?", 720,
            "1,200 x 900 / 1,500 = 720."),
       calc("Contract price 1,000,000. Costs to date 300,000; total expected costs 750,000 (input method). Revenue to date?", 400000,
            "Progress = 300 / 750 = 40%. 40% x 1,000,000 = 400,000.")],
 order=[order("رتّب الخطوات الخمس لـ IFRS 15", ["Identify the contract","Identify the performance obligations","Determine the transaction price","Allocate the price to the obligations","Recognise revenue when obligations are satisfied"])],
 classify=[classify("الإيراد على مدى زمني ولا عند نقطة زمنية؟", ["مدى زمني","نقطة زمنية"],
   [["Building on the customer's land",0],["Retail sale of a phone",1],["Monthly cleaning service",0],["Standard goods delivered to the customer",1],["12-month gym membership",0]])],
 multi=[multi("Which indicate that control has passed to the customer? (select all)", ["Present right to payment","Legal title transferred","Physical possession transferred","Customer has the significant risks and rewards","Seller still decides who uses the asset"], [0,1,2,3], "The last one shows the seller still has control.")])

X["IFRS 16"] = dict(
 je=[je("A lease starts. The present value of lease payments is 50,000.",
        [["Dr","Right-of-use asset",50000],["Cr","Lease liability",50000]], [["Rent expense",50000],["Cash",50000]],
        "Lessee recognises ROU asset and lease liability."),
     je("Year-end: interest on the lease liability is 4,000 and the annual payment of 12,000 is made.",
        [["Dr","Interest expense",4000],["Dr","Lease liability",8000],["Cr","Cash",12000]], [["Rent expense",12000],["Lease liability",12000]],
        "Payment covers interest 4,000 and reduces the liability by 8,000.")],
 calc=[calc("Lease liability on 1 January 40,000, rate 8%, payment 10,000 on 31 December. Closing liability?", 33200,
            "40,000 + 3,200 - 10,000 = 33,200."),
       calc("ROU asset 60,000. Lease term 5 years, useful life 8 years, no transfer of ownership. Annual depreciation?", 12000,
            "Shorter of lease term and useful life: 60,000 / 5 = 12,000.")],
 order=[order("رتّب خطوات محاسبة المستأجر", ["Check whether the contract contains a lease","Determine the lease term","Measure the lease liability at PV of payments","Measure the ROU asset (liability + direct costs + prepayments - incentives)","Depreciate the asset and unwind interest on the liability"])],
 classify=[classify("نسجل أصل والتزام ولا نستخدم الإعفاء؟", ["أصل + التزام","إعفاء ممكن"],
   [["5-year office lease",0],["6-month car hire",1],["Laptop leased for 3 years (low value)",1],["10-year factory lease",0],["12-month warehouse lease, no purchase option",1]])],
 multi=[multi("Which are included in lease payments? (select all)", ["Fixed payments","Variable payments linked to CPI","Purchase option price if reasonably certain","Variable payments based on future sales","Termination penalty if the term reflects termination"], [0,1,2,4], "Sales-based variable payments are expensed when incurred.")])

X["IAS 12"] = dict(
 je=[je("Current tax for the year is estimated at 70,000.",
        [["Dr","Income tax expense",70000],["Cr","Current tax payable",70000]], [["Deferred tax liability",70000],["Cash",70000]],
        "Current tax is an expense and a liability until paid."),
     je("The deferred tax liability increases from 20,000 to 26,000 (all through P&L).",
        [["Dr","Deferred tax expense",6000],["Cr","Deferred tax liability",6000]], [["Deferred tax liability",26000],["OCI",6000]],
        "Only the movement (6,000) is recorded.")],
 calc=[calc("Machine: carrying amount 150,000, tax base 110,000. Tax rate 22.5%. Deferred tax liability?", 9000,
            "40,000 x 22.5% = 9,000."),
       calc("Accounting profit 500,000. Non-deductible fines 20,000. Tax rate 22.5%. Current tax?", 117000,
            "Taxable profit 520,000 x 22.5% = 117,000.")],
 order=[order("رتّب خطوات حساب الضريبة المؤجلة", ["Find the carrying amount of each asset and liability","Find its tax base","Calculate the temporary difference","Apply the enacted or substantively enacted rate","Recognise DTL / DTA (check recoverability of DTA)"])],
 classify=[classify("بيطلع التزام ضريبي مؤجل ولا أصل؟", ["DTL","DTA"],
   [["Asset carrying amount above tax base",0],["Warranty provision deductible when paid",1],["Unused tax losses",1],["Accelerated tax depreciation",0],["Interest receivable taxed when received",0]])],
 multi=[multi("Which are TRUE? (select all)", ["Deferred tax is not discounted","Tax on OCI items goes to OCI","A DTA is always recognised for tax losses","No DTL on the initial recognition of goodwill"], [0,1,3], "A DTA needs probable future taxable profit.")])

X["IAS 21"] = dict(
 je=[je("Goods of $1,000 are bought on credit when $1 = EGP 48.",
        [["Dr","Inventory",48000],["Cr","Trade payables",48000]], [["Exchange loss",48000],["Cash",48000]],
        "Recorded at the spot rate on the transaction date."),
     je("At year-end the $1,000 payable is still unpaid. The rate moved from 48 to 50.",
        [["Dr","Exchange loss (P&L)",2000],["Cr","Trade payables",2000]], [["Inventory",2000],["OCI",2000]],
        "Monetary item retranslated: 50,000 - 48,000 = 2,000 loss.")],
 calc=[calc("A receivable of $5,000 was recorded at EGP 47. It is settled when $1 = EGP 49. Exchange gain in EGP?", 10000,
            "5,000 x (49 - 47) = 10,000 gain."),
       calc("Equipment bought for $20,000 when $1 = EGP 45 (cost model). Year-end rate 50. Carrying amount in EGP (ignore depreciation)?", 900000,
            "Non-monetary at historical cost: 20,000 x 45 = 900,000.")],
 order=[order("رتّب خطوات معاملة بعملة أجنبية", ["Determine the functional currency","Record the transaction at the spot rate","At year-end, retranslate monetary items at the closing rate","Recognise exchange differences in P&L"])],
 classify=[classify("بند نقدي ولا غير نقدي؟", ["نقدي","غير نقدي"],
   [["Cash in USD",0],["Trade receivable",0],["Inventory",1],["Property, plant and equipment",1],["Loan payable",0],["Prepaid rent",1]])],
 multi=[multi("Translating a foreign subsidiary: which are TRUE? (select all)", ["Assets and liabilities at the closing rate","Income and expenses at transaction (or average) rates","Differences go to OCI","Share capital at the closing rate"], [0,1,2], "Equity is kept at historical rates.")])

X["IAS 32"] = dict(
 je=[je("5% preference shares with mandatory redemption are issued for 100,000 cash.",
        [["Dr","Cash",100000],["Cr","Financial liability",100000]], [["Share capital",100000],["Share premium",100000]],
        "Mandatory redemption = contractual obligation to pay cash."),
     je("The company buys back its own shares for 30,000 cash.",
        [["Dr","Treasury shares (equity)",30000],["Cr","Cash",30000]], [["Investment in shares",30000],["Loss (P&L)",30000]],
        "Own shares are deducted from equity, not assets.")],
 calc=[calc("A convertible bond is issued for 1,000,000. The PV of the liability component is 920,000. Equity component?", 80000,
            "Equity is the residual: 1,000,000 - 920,000."),
       calc("Redeemable preference shares 200,000 with a 6% dividend. Amount shown as finance cost?", 12000,
            "Classified as a liability, so the dividend is interest: 6% x 200,000.")],
 order=[order("رتّب خطوات محاسبة السندات القابلة للتحويل", ["Measure the liability: PV of cash flows at the market rate without conversion","Equity component = proceeds - liability","Unwind the liability at the effective rate","On conversion, transfer the liability to equity"])],
 classify=[classify("التزام مالي ولا حقوق ملكية؟", ["التزام","حقوق ملكية"],
   [["Ordinary shares",1],["Mandatorily redeemable preference shares",0],["Irredeemable shares with discretionary dividends",1],["Loan note",0],["Obligation to deliver shares worth exactly 100,000",0]])],
 multi=[multi("Offsetting a financial asset and liability requires: (select all)", ["A legally enforceable right to set off","Intention to settle net or simultaneously","Same counterparty only","Same currency only"], [0,1], "Both conditions are needed; the others are not enough.")])

X["IFRS 9"] = dict(
 je=[je("Bond at amortised cost: interest at EIR is 7,600; the coupon received in cash is 5,000.",
        [["Dr","Cash",5000],["Dr","Financial asset (bond)",2600],["Cr","Interest income",7600]], [["Interest income",5000],["OCI",2600]],
        "Income at EIR; the difference increases the carrying amount."),
     je("The loss allowance (ECL) on trade receivables increases by 3,000.",
        [["Dr","Impairment loss (P&L)",3000],["Cr","Loss allowance",3000]], [["OCI",3000],["Revenue",3000]],
        "ECL changes go to profit or loss.")],
 calc=[calc("Receivables 200,000. 12-month probability of default 2%, loss given default 50%. 12-month ECL?", 2000,
            "200,000 x 2% x 50% = 2,000."),
       calc("Bond at amortised cost: opening 95,000, EIR 8%, coupon received 5,000. Closing amortised cost?", 97600,
            "95,000 + 7,600 - 5,000 = 97,600.")],
 order=[order("رتّب خطوات تصنيف الأصل المالي", ["Check the cash flows: SPPI or not?","Identify the business model","Classify: amortised cost, FVOCI or FVTPL","Measure ECL for amortised cost and FVOCI debt"])],
 classify=[classify("صنّف كل أصل مالي", ["AC","FVOCI","FVTPL"],
   [["Loan held to collect, SPPI",0],["Bond held to collect and sell, SPPI",1],["Shares held for trading",2],["Derivative (not a hedge)",2],["Strategic shares, irrevocable OCI election",1]])],
 multi=[multi("Which require LIFETIME expected credit losses? (select all)", ["Significant increase in credit risk","More than 30 days past due (rebuttable presumption)","New low-risk loan at initial recognition","Trade receivables under the simplified approach"], [0,1,3], "A new performing loan starts with 12-month ECL.")])

X["IFRS 3"] = dict(
 je=[je("Legal fees of 25,000 for an acquisition are paid in cash.",
        [["Dr","Administrative expenses",25000],["Cr","Cash",25000]], [["Goodwill",25000],["Investment in subsidiary",25000]],
        "Acquisition costs are expensed."),
     je("Parent buys 100% of S for 500,000 cash (parent's own books).",
        [["Dr","Investment in subsidiary",500000],["Cr","Cash",500000]], [["Goodwill",500000],["Share capital",500000]],
        "Goodwill appears only on consolidation.")],
 calc=[calc("Consideration 800. FV of net identifiable assets 900. NCI (20%) at proportionate share. Goodwill?", 80,
            "NCI = 20% x 900 = 180. Goodwill = 800 + 180 - 900 = 80."),
       calc("Consideration 800. FV of net identifiable assets 900. NCI (20%) measured at its fair value of 210. Goodwill?", 110,
            "800 + 210 - 900 = 110.")],
 order=[order("رتّب خطوات طريقة الاستحواذ", ["Identify the acquirer","Determine the acquisition date","Recognise and measure identifiable assets, liabilities and NCI","Recognise goodwill or a bargain purchase gain"])],
 classify=[classify("جزء من المقابل ولا مصروف؟", ["مقابل","مصروف"],
   [["Cash paid to the sellers",0],["Shares issued at fair value",0],["Legal fees",1],["Contingent consideration at fair value",0],["Due diligence costs",1]])],
 multi=[multi("After acquisition, which are TRUE? (select all)", ["Goodwill is not amortised","Goodwill is tested for impairment annually","Goodwill impairment is reversed when value recovers","The measurement period is at most one year"], [0,1,3], "Goodwill impairment is never reversed.")])

X["IAS 28"] = dict(
 je=[je("The investor's share of the associate's profit is 30,000.",
        [["Dr","Investment in associate",30000],["Cr","Share of profit of associate",30000]], [["Dividend income",30000],["Cash",30000]],
        "Equity method: the investment grows with the share of profit."),
     je("A dividend of 10,000 is received from the associate.",
        [["Dr","Cash",10000],["Cr","Investment in associate",10000]], [["Dividend income",10000],["Share of profit of associate",10000]],
        "Dividends reduce the investment.")],
 calc=[calc("Bought 30% of an associate for 400,000. Associate profit 200,000; it paid dividends of 50,000. Carrying amount at year-end?", 445000,
            "400,000 + 30% x 200,000 - 30% x 50,000 = 445,000."),
       calc("Investor (25%) sold goods to its associate at a profit of 40,000. All are still in the associate's inventory. Unrealised profit to eliminate?", 10000,
            "25% x 40,000 = 10,000.")],
 order=[order("رتّب خطوات طريقة حقوق الملكية", ["Initially recognise at cost","Add the share of post-acquisition profit (and OCI)","Deduct dividends received","Eliminate the share of unrealised profits","Test for impairment if there are indicators"])],
 classify=[classify("صنّف كل استثمار", ["تابعة","شقيقة","مشروع مشترك"],
   [["60% of votes with control",0],["30% with a board seat",1],["50/50, unanimous decisions, rights to net assets",2],["25% with significant influence",1]])],
 multi=[multi("Which indicate significant influence? (select all)", ["Board representation","Participation in policy-making","Material transactions between the parties","Interchange of managerial staff","Holding 5% with no other rights"], [0,1,2,3], "5% alone, with no other rights, does not give influence.")])

for f in sorted(HERE.glob("*.json")):
    u = json.loads(f.read_text(encoding="utf-8"))
    x = X[u["standard"]]
    for k in ("je", "calc", "seq", "classify", "multi"):
        u[k] = x.get("order" if k == "seq" else k, [])
    for e in u["je"]:
        dr = sum(l[2] for l in e["lines"] if l[0] == "Dr"); cr = sum(l[2] for l in e["lines"] if l[0] == "Cr")
        assert dr == cr, (f.name, e["s"])
    for m in u["multi"]: assert all(0 <= i < len(m["opts"]) for i in m["a"])
    for c in u["classify"]: assert all(0 <= i < len(c["buckets"]) for _, i in c["items"])
    f.write_text(json.dumps(u, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
print("ok", len(X))
