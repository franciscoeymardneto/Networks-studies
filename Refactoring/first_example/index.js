function statement(invoice, plays) {
    let totalAmount = 0
    let volumeCredit = 0
    let result = `Statement for ${invoice.customer}\n`

    const format = new Intl.NumberFormat("es-US", {
        style: "currency", currency: "USD", minimumFractionDigits: 2
    }).format


    for (let perf of invoice.performances) {
        const play = plays[perf.playID]
        let thisAmount = 0

        switch (play.type) {
            case "tragedy":
                thisAmount = 4000
                if (perf.audience > 30) {
                    thisAmount += 1000 * (perf.audience - 30)
                }
                break
            case "comedy":
                thisAmount = 30000
                if (perf.audience > 20) {
                    thisAmount += 10000 + 500 * (perf.audience - 20)
                }
                thisAmount += 300 * perf.audience
                break 
            default:
                throw new Error(`unknown type: ${play.type}`)
        }
        // add volume credits

        volumeCredits += Math.max(perf.audience - 30, 0)
        
        // add extra credit for every ten comedy attendees

        if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience)
        // print line for this order

        result += ` ${play.name}: ${format(thisAmount / 100)} (${perf.audience}) `
        totalAmount += thisAmount

        }
        result += `Amount owed is ${ format(totalAmount/ 100)}\n`

        result += `You earned ${ volumeCredits } credits\n` 
        
        return result
}